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
} from "react-icons/tb";
import { motion } from "framer-motion";
import InsurancePlanTable from "../../components/admin/InsurancePlanTable";
import InsurancePlanDetailsModal from "../../components/admin/InsurancePlanDetailsModal";
import InsurancePlanForm from "../../components/admin/InsurancePlanForm";
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
      if (response.success) {
        setPlans(response.data);
        setLoading(false);
      } else {
        setError("Failed to fetch insurance plans");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("Failed to fetch insurance plans");
      setLoading(false);
    }
  };

  // Fetch insurance companies
  const fetchCompanies = async () => {
    try {
      const response = await insuranceService.getAllCompanies();
      if (response.success) {
        setCompanies(response.data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
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

  // Handle plan selection for viewing details
  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  // Handle plan selection for editing
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsEditing(true);
    setShowAddEditModal(true);
  };

  // Handle adding new plan
  const handleAddPlan = () => {
    setSelectedPlan(null);
    setIsEditing(false);
    setShowAddEditModal(true);
  };

  // Handle plan deletion
  const handleDeletePlan = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        const response = await insuranceService.deletePlan(planId);
        if (response.success) {
          // Remove plan from state
          setPlans(plans.filter((plan) => plan.id !== planId));
          alert("Plan deleted successfully");
        } else {
          alert("Failed to delete plan");
        }
      } catch (error) {
        console.error("Error deleting plan:", error);
        alert("Failed to delete plan");

        // For demo, remove from state anyway
        setPlans(plans.filter((plan) => plan.id !== planId));
      }
    }
  };

  // Handle form submission for add/edit
  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        // Update existing plan
        const response = await insuranceService.updatePlan(
          selectedPlan.id,
          formData
        );
        if (response.success) {
          // Update plan in state
          setPlans(
            plans.map((plan) =>
              plan.id === selectedPlan.id ? response.data : plan
            )
          );
          setShowAddEditModal(false);
          alert("Plan updated successfully");
        } else {
          alert("Failed to update plan");
        }
      } else {
        // Add new plan
        const response = await insuranceService.createPlan(formData);
        if (response.success) {
          // Add new plan to state
          setPlans([...plans, response.data]);
          setShowAddEditModal(false);
          alert("Plan added successfully");
        } else {
          alert("Failed to add plan");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save plan");
      setShowAddEditModal(false);
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
              onClick={handleAddPlan}
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
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex items-center">
              <TbAlertTriangle className="mr-2 text-red-500" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Insurance Plan Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <InsurancePlanTable
            plans={filteredPlans}
            loading={loading}
            onView={handleViewPlan}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSortChange}
          />
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

      {/* Plan Details Modal */}
      {showDetailsModal && selectedPlan && (
        <InsurancePlanDetailsModal
          plan={selectedPlan}
          onClose={() => setShowDetailsModal(false)}
          onEdit={() => {
            setShowDetailsModal(false);
            handleEditPlan(selectedPlan);
          }}
        />
      )}

      {/* Add/Edit Plan Modal */}
      {showAddEditModal && (
        <InsurancePlanForm
          plan={selectedPlan}
          companies={companies}
          isEditing={isEditing}
          onClose={() => setShowAddEditModal(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default InsurancePlanPage;
