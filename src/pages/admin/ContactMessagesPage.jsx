import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbClock,
  TbCheck,
  TbX,
  TbSearch,
  TbFilter,
  TbRefresh,
  TbEye,
  TbTrash,
  TbAlertTriangle,
  TbMessageCircle,
  TbPhoneCall,
  TbUser,
  TbCalendar,
  TbNotes,
  TbChevronDown,
  TbChevronUp,
  TbStar,
  TbStarFilled,
  TbAlertCircle,
  TbList,
  TbReport,
  TbDatabaseExport,
  TbMailFilled,
  TbArrowRight,
  TbChevronRightPipe,
  TbChevronLeftPipe,
  TbMessage,
} from "react-icons/tb";
import contactService from "../../services/contactService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import ToastContainer from "../../components/ui/ToastContainer";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import MessageDetailModal from "../../components/ui/MessageDetailModal";
import { formatDateWithTime } from "../../utils/formatDate";

const ContactMessagesPage = () => {
  const { user } = useAuth();
  const { toasts, toast, removeToast } = useToast();

  // State management
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingNotes, setProcessingNotes] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    type: null,
    priority: null,
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // UI States
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    pending: true,
    processed: true,
    closed: true,
  });

  // Pagination states for each section
  const [pagination, setPagination] = useState({
    pending: { page: 1, limit: 5 },
    processed: { page: 1, limit: 5 },
    closed: { page: 1, limit: 5 },
  });

  // Available filter options
  const messageTypes = ["contact", "callback"];
  const priorityLevels = ["high", "medium", "low"];

  // Fetch messages with current filters
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const params = {};
      if (activeFilters.type) params.type = activeFilters.type;
      if (activeFilters.priority) params.priority = activeFilters.priority;
      if (searchTerm) params.search = searchTerm;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;

      const response = await contactService.getAllContactMessages(params);

      // Handle the response data structure
      const messageData = response?.data;
      let finalMessages = [];

      if (Array.isArray(messageData)) {
        finalMessages = messageData;
      } else {
        console.warn("Unexpected response format:", messageData);
        finalMessages = [];
      }

      setMessages(finalMessages);
      setError(null);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to fetch messages");
      setMessages([]);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [
    searchTerm,
    activeFilters.type,
    activeFilters.priority,
    sortBy,
    sortOrder,
  ]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await contactService.getContactMessageStats();
      setStats(response?.data || null);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats(null);
    }
  }, []);

  // Initial data fetch - separate useEffect to avoid infinite loops
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Fetch stats only once on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Handle message processing
  const handleProcessMessage = async (messageId) => {
    try {
      // Validate user authentication
      if (!user) {
        toast.error("User authentication required to process messages");
        return;
      }

      // Check for different possible ID field names
      const userId = user.id || user.userId || user.adminId || user.uuid;

      if (!userId) {
        console.error("No user ID found. User object:", user);
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const response = await contactService.markAsProcessed(
        messageId,
        userId,
        processingNotes || ""
      );

      // Optimistically update the local state first
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                status: "processed",
                processedBy: userId,
                processedAt: new Date().toISOString(),
                notes: processingNotes || "",
                processedByName: user.firstName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username || user.email,
              }
            : msg
        )
      );

      toast.success("Message marked as processed");
      setShowModal(false);
      setSelectedMessage(null);
      setProcessingNotes("");

      // Fetch fresh data from backend to ensure consistency
      setTimeout(() => {
        fetchMessages();
        fetchStats();
      }, 500);
    } catch (error) {
      console.error("Error processing message:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "Failed to process message";
      toast.error(errorMessage);

      // Refresh data on error to restore correct state
      fetchMessages();
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async () => {
    if (!deleteConfirmation) return;

    setIsDeleting(true);
    try {
      await contactService.deleteContactMessage(deleteConfirmation.id);
      toast.success("Message deleted successfully");
      fetchMessages();
      fetchStats();
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMessages();
    fetchStats();
  };

  // Filter handlers
  const handleFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleTypeFilterChange = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      type: prev.type === type ? null : type,
    }));
  };

  const handlePriorityFilterChange = (priority) => {
    setActiveFilters((prev) => ({
      ...prev,
      priority: prev.priority === priority ? null : priority,
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      type: null,
      priority: null,
    });
    setSearchTerm("");
  };

  // Section toggle
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Pagination handlers
  const handlePageChange = (section, page) => {
    setPagination((prev) => ({
      ...prev,
      [section]: { ...prev[section], page },
    }));
  };

  const handleLimitChange = (section, limit) => {
    setPagination((prev) => ({
      ...prev,
      [section]: { ...prev[section], limit: parseInt(limit), page: 1 },
    }));
  };

  // Utility functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border border-red-300 text-red-800";
      case "medium":
        return "bg-yellow-100 border border-yellow-300 text-yellow-800";
      case "low":
        return "bg-green-100 border border-green-300 text-green-800";
      default:
        return "bg-gray-100 border border-gray-300 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 border border-orange-300 text-orange-800";
      case "processed":
        return "bg-green-100 border border-green-300 text-green-800";
      case "closed":
        return "bg-gray-100 border border-gray-300 text-gray-800";
      default:
        return "bg-gray-100 border border-gray-300 text-gray-800";
    }
  };

  // Filter and group messages
  const filteredMessages = Array.isArray(messages)
    ? messages
        .filter((message) => {
          if (!searchTerm.trim()) return true;
          const query = searchTerm.toLowerCase();
          return (
            message.name?.toLowerCase().includes(query) ||
            message.email?.toLowerCase().includes(query) ||
            message.phone?.toLowerCase().includes(query) ||
            message.subject?.toLowerCase().includes(query) ||
            message.message?.toLowerCase().includes(query)
          );
        })
        .filter((message) => {
          if (!activeFilters.type) return true;
          return message.type === activeFilters.type;
        })
        .filter((message) => {
          if (!activeFilters.priority) return true;
          return message.priority === activeFilters.priority;
        })
    : [];

  // Group messages by status
  const groupedMessages = {
    pending: filteredMessages.filter((m) => m.status === "pending"),
    processed: filteredMessages.filter((m) => m.status === "processed"),
    closed: filteredMessages.filter((m) => m.status === "closed"),
  };

  // Get paginated messages for each section
  const getPaginatedMessages = (section) => {
    const sectionMessages = groupedMessages[section];
    const { page, limit } = pagination[section];
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return sectionMessages.slice(startIndex, endIndex);
  };

  const getTotalPages = (section) => {
    const total = groupedMessages[section].length;
    const { limit } = pagination[section];
    return Math.ceil(total / limit);
  };

  const getSectionIcon = (status) => {
    switch (status) {
      case "pending":
        return <TbClock className="h-5 w-5 text-orange-500" />;
      case "processed":
        return <TbCheck className="h-5 w-5 text-green-500" />;
      case "closed":
        return <TbX className="h-5 w-5 text-gray-500" />;
      default:
        return <TbMessageCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white px-8 py-3 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-[1.3rem] font-bold text-secondary-700">
                Contact Messages & Callbacks
              </h1>
              <p className="text-gray-500 text-sm">
                Manage customer inquiries and callback requests
              </p>
            </div>

            <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
              <button
                onClick={handleRefresh}
                className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
              >
                <TbRefresh
                  className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>

              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-neutral-200 text-gray-500 font-medium border border-gray-600/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px] shadow-sm"
                  />
                  <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <TbX className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={handleFilterToggle}
                  className={`bg-white border ${
                    Object.values(activeFilters).some((v) => v !== null)
                      ? "border-primary-300 text-primary-600"
                      : "border-gray-200 text-gray-700"
                  } rounded-lg px-4 py-2 text-sm hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center shadow-sm transition-all`}
                >
                  <TbFilter className="h-4 w-4 mr-2" />
                  Filter
                  {isFilterDropdownOpen ? (
                    <TbChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <TbChevronDown className="h-4 w-4 ml-2" />
                  )}
                </button>

                {/* Filter Dropdown */}
                {isFilterDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-primary-700">
                          Select Filters
                        </h3>
                        {Object.values(activeFilters).some(
                          (v) => v !== null
                        ) && (
                          <button
                            onClick={clearAllFilters}
                            className="text-xs text-primary-600 hover:text-primary-800"
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      {/* Message Type filter */}
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                          Message Type
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {messageTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => handleTypeFilterChange(type)}
                              className={`px-3 py-1 text-xs rounded-full capitalize ${
                                activeFilters.type === type
                                  ? "bg-primary-200 border border-primary-300 text-primary-700 font-medium"
                                  : "bg-gray-200/70 border border-gray-300 text-gray-700"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Priority filter */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                          Priority
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {priorityLevels.map((priority) => (
                            <button
                              key={priority}
                              onClick={() =>
                                handlePriorityFilterChange(priority)
                              }
                              className={`px-3 py-1 text-xs rounded-full capitalize ${
                                activeFilters.priority === priority
                                  ? getPriorityColor(priority) + " font-medium"
                                  : "bg-gray-200/70 border border-gray-300 text-gray-700"
                              }`}
                            >
                              {priority}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Statistics Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Messages
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.overview?.total || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TbMessage className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.overview?.pending || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <TbClock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Callbacks
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.overview?.pendingCallbacks || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <TbPhoneCall className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Processed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.overview?.processed || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TbCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <TbAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-800">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <TbX className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Messages Sections */}
          <div className="space-y-6">
            {["pending", "processed", "closed"].map((status) => (
              <div
                key={status}
                className="bg-gray-50 overflow-hidden rounded-xl border border-gray-200"
              >
                {/* Section Header */}
                <div
                  className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(status)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3
                        className={`text-lg font-semibold text-gray-900 capitalize ${
                          status === "pending"
                            ? "text-orange-600"
                            : status === "processed"
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {status} Messages
                      </h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          status === "pending"
                            ? "bg-orange-600 text-white"
                            : status === "processed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {groupedMessages[status].length}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={pagination[status].limit}
                        onChange={(e) =>
                          handleLimitChange(status, e.target.value)
                        }
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                      </select>
                      {expandedSections[status] ? (
                        <TbChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <TbChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <AnimatePresence>
                  {expandedSections[status] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {loading ? (
                        <div className="py-12 text-center">
                          <div className="flex justify-center">
                            <div className="h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </div>
                      ) : getPaginatedMessages(status).length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <TbList className="h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-lg font-medium text-gray-500 mb-1">
                              {error
                                ? "Error loading messages"
                                : searchTerm ||
                                  Object.values(activeFilters).some(
                                    (v) => v !== null
                                  )
                                ? `No ${status} messages match your filters`
                                : `No ${status} messages`}
                            </p>
                            <p className="text-sm text-gray-400">
                              {error
                                ? "Please try refreshing the page"
                                : searchTerm ||
                                  Object.values(activeFilters).some(
                                    (v) => v !== null
                                  )
                                ? "Try adjusting your search or filter criteria"
                                : `No ${status} messages available at the moment`}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 gap-4 p-4">
                            {getPaginatedMessages(status).map((message) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                                onClick={() => {
                                  setSelectedMessage(message);
                                  setShowModal(true);
                                }}
                              >
                                <div className="p-6">
                                  {/* Header */}
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`p-2.5 rounded-lg ${
                                          message.type === "callback"
                                            ? "bg-red-100 border border-red-200 text-red-600"
                                            : "bg-blue-100 border border-blue-200 text-blue-600"
                                        }`}
                                      >
                                        {message.type === "callback" ? (
                                          <TbPhoneCall className="h-6 w-6" />
                                        ) : (
                                          <TbMailFilled className="h-6 w-6" />
                                        )}
                                      </div>
                                      <div>
                                        <h3 className="font-semibold text-primary-600 text-lg">
                                          {message.name}
                                        </h3>
                                        <p className="flex items-center text-sm text-gray-500">
                                          {message.type === "callback"
                                            ? "Callback Request"
                                            : "Contact Message"}{" "}
                                          <TbArrowRight className="ml-2 text-sm" />
                                          <span className="ml-2 text-sm">
                                            {message.email && (
                                              <div className=" text-gray-600">
                                                <span className="truncate">
                                                  {message.email}
                                                </span>
                                              </div>
                                            )}
                                            {message.phone && (
                                              <div className=" text-gray-600">
                                                <span>{message.phone}</span>
                                              </div>
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                    </div>

                                    <div className="">
                                      <div className="flex items-center space-x-2">
                                        <span
                                          className={`px-5 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                                            message.priority
                                          )}`}
                                        >
                                          {message.priority}
                                        </span>
                                        <span
                                          className={`px-4 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                            message.status
                                          )}`}
                                        >
                                          {message.status}
                                        </span>
                                      </div>
                                      <div className="mt-2 flex items-center text-gray-600 text-sm">
                                        <TbCalendar className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>
                                          {formatDateWithTime(
                                            message.createdAt,
                                            true
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className=" mb-4">
                                    <div>
                                      {message.subject && (
                                        <h4 className="font-medium text-gray-800">
                                          {message.subject}
                                        </h4>
                                      )}
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                      {message.message}
                                    </p>
                                  </div>

                                  {/* Processing Info */}
                                  {message.processedBy && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                      <div className="flex items-center text-sm text-green-700">
                                        <TbUser className="h-4 w-4 mr-2" />
                                        <span>
                                          Processed by {message.processedByName}{" "}
                                          on{" "}
                                          {formatDateWithTime(
                                            message.processedAt,
                                            true
                                          )}
                                        </span>
                                      </div>
                                      {message.notes && (
                                        <div className="mt-2">
                                          <div className="flex items-center text-sm text-green-600 mb-1">
                                            <TbNotes className="h-4 w-4 mr-2" />
                                            <span className="font-medium">
                                              Notes:
                                            </span>
                                          </div>
                                          <p className="text-sm text-green-700 pl-6">
                                            {message.notes}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Actions */}
                                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="text-[0.8rem] text-primary-500 font-medium">
                                      Click to view details
                                    </div>
                                    <div
                                      className="flex items-center space-x-2"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {message.status === "pending" && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleProcessMessage(message.id);
                                          }}
                                          className="flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition-colors"
                                          title="Mark as Processed"
                                        >
                                          <TbCheck className="h-4 w-4 mr-1" />
                                          Process
                                        </button>
                                      )}

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDeleteConfirmation(message);
                                        }}
                                        className="flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg hover:bg-red-200 transition-colors"
                                        title="Delete Message"
                                      >
                                        <TbTrash className="h-4 w-4 mr-1" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Pagination */}
                          {groupedMessages[status].length >
                            pagination[status].limit && (
                            <div className="px-6 py-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                  Showing{" "}
                                  <span className="font-medium text-primary-600">
                                    {(pagination[status].page - 1) *
                                      pagination[status].limit +
                                      1}
                                  </span>{" "}
                                  to{" "}
                                  <span className="font-medium text-primary-600">
                                    {Math.min(
                                      pagination[status].page *
                                        pagination[status].limit,
                                      groupedMessages[status].length
                                    )}
                                  </span>{" "}
                                  of{" "}
                                  <span className="font-medium text-primary-600">
                                    {groupedMessages[status].length}
                                  </span>{" "}
                                  results
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() =>
                                      handlePageChange(
                                        status,
                                        pagination[status].page - 1
                                      )
                                    }
                                    disabled={pagination[status].page === 1}
                                    className="px-3 py-1 text-sm text-primary-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <TbChevronLeftPipe className="h-4 w-4" />
                                  </button>
                                  <span className="text-sm text-gray-600">
                                    Page {pagination[status].page} of{" "}
                                    {getTotalPages(status)}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handlePageChange(
                                        status,
                                        pagination[status].page + 1
                                      )
                                    }
                                    disabled={
                                      pagination[status].page >=
                                      getTotalPages(status)
                                    }
                                    className="px-3 py-1 text-sm text-primary-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <TbChevronRightPipe className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div>Showing {filteredMessages.length} messages</div>
            <div className="flex space-x-4">
              <button className="flex items-center hover:text-primary-600">
                <TbReport className="mr-1 h-4 w-4" />
                Generate Report
              </button>
              <button className="flex items-center hover:text-primary-600">
                <TbDatabaseExport className="mr-1 h-4 w-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Click outside handler for filter dropdown */}
        {isFilterDropdownOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setIsFilterDropdownOpen(false)}
          ></div>
        )}

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={!!deleteConfirmation}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={handleDeleteMessage}
          itemName={deleteConfirmation?.name}
          message={`Are you sure you want to delete the message from "${deleteConfirmation?.name}"?`}
          isLoading={isDeleting}
        />

        {/* Message Detail Modal */}
        <MessageDetailModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedMessage(null);
            setProcessingNotes("");
          }}
          message={selectedMessage}
          onProcessMessage={handleProcessMessage}
          processingNotes={processingNotes}
          setProcessingNotes={setProcessingNotes}
        />
      </AnimatePresence>
    </>
  );
};

export default ContactMessagesPage;
