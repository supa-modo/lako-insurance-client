import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbUsers,
  TbShield,
  TbActivity,
  TbFileText,
  TbSettings,
  TbAlertTriangle,
  TbTrendingUp,
  TbEye,
  TbRefresh,
  TbChevronRight,
  TbUserCheck,
  TbClock,
  TbDatabase,
  TbChartBar,
  TbBell,
  TbShieldCheck,
  TbBuilding,
  TbUserPlus,
  TbReport,
  TbDatabaseExport,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { analyticsAPI } from "../../api/superadminApi";

const SuperAdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, statsRes] = await Promise.all([
        analyticsAPI.getSecurityAnalytics(30),
        analyticsAPI.getSystemStatistics(),
      ]);

      setAnalytics(analyticsRes.data.analytics);
      setStatistics(statsRes.data.statistics);
      setSystemHealth({
        status: "healthy",
        uptime: "99.9%",
        responseTime: "245ms",
        activeConnections: 1247,
      });
      setRecentActivities([
        {
          id: 1,
          type: "user_login",
          user: "John Admin",
          action: "Logged in to system",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          severity: "info",
        },
        {
          id: 2,
          type: "security_alert",
          user: "System",
          action: "Failed login attempt detected",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          severity: "warning",
        },
        {
          id: 3,
          type: "user_created",
          user: "Sarah Manager",
          action: "Created new user account",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          severity: "success",
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDashboardData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const StatCard = ({ title, value, icon: Icon, color, change, link, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            {change && (
              <p className={`text-sm mt-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {change >= 0 ? "+" : ""}{change}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
      {link && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <Link
            to={link}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View Details
            <TbChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, link, badge }) => (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
          </div>
          {badge && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {badge}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );

  const ActivityItem = ({ activity }) => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case "success": return "text-green-600 bg-green-100";
        case "warning": return "text-yellow-600 bg-yellow-100";
        case "error": return "text-red-600 bg-red-100";
        default: return "text-blue-600 bg-blue-100";
      }
    };

    const getTimeAgo = (timestamp) => {
      const now = new Date();
      const diff = Math.floor((now - timestamp) / 1000);
      
      if (diff < 60) return `${diff}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
          <TbActivity className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
          <p className="text-xs text-gray-500">{activity.user}</p>
        </div>
        <div className="text-xs text-gray-400">
          {getTimeAgo(activity.timestamp)}
        </div>
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
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
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
              SuperAdmin Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Comprehensive system management and analytics
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
            >
              <TbRefresh className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>

            <Link
              to="/admin/users"
              className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <TbUserPlus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <TbAlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-800">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Security Analytics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Security Analytics (Last 30 Days)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Failed Login Attempts"
              value={analytics?.failedLogins || 0}
              icon={TbAlertTriangle}
              color="bg-red-500"
              link="/admin/security"
              change={-12}
            />
            <StatCard
              title="Password Resets"
              value={analytics?.passwordResets || 0}
              icon={TbShield}
              color="bg-orange-500"
              link="/admin/audit-logs"
              change={8}
            />
            <StatCard
              title="Account Lockouts"
              value={analytics?.accountLockouts || 0}
              icon={TbShieldCheck}
              color="bg-red-600"
              link="/admin/security"
              change={-25}
            />
            <StatCard
              title="Login Success Rate"
              value={`${analytics?.successRate?.toFixed(1) || 0}%`}
              icon={TbTrendingUp}
              color="bg-green-500"
              change={5}
            />
          </div>
        </div>

        {/* System Statistics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={statistics?.totalUsers || 0}
              icon={TbUsers}
              color="bg-blue-500"
              link="/admin/users"
              subtitle="All active and inactive users"
            />
            <StatCard
              title="2FA Enabled"
              value={statistics?.twoFACount || 0}
              icon={TbShield}
              color="bg-purple-500"
              link="/admin/users"
              subtitle={`${statistics?.twoFAPercentage?.toFixed(1) || 0}% adoption rate`}
            />
            <StatCard
              title="Active Sessions"
              value={systemHealth?.activeConnections || 0}
              icon={TbActivity}
              color="bg-indigo-500"
              subtitle="Current active connections"
            />
            <StatCard
              title="System Uptime"
              value={systemHealth?.uptime || "99.9%"}
              icon={TbDatabase}
              color="bg-green-500"
              subtitle={`Response: ${systemHealth?.responseTime || "245ms"}`}
            />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              title="User Management"
              description="Create, edit, and manage user accounts and roles"
              icon={TbUsers}
              color="bg-blue-500"
              link="/admin/users"
              badge={statistics?.totalUsers > 100 ? "100+" : statistics?.totalUsers}
            />
            <QuickActionCard
              title="Security Monitoring"
              description="View security analytics and failed login attempts"
              icon={TbShield}
              color="bg-red-500"
              link="/admin/security"
              badge={analytics?.failedLogins > 0 ? analytics.failedLogins : null}
            />
            <QuickActionCard
              title="Audit Logs"
              description="Review admin actions and system changes"
              icon={TbFileText}
              color="bg-purple-500"
              link="/admin/audit-logs"
            />
            <QuickActionCard
              title="User Activities"
              description="Monitor user login patterns and activities"
              icon={TbActivity}
              color="bg-green-500"
              link="/admin/user-activities"
            />
            <QuickActionCard
              title="System Metrics"
              description="View detailed system performance metrics"
              icon={TbChartBar}
              color="bg-indigo-500"
              link="/admin/system-metrics"
            />
            <QuickActionCard
              title="System Settings"
              description="Configure system-wide settings and preferences"
              icon={TbSettings}
              color="bg-gray-500"
              link="/admin/settings"
            />
          </div>
        </div>

        {/* Dashboard Grid - Recent Activities and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <Link 
                  to="/admin/audit-logs"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* System Health Overview */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TbShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-gray-900 font-medium">Overall System Status</span>
                  </div>
                  <span className="text-green-600 font-semibold">Healthy</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TbUsers className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-900 font-medium">User Account Health</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {statistics?.twoFAPercentage > 50 ? "Excellent" : "Needs Improvement"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TbActivity className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-900 font-medium">Login Activity</span>
                  </div>
                  <span className="text-purple-600 font-semibold">
                    {analytics?.successRate > 80 ? "Normal" : "Monitor Required"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TbDatabase className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-900 font-medium">Database Performance</span>
                  </div>
                  <span className="text-gray-600 font-semibold">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-3 flex-shrink-0">
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

export default SuperAdminDashboard;
