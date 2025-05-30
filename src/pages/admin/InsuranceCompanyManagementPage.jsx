import React, { useState, useEffect, useCallback } from "react";
import {
  TbBuilding,
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
  TbUsers,
  TbStar,
  TbStarFilled,
  TbPhone,
  TbMail,
  TbWorld,
  TbAlertCircle,
  TbCheck,
  TbList,
  TbReport,
  TbDatabaseExport,
  TbBuildingBank,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import AddCompanyModal from "../../components/insurance/AddCompanyModal";
import EditCompanyModal from "../../components/insurance/EditCompanyModal";
import CompanyDetailModal from "../../components/insurance/CompanyDetailModal";
import insuranceService from "../../services/insuranceService";

const InsuranceCompanyManagementPage = () => {
  // State management
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    hasPlans: null,
    rating: null,
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // UI States
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Fetch companies using API service
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      const response = await insuranceService.getAllCompanies();

      if (response && response.success) {
        setCompanies(response.data || []);
      } else {
        setError(response?.message || "Failed to fetch companies");
      }
    } catch (err) {
      setError("Failed to fetch companies");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await insuranceService.getCompanyStatistics();

      if (response && response.success) {
        setStatistics(response.data || {});
      } else {
        // Fallback to client-side calculation if API fails
        const totalPlans = companies.reduce(
          (sum, company) => sum + (company.plansCount || 0),
          0
        );
        const avgRating =
          companies.length > 0
            ? companies.reduce(
                (sum, company) => sum + (company.rating || 0),
                0
              ) / companies.length
            : 0;

        const stats = {
          totalCompanies: companies.length,
          totalPlans,
          averageRating: avgRating,
          activeCompanies: companies.length,
        };
        setStatistics(stats);
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
      // Fallback to client-side calculation
      const totalPlans = companies.reduce(
        (sum, company) => sum + (company.plansCount || 0),
        0
      );
      const avgRating =
        companies.length > 0
          ? companies.reduce((sum, company) => sum + (company.rating || 0), 0) /
            companies.length
          : 0;

      const stats = {
        totalCompanies: companies.length,
        totalPlans,
        averageRating: avgRating,
        activeCompanies: companies.length,
      };
      setStatistics(stats);
    } finally {
      setIsRefreshing(false);
    }
  }, [companies]);

  // Effect hooks
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  // Filter and sort companies
  const filteredAndSortedCompanies = [...companies]
    // Apply search filter
    .filter((company) => {
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();
      return (
        company.name.toLowerCase().includes(query) ||
        company.contactEmail.toLowerCase().includes(query) ||
        company.description?.toLowerCase().includes(query)
      );
    })
    // Apply has plans filter
    .filter((company) => {
      if (activeFilters.hasPlans === null) return true;
      if (activeFilters.hasPlans === "with") return company.plansCount > 0;
      if (activeFilters.hasPlans === "without") return company.plansCount === 0;
      return true;
    })
    // Apply rating filter
    .filter((company) => {
      if (!activeFilters.rating) return true;
      const rating = parseFloat(activeFilters.rating);
      return company.rating >= rating;
    })
    // Apply sorting
    .sort((a, b) => {
      let fieldA = a[sortBy];
      let fieldB = b[sortBy];

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

  const handleDelete = async (companyId) => {
    try {
      const response = await insuranceService.deleteCompany(companyId);

      if (response && response.success) {
        setCompanies(companies.filter((company) => company.id !== companyId));
        setDeleteConfirmation(null);
      } else {
        setError(response?.message || "Failed to delete company");
      }
    } catch (err) {
      setError("Failed to delete company");
      console.error(err);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchCompanies();
  };

  // Filter handlers
  const handleFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleHasPlansFilterChange = (value) => {
    setActiveFilters((prev) => ({
      ...prev,
      hasPlans: prev.hasPlans === value ? null : value,
    }));
  };

  const handleRatingFilterChange = (rating) => {
    setActiveFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      hasPlans: null,
      rating: null,
    });
    setSearchTerm("");
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <TbArrowUp className="h-4 w-4" />
    ) : (
      <TbArrowDown className="h-4 w-4" />
    );
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <TbStarFilled key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<TbStar key={i} className="h-4 w-4 text-yellow-400" />);
      } else {
        stars.push(<TbStar key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Insurance Companies Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage insurance companies and their details
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
                  placeholder="Search companies..."
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

                    {/* Has Plans filter */}
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Plans Status
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: "with", label: "With Plans" },
                          { value: "without", label: "Without Plans" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              handleHasPlansFilterChange(option.value)
                            }
                            className={`px-3 py-1 text-xs rounded-full ${
                              activeFilters.hasPlans === option.value
                                ? "bg-primary-200 border border-primary-300 text-primary-700 font-medium"
                                : "bg-gray-200/70 border border-gray-300 text-gray-700"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Minimum Rating
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["4.0", "4.5", "5.0"].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRatingFilterChange(rating)}
                            className={`px-3 py-1 text-xs rounded-full ${
                              activeFilters.rating === rating
                                ? "bg-yellow-200 border border-yellow-300 text-yellow-700 font-medium"
                                : "bg-gray-200/70 border border-gray-300 text-gray-700"
                            }`}
                          >
                            {rating}+ ⭐
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
              <TbBuildingBank className="h-4 w-4 mr-2" />
              Add Company
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
                <p className="text-sm font-medium text-gray-600">
                  Total Companies
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.totalCompanies || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TbBuilding className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.totalPlans || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TbList className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.averageRating
                    ? statistics.averageRating.toFixed(1)
                    : "N/A"}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TbStar className="h-6 w-6 text-yellow-600" />
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
                  {statistics.activeCompanies || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TbUsers className="h-6 w-6 text-purple-600" />
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

        {/* Companies Table */}
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
                      <span>Company</span>
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("rating")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Rating</span>
                      {getSortIcon("rating")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("plansCount")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Plans</span>
                      {getSortIcon("plansCount")}
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
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredAndSortedCompanies.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <TbBuilding className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-500 mb-1">
                          No insurance companies found
                        </p>
                        <p className="text-sm text-gray-400">
                          {searchTerm ||
                          Object.values(activeFilters).some((v) => v !== null)
                            ? "Try a different search term or clear filters"
                            : "Add your first company to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {company.logoUrl ? (
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={company.logoUrl}
                                alt={company.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                <TbBuilding className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {company.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {company.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center mb-1">
                            <TbMail className="h-4 w-4 text-gray-400 mr-2" />
                            {company.contactEmail}
                          </div>
                          <div className="flex items-center mb-1">
                            <TbPhone className="h-4 w-4 text-gray-400 mr-2" />
                            {company.contactPhone}
                          </div>
                          {company.website && (
                            <div className="flex items-center">
                              <TbWorld className="h-4 w-4 text-gray-400 mr-2" />
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-800"
                              >
                                Website
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {company.rating
                          ? renderStarRating(company.rating)
                          : "No rating"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {company.plansCount} plans
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(company.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowDetailModal(true);
                            }}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="View Details"
                          >
                            <TbEye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit Company"
                          >
                            <TbEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmation(company)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Company"
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
        {filteredAndSortedCompanies.length > 0 && (
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
                disabled={filteredAndSortedCompanies.length < itemsPerPage}
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
            <AddCompanyModal
              onClose={() => setShowAddModal(false)}
              onSave={() => {
                fetchCompanies();
              }}
            />
          )}

          {showEditModal && selectedCompany && (
            <EditCompanyModal
              company={selectedCompany}
              onClose={() => {
                setShowEditModal(false);
                setSelectedCompany(null);
              }}
              onSave={() => {
                fetchCompanies();
              }}
            />
          )}

          {showDetailModal && selectedCompany && (
            <CompanyDetailModal
              company={selectedCompany}
              onClose={() => {
                setShowDetailModal(false);
                setSelectedCompany(null);
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
                  This action cannot be undone and will also remove all
                  associated plans.
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

export default InsuranceCompanyManagementPage;
