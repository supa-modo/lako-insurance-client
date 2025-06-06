import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiHardDrive,
  FiActivity,
  FiDatabase,
  FiRefreshCw,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiServer,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";
import { getSystemStatistics } from "../../api/superadminApi";

const SystemMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchMetrics();

    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchMetrics, 30000); // Refresh every 30 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh]);

  const fetchMetrics = async () => {
    try {
      setError("");
      const response = await getSystemStatistics();
      setMetrics(response.metrics);
    } catch (err) {
      setError("Failed to fetch system metrics");
      console.error("Error fetching system metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({
    title,
    value,
    unit,
    icon: Icon,
    color,
    trend,
    description,
  }) => {
    const getTrendIcon = () => {
      if (trend > 0) return <FiTrendingUp className="h-4 w-4 text-green-500" />;
      if (trend < 0) return <FiTrendingDown className="h-4 w-4 text-red-500" />;
      return <FiMinus className="h-4 w-4 text-gray-400" />;
    };

    const getTrendColor = () => {
      if (trend > 0) return "text-green-600";
      if (trend < 0) return "text-red-600";
      return "text-gray-500";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {value}
                    {unit && (
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        {unit}
                      </span>
                    )}
                  </p>
                  {trend !== undefined && (
                    <div className="flex items-center space-x-1">
                      {getTrendIcon()}
                      <span
                        className={`text-sm font-medium ${getTrendColor()}`}
                      >
                        {Math.abs(trend)}%
                      </span>
                    </div>
                  )}
                </div>
                {description && (
                  <p className="text-xs text-gray-400 mt-1">{description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const ProgressBar = ({ label, value, max, color, unit = "%" }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">
          {value}
          {unit} / {max}
          {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${color}`}
        />
      </div>
    </div>
  );

  const AlertCard = ({ type, message, severity }) => {
    const getAlertColor = (severity) => {
      switch (severity) {
        case "critical":
          return "bg-red-50 border-red-200 text-red-800";
        case "warning":
          return "bg-yellow-50 border-yellow-200 text-yellow-800";
        case "info":
          return "bg-blue-50 border-blue-200 text-blue-800";
        default:
          return "bg-gray-50 border-gray-200 text-gray-800";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`p-4 rounded-lg border ${getAlertColor(severity)}`}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <FiActivity className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">{type}</h3>
            <p className="text-sm mt-1">{message}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  System Metrics
                </h1>
                <p className="text-gray-600 mt-2">
                  Real-time system performance and health monitoring
                </p>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto-refresh"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="auto-refresh"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Auto-refresh (30s)
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchMetrics}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
                >
                  <FiRefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {metrics && (
          <>
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="CPU Usage"
                value={metrics.cpu?.usage?.toFixed(1) || 0}
                unit="%"
                icon={FiCpu}
                color="bg-blue-500"
                trend={metrics.cpu?.trend}
                description="Current processor utilization"
              />

              <MetricCard
                title="Memory Usage"
                value={
                  (
                    (metrics.memory?.used / metrics.memory?.total) *
                    100
                  )?.toFixed(1) || 0
                }
                unit="%"
                icon={FiHardDrive}
                color="bg-green-500"
                trend={metrics.memory?.trend}
                description={`${
                  (metrics.memory?.used / 1024 / 1024 / 1024)?.toFixed(1) || 0
                }GB used`}
              />

              <MetricCard
                title="Disk Usage"
                value={
                  ((metrics.disk?.used / metrics.disk?.total) * 100)?.toFixed(
                    1
                  ) || 0
                }
                unit="%"
                icon={FiDatabase}
                color="bg-yellow-500"
                trend={metrics.disk?.trend}
                description={`${
                  (metrics.disk?.free / 1024 / 1024 / 1024)?.toFixed(1) || 0
                }GB free`}
              />

              <MetricCard
                title="Active Users"
                value={metrics.users?.active || 0}
                icon={FiUsers}
                color="bg-purple-500"
                trend={metrics.users?.trend}
                description="Currently online users"
              />
            </div>

            {/* Detailed System Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* System Resources */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FiServer className="h-5 w-5 mr-2" />
                  System Resources
                </h3>

                <div className="space-y-6">
                  <ProgressBar
                    label="CPU Load"
                    value={metrics.cpu?.usage || 0}
                    max={100}
                    color="bg-blue-500"
                  />

                  <ProgressBar
                    label="Memory"
                    value={
                      (metrics.memory?.used / 1024 / 1024 / 1024)?.toFixed(1) ||
                      0
                    }
                    max={
                      (metrics.memory?.total / 1024 / 1024 / 1024)?.toFixed(
                        1
                      ) || 0
                    }
                    color="bg-green-500"
                    unit="GB"
                  />

                  <ProgressBar
                    label="Disk Space"
                    value={
                      (metrics.disk?.used / 1024 / 1024 / 1024)?.toFixed(1) || 0
                    }
                    max={
                      (metrics.disk?.total / 1024 / 1024 / 1024)?.toFixed(1) ||
                      0
                    }
                    color="bg-yellow-500"
                    unit="GB"
                  />
                </div>
              </div>

              {/* Network Statistics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FiGlobe className="h-5 w-5 mr-2" />
                  Network & Performance
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Network In
                    </span>
                    <span className="text-sm text-gray-900">
                      {(metrics.network?.bytesIn / 1024 / 1024)?.toFixed(2) ||
                        0}{" "}
                      MB/s
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Network Out
                    </span>
                    <span className="text-sm text-gray-900">
                      {(metrics.network?.bytesOut / 1024 / 1024)?.toFixed(2) ||
                        0}{" "}
                      MB/s
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Response Time
                    </span>
                    <span className="text-sm text-gray-900">
                      {metrics.performance?.avgResponseTime || 0}ms
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Requests/min
                    </span>
                    <span className="text-sm text-gray-900">
                      {metrics.performance?.requestsPerMinute || 0}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Error Rate
                    </span>
                    <span className="text-sm text-gray-900">
                      {metrics.performance?.errorRate?.toFixed(2) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            {metrics.alerts && metrics.alerts.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FiActivity className="h-5 w-5 mr-2" />
                  System Alerts
                </h3>

                <div className="space-y-4">
                  {metrics.alerts.map((alert, index) => (
                    <AlertCard
                      key={index}
                      type={alert.type}
                      message={alert.message}
                      severity={alert.severity}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SystemMetrics;
