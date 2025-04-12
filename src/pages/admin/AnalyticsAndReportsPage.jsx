import React, { useState, useEffect } from "react";
import {
  TbChartBar,
  TbChartPie,
  TbChartLine,
  TbChartArea,
  TbChartDots,
  TbDownload,
  TbFilter,
  TbRefresh,
  TbCalendar,
  TbChevronDown,
  TbChevronUp,
  TbArrowUpRight,
  TbArrowDownRight,
  TbUsers,
  TbFileInvoice,
  TbWallet,
  TbBuildingBank,
  TbChartInfographic,
  TbReport,
  TbDatabaseExport,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const AnalyticsAndReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  // Mock data for demonstration
  const mockData = {
    overview: {
      totalClients: 1250,
      totalPolicies: 3420,
      totalRevenue: 12500000,
      totalClaims: 156,
      clientGrowth: 12.5,
      revenueGrowth: 8.3,
      policyGrowth: 15.2,
      claimsGrowth: -5.7,
    },
    revenue: {
      monthly: [4500000, 5200000, 4800000, 6100000, 5800000, 6500000],
      quarterly: [14500000, 18400000, 16500000],
      yearly: [52000000, 61000000, 75000000],
    },
    policies: {
      byType: [
        { type: "Health", count: 1250, percentage: 36.5 },
        { type: "Life", count: 980, percentage: 28.7 },
        { type: "Auto", count: 750, percentage: 21.9 },
        { type: "Property", count: 440, percentage: 12.9 },
      ],
      byStatus: [
        { status: "Active", count: 2800, percentage: 81.9 },
        { status: "Pending", count: 320, percentage: 9.4 },
        { status: "Expired", count: 300, percentage: 8.7 },
      ],
    },
    claims: {
      byType: [
        { type: "Health", count: 65, percentage: 41.7 },
        { type: "Auto", count: 45, percentage: 28.8 },
        { type: "Property", count: 30, percentage: 19.2 },
        { type: "Life", count: 16, percentage: 10.3 },
      ],
      byStatus: [
        { status: "Approved", count: 120, percentage: 76.9 },
        { status: "Pending", count: 25, percentage: 16.0 },
        { status: "Rejected", count: 11, percentage: 7.1 },
      ],
    },
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  // Get growth indicator
  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TbArrowUpRight className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{formatPercentage(value)}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600">
          <TbArrowDownRight className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{formatPercentage(value)}</span>
        </div>
      );
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Analytics & Reports
            </h1>
            <p className="text-gray-500 text-sm">
              Comprehensive insights and detailed reports
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <div className="flex bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  timeRange === "week"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  timeRange === "month"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange("quarter")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  timeRange === "quarter"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                Quarter
              </button>
              <button
                onClick={() => setTimeRange("year")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  timeRange === "year"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                Year
              </button>
            </div>

            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            <button className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
              <TbDownload className="mr-2 h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("revenue")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "revenue"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setActiveTab("policies")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "policies"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Policies
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "claims"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Claims
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Clients Card */}
            <motion.div
              layout
              className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-primary-500"
              onClick={() =>
                setExpandedCard(expandedCard === "clients" ? null : "clients")
              }
            >
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-lg mr-4">
                  <TbUsers className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-600">
                    Total Clients
                  </div>
                  <div className="text-2xl font-bold text-secondary-700">
                    {mockData.overview.totalClients.toLocaleString()}
                  </div>
                  {getGrowthIndicator(mockData.overview.clientGrowth)}
                </div>
              </div>
              <AnimatePresence>
                {expandedCard === "clients" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center">
                      <p className="text-neutral-500">Client growth chart</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Total Policies Card */}
            <motion.div
              layout
              className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-green-500"
              onClick={() =>
                setExpandedCard(expandedCard === "policies" ? null : "policies")
              }
            >
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <TbFileInvoice className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-600">
                    Total Policies
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {mockData.overview.totalPolicies.toLocaleString()}
                  </div>
                  {getGrowthIndicator(mockData.overview.policyGrowth)}
                </div>
              </div>
              <AnimatePresence>
                {expandedCard === "policies" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center">
                      <p className="text-neutral-500">
                        Policy distribution chart
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Total Revenue Card */}
            <motion.div
              layout
              className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-blue-500"
              onClick={() =>
                setExpandedCard(expandedCard === "revenue" ? null : "revenue")
              }
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <TbWallet className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-600">
                    Total Revenue
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(mockData.overview.totalRevenue)}
                  </div>
                  {getGrowthIndicator(mockData.overview.revenueGrowth)}
                </div>
              </div>
              <AnimatePresence>
                {expandedCard === "revenue" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center">
                      <p className="text-neutral-500">Revenue trend chart</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Total Claims Card */}
            <motion.div
              layout
              className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-yellow-500"
              onClick={() =>
                setExpandedCard(expandedCard === "claims" ? null : "claims")
              }
            >
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                  <TbBuildingBank className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-600">
                    Total Claims
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockData.overview.totalClaims.toLocaleString()}
                  </div>
                  {getGrowthIndicator(mockData.overview.claimsGrowth)}
                </div>
              </div>
              <AnimatePresence>
                {expandedCard === "claims" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center">
                      <p className="text-neutral-500">Claims analysis chart</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Revenue Overview
              </h3>
              <div className="h-80 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Revenue trend chart</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Revenue by Product
              </h3>
              <div className="h-80 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Revenue by product chart</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "policies" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Policy Distribution
              </h3>
              <div className="h-80 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Policy distribution chart</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Policy Status
              </h3>
              <div className="h-80 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Policy status chart</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "claims" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Claims Analysis
              </h3>
              <div className="h-80 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Claims analysis chart</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Claims Status
              </h3>
              <div className="h-80 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Claims status chart</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>
            {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}ly report
          </div>
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

export default AnalyticsAndReportsPage;
