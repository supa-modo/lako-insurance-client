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
} from "react-icons/tb";
import { motion } from "framer-motion";
import { getCurrentUser } from "../../services/adminService";

const statCards = [
  {
    title: "Active Clients",
    value: "1,284",
    change: "+12.5%",
    isPositive: true,
    icon: TbUsers,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Reports Generated",
    value: "854",
    change: "+8.2%",
    isPositive: true,
    icon: TbFileText,
    color: "from-green-500 to-green-600",
    textColor: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Conversion Rate",
    value: "65.2%",
    change: "-2.4%",
    isPositive: false,
    icon: TbActivity,
    color: "from-yellow-500 to-yellow-600",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Plan Comparisons",
    value: "2,572",
    change: "+18.7%",
    isPositive: true,
    icon: TbClipboard,
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const recentQueries = [
  {
    id: "1",
    name: "John Mwangi",
    email: "john.mwangi@example.com",
    phone: "+254 712 345678",
    age: 65,
    budget: 50000,
    status: "New",
    statusColor: "bg-secondary-500",
    date: "2023-10-15T09:24:00",
  },
  {
    id: "2",
    name: "Mary Kamau",
    email: "mary.kamau@example.com",
    phone: "+254 723 456789",
    age: 68,
    budget: 70000,
    status: "Contacted",
    statusColor: "bg-blue-500",
    date: "2023-10-15T08:12:00",
  },
  {
    id: "3",
    name: "David Ochieng",
    email: "david.ochieng@example.com",
    phone: "+254 734 567890",
    age: 72,
    budget: 100000,
    status: "Converted",
    statusColor: "bg-green-500",
    date: "2023-10-14T16:45:00",
  },
  {
    id: "4",
    name: "Sarah Njoroge",
    email: "sarah.njoroge@example.com",
    phone: "+254 745 678901",
    age: 63,
    budget: 40000,
    status: "Pending",
    statusColor: "bg-yellow-500",
    date: "2023-10-14T14:30:00",
  },
  {
    id: "5",
    name: "Michael Waweru",
    email: "michael.waweru@example.com",
    phone: "+254 756 789012",
    age: 70,
    budget: 65000,
    status: "New",
    statusColor: "bg-secondary-500",
    date: "2023-10-14T10:15:00",
  },
];

const insuranceCompanies = [
  {
    name: "Jubilee Insurance",
    clients: 365,
    growth: 12.3,
    color: "bg-blue-500",
  },
  { name: "ICEA Lion", clients: 287, growth: 8.7, color: "bg-green-500" },
  { name: "Britam", clients: 256, growth: -2.1, color: "bg-yellow-500" },
  { name: "CIC Insurance", clients: 198, growth: 15.4, color: "bg-purple-500" },
  {
    name: "AAR Insurance",
    clients: 175,
    growth: 6.8,
    color: "bg-secondary-500",
  },
];

const topPlans = [
  {
    name: "Senior Gold Plus",
    provider: "Jubilee Insurance",
    subscribers: 142,
    change: 12.7,
  },
  {
    name: "Premium Health 65+",
    provider: "ICEA Lion",
    subscribers: 128,
    change: 8.2,
  },
  {
    name: "Elder Care Complete",
    provider: "Britam",
    subscribers: 117,
    change: 5.3,
  },
  {
    name: "Senior Comprehensive",
    provider: "AAR Insurance",
    subscribers: 98,
    change: -2.1,
  },
  {
    name: "Silver Years Protection",
    provider: "CIC Insurance",
    subscribers: 86,
    change: 14.6,
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
};

const AdminDashboardPage = () => {
  const [period, setPeriod] = useState("weekly");
  const [activeTab, setActiveTab] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);
  const [lastLogin, setLastLogin] = useState(new Date());

  useEffect(() => {
    // Get the current user info
    const user = getCurrentUser();
    setCurrentUser(user);

    // Set a mock last login date
    setLastLogin(new Date());
  }, []);

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
    <div className="text-white/90 h-full">
      {/* Dashboard Header with Welcome message */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
              Welcome{currentUser ? `, ${currentUser.name}` : ""}
            </h1>
            {currentUser && (
              <span
                className={`${getRoleBadgeColor(
                  currentUser.role
                )} text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1`}
              >
                <TbShieldCheck className="h-3 w-3" />
                {currentUser.role.charAt(0).toUpperCase() +
                  currentUser.role.slice(1)}
              </span>
            )}
          </div>
          <p className="text-white/60 text-sm sm:text-base flex items-center">
            <TbCalendarTime className="mr-2" />
            Last login: {lastLogin.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-3 py-2 text-sm sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2">
            <TbRefresh className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div className="relative">
            <button className="px-3 py-2 text-sm sm:px-4 sm:py-2.5 bg-secondary-500 hover:bg-secondary-600 rounded-lg transition-colors flex items-center gap-2">
              <TbPlus className="h-4 w-4" />
              <span>New Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div>
                <p className="text-sm text-white/70">{card.title}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {card.value}
                </h3>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`h-5 w-5 ${card.textColor}`} />
              </div>
            </div>
            <div className="flex items-center">
              {card.isPositive ? (
                <TbArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TbArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={card.isPositive ? "text-green-500" : "text-red-500"}
              >
                {card.change}
              </span>
              <span className="text-white/50 text-sm ml-2">
                vs. last period
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Content - Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Queries Table */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">
              Recent Insurance Queries
            </h2>

            {/* Filter Tabs */}
            <div className="flex bg-white/5 rounded-lg p-1">
              {["all", "new", "contacted", "converted"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    activeTab === tab
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/50 text-xs border-b border-white/10">
                  <th className="px-6 py-3 font-medium">CLIENT</th>
                  <th className="px-6 py-3 font-medium">AGE</th>
                  <th className="px-6 py-3 font-medium">BUDGET</th>
                  <th className="px-6 py-3 font-medium">STATUS</th>
                  <th className="px-6 py-3 font-medium">DATE</th>
                  <th className="px-6 py-3 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentQueries.map((query) => (
                  <motion.tr
                    key={query.id}
                    className="hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-lg font-medium text-white mr-3">
                          {query.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {query.name}
                          </div>
                          <div className="text-xs text-white/50">
                            {query.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/90">
                        {query.age} years
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/90">
                        {formatCurrency(query.budget)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${query.statusColor}`}
                      >
                        {query.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/70">
                        {formatDate(query.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                          <TbPhone className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                          <TbMail className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                          <TbDots className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
            <div className="text-sm text-white/60">Showing 5 of 67 entries</div>
            <button className="text-secondary-400 hover:text-secondary-300 flex items-center text-sm">
              View All Queries
              <TbArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column - Two Cards */}
        <div className="space-y-6">
          {/* Top Insurance Companies */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">
                Insurance Companies
              </h2>
              <div className="relative">
                <button className="px-3 py-1.5 text-xs bg-white/5 rounded-lg flex items-center">
                  <span>This Month</span>
                  <TbChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {insuranceCompanies.map((company, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-8 w-8 ${company.color} rounded-lg flex items-center justify-center text-white font-medium mr-3`}
                  >
                    {company.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-white text-sm">
                        {company.name}
                      </div>
                      <div className="text-white/70 text-xs">
                        {company.clients} clients
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className={`${company.color} h-1.5 rounded-full`}
                        style={{ width: `${(company.clients / 400) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Plans */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">
                Top Insurance Plans
              </h2>
              <TbStar className="h-5 w-5 text-yellow-500" />
            </div>

            <div className="space-y-4">
              {topPlans.map((plan, index) => (
                <div
                  key={index}
                  className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium text-white text-sm">
                      {plan.name}
                    </div>
                    <div
                      className={`text-xs ${
                        plan.change >= 0 ? "text-green-500" : "text-red-500"
                      } flex items-center`}
                    >
                      {plan.change >= 0 ? (
                        <TbArrowUpRight className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TbArrowDownRight className="h-3 w-3 mr-0.5" />
                      )}
                      {Math.abs(plan.change)}%
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">{plan.provider}</span>
                    <span className="text-white/80">
                      {plan.subscribers} subscribers
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-xl p-6 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-white/10 rounded-full"></div>
            <div className="absolute right-10 bottom-10 h-10 w-10 bg-white/10 rounded-full"></div>

            <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>

            <div className="space-y-3 relative z-10">
              <button className="w-full py-2.5 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center justify-center">
                <TbPlus className="mr-2 h-4 w-4" />
                Add New Insurance Plan
              </button>
              <button className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center">
                <TbChartBar className="mr-2 h-4 w-4" />
                Generate Analytics Report
              </button>
              <button className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center">
                <TbBrandWhatsapp className="mr-2 h-4 w-4" />
                Send Bulk Messages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">System Status</h2>
          <span className="text-xs text-white/70">
            Last updated: 15 minutes ago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: "Database",
              status: "Operational",
              percent: 99.8,
              color: "bg-green-500",
            },
            {
              name: "Comparison Engine",
              status: "Operational",
              percent: 100,
              color: "bg-green-500",
            },
            {
              name: "PDF Generation",
              status: "Operational",
              percent: 98.5,
              color: "bg-green-500",
            },
            {
              name: "Email Notifications",
              status: "Degraded",
              percent: 72.4,
              color: "bg-yellow-500",
            },
          ].map((service, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium text-white">
                  {service.name}
                </div>
                <div
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    service.percent > 90
                      ? "bg-green-500/20 text-green-400"
                      : service.percent > 80
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {service.status}
                </div>
              </div>
              <div className="mb-2 w-full bg-white/10 rounded-full h-1.5 mt-2">
                <div
                  className={`${service.color} h-1.5 rounded-full`}
                  style={{ width: `${service.percent}%` }}
                ></div>
              </div>
              <div className="text-xs text-white/50">
                {service.percent}% uptime
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
