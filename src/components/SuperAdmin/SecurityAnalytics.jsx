import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbAlertTriangle,
  TbShield,
  TbTrendingUp,
  TbTrendingDown,
  TbActivity,
  TbUsers,
  TbCalendar,
  TbRefresh,
  TbChevronDown,
  TbEye,
  TbShieldCheck,
  TbDatabase,
  TbX,
  TbExclamationCircle,
  TbChartBar,
  TbReport,
  TbDatabaseExport,
  TbAlertCircle,
  TbClock,
  TbLock,
  TbKey,
} from "react-icons/tb";
import { analyticsAPI, auditAPI } from "../../api/superadminApi";

const SecurityAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState(30);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [analyticsRes, activitiesRes] = await Promise.all([
        analyticsAPI.getSecurityAnalytics(timeRange),
        auditAPI.getUserActivities({
          limit: 20,
          activityType: "FAILED_LOGIN",
        }),
      ]);

      setAnalytics(analyticsRes.data.analytics);
      setUserActivities(activitiesRes.data.activities);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError("Failed to load security analytics");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAnalytics();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const MetricCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {trend >= 0 ? (
                <TbTrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TbTrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm ${
                  trend >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend >= 0 ? "+" : ""}
                {trend}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-red-100 rounded-full">
          <TbAlertTriangle className="h-4 w-4 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            Failed login attempt
          </p>
          <p className="text-xs text-gray-500">
            {activity.user
              ? `${activity.user.firstName} ${activity.user.lastName}`
              : "Unknown User"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">
          {new Date(activity.timestamp).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(activity.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );

  const SecurityLevel = () => {
    if (!analytics) return null;

    const successRate = analytics.successRate || 0;
    const failedLogins = analytics.failedLogins || 0;

    let level = "High";
    let color = "text-green-600";
    let bgColor = "bg-green-100";

    if (successRate < 70 || failedLogins > 50) {
      level = "Low";
      color = "text-red-600";
      bgColor = "bg-red-100";
    } else if (successRate < 85 || failedLogins > 20) {
      level = "Medium";
      color = "text-yellow-600";
      bgColor = "bg-yellow-100";
    }

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} ${bgColor} border border-current border-opacity-20`}
      >
        <TbShield className="h-4 w-4 mr-1" />
        {level} Security
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
        <div className="flex items-center justify-center flex-1">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Security Analytics
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor system security and track failed login attempts
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
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="pl-4 pr-8 py-2 bg-neutral-200 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 appearance-none shadow-sm"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <TbChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <SecurityLevel />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-4 space-y-6">
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

        {/* Security Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-red-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Failed Login Attempts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.failedLogins || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Security incidents</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <TbAlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-orange-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Password Resets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.passwordResets || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Password changes</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TbKey className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-yellow-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Account Lockouts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.accountLockouts || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Temporary locks</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TbLock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-green-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.successRate?.toFixed(1) || 0}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Login success</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TbTrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Failed Login Attempts */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-secondary-700">
                  Recent Failed Logins
                </h3>
                <span className="text-sm text-gray-500">
                  {userActivities.length} incidents
                </span>
              </div>
            </div>
            <div className="p-6">
              {userActivities.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {userActivities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TbShieldCheck className="h-12 w-12 text-green-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    No failed login attempts
                  </p>
                  <p className="text-sm text-gray-400">
                    Your system is secure!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Security Health Overview */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-secondary-700">
                Security Health Overview
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <TbShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-gray-900 font-medium">
                      Overall Security Status
                    </span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {analytics?.successRate > 80 ? "Excellent" : "Good"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <TbUsers className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-900 font-medium">
                      Authentication Health
                    </span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {analytics?.failedLogins < 10 ? "Excellent" : "Monitor"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <TbActivity className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-900 font-medium">
                      Activity Monitoring
                    </span>
                  </div>
                  <span className="text-purple-600 font-semibold">Active</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <TbDatabase className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-900 font-medium">
                      System Integrity
                    </span>
                  </div>
                  <span className="text-gray-600 font-semibold">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-secondary-700">
              Security Recommendations
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <TbExclamationCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Enable 2FA</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Encourage users to enable two-factor authentication for
                      enhanced security.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <TbChartBar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">
                      Monitor Trends
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Keep tracking login patterns to identify potential
                      security threats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <TbShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">
                      Regular Audits
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Conduct regular security audits to maintain system
                      integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex-shrink-0">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>Last updated: {new Date().toLocaleString()}</div>
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

export default SecurityAnalytics;
