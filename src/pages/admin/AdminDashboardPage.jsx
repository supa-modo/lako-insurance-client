import { useState, useEffect } from "react";
import {
  TbUsers,
  TbFileText,
  TbClipboard,
  TbActivity,
  TbArrowUpRight,
  TbArrowDownRight,
  TbChartBar,
  TbArrowRight,
  TbStar,
  TbBrandWhatsapp,
  TbPhone,
  TbMail,
  TbRefresh,
  TbChevronDown,
  TbDots,
  TbPlus,
  TbCalendarTime,
  TbShieldCheck,
  TbLayoutCards,
  TbUserCircle,
  TbUserPlus,
  TbClock,
  TbList,
  TbPremiumRights,
  TbPhonePlus,
  TbArrowsExchange,
  TbHeartHandshake,
  TbCalendar,
  TbInfoCircle,
  TbSearch,
  TbClipboardPlus,
  TbShield,
  TbBuilding,
  TbMessage,
  TbAlertCircle,
  TbCheck,
  TbX,
  TbShieldHalfFilled,
  TbBuildingBank,
  TbListCheck,
  TbTrendingUp,
} from "react-icons/tb";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PiUsersDuotone } from "react-icons/pi";
import { RiUserAddLine, RiUserShared2Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { formatDate2 } from "../../utils/formatDate";
import applicationService from "../../services/applicationService";
import contactService from "../../services/contactService";
import { useToast } from "../../hooks/useToast";
import ToastContainer from "../../components/ui/ToastContainer";

const AdminDashboardPage = () => {
  const [period, setPeriod] = useState("weekly");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toasts, toast, removeToast } = useToast();

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    applications: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      submitted: 0,
    },
    messages: {
      total: 0,
      pending: 0,
      processed: 0,
    },
    recentApplications: [],
    recentMessages: [],
    monthlyStats: [],
  });

  // Extract user details safely
  const userData = user || {};
  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const username = firstName && lastName ? `${firstName} ${lastName}` : "Admin";
  const lastLogin = userData.lastLogin || "N/A";

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      // Fetch applications statistics
      const applicationsResponse =
        await applicationService.getApplicationStats();

      // Fetch recent applications
      const recentApplicationsResponse =
        await applicationService.getAllApplications({
          sortBy: "createdAt",
          sortOrder: "desc",
        });

      // Fetch messages statistics
      const messagesResponse = await contactService.getContactMessageStats();

      // Fetch recent messages
      const recentMessagesResponse = await contactService.getAllContactMessages(
        {
          limit: 5,
          sortBy: "createdAt",
          sortOrder: "desc",
        }
      );

      // Process applications data
      const applicationsData = applicationsResponse?.data || {};
      const recentApplications =
        recentApplicationsResponse?.data?.applications || [];

      // Process messages data
      const messagesData = messagesResponse?.data || {};
      const recentMessages = recentMessagesResponse?.data || [];

      // Calculate monthly statistics for the last 6 months
      const monthlyStats = generateMonthlyStats(recentApplications);

      // Process status counts from backend response
      const statusCounts = applicationsData.statusCounts || [];
      const statusMap = {};
      statusCounts.forEach((item) => {
        statusMap[item.status] = parseInt(item.count);
      });

      setDashboardData({
        applications: {
          total: applicationsData.totalApplications || 0,
          pending: statusMap.under_review || 0,
          approved: statusMap.approved || 0,
          rejected: statusMap.rejected || 0,
          submitted: statusMap.submitted || 0,
        },
        messages: {
          total: messagesData.overview?.total || 0,
          pending: messagesData.overview?.pending || 0,
          processed: messagesData.overview?.processed || 0,
        },
        recentApplications,
        recentMessages,
        monthlyStats,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Generate monthly statistics
  const generateMonthlyStats = (applications) => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString("en-US", { month: "short" });

      const monthApplications = applications.filter((app) => {
        const appDate = new Date(app.createdAt);
        return (
          appDate.getMonth() === date.getMonth() &&
          appDate.getFullYear() === date.getFullYear()
        );
      });

      months.push({
        name: monthName,
        applications: monthApplications.length,
        approved: monthApplications.filter((app) => app.status === "approved")
          .length,
        pending: monthApplications.filter(
          (app) => app.status === "under_review" || app.status === "submitted"
        ).length,
        rejected: monthApplications.filter((app) => app.status === "rejected")
          .length,
      });
    }

    return months;
  };

  // Refresh data
  const refreshData = () => {
    fetchDashboardData();
  };

  // Effect hooks
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Card metrics data
  const metrics = [
    {
      title: "Total Applications",
      value: dashboardData.applications.total.toString(),
      change: "+12.5%",
      isPositive: true,
      icon: TbFileText,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      path: "/admin/applications",
    },
    {
      title: "Pending Review",
      value: dashboardData.applications.pending.toString(),
      change: "+8.2%",
      isPositive: false,
      icon: TbClock,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      path: "/admin/applications",
    },
    {
      title: "Approved Applications",
      value: dashboardData.applications.approved.toString(),
      change: "+18.4%",
      isPositive: true,
      icon: TbCheck,
      color: "bg-green-500",
      textColor: "text-green-500",
      path: "/admin/applications",
    },
    {
      title: "Pending Messages",
      value: dashboardData.messages.pending.toString(),
      change: "+22.8%",
      isPositive: true,
      icon: TbMessage,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      path: "/admin/messages",
    },
  ];

  // Application status distribution for pie chart
  const applicationStatusData = [
    {
      name: "Approved",
      value: dashboardData.applications.approved,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: dashboardData.applications.pending,
      color: "#F59E0B",
    },
    {
      name: "Rejected",
      value: dashboardData.applications.rejected,
      color: "#EF4444",
    },
    {
      name: "Submitted",
      value: dashboardData.applications.submitted,
      color: "#3B82F6",
    },
  ];

  // Handler for period changes
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    fetchDashboardData();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-800 font-lexend h-[calc(100vh-64px)] overflow-y-auto pb-6 bg-neutral-100">
      {/* Dashboard Header */}
      <div className="bg-white from-neutral-700 to-neutral-600 px-8 py-3 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.5rem] font-bold text-secondary-700">
              Welcome back, {username || "Admin"}
            </h1>
            <p className="text-gray-500 font-medium font-lexend pl-1.5 text-[0.83rem]">
              Last login: {formatDate2(lastLogin, true)}
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <div className="relative">
              <select
                value={period}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg py-2 px-4 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="daily">Today</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
                <option value="quarterly">This Quarter</option>
                <option value="yearly">This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <TbChevronDown />
              </div>
            </div>
            <button
              onClick={refreshData}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-100 focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
          {metrics.map((metric, index) => (
            <Link
              to={metric.path}
              key={index}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center hover:shadow-md transition-all"
            >
              <div
                className={`h-12 w-12 rounded-lg ${metric.color} flex items-center justify-center flex-shrink-0 mr-4`}
              >
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  {metric.title}
                </h3>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-neutral-800 mr-2">
                    {metric.value}
                  </p>
                  <span
                    className={`text-xs font-semibold ${
                      metric.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <TbArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div> */}
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-6 p-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 pb-[1.2rem]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary-600">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              {
                name: "New Application",
                icon: TbFileText,
                path: "/admin/applications",
                color: "bg-blue-100 text-blue-600",
              },
              {
                name: "View Messages",
                icon: TbMessage,
                path: "/admin/messages",
                color: "bg-purple-100 text-purple-600",
              },
              {
                name: "Insurance Plans",
                icon: TbShieldHalfFilled,
                path: "/admin/plans",
                color: "bg-green-100 text-green-600",
              },
              {
                name: "Insurance Companies",
                icon: TbBuildingBank,
                path: "/admin/companies",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                name: "Calendar",
                icon: TbCalendar,
                path: "/admin/calendar",
                color: "bg-yellow-100 text-yellow-600",
              },
              {
                name: "Tasks",
                icon: TbListCheck,
                path: "/admin/tasks",
                color: "bg-red-100 text-red-600",
              },
            ].map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex flex-col items-center justify-center p-4 shadow-sm rounded-xl border border-gray-200 hover:bg-slate-50 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <div className={`p-3 rounded-full ${action.color} mb-2`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Application Status Distribution - col-span-1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:col-span-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-primary-600">
                Application Status
              </h2>
              <Link
                to="/admin/applications"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium underline underline-offset-4"
              >
                View All
              </Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => (
                      <text
                        x={entry.x}
                        y={entry.y}
                        fill={entry.color}
                        textAnchor={entry.x > entry.cx ? "start" : "end"}
                        dominantBaseline="central"
                        fontSize="12.5px"
                      >
                        {`${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {applicationStatusData.map((status, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{status.name}</span>
                  </div>
                  <span className="text-sm text-secondary-600 font-semibold">
                    {status.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Applications Chart - col-span-2 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-primary-600">
                  Monthly Applications
                </h2>
                <div className="flex items-center">
                  <div className="bg-green-100 flex items-center gap-1 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                    <TbTrendingUp className="h-4 w-4" /> +15.3% vs last month
                  </div>
                </div>
              </div>
              <div className="h-[22rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ fontSize: "12.5px" }} />
                    <Legend />
                    <Bar
                      dataKey="applications"
                      fill="#3B82F6"
                      name="Applications"
                    />
                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                    <Bar dataKey="approved" fill="#10B981" name="Approved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-primary-600">
                Recent Applications
              </h2>
              <Link
                to="/admin/applications"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium underline underline-offset-4"
              >
                View All
              </Link>
            </div>
            <div className="space-y-2">
              {dashboardData.recentApplications.length > 0 ? (
                dashboardData.recentApplications
                  .slice(0, 5)
                  .map((application) => (
                    <div
                      key={application.id}
                      className="px-3 py-3.5 border border-gray-100 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <TbFileText className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {application.applicationNumber}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {application.firstName} {application.lastName} •{" "}
                            {application.insuranceType}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex px-4 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status?.replace("_", " ")}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate2(application.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TbFileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No recent applications</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-primary-600">
                Recent Messages
              </h2>
              <Link
                to="/admin/messages"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium underline underline-offset-4"
              >
                View All
              </Link>
            </div>
            <div className="space-y-2">
              {dashboardData.recentMessages.length > 0 ? (
                dashboardData.recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="px-3 py-3.5 border border-gray-100 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <TbMessage className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {message.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {message.subject || message.message?.substring(0, 50)}
                          ...
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex px-4 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                            message.priority
                          )}`}
                        >
                          {message.priority}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate2(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TbMessage className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No recent messages</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default AdminDashboardPage;
