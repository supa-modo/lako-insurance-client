import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuditLogsHeader from "./AuditLogs/AuditLogsHeader";
import AuditLogsFilters from "./AuditLogs/AuditLogsFilters";
import AuditLogsTable from "./AuditLogs/AuditLogsTable";
import AuditLogDetailsDialog from "./AuditLogs/AuditLogDetailsDialog";
import { getAuditLogs } from "../../api/superadminApi";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    userId: "",
    action: "",
    resource: "",
    dateFrom: null,
    dateTo: null,
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: page + 1,
        limit: rowsPerPage,
        ...Object.fromEntries(
          Object.entries(filters).filter(
            ([_, value]) => value !== "" && value !== null
          )
        ),
      };

      if (filters.dateFrom) {
        params.dateFrom = filters.dateFrom.toISOString();
      }
      if (filters.dateTo) {
        params.dateTo = filters.dateTo.toISOString();
      }

      const response = await getAuditLogs(params);
      setLogs(response.logs || []);
      setTotalCount(response.pagination?.total || 0);
    } catch (err) {
      setError("Failed to fetch audit logs");
      console.error("Error fetching audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, rowsPerPage]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setPage(0);
    fetchLogs();
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      userId: "",
      action: "",
      resource: "",
      dateFrom: null,
      dateTo: null,
    });
    setPage(0);
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDetailsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <AuditLogsHeader
        onRefresh={fetchLogs}
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen(!filtersOpen)}
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
        >
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      <AuditLogsFilters
        open={filtersOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      <AuditLogsTable
        logs={logs}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onViewDetails={handleViewDetails}
      />

      <AuditLogDetailsDialog
        open={detailsOpen}
        log={selectedLog}
        onClose={() => setDetailsOpen(false)}
      />
    </motion.div>
  );
};

export default AuditLogs;
