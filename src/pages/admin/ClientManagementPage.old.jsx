import { useState, useEffect, useCallback } from "react";
import {
  PiClockUserDuotone,
  PiUserCheckDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { RiUserAddLine, RiUserFollowLine } from "react-icons/ri";
import {
  TbFilter,
  TbSearch,
  TbPlus,
  TbChevronDown,
  TbDownload,
  TbArrowUp,
  TbArrowDown,
  TbEye,
  TbEdit,
  TbPhone,
  TbMail,
  TbUserPlus,
  TbCalendarEvent,
  TbRefresh,
  TbChevronRight,
  TbUsers,
  TbUserCheck,
  TbAlertTriangle,
  TbClock,
  TbReport,
  TbDatabaseExport,
  TbChevronUp,
  TbList,
  TbX,
} from "react-icons/tb";
import ClientModal from "../../components/clients/ClientModal";
import EventModal from "../../components/calendar/EventModal";
import { safeGetClients, safeGetClientStats } from "../../services/clientService";

const ClientManagementPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State management
  const [sorting, setSorting] = useState({ field: "name", direction: "asc" });
  const [selectedClients, setSelectedClients] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: null,
    policyType: null,
  });

 const [selectedEventClient, setSelectedEventClient] = useState(null);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  
  
  // Sorting state
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  
  // Client statistics
  const [stats, setStats] = useState({
    totalClients: 0,
    statusDistribution: {
      active: 0,
      inactive: 0,
      pendingRenewal: 0,
    },
    upcomingRenewals: 0,
    policyTypeDistribution: [],
  });
  
  // UI state
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  // Fetch clients with current filters and pagination
    const fetchClients = useCallback(async () => {
      setLoading(true);
      try {
        // Prepare filter parameters
        const filterParams = {
          search: searchQuery,
          status: activeFilters.status || "",
          policyType: activeFilters.policyType || "",
          sortBy: sortBy,
          sortOrder: sortOrder,
          page: pagination.page,
          limit: pagination.limit,
        };
        
        const response = await safeGetClients(filterParams);
        
        if (response.success) {
          setClients(response.data);
          setPagination({
            ...pagination,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          });
        } else {
          setError(response.message || "Failed to fetch clients");
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError("An error occurred while fetching clients");
      } finally {
        setLoading(false);
      }
    }, [searchQuery, activeFilters, sortBy, sortOrder, pagination.page, pagination.limit]);
    
    // Fetch client statistics
    const fetchStats = useCallback(async () => {
      try {
        const response = await safeGetClientStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching client stats:", error);
      }
    }, []);
    
    // Initial data fetch
    useEffect(() => {
      fetchClients();
      fetchStats();
    }, [fetchClients, fetchStats]);

  // Array of available policy types for filtering
  const policyTypes = [...new Set(clients.map((client) => client.policyType))];

  // Handle sorting
  const handleSort = (field) => {
    if (sorting.field === field) {
      setSorting({
        ...sorting,
        direction: sorting.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSorting({ field, direction: "asc" });
    }
  };

  // Sort clients based on current sorting state and apply filters
  const filteredAndSortedClients = [...clients]
    // Apply search filter
    .filter((client) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.phone.toLowerCase().includes(query) ||
        client.policyNumber.toLowerCase().includes(query) ||
        client.policyType.toLowerCase().includes(query)
      );
    })
    // Apply status filter
    .filter((client) => {
      if (!activeFilters.status) return true;
      return client.status === activeFilters.status;
    })
    // Apply policy type filter
    .filter((client) => {
      if (!activeFilters.policyType) return true;
      return client.policyType === activeFilters.policyType;
    })
    // Apply sorting
    .sort((a, b) => {
      const fieldA = a[sorting.field];
      const fieldB = b[sorting.field];

      if (typeof fieldA === "string") {
        return sorting.direction === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else {
        return sorting.direction === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }
    });

  // Handle client selection
  const toggleClientSelection = (clientId) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter((id) => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  // Handle select all clients
  const toggleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map((client) => client.id));
    }
  };

  // Refresh clients data
  const refreshClients = () => {
    setIsRefreshing(true);
    // In a real app, would fetch from API
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Calculate days until renewal
  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 border border-green-300 text-green-800";
      case "inactive":
        return "bg-red-100 border border-red-300 text-red-800";
      case "pending_renewal":
        return "bg-yellow-100 border border-yellow-300 text-yellow-800";
      default:
        return "bg-gray-100 border border-gray-300 text-gray-800";
    }
  };

  // Client modal handlers
  const handleOpenClientModal = (client = null, editMode = false) => {
    setSelectedClient(client);
    setIsEditMode(editMode);
    setIsClientModalOpen(true);
  };

  const handleCloseClientModal = () => {
    setIsClientModalOpen(false);
    setSelectedClient(null);
    setIsEditMode(false);
  };

  const handleSaveClient = (updatedClient) => {
    // Handle editing existing client vs adding new one
    if (updatedClient.id) {
      // In a real app, would send API request to update client
      console.log("Updated client:", updatedClient);

      // If client wants to enter edit mode
      if (updatedClient.isEditing) {
        setIsEditMode(true);
        return;
      }
    } else {
      // In a real app, would send API request to create client
      console.log("New client:", updatedClient);
    }

    // Close modal after save
    handleCloseClientModal();
  };

  const handleDeleteClient = (clientId) => {
    // In a real app, would send API request to delete client
    console.log("Deleted client ID:", clientId);
    handleCloseClientModal();
  };

  // Event modal handlers
  const handleOpenEventModal = (client) => {
    setSelectedEventClient(client);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEventClient(null);
  };

  const handleSaveEvent = (eventData) => {
    // In a real app, would send API request to save event
    console.log(
      "New event:",
      eventData,
      "for client:",
      selectedEventClient?.name
    );
    handleCloseEventModal();
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
  };

  const handlePolicyFilterChange = (policyType) => {
    setActiveFilters((prev) => ({
      ...prev,
      policyType: prev.policyType === policyType ? null : policyType,
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      status: null,
      policyType: null,
    });
    setSearchQuery("");
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Client Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your senior insurance clients and policies
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={refreshClients}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" bg-neutral-200 text-neutral-800 font-medium pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px]"
                />
                <TbSearch size={19} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
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
                } rounded-lg px-4 py-2 text-sm hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 flex items-center`}
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
                      <h3 className="font-medium text-primary-700">Select Filters</h3>
                      {Object.values(activeFilters).some((v) => v !== null) && (
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-primary-600 hover:text-primary-800"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Status filter */}
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Status
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["active", "inactive", "pending_renewal"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusFilterChange(status)}
                              className={`px-4 py-1 text-xs rounded-full ${
                                activeFilters.status === status
                                  ? getStatusBadgeColor(status) + " font-medium"
                                  : "bg-gray-200/70 border border-gray-300 text-gray-700"
                              }`}
                            >
                              {status === "active"
                                ? "Active"
                                : status === "inactive"
                                ? "Inactive"
                                : "Pending Renewal"}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Policy Type filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Policy Type
                      </h4>
                      <div className="flex flex-col gap-2">
                        {policyTypes.map((policy) => (
                          <button
                            key={policy}
                            onClick={() => handlePolicyFilterChange(policy)}
                            className={`px-3 py-1.5 text-xs rounded-md text-left ${
                              activeFilters.policyType === policy
                                ? "bg-primary-200 border border-primary-300 text-primary-700 font-medium"
                                : "bg-gray-200/70 border border-gray-300 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {policy}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleOpenClientModal(null, true)}
              className="bg-primary-600 font-medium text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <RiUserAddLine size={18} className=" mr-2" />
              Add New Client
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex-1 overflow-hidden flex flex-col overflow-y-auto">
        {/* Client Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <PiUsersThreeDuotone className="h-7 w-7 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Total Clients
                </div>
                <div className="text-2xl font-bold text-secondary-700">
                  {clients.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 bg-green-200 rounded-lg mr-4">
                <RiUserFollowLine className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Active Policies
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {clients.filter((c) => c.status === "active").length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 bg-amber-200 rounded-lg mr-4">
                <PiClockUserDuotone className="h-7 w-7 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Pending Renewals
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {clients.filter((c) => c.status === "pending_renewal").length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-secondary-500">
            <div className="flex items-center">
              <div className="p-3 bg-secondary-200 rounded-lg mr-4">
                <TbAlertTriangle className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Inactive Clients
                </div>
                <div className="text-2xl font-bold text-secondary-600">
                  {clients.filter((c) => c.status === "inactive").length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="flex-1 bg-white rounded-[0.7rem] border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-secondary-200/40">
                <tr>
                  <th scope="col" className="py-4 px-4 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border border-neutral-600 text-primary-600 focus:ring-primary-500 h-4 w-4"
                        checked={selectedClients.length === clients.length}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      <span>Client</span>
                      {sorting.field === "name" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("age")}
                  >
                    <div className="flex items-center">
                      <span>Age</span>
                      {sorting.field === "age" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sorting.field === "status" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("policyType")}
                  >
                    <div className="flex items-center">
                      <span>Policy</span>
                      {sorting.field === "policyType" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("renewalDate")}
                  >
                    <div className="flex items-center">
                      <span>Renewal Date</span>
                      {sorting.field === "renewalDate" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("premium")}
                  >
                    <div className="flex items-center">
                      <span>Premium</span>
                      {sorting.field === "premium" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
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
                {filteredAndSortedClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-200 transition-colors cursor-pointer"
                    onClick={(e) => {
                      // Only trigger if not clicking on checkbox or action buttons
                      if (
                        !e.target.closest('input[type="checkbox"]') &&
                        !e.target.closest("button")
                      ) {
                        handleOpenClientModal(client, false);
                      }
                    }}
                  >
                    <td
                      className="py-4 px-4 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border border-neutral-500 text-primary-600 focus:ring-primary-500 h-4 w-4"
                          checked={selectedClients.includes(client.id)}
                          onChange={() => toggleClientSelection(client.id)}
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                          {client.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                      {client.age}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                          client.status
                        )}`}
                      >
                        {client.status === "active"
                          ? "Active"
                          : client.status === "inactive"
                          ? "Inactive"
                          : "Pending Renewal"}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {client.policyType}
                      </div>
                      <div className="text-xs text-gray-500">
                        {client.policyNumber}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(client.renewalDate)}
                      </div>
                      <div
                        className={`text-xs ${
                          getDaysUntilRenewal(client.renewalDate) <= 30
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {getDaysUntilRenewal(client.renewalDate)} days left
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                      {client.premium}
                      <div className="text-xs text-gray-500">
                        {client.claims} claims
                      </div>
                    </td>
                    <td
                      className="py-4 px-4 whitespace-nowrap text-sm text-gray-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-400 hover:text-blue-600"
                          onClick={() => handleOpenClientModal(client, true)}
                          title="Edit client"
                        >
                          <TbEdit className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-indigo-600"
                          title="Call client"
                        >
                          <TbPhone className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-purple-600"
                          title="Email client"
                        >
                          <TbMail className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEventModal(client);
                          }}
                          title="Schedule appointment"
                        >
                          <TbCalendarEvent className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredAndSortedClients.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <TbList className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-500 mb-1">
                          No clients found
                        </p>
                        <p className="text-sm text-gray-400">
                          {searchQuery ||
                          Object.values(activeFilters).some((v) => v !== null)
                            ? "Try a different search term or clear filters"
                            : "Add your first client to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
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
                    {filteredAndSortedClients.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAndSortedClients.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
          <div>Showing {filteredAndSortedClients.length} clients</div>
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

      {/* Client Modal */}
      {isClientModalOpen && (
        <ClientModal
          client={selectedClient}
          isEditing={isEditMode}
          onClose={handleCloseClientModal}
          onSave={handleSaveClient}
          onDelete={handleDeleteClient}
        />
      )}

      {/* Event Modal */}
      {isEventModalOpen && (
        <EventModal
          onClose={handleCloseEventModal}
          onSave={handleSaveEvent}
          slot={new Date()}
        />
      )}

      {/* Click outside handler for filter dropdown */}
      {isFilterDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ClientManagementPage;