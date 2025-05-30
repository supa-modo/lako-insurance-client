import React, { useState, useEffect, useCallback } from "react";
import {
  TbShieldCheck,
  TbSearch,
  TbFilter,
  TbPlus,
  TbEdit,
  TbTrash,
  TbEye,
  TbRefresh,
  TbChevronDown,
  TbChevronUp,
  TbX,
  TbArrowUp,
  TbArrowDown,
  TbBuilding,
  TbUsers,
  TbCurrencyDollar,
  TbAlertCircle,
  TbCheck,
  TbList,
  TbReport,
  TbDatabaseExport,
  TbCaretDownFilled,
  TbShieldPlus,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import AddPlanModal from "../../components/insurance/AddPlanModal";
import EditPlanModal from "../../components/insurance/EditPlanModal";
import PlanDetailModal from "../../components/insurance/PlanDetailModal";
import insuranceService from "../../services/insuranceService";

const InsurancePlanManagementPage = () => {
  // State management
  const [plans, setPlans] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    insuranceType: null,
    company: null,
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // UI States
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Insurance types available
  const insuranceTypes = ["seniors", "family", "individual", "group"];

  // Fetch data functions
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      const response = await insuranceService.getAllPlans();

      if (response && response.success) {
        setPlans(response.data || []);
      } else {
        setError(response?.message || "Failed to fetch plans");
      }
    } catch (err) {
      setError("Failed to fetch plans");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await insuranceService.getAllCompanies();

      if (response && response.success) {
        setCompanies(response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      setIsRefreshing(true);
      // Calculate statistics from the current plans data
      const stats = {
        totalPlans: plans.length,
        averagePremium:
          plans.length > 0
            ? plans.reduce(
                (sum, plan) => sum + (plan.rawAnnualPremium || 0),
                0
              ) / plans.length
            : 0,
        planTypeCount: [...new Set(plans.map((plan) => plan.planType))].length,
      };
      setStatistics(stats);
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [plans]);

  // Effect hooks
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  // Filter and sort plans
  const filteredAndSortedPlans = [...plans]
    // Apply search filter
    .filter((plan) => {
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();
      return (
        plan.name.toLowerCase().includes(query) ||
        plan.companyName?.toLowerCase().includes(query) ||
        plan.planType?.toLowerCase().includes(query) ||
        plan.insuranceType?.toLowerCase().includes(query)
      );
    })
    // Apply insurance type filter
    .filter((plan) => {
      if (!activeFilters.insuranceType) return true;
      return plan.insuranceType === activeFilters.insuranceType;
    })
    // Apply company filter
    .filter((plan) => {
      if (!activeFilters.company) return true;
      return plan.companyId === activeFilters.company;
    })
    // Apply sorting
    .sort((a, b) => {
      let fieldA = a[sortBy];
      let fieldB = b[sortBy];

      // Handle special cases
      if (sortBy === "annualPremium") {
        fieldA = a.rawAnnualPremium || 0;
        fieldB = b.rawAnnualPremium || 0;
      }

      if (typeof fieldA === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else {
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }
    });

  // Handler functions
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleDelete = async (planId) => {
    try {
      const response = await insuranceService.deletePlan(planId);

      if (response && response.success) {
        setPlans(plans.filter((plan) => plan.id !== planId));
        setDeleteConfirmation(null);
      } else {
        setError(response?.message || "Failed to delete plan");
      }
    } catch (err) {
      setError("Failed to delete plan");
      console.error(err);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPlans();
    fetchCompanies();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setActiveFilters({
      insuranceType: null,
      company: null,
    });
    setSortBy("createdAt");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  // Filter handlers
  const handleFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleInsuranceTypeFilterChange = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      insuranceType: prev.insuranceType === type ? null : type,
    }));
  };

  const handleCompanyFilterChange = (companyId) => {
    setActiveFilters((prev) => ({
      ...prev,
      company: prev.company === companyId ? null : companyId,
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      insuranceType: null,
      company: null,
    });
    setSearchTerm("");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <TbArrowUp className="h-4 w-4" />
    ) : (
      <TbArrowDown className="h-4 w-4" />
    );
  };

  const getInsuranceTypeBadgeColor = (type) => {
    switch (type) {
      case "seniors":
        return "bg-blue-100 text-blue-800";
      case "family":
        return "bg-green-100 text-green-800";
      case "individual":
        return "bg-purple-100 text-purple-800";
      case "group":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Insurance Plans Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage, edit or add new insurance plans from available insurance
              companies.
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-neutral-200 border border-gray-600/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px] shadow-sm"
                />
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <TbX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={handleFilterToggle}
                className={`bg-white border ${
                  Object.values(activeFilters).some((v) => v !== null)
                    ? "border-primary-300 text-primary-600"
                    : "border-gray-200 text-gray-700"
                } rounded-lg px-4 py-2 text-sm hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center shadow-sm transition-all`}
              >
                <TbFilter className="h-4 w-4 mr-2" />
                Filter
                {isFilterDropdownOpen ? (
                  <TbChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <TbChevronDown className="h-4 w-4 ml-2" />
                )}
              </button>

              {/* Filter Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-primary-700">
                        Select Filters
                      </h3>
                      {Object.values(activeFilters).some((v) => v !== null) && (
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-primary-600 hover:text-primary-800"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Insurance Type filter */}
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Insurance Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {insuranceTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() =>
                              handleInsuranceTypeFilterChange(type)
                            }
                            className={`px-3 py-1 text-xs rounded-full capitalize ${
                              activeFilters.insuranceType === type
                                ? getInsuranceTypeBadgeColor(type) +
                                  " font-medium"
                                : "bg-gray-200/70 border border-gray-300 text-gray-700"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Company filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Insurance Company
                      </h4>
                      <div className="flex flex-col gap-2">
                        {companies.map((company) => (
                          <button
                            key={company.id}
                            onClick={() =>
                              handleCompanyFilterChange(company.id)
                            }
                            className={`px-3 py-1.5 text-xs rounded-md text-left ${
                              activeFilters.company === company.id
                                ? "bg-primary-200 border border-primary-300 text-primary-700 font-medium"
                                : "bg-gray-200/70 border border-gray-300 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {company.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center shadow-sm transition-all"
            >
              <TbShieldPlus className="h-4 w-4 mr-2" />
              Add New Plan
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.totalPlans || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TbList className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Companies
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TbBuilding className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Premium
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.averagePremium
                    ? formatCurrency(statistics.averagePremium)
                    : "N/A"}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TbCurrencyDollar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Coverage Types
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.planTypeCount || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TbReport className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

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

        {/* Plans Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Plan Name</span>
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coverage
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("annualPremium")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Premium</span>
                      {getSortIcon("annualPremium")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created</span>
                      {getSortIcon("createdAt")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredAndSortedPlans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <TbList className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-500 mb-1">
                          No insurance plans found
                        </p>
                        <p className="text-sm text-gray-400">
                          {searchTerm ||
                          Object.values(activeFilters).some((v) => v !== null)
                            ? "Try a different search term or clear filters"
                            : "Add your first plan to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedPlans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {plan.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getInsuranceTypeBadgeColor(
                              plan.insuranceType
                            )}`}
                          >
                            {plan.insuranceType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TbBuilding className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {plan.companyName || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            plan.planType === "Diamond"
                              ? "bg-purple-100 text-purple-800"
                              : plan.planType === "Platinum"
                              ? "bg-gray-100 text-gray-800"
                              : plan.planType === "Gold"
                              ? "bg-yellow-100 text-yellow-800"
                              : plan.planType === "Silver"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {plan.planType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          In:{" "}
                          {plan.inpatientCoverageLimit
                            ? formatCurrency(plan.inpatientCoverageLimit)
                            : "N/A"}
                        </div>
                        <div className="text-gray-500">
                          Out:{" "}
                          {plan.outpatientCoverageLimit
                            ? formatCurrency(plan.outpatientCoverageLimit)
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {plan.rawAnnualPremium
                            ? formatCurrency(plan.rawAnnualPremium)
                            : "Age-based"}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {plan.premiumStructure} premium
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(plan.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setShowDetailModal(true);
                            }}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="View Details"
                          >
                            <TbEye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit Plan"
                          >
                            <TbEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmation(plan)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Plan"
                          >
                            <TbTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredAndSortedPlans.length > 0 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={filteredAndSortedPlans.length < itemsPerPage}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {showAddModal && (
            <AddPlanModal
              companies={companies}
              onClose={() => setShowAddModal(false)}
              onSave={() => {
                fetchPlans();
              }}
            />
          )}

          {showEditModal && selectedPlan && (
            <EditPlanModal
              plan={selectedPlan}
              companies={companies}
              onClose={() => {
                setShowEditModal(false);
                setSelectedPlan(null);
              }}
              onSave={() => {
                fetchPlans();
              }}
            />
          )}

          {showDetailModal && selectedPlan && (
            <PlanDetailModal
              plan={selectedPlan}
              onClose={() => {
                setShowDetailModal(false);
                setSelectedPlan(null);
              }}
            />
          )}

          {deleteConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex items-center mb-4">
                  <TbAlertCircle className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Confirm Deletion
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "{deleteConfirmation.name}"?
                  This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteConfirmation(null)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirmation.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside handler for filter dropdown */}
      {isFilterDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default InsurancePlanManagementPage;
