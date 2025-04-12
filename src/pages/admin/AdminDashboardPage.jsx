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
} from "recharts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCurrentUser } from "../../services/adminService";
import { PiUsersDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import { RiUserShared2Line } from "react-icons/ri";

const AdminDashboardPage = () => {
  const [period, setPeriod] = useState("weekly");
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [lastLogin, setLastLogin] = useState(new Date());

  useEffect(() => {
    // Get the current user info
    const user = getCurrentUser();
    setCurrentUser(user);

    // Set a mock last login date
    setLastLogin(new Date());
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Card metrics data
  const metrics = [
    {
      title: "Active Clients",
      value: "1,284",
      change: "+12.5%",
      isPositive: true,
      icon: PiUsersDuotone,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      path: "/admin/clients",
    },
    {
      title: "Leads in Pipeline",
      value: "427",
      change: "+8.2%",
      isPositive: true,
      icon: RiUserShared2Line,
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      path: "/admin/leads",
    },

    {
      title: "Upcoming Renewals",
      value: "68",
      change: "+18.4%",
      isPositive: false,
      icon: TbCalendarTime,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      path: "/admin/renewals",
    },
    {
      title: "New Queries",
      value: "37",
      change: "+22.8%",
      isPositive: true,
      icon: TbClipboard,
      color: "bg-secondary-500",
      textColor: "text-secondary-500",
      path: "/admin/queries/new",
    },
  ];

  // Lead Pipeline data
  const leadPipeline = [
    { stage: "New Lead", count: 145, color: "bg-blue-500" },
    { stage: "Proposal", count: 64, color: "bg-purple-500" },
    { stage: "Negotiation", count: 31, color: "bg-pink-500" },
    { stage: "Converted", count: 19, color: "bg-secondary-500" },
  ];

  // Recent client activity
  const recentActivity = [
    {
      id: 1,
      client: "John Mwangi",
      activity: "Submitted a new insurance query",
      time: "5 minutes ago",
      type: "query",
    },
    {
      id: 2,
      client: "Mary Kamau",
      activity: "Policy KS-243 is due for renewal",
      time: "1 hour ago",
      type: "renewal",
    },
    {
      id: 3,
      client: "David Otieno",
      activity: "Upgraded to Premium Health 65+ plan",
      time: "2 hours ago",
      type: "conversion",
    },
    {
      id: 4,
      client: "Sarah Njoroge",
      activity: "Added family member to policy",
      time: "Yesterday",
      type: "update",
    },
    {
      id: 5,
      client: "Michael Waweru",
      activity: "Scheduled a follow-up call",
      time: "Yesterday",
      type: "task",
    },
  ];

  // Insurance plans by subscriber count
  const topPlans = [
    {
      name: "Senior Gold Plus",
      provider: "Jubilee Insurance",
      subscribers: 142,
      revenue: "KES 4,260,000",
      change: "+12.7%",
    },
    {
      name: "Premium Health 65+",
      provider: "ICEA Lion",
      subscribers: 128,
      revenue: "KES 3,840,000",
      change: "+8.2%",
    },
    {
      name: "Elder Care Complete",
      provider: "Britam",
      subscribers: 117,
      revenue: "KES 2,925,000",
      change: "+5.3%",
    },
    {
      name: "Senior Comprehensive",
      provider: "AAR Insurance",
      subscribers: 98,
      revenue: "KES 2,450,000",
      change: "-2.1%",
    },
    {
      name: "Silver Years Protection",
      provider: "CIC Insurance",
      subscribers: 86,
      revenue: "KES 2,150,000",
      change: "+14.6%",
    },
  ];

  // Tasks data
  const tasks = [
    {
      id: 1,
      title: "Follow up with John Mwangi",
      due: "Today",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Prepare renewal proposal for Mary Kamau",
      due: "Tomorrow",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Call David Otieno about policy updates",
      due: "Aug 12",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 4,
      title: "File claim documents for Sarah Njoroge",
      due: "Aug 13",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 5,
      title: "Prepare monthly sales report",
      due: "Aug 15",
      priority: "Low",
      status: "Not Started",
    },
  ];

  // Performance data for charts
  const conversionData = [
    { name: "Jan", rate: 28 },
    { name: "Feb", rate: 29 },
    { name: "Mar", rate: 33 },
    { name: "Apr", rate: 36 },
    { name: "May", rate: 32 },
    { name: "Jun", rate: 32 },
    { name: "Jul", rate: 34 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 3.2 },
    { name: "Feb", revenue: 3.5 },
    { name: "Mar", revenue: 3.8 },
    { name: "Apr", revenue: 4.1 },
    { name: "May", revenue: 4.6 },
    { name: "Jun", revenue: 4.8 },
    { name: "Jul", revenue: 5.2 },
  ];

  const planDistributionData = [
    { name: "Gold Plus", value: 142 },
    { name: "Premium 65+", value: 128 },
    { name: "Elder Care", value: 117 },
    { name: "Comprehensive", value: 98 },
    { name: "Silver Years", value: 86 },
  ];

  // Handler for period changes
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    // In a real app, this would fetch new data for the selected period
  };

  // Function to get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-secondary-500";
      case "manager":
        return "bg-blue-500";
      case "viewer":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="text-gray-800 font-lexend h-[calc(100vh-64px)] overflow-y-auto pb-6 bg-neutral-50">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-secondary-50 to-primary-50 px-8 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-[1.5rem] font-bold text-secondary-700">
              Welcome back, {currentUser?.name || "Admin"}
            </h1>
            <p className="text-neutral-500 text-sm">
              Last login: {lastLogin.toLocaleString()}
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
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-100  focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        <div></div>
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
          {metrics.map((metric, index) => (
            <Link
              to={metric.path}
              key={index}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center  hover:shadow-md"
            >
              <div
                className={`h-12 w-12 rounded-lg ${metric.color} flex items-center justify-center flex-shrink-0 mr-4 transition-transform group-hover:scale-105`}
              >
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  {metric.title}
                </h3>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-gray-800 mr-2">
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
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-6 p-8">
        {/* Quick Actions */}
        <div className="bg-neutral-50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Customize
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              {
                name: "Add Client",
                icon: TbUserPlus,
                path: "/admin/clients/new",
                color: "bg-blue-100 text-blue-600",
              },
              {
                name: "New Policy",
                icon: TbShieldCheck,
                path: "/admin/policies/new",
                color: "bg-green-100 text-green-600",
              },
              {
                name: "Record Call",
                icon: TbPhonePlus,
                path: "/admin/calls/new",
                color: "bg-secondary-100 text-secondary-600",
              },
              {
                name: "Send Email",
                icon: TbMail,
                path: "/admin/mail/compose",
                color: "bg-purple-100 text-purple-600",
              },
              {
                name: "Schedule",
                icon: TbCalendar,
                path: "/admin/calendar",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                name: "Reports",
                icon: TbFileText,
                path: "/admin/reports",
                color: "bg-yellow-100 text-yellow-600",
              },
            ].map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
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
          {/* Lead Pipeline - col-span-1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Lead Pipeline</h2>
              <Link
                to="/admin/leads"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {leadPipeline.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{stage.stage}</span>
                    <span className="text-sm font-medium">{stage.count}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${stage.color}`}
                      style={{ width: `${(stage.count / 145) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Total Leads</div>
                  <div className="text-xl font-bold text-gray-900">427</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    Avg. Conversion Time
                  </div>
                  <div className="text-xl font-bold text-gray-900">18 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section - col-span-2 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Conversion Rate Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Conversion Rate Trends
                </h2>
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                    +5.3% vs last period
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Top Insurance Plans */}
          <div className="bg-white w-[33%] rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Top Insurance Plans
              </h2>
              <Link
                to="/admin/plans"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="h-64 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {topPlans.slice(0, 3).map((plan, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {plan.name}
                    </div>
                    <div className="text-xs text-gray-500">{plan.provider}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {plan.subscribers} clients
                    </div>
                    <div
                      className={`text-xs ${
                        plan.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {plan.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white w-[67.5%] rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">My Tasks</h2>
              <Link
                to="/admin/tasks"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900 truncate flex-1">
                      {task.title}
                    </span>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center ml-6">
                    <TbClock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      Due: {task.due}
                    </span>
                    <span
                      className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                        task.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-2 border-t border-gray-100">
              <button className="w-full flex items-center justify-center py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg text-sm font-medium transition-colors">
                <TbPlus className="h-4 w-4 mr-1" />
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
