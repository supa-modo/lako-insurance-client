import { useState } from "react";
import {
  TbPlus,
  TbPencil,
  TbTrash,
  TbEye,
  TbSearch,
  TbFilter,
  TbChevronDown,
  TbRefresh,
  TbDownload,
  TbArrowUp,
  TbArrowDown,
  TbEdit,
  TbCheck,
  TbX,
  TbInfoCircle,
  TbReport,
  TbDatabaseExport,
  TbShieldCheck,
  TbUsers,
  TbCurrencyDollar,
  TbFileDescription,
} from "react-icons/tb";

const InsurancePlanPage = () => {
  // Mock insurance plans data
  const initialPlans = [
    {
      id: 1,
      name: "Premium Senior Gold",
      category: "Comprehensive",
      ageRange: "65-75",
      monthlyCost: "KES 4,000",
      annualCost: "KES 48,000",
      subscribers: 42,
      status: "active",
      features: [
        "24/7 emergency medical assistance",
        "Unlimited hospital stays",
        "Full prescription coverage",
        "Specialist consultations",
        "Dental and vision coverage",
        "Preventive care",
        "Ambulance services",
        "Home healthcare",
      ],
      createdAt: "2022-06-15",
      updatedAt: "2023-07-20",
    },
    {
      id: 2,
      name: "Senior Comprehensive",
      category: "Comprehensive",
      ageRange: "65-80",
      monthlyCost: "KES 5,417",
      annualCost: "KES 65,000",
      subscribers: 38,
      status: "active",
      features: [
        "Unlimited hospital stays",
        "Full prescription coverage",
        "Specialist consultations",
        "Dental and vision coverage",
        "Preventive care",
        "Ambulance services",
        "Home healthcare",
        "Mental health coverage",
        "Rehabilitation services",
      ],
      createdAt: "2022-07-10",
      updatedAt: "2023-06-25",
    },
    {
      id: 3,
      name: "Senior Basic Plus",
      category: "Basic",
      ageRange: "60-85",
      monthlyCost: "KES 3,000",
      annualCost: "KES 36,000",
      subscribers: 65,
      status: "active",
      features: [
        "Hospital stays (up to 15 days/year)",
        "Basic prescription coverage",
        "Primary care visits",
        "Limited specialist consultations",
        "Basic preventive care",
        "Ambulance services",
      ],
      createdAt: "2022-05-20",
      updatedAt: "2023-05-15",
    },
    {
      id: 4,
      name: "Senior Elite Care",
      category: "Premium",
      ageRange: "60-75",
      monthlyCost: "KES 7,083",
      annualCost: "KES 85,000",
      subscribers: 21,
      status: "active",
      features: [
        "VIP hospital rooms",
        "International coverage",
        "Unlimited specialist consultations",
        "Premium dental and vision",
        "Full prescription coverage",
        "Preventive care",
        "24/7 concierge medical service",
        "Home healthcare",
        "Medical evacuation",
        "Wellness programs",
        "Annual executive checkup",
      ],
      createdAt: "2023-01-05",
      updatedAt: "2023-07-30",
    },
    {
      id: 5,
      name: "Senior Standard Care",
      category: "Standard",
      ageRange: "60-90",
      monthlyCost: "KES 3,500",
      annualCost: "KES 42,000",
      subscribers: 54,
      status: "active",
      features: [
        "Hospital stays (up to 30 days/year)",
        "Standard prescription coverage",
        "Primary care visits",
        "Specialist consultations",
        "Basic preventive care",
        "Ambulance services",
        "Basic home healthcare",
      ],
      createdAt: "2022-03-15",
      updatedAt: "2023-04-10",
    },
    {
      id: 6,
      name: "Silver Years",
      category: "Standard",
      ageRange: "65-85",
      monthlyCost: "KES 3,750",
      annualCost: "KES 45,000",
      subscribers: 48,
      status: "active",
      features: [
        "Hospital stays (up to 30 days/year)",
        "Standard prescription coverage",
        "Primary care visits",
        "Specialist consultations",
        "Preventive care",
        "Ambulance services",
        "Basic home healthcare",
        "Basic dental coverage",
      ],
      createdAt: "2022-09-10",
      updatedAt: "2023-08-01",
    },
    {
      id: 7,
      name: "Sunset Comfort",
      category: "Basic",
      ageRange: "70-95",
      monthlyCost: "KES 2,500",
      annualCost: "KES 30,000",
      subscribers: 0,
      status: "draft",
      features: [
        "Hospital stays (up to 10 days/year)",
        "Basic prescription coverage",
        "Primary care visits",
        "Limited specialist consultations",
        "Basic preventive care",
      ],
      createdAt: "2023-07-25",
      updatedAt: "2023-07-25",
    },
  ];

  // State management
  const [plans, setPlans] = useState(initialPlans);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState({ field: "name", direction: "asc" });
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null);

  // Calculate monthly revenue
  const calculateMonthlyRevenue = () => {
    return initialPlans.reduce((sum, plan) => {
      const monthlyAmount = parseInt(plan.monthlyCost.replace(/[^0-9]/g, ""));
      return sum + monthlyAmount * plan.subscribers;
    }, 0);
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sorting.field === field) {
      setSorting({
        ...sorting,
        direction: sorting.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSorting({ field, direction: "asc" });
    }
  };

  // Sort plans based on current sorting state
  const sortedPlans = [...plans].sort((a, b) => {
    const fieldA = a[sorting.field];
    const fieldB = b[sorting.field];

    if (typeof fieldA === "string") {
      return sorting.direction === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else {
      return sorting.direction === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }
  });

  // Handle plan selection
  const togglePlanSelection = (planId) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId));
    } else {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  // Handle select all plans
  const toggleSelectAll = () => {
    if (selectedPlans.length === plans.length) {
      setSelectedPlans([]);
    } else {
      setSelectedPlans(plans.map((plan) => plan.id));
    }
  };

  // Refresh plans data
  const refreshPlans = () => {
    setIsRefreshing(true);
    // In a real app, would fetch from API
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Toggle expanded plan details
  const togglePlanDetails = (planId) => {
    if (expandedPlan === planId) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(planId);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Premium":
        return "bg-purple-100 text-purple-800";
      case "Comprehensive":
        return "bg-blue-100 text-blue-800";
      case "Standard":
        return "bg-indigo-100 text-indigo-800";
      case "Basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Insurance Plans
            </h1>
            <p className="text-gray-500 text-sm">
              Manage senior insurance plans and packages
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={refreshPlans}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-[200px]"
                />
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
                <TbFilter className="h-4 w-4 mr-2" />
                Filter
                <TbChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>

            <button className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
              <TbPlus className="h-4 w-4 mr-2" />
              Create Plan
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex-1 overflow-hidden flex flex-col">
        {/* Plan Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <TbFileDescription className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Total Plans
                </div>
                <div className="text-2xl font-bold text-secondary-700">
                  {plans.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <TbShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Active Plans
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {plans.filter((p) => p.status === "active").length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <TbUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Total Subscribers
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {plans.reduce((sum, plan) => sum + plan.subscribers, 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-secondary-500">
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-lg mr-4">
                <TbCurrencyDollar className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Monthly Revenue
                </div>
                <div className="text-2xl font-bold text-secondary-600">
                  KES {calculateMonthlyRevenue().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Table */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                        checked={selectedPlans.length === plans.length}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      <span>Plan Name</span>
                      {sorting.field === "name" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center">
                      <span>Category</span>
                      {sorting.field === "category" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("ageRange")}
                  >
                    <div className="flex items-center">
                      <span>Age Range</span>
                      {sorting.field === "ageRange" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("annualCost")}
                  >
                    <div className="flex items-center">
                      <span>Cost</span>
                      {sorting.field === "annualCost" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("subscribers")}
                  >
                    <div className="flex items-center">
                      <span>Subscribers</span>
                      {sorting.field === "subscribers" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sorting.field === "status" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
                            <TbArrowUp className="h-4 w-4" />
                          ) : (
                            <TbArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPlans.map((plan) => (
                  <>
                    <tr
                      key={plan.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        expandedPlan === plan.id ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                            checked={selectedPlans.includes(plan.id)}
                            onChange={() => togglePlanSelection(plan.id)}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {plan.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Updated {formatDate(plan.updatedAt)}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeColor(
                            plan.category
                          )}`}
                        >
                          {plan.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                        {plan.ageRange}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {plan.annualCost}
                        </div>
                        <div className="text-xs text-gray-500">
                          {plan.monthlyCost} monthly
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                        {plan.subscribers}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                            plan.status
                          )}`}
                        >
                          {plan.status.charAt(0).toUpperCase() +
                            plan.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => togglePlanDetails(plan.id)}
                            className="text-gray-400 hover:text-primary-600"
                          >
                            <TbEye className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-blue-600">
                            <TbEdit className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <TbTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedPlan === plan.id && (
                      <tr>
                        <td colSpan="8" className="p-0">
                          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Plan Features
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {plan.features.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start text-sm"
                                  >
                                    <TbCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Plan Details
                                </h4>
                                <p className="text-gray-600 mb-1">
                                  <span className="text-gray-500">
                                    Date Created:
                                  </span>{" "}
                                  {formatDate(plan.createdAt)}
                                </p>
                                <p className="text-gray-600 mb-1">
                                  <span className="text-gray-500">
                                    Last Updated:
                                  </span>{" "}
                                  {formatDate(plan.updatedAt)}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Pricing Options
                                </h4>
                                <p className="text-gray-600 mb-1">
                                  <span className="text-gray-500">
                                    Monthly:
                                  </span>{" "}
                                  {plan.monthlyCost}
                                </p>
                                <p className="text-gray-600 mb-1">
                                  <span className="text-gray-500">
                                    Annually:
                                  </span>{" "}
                                  {plan.annualCost}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Subscription Stats
                                </h4>
                                <p className="text-gray-600 mb-1">
                                  <span className="text-gray-500">
                                    Total Subscribers:
                                  </span>{" "}
                                  {plan.subscribers}
                                </p>
                                <p className="text-gray-600 mb-1">
                                  <span className="text-gray-500">
                                    Monthly Revenue:
                                  </span>{" "}
                                  KES{" "}
                                  {(
                                    parseInt(
                                      plan.monthlyCost.replace(/[^0-9]/g, "")
                                    ) * plan.subscribers
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                              <button className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                View Plan Details
                              </button>
                              <button className="bg-primary-600 border border-transparent rounded-lg px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Edit Plan
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{plans.length}</span> of{" "}
                  <span className="font-medium">{plans.length}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    aria-current="page"
                    className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>Showing {plans.length} plans</div>
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

export default InsurancePlanPage;
