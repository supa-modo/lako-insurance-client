import { useState, useEffect } from "react";
import {
  TbFilter,
  TbSearch,
  TbPlus,
  TbDownload,
  TbArrowUp,
  TbArrowDown,
  TbEye,
  TbEdit,
  TbTrash,
  TbRefresh,
  TbChevronRight,
  TbShieldCheck,
  TbAlertTriangle,
  TbX,
  TbShieldPlus,
  TbChevronDown,
  TbChevronUp,
  TbReport,
  TbDatabaseExport,
  TbInfoCircle,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import InsurancePlanTable from "../../components/admin/InsurancePlanTable";
import { useAuth } from "../../context/AuthContext";
import insuranceService from "../../services/insuranceService";

const InsurancePlanPage = () => {
  // State management
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans();
    fetchCompanies();
  }, []);
  
  // Set up page title
  useEffect(() => {
    document.title = "Insurance Plans | Lako Admin";
  }, []);

  // Filter plans when search term or filter category changes
  useEffect(() => {
    filterPlans();
  }, [searchTerm, filterCategory, plans, sortField, sortDirection]);

  // Fetch plans from API
  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await insuranceService.getAllPlans();
      if (response && response.success) {
        setPlans(response.data);
      } else {
        setError("Failed to fetch insurance plans: " + (response?.message || "Unknown error"));
        toast.error("Failed to fetch insurance plans", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("Failed to fetch insurance plans: " + (error.message || "Unknown error"));
      toast.error("Error loading insurance plans", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch insurance companies
  const fetchCompanies = async () => {
    try {
      const response = await insuranceService.getAllCompanies();
      if (response && response.success) {
        setCompanies(response.data);
      } else {
        console.error("Failed to fetch companies:", response?.message || "Unknown error");
        toast.error("Failed to load insurance companies", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Error loading insurance companies", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Filter and sort plans based on search term and filter category
  const filterPlans = () => {
    let filtered = [...plans];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (plan) =>
          plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((plan) => plan.category === filterCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle special cases for sorting
      if (sortField === "monthlyCost" || sortField === "annualCost") {
        aValue = parseInt(aValue.replace(/[^0-9]/g, ""));
        bValue = parseInt(bValue.replace(/[^0-9]/g, ""));
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPlans(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter category change
  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle plan deletion
  const handleDeletePlan = async (planId) => {
    // Use a custom confirmation dialog instead of window.confirm
    if (window.confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
      try {
        setIsRefreshing(true);
        const response = await insuranceService.deletePlan(planId);
        
        if (response.success) {
          // Show success notification
          toast.success("Plan deleted successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          
          // Refresh plans to get the latest data
          await fetchPlans();
        } else {
          toast.error("Failed to delete plan: " + (response.message || "Unknown error"), {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error deleting plan:", error);
        toast.error("An error occurred while deleting the plan", {
          position: "top-right",
          autoClose: 5000,
        });
        
        // Refresh plans to ensure UI is in sync with backend
        await fetchPlans();
      } finally {
        setIsRefreshing(false);
      }
    }
  };


  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPlans();
    fetchCompanies();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="text-gray-800 font-lexend h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-neutral-100">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Insurance Plans Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage all insurance plans from providers and their details.
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search insurance plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=" bg-neutral-200 text-neutral-800 font-medium pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[500px]"
                />
                <TbSearch
                  size={19}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
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

            <button
              // onClick={handleAddPlan}
              className="bg-primary-600 font-medium text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <TbShieldPlus size={18} className=" mr-2" />
              Add New Plan
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6 overflow-y-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <TbAlertTriangle className="mr-2 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Error loading insurance plans</p>
                <p className="text-sm">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)} 
                className="ml-auto p-1 hover:bg-red-100 rounded-full"
                aria-label="Dismiss"
              >
                <TbX className="text-red-500" />
              </button>
            </div>
          </div>
        )}

        {/* Insurance Plan Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12"
              >
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading insurance plans...</p>
              </motion.div>
            ) : filteredPlans.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 bg-gray-50"
              >
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <TbInfoCircle className="text-4xl text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium mb-2">No insurance plans found</p>
                <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filters</p>
                <button
                  // onClick={handleAddPlan}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <TbPlus className="mr-2" />
                  Add New Plan
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <InsurancePlanTable
                  plans={filteredPlans}
                  loading={loading}
                  // onView={handleViewPlan}
                  // onEdit={handleEditPlan}
                  onDelete={handleDeletePlan}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSortChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

         {/* Footer */}
         <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>Showing {filteredPlans.length} Insurance Plans</div>
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
