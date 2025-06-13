import React, { useState, useEffect, useCallback } from "react";
import {
  TbFileDescription,
  TbSearch,
  TbFilter,
  TbPlus,
  TbEdit,
  TbTrash,
  TbEye,
  TbRefresh,
  TbChevronDown,
  TbChevronUp,
  TbX,
  TbArrowUp,
  TbArrowDown,
  TbUsers,
  TbCalendar,
  TbCheck,
  TbAlertCircle,
  TbList,
  TbReport,
  TbDatabaseExport,
  TbShield,
  TbExternalLink,
  TbClock,
  TbCheckbox,
  TbClipboardCheck,
  TbShieldPlus,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import AddApplicationModal from "../../components/applications/AddApplicationModal";
import EditApplicationModal from "../../components/applications/EditApplicationModal";
import ApplicationDetailModal from "../../components/applications/ApplicationDetailModal";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import applicationService from "../../services/applicationService";
import { formatDate } from "../../utils/formatDate";

const InsuranceApplicationManagementPage = () => {
  // State management
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: null,
    insuranceType: null,
    coverType: null,
    dateRange: null,
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // UI States
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch applications using API service
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: activeFilters.status,
        insuranceType: activeFilters.insuranceType,
        coverType: activeFilters.coverType,
        startDate: activeFilters.dateRange?.start,
        endDate: activeFilters.dateRange?.end,
      };

      // Remove null/undefined values
      Object.keys(params).forEach((key) => {
        if (
          params[key] === null ||
          params[key] === undefined ||
          params[key] === ""
        ) {
          delete params[key];
        }
      });

      const response = await applicationService.getAllApplications(params);

      if (response && response.success) {
        setApplications(response.data?.applications || []);
        // Set statistics if available
        if (response.data?.pagination) {
          setStatistics((prev) => ({
            ...prev,
            totalApplications: response.data.pagination.totalItems,
          }));
        }
      } else {
        setError(response?.message || "Failed to fetch applications");
      }
    } catch (err) {
      setError("Failed to fetch applications");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, activeFilters]);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await applicationService.getApplicationStats();

      if (response && response.success) {
        setStatistics(response.data || {});
      } else {
        // Fallback to client-side calculation if API fails
        const statusCounts = applications.reduce((acc, app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        }, {});

        const stats = {
          totalApplications: applications.length,
          submittedApplications: statusCounts.submitted || 0,
          approvedApplications: statusCounts.approved || 0,
          pendingApplications: statusCounts.under_review || 0,
        };
        setStatistics(stats);
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
      // Fallback to client-side calculation
      const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      }, {});

      const stats = {
        totalApplications: applications.length,
        submittedApplications: statusCounts.submitted || 0,
        approvedApplications: statusCounts.approved || 0,
        pendingApplications: statusCounts.under_review || 0,
      };
      setStatistics(stats);
    }
  }, [applications]);

  // Effect hooks
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  // Filter applications locally (in addition to server-side filtering)
  const filteredAndSortedApplications = [...applications].sort((a, b) => {
    let fieldA = a[sortBy];
    let fieldB = b[sortBy];

    if (typeof fieldA === "string") {
      return sortOrder === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else {
      return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }
  });

  // Handler functions
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!deleteConfirmation) return;

    setIsDeleting(true);
    try {
      const response = await applicationService.deleteApplication(
        deleteConfirmation.id
      );

      if (response && response.success) {
        setApplications(
          applications.filter((app) => app.id !== deleteConfirmation.id)
        );
        setDeleteConfirmation(null);
      } else {
        setError(response?.message || "Failed to delete application");
      }
    } catch (err) {
      setError("Failed to delete application");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchApplications();
  };

  // Filter handlers
  const handleFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleStatusFilterChange = (status) => {
    setActiveFilters((prev) => ({
      ...prev,
      status: prev.status === status ? null : status,
    }));
    setCurrentPage(1);
  };

  const handleInsuranceTypeFilterChange = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      insuranceType: prev.insuranceType === type ? null : type,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      status: null,
      insuranceType: null,
      coverType: null,
      dateRange: null,
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <TbArrowUp className="h-4 w-4" />
    ) : (
      <TbArrowDown className="h-4 w-4" />
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="bg-white px-8 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-[1.3rem] font-bold text-secondary-700">
                Insurance Applications
              </h1>
              <p className="text-gray-500 text-sm">
                Manage and process insurance applications
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
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-neutral-200 border border-gray-600/20 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px] shadow-sm"
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
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
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

                      {/* Status filter */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                          Application Status
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "submitted",
                            "under_review",
                            "approved",
                            "rejected",
                            "cancelled",
                          ].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusFilterChange(status)}
                              className={`px-3 py-1 text-xs rounded-full capitalize ${
                                activeFilters.status === status
                                  ? getStatusColor(status)
                                  : "bg-gray-200/70 border border-gray-300 text-gray-700"
                              }`}
                            >
                              {status.replace("_", " ")}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Insurance Type filter */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                          Insurance Type
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["personal-accident", "health", "motor", "life"].map(
                            (type) => (
                              <button
                                key={type}
                                onClick={() =>
                                  handleInsuranceTypeFilterChange(type)
                                }
                                className={`px-3 py-1 text-xs rounded-full ${
                                  activeFilters.insuranceType === type
                                    ? "bg-primary-200 border border-primary-300 text-primary-700 font-medium"
                                    : "bg-gray-200/70 border border-gray-300 text-gray-700"
                                }`}
                              >
                                {type.replace("-", " ").toUpperCase()}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center shadow-sm transition-all"
              >
                <TbShieldPlus className="h-4 w-4 mr-2" />
                New Application
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-blue-500 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Applications
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.totalApplications || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TbFileDescription className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-yellow-500 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.pendingApplications || 0}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TbClock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-green-500 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.approvedApplications || 0}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TbClipboardCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-primary-500 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Submitted Today
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.submittedApplications || 0}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 rounded-lg">
                  <TbCheckbox className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

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

          {/* Applications Table */}
          <div className="flex-1 bg-white rounded-[0.7rem] border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-secondary-200/40">
                  <tr>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("applicationNumber")}
                    >
                      <div className="flex items-center">
                        <span>Application #</span>
                        {getSortIcon("applicationNumber")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("firstName")}
                    >
                      <div className="flex items-center">
                        <span>Applicant</span>
                        {getSortIcon("firstName")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider"
                    >
                      Insurance Type
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider"
                    >
                      Plan Details
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider"
                    >
                      Premium
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider"
                    >
                      Policy Details
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        <span>Status</span>
                        {getSortIcon("status")}
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center">
                        <div className="flex justify-center">
                          <div className="h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAndSortedApplications.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-8 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <TbFileDescription className="h-12 w-12 text-gray-300 mb-3" />
                          <p className="text-lg font-medium text-gray-500 mb-1">
                            No applications found
                          </p>
                          <p className="text-sm text-gray-400">
                            {searchTerm ||
                            Object.values(activeFilters).some((v) => v !== null)
                              ? "Try a different search term or clear filters"
                              : "Applications will appear here when submitted"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedApplications.map((application) => (
                      <tr
                        key={application.id}
                        className="hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={(e) => {
                          // Only trigger if not clicking on action buttons
                          if (!e.target.closest("button")) {
                            setSelectedApplication(application);
                            setShowDetailModal(true);
                          }
                        }}
                      >
                        <td className="py-5 px-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary-600">
                            {application.applicationNumber}
                          </div>
                          <div className="text-[0.8rem] text-gray-500">
                            {formatDate(application.createdAt)}
                          </div>
                        </td>
                        <td className="py-5 px-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {`${application.firstName} ${application.lastName}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.emailAddress}
                            </div>
                          </div>
                        </td>
                        <td className=" flex flex-col py-5 px-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-primary-700 capitalize">
                            {application.insuranceType?.replace("-", " ")}
                          </span>
                          <span className="text-[0.8rem] font-medium text-gray-500 capitalize">
                            {application.coverType?.replace("-", " ")}
                          </span>
                        </td>
                        <td className="py-5 px-4 whitespace-nowrap">
                          <div className="flex flex-col ">
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {application.PlanName || "Placeholder name"}
                            </span>
                            <span className="text-[0.8rem] font-medium text-gray-500 capitalize">
                              {application.insuranceProvider}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-600 capitalize">
                            {application.premiumAmount}
                          </span>
                        </td>
                        <td className="py-5 px-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-secondary-700 capitalize">
                              {application.policyNumber || "12345678"}
                            </span>
                            <span className="text-[0.8rem] font-medium text-gray-500 capitalize">
                              {formatDate(application.policyStartDate)} to{" "}
                              {formatDate(application.policyEndDate) || "--"}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status?.replace("_", " ")}
                          </span>
                        </td>

                        <td
                          className="py-5 px-4 whitespace-nowrap text-sm text-gray-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowEditModal(true);
                              }}
                              className="flex items-center border border-blue-300 px-2 py-1 rounded-lg focus:outline-none hover:bg-blue-100 hover:border-blue-300 text-blue-500 hover:text-blue-600"
                              title="Edit Application"
                            >
                              <TbEdit className="h-4 w-4 mr-1" />
                              <span className="text-xs">Edit</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmation(application)}
                              className="flex items-center border border-red-300 px-2 py-1 rounded-lg focus:outline-none hover:bg-red-100 hover:border-red-300 text-red-500 hover:text-red-600"
                              title="Delete Application"
                            >
                              <TbTrash className="h-4 w-4 mr-1" />
                              <span className="text-xs">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">
                      {Math.min(
                        filteredAndSortedApplications.length,
                        itemsPerPage
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {statistics.totalApplications ||
                        filteredAndSortedApplications.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      aria-current="page"
                      className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {currentPage}
                    </button>
                    <button
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={
                        filteredAndSortedApplications.length < itemsPerPage
                      }
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div>
              {filteredAndSortedApplications.length} Applications Available
            </div>
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
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <AddApplicationModal
            onClose={() => setShowAddModal(false)}
            onSave={() => {
              fetchApplications();
            }}
          />
        )}

        {showEditModal && selectedApplication && (
          <EditApplicationModal
            application={selectedApplication}
            onClose={() => {
              setShowEditModal(false);
              setSelectedApplication(null);
            }}
            onSave={() => {
              fetchApplications();
            }}
          />
        )}

        {showDetailModal && selectedApplication && (
          <ApplicationDetailModal
            application={selectedApplication}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedApplication(null);
            }}
          />
        )}

        <DeleteConfirmationModal
          isOpen={!!deleteConfirmation}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={handleDelete}
          itemName={deleteConfirmation?.applicationNumber}
          message={`Are you sure you want to delete application "${deleteConfirmation?.applicationNumber}"? This action cannot be undone.`}
          isLoading={isDeleting}
        />
      </AnimatePresence>
    </>
  );
};

export default InsuranceApplicationManagementPage;
