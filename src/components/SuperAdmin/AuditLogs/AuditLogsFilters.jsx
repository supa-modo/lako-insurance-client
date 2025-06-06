import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const AuditLogsFilters = ({
  open,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) => {
  const actionTypes = [
    "LOGIN",
    "LOGOUT",
    "USER_CREATE",
    "USER_UPDATE",
    "USER_DELETE",
    "USER_PASSWORD_RESET",
    "VIEW_USERS",
    "VIEW_ANALYTICS",
    "VIEW_AUDIT_LOGS",
    "VIEW_USER_ACTIVITIES",
    "VIEW_STATISTICS",
    "SYSTEM_ACCESS",
  ];

  const resourceTypes = ["USER", "SYSTEM", "AUTH", "ADMIN"];

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filter Options
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          {/* User ID Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              type="text"
              value={filters.userId}
              onChange={(e) => onFilterChange("userId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter user ID"
            />
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <select
              value={filters.action}
              onChange={(e) => onFilterChange("action", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Actions</option>
              {actionTypes.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* Resource Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource
            </label>
            <select
              value={filters.resource}
              onChange={(e) => onFilterChange("resource", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Resources</option>
              {resourceTypes.map((resource) => (
                <option key={resource} value={resource}>
                  {resource}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <input
              type="date"
              value={
                filters.dateFrom
                  ? filters.dateFrom.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                onFilterChange(
                  "dateFrom",
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <input
              type="date"
              value={
                filters.dateTo ? filters.dateTo.toISOString().split("T")[0] : ""
              }
              onChange={(e) =>
                onFilterChange(
                  "dateTo",
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onApplyFilters}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Apply
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClearFilters}
              className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FiX className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuditLogsFilters;
