import React from "react";
import { motion } from "framer-motion";
import { FiFilter, FiRefreshCw, FiDownload } from "react-icons/fi";
import { exportAuditLogs } from "../../../api/superadminApi";

const AuditLogsHeader = ({ onRefresh, filtersOpen, onToggleFilters }) => {
  const handleExport = async () => {
    try {
      await exportAuditLogs({});
    } catch (err) {
      console.error("Error exporting audit logs:", err);
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
              <p className="text-gray-600 mt-2">
                Monitor system activities and user actions
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FiRefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggleFilters}
                className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                  filtersOpen
                    ? "border-blue-600 text-white bg-blue-600 hover:bg-blue-700"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                <FiFilter className="h-4 w-4 mr-2" />
                Filters
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FiDownload className="h-4 w-4 mr-2" />
                Export
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsHeader;
