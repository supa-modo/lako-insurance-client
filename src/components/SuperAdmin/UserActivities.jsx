import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbRefresh,
  TbFilter,
  TbUser,
  TbClock,
  TbChevronLeft,
  TbChevronRight,
  TbEye,
  TbSearch,
  TbX,
  TbChevronDown,
  TbChevronUp,
  TbActivity,
  TbUsers,
  TbDatabase,
  TbReport,
  TbDatabaseExport,
  TbAlertCircle,
  TbList,
} from "react-icons/tb";
import { getUserActivities } from "../../api/superadminApi";
import { format } from "date-fns";

const UserActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalCount, setTotalCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    userId: "",
    timeframe: "24h",
    activityType: "",
  });

  const timeframeOptions = [
    { value: "1h", label: "Last 1 Hour" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];

  const activityTypes = [
    "LOGIN",
    "LOGOUT",
    "PAGE_VIEW",
    "API_CALL",
    "DATA_ACCESS",
    "SYSTEM_ACCESS",
  ];

  useEffect(() => {
    fetchActivities();
  }, [page, rowsPerPage]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      setError("");

      const params = {
        page: page + 1,
        limit: rowsPerPage,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        ),
      };

      const response = await getUserActivities(params);
      setActivities(response.activities || []);
      setTotalCount(response.pagination?.total || 0);
    } catch (err) {
      setError("Failed to fetch user activities");
      console.error("Error fetching user activities:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchActivities();
  };

  const applyFilters = () => {
    setPage(0);
    fetchActivities();
    setIsFilterDropdownOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      userId: "",
      timeframe: "24h",
      activityType: "",
    });
    setSearchTerm("");
    setPage(0);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm:ss");
  };

  const getActivityTypeColor = (type) => {
    const colors = {
      LOGIN: "bg-green-100 text-green-800 border-green-300",
      LOGOUT: "bg-gray-100 text-gray-800 border-gray-300",
      PAGE_VIEW: "bg-blue-100 text-blue-800 border-blue-300",
      API_CALL: "bg-purple-100 text-purple-800 border-purple-300",
      DATA_ACCESS: "bg-yellow-100 text-yellow-800 border-yellow-300",
      SYSTEM_ACCESS: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min((page + 1) * rowsPerPage, totalCount);

  // Calculate statistics
  const statistics = {
    totalActivities: totalCount,
    uniqueUsers: new Set(activities.map((a) => a.userId)).size,
    loginActivities: activities.filter((a) => a.activityType === "LOGIN")
      .length,
    systemAccess: activities.filter((a) => a.activityType === "SYSTEM_ACCESS")
      .length,
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              User Activities
            </h1>
            <p className="text-gray-500 text-sm">
              Track user behavior and system interactions
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all shadow-sm"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-neutral-200 border border-gray-600/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[300px] shadow-sm"
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

            <div className="relative">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`bg-white border ${
                  Object.values(filters).some((v) => v !== "" && v !== "24h")
                    ? "border-primary-300 text-primary-600"
                    : "border-gray-200 text-gray-700"
                } rounded-lg px-4 py-2 text-sm hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center shadow-sm transition-all`}
              >
                <TbFilter className="h-4 w-4 mr-2" />
                Filters
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
                        Filter Options
                      </h3>
                      {Object.values(filters).some(
                        (v) => v !== "" && v !== "24h"
                      ) && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-primary-600 hover:text-primary-800"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* User ID Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          User ID
                        </label>
                        <input
                          type="text"
                          value={filters.userId}
                          onChange={(e) =>
                            handleFilterChange("userId", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                          placeholder="Enter user ID"
                        />
                      </div>

                      {/* Timeframe Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeframe
                        </label>
                        <select
                          value={filters.timeframe}
                          onChange={(e) =>
                            handleFilterChange("timeframe", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          {timeframeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Activity Type Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Activity Type
                        </label>
                        <select
                          value={filters.activityType}
                          onChange={(e) =>
                            handleFilterChange("activityType", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="">All Types</option>
                          {activityTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={applyFilters}
                          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                          Apply
                        </button>
                        <button
                          onClick={clearFilters}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  Total Activities
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.totalActivities}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TbActivity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-green-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unique Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.uniqueUsers}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TbUsers className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-purple-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Login Activities
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.loginActivities}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TbUser className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-orange-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  System Access
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.systemAccess}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TbDatabase className="h-6 w-6 text-orange-600" />
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
                onClick={() => setError("")}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <TbX className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Activities Table */}
        <div className="flex-1 bg-white rounded-[0.7rem] border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-secondary-200/40">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Activity Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"
                        />
                        <span className="ml-3 text-gray-500">
                          Loading activities...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : activities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <TbList className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-500 mb-1">
                          No user activities found
                        </p>
                        <p className="text-sm text-gray-400">
                          Activities will appear here when users interact with
                          the system
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  activities.map((activity, index) => (
                    <motion.tr
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(activity.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                              <TbUser className="h-4 w-4 text-primary-600" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-mono text-gray-900">
                              {activity.userId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getActivityTypeColor(
                            activity.activityType
                          )}`}
                        >
                          {activity.activityType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.details || "No details available"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <TbClock className="h-4 w-4 text-gray-400 mr-1" />
                          {activity.duration ? `${activity.duration}ms` : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {activity.ipAddress}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Rows per page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <div className="text-sm text-gray-700">
                  {totalCount > 0 ? (
                    <>
                      Showing {startIndex} to {endIndex} of {totalCount} results
                    </>
                  ) : (
                    "No results"
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className={`p-2 rounded-lg border ${
                    page === 0
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  }`}
                >
                  <TbChevronLeft className="h-4 w-4" />
                </button>

                <span className="text-sm text-gray-700">
                  Page {page + 1} of {Math.max(1, totalPages)}
                </span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages - 1}
                  className={`p-2 rounded-lg border ${
                    page >= totalPages - 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  }`}
                >
                  <TbChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex-shrink-0">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>{activities.length} Activities Displayed</div>
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
  );
};

export default UserActivities;
