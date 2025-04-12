import React, { useState, useEffect } from "react";
import {
  TbRefresh,
  TbSearch,
  TbFilter,
  TbChevronDown,
  TbCheck,
  TbX,
  TbArrowUp,
  TbArrowDown,
  TbReport,
  TbDatabaseExport,
  TbMail,
  TbPhone,
  TbUserPlus,
  TbClipboardCheck,
  TbCalendarEvent,
  TbMessageCircle,
} from "react-icons/tb";

const ProcessedQueriesPage = () => {
  // State management
  const [queries, setQueries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState({
    field: "processedDate",
    direction: "desc",
  });
  const [stats, setStats] = useState({
    total: 0,
    converted: 0,
    declined: 0,
    pending: 0,
  });

  // Mock data
  useEffect(() => {
    const mockQueries = [
      {
        id: "QRY-2023-001",
        clientName: "John Mwangi",
        email: "john.mwangi@example.com",
        phone: "+254 712 345678",
        queryType: "Health Insurance",
        summary: "Senior health coverage inquiry",
        processedDate: "2024-01-15",
        status: "converted",
        outcome: "Enrolled in Premium Senior Gold Plan",
        processedBy: "Mary W.",
        followUpDate: "2024-02-15",
      },
      {
        id: "QRY-2023-002",
        clientName: "Sarah Njoroge",
        email: "sarah.njoroge@example.com",
        phone: "+254 734 567890",
        queryType: "Life Insurance",
        summary: "Senior life insurance options",
        processedDate: "2024-01-12",
        status: "declined",
        outcome: "Budget constraints - will follow up in 3 months",
        processedBy: "James O.",
        followUpDate: "2024-04-12",
      },
      {
        id: "QRY-2023-003",
        clientName: "Peter Odhiambo",
        email: "peter.odhiambo@example.com",
        phone: "+254 756 789012",
        queryType: "Health Insurance",
        summary: "Family coverage inquiry",
        processedDate: "2024-01-18",
        status: "pending",
        outcome: "Awaiting additional documentation",
        processedBy: "Sarah N.",
        followUpDate: "2024-01-25",
      },
      {
        id: "QRY-2023-004",
        clientName: "Mary Wanjiku",
        email: "mary.wanjiku@example.com",
        phone: "+254 778 901234",
        queryType: "Health Insurance",
        summary: "Premium plan upgrade request",
        processedDate: "2024-01-20",
        status: "converted",
        outcome: "Upgraded to Senior Elite Care",
        processedBy: "James O.",
        followUpDate: "2024-02-20",
      },
    ];

    setQueries(mockQueries);
    updateStats(mockQueries);
    setIsLoading(false);
  }, []);

  // Update statistics
  const updateStats = (queriesList) => {
    const stats = {
      total: queriesList.length,
      converted: queriesList.filter((q) => q.status === "converted").length,
      declined: queriesList.filter((q) => q.status === "declined").length,
      pending: queriesList.filter((q) => q.status === "pending").length,
    };
    setStats(stats);
  };

  // Handle sorting
  const handleSort = (field) => {
    setSorting({
      field,
      direction:
        sorting.field === field && sorting.direction === "asc" ? "desc" : "asc",
    });
  };

  // Get sorted queries
  const getSortedQueries = () => {
    return [...queries].sort((a, b) => {
      const aValue = a[sorting.field];
      const bValue = b[sorting.field];
      const direction = sorting.direction === "asc" ? 1 : -1;

      if (typeof aValue === "string") {
        return direction * aValue.localeCompare(bValue);
      }
      return direction * (aValue - bValue);
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "converted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, would fetch fresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Processed Queries
            </h1>
            <p className="text-gray-500 text-sm">
              View and manage processed insurance inquiries
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search queries..."
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
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex-1 overflow-hidden flex flex-col">
        {/* Query Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <TbMessageCircle className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Total Processed
                </div>
                <div className="text-2xl font-bold text-secondary-700">
                  {stats.total}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <TbUserPlus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Converted
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.converted}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <TbX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Declined
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.declined}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <TbClipboardCheck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Pending Action
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Queries Table */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("clientName")}
                  >
                    <div className="flex items-center">
                      <span>Client</span>
                      {sorting.field === "clientName" && (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("queryType")}
                  >
                    <div className="flex items-center">
                      <span>Query Type</span>
                      {sorting.field === "queryType" && (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("processedDate")}
                  >
                    <div className="flex items-center">
                      <span>Processed Date</span>
                      {sorting.field === "processedDate" && (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("processedBy")}
                  >
                    <div className="flex items-center">
                      <span>Processed By</span>
                      {sorting.field === "processedBy" && (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getSortedQueries().map((query) => (
                  <tr key={query.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                          {query.clientName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {query.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {query.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {query.queryType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {query.summary}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(query.processedDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Follow-up:{" "}
                        {new Date(query.followUpDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                          query.status
                        )}`}
                      >
                        {query.status.charAt(0).toUpperCase() +
                          query.status.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {query.outcome}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.processedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-blue-600">
                          <TbMail className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-green-600">
                          <TbPhone className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-yellow-600">
                          <TbCalendarEvent className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>Showing {queries.length} processed queries</div>
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
    </div>
  );
};

export default ProcessedQueriesPage;
