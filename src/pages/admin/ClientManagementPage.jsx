import { useState } from "react";
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
} from "react-icons/tb";

const ClientManagementPage = () => {
  // Mock data - would come from API in real app
  const clients = [
    {
      id: 1,
      name: "John Mwangi",
      age: 67,
      phone: "+254 712 345678",
      email: "john.mwangi@example.com",
      status: "active",
      policyType: "Premium Senior Gold",
      policyNumber: "PSG-2023-1234",
      startDate: "2023-01-15",
      renewalDate: "2024-01-15",
      premium: "KES 48,000",
      claims: 2,
      dependents: 1,
      lastContact: "2023-07-25",
    },
    {
      id: 2,
      name: "Sarah Njoroge",
      age: 72,
      phone: "+254 734 567890",
      email: "sarah.njoroge@example.com",
      status: "active",
      policyType: "Senior Comprehensive",
      policyNumber: "SC-2022-5678",
      startDate: "2022-06-10",
      renewalDate: "2023-06-10",
      premium: "KES 65,000",
      claims: 3,
      dependents: 2,
      lastContact: "2023-08-05",
    },
    {
      id: 3,
      name: "Peter Odhiambo",
      age: 70,
      phone: "+254 756 789012",
      email: "peter.odhiambo@example.com",
      status: "pending_renewal",
      policyType: "Senior Basic Plus",
      policyNumber: "SBP-2022-9012",
      startDate: "2022-08-20",
      renewalDate: "2023-08-20",
      premium: "KES 36,000",
      claims: 1,
      dependents: 0,
      lastContact: "2023-07-28",
    },
    {
      id: 4,
      name: "Mary Wanjiku",
      age: 68,
      phone: "+254 778 901234",
      email: "mary.wanjiku@example.com",
      status: "active",
      policyType: "Senior Elite Care",
      policyNumber: "SEC-2023-3456",
      startDate: "2023-03-05",
      renewalDate: "2024-03-05",
      premium: "KES 85,000",
      claims: 0,
      dependents: 1,
      lastContact: "2023-08-12",
    },
    {
      id: 5,
      name: "George Kimani",
      age: 65,
      phone: "+254 790 123456",
      email: "george.kimani@example.com",
      status: "inactive",
      policyType: "Senior Standard Care",
      policyNumber: "SSC-2022-7890",
      startDate: "2022-02-15",
      renewalDate: "2023-02-15",
      premium: "KES 42,000",
      claims: 4,
      dependents: 0,
      lastContact: "2023-06-30",
    },
    {
      id: 6,
      name: "Elizabeth Achieng",
      age: 73,
      phone: "+254 712 987654",
      email: "elizabeth.achieng@example.com",
      status: "active",
      policyType: "Premium Senior Gold",
      policyNumber: "PSG-2022-2345",
      startDate: "2022-11-10",
      renewalDate: "2023-11-10",
      premium: "KES 48,000",
      claims: 1,
      dependents: 0,
      lastContact: "2023-08-01",
    },
    {
      id: 7,
      name: "James Otieno",
      age: 69,
      phone: "+254 734 876543",
      email: "james.otieno@example.com",
      status: "pending_renewal",
      policyType: "Senior Comprehensive",
      policyNumber: "SC-2022-6789",
      startDate: "2022-08-25",
      renewalDate: "2023-08-25",
      premium: "KES 65,000",
      claims: 2,
      dependents: 1,
      lastContact: "2023-07-20",
    },
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState({ field: "name", direction: "asc" });
  const [selectedClients, setSelectedClients] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: null,
    policyType: null,
  });

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

  // Sort clients based on current sorting state
  const sortedClients = [...clients].sort((a, b) => {
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
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending_renewal":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="text-gray-800 font-lexend px-8 py-7">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Client Management
          </h1>
          <p className="text-gray-500">
            Manage your senior insurance clients and policies
          </p>
        </div>

        <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
          <button
            onClick={refreshClients}
            className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-[200px]"
              />
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="relative">
            <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
              <TbFilter className="h-4 w-4 mr-2" />
              Filter
              <TbChevronDown className="h-4 w-4 ml-2" />
            </button>
            {/* Filter dropdown would go here */}
          </div>

          <button className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
            <TbUserPlus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>
      </div>

      {/* Clients Summary */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 flex flex-wrap gap-4 md:gap-8">
        <div>
          <div className="text-sm text-gray-500">Total Clients</div>
          <div className="text-2xl font-bold">{clients.length}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Active Policies</div>
          <div className="text-2xl font-bold text-green-600">
            {clients.filter((c) => c.status === "active").length}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Pending Renewals</div>
          <div className="text-2xl font-bold text-yellow-600">
            {clients.filter((c) => c.status === "pending_renewal").length}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Total Premium Value</div>
          <div className="text-2xl font-bold text-primary-600">KES 389,000</div>
        </div>
        <div className="ml-auto flex items-center">
          <button className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
            <TbDownload className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-4 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      checked={selectedClients.length === clients.length}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => toggleClientSelection(client.id)}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
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
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-primary-600">
                        <TbEye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600">
                        <TbEdit className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-indigo-600">
                        <TbPhone className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-purple-600">
                        <TbMail className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600">
                        <TbCalendarEvent className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{clients.length}</span> of{" "}
                <span className="font-medium">{clients.length}</span> results
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
  );
};

export default ClientManagementPage;
