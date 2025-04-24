import React, { useState, useEffect } from "react";
import { TbX, TbCheck, TbInfoCircle, TbLoader2 } from "react-icons/tb";
import { motion } from "framer-motion";
import PlanBasicInfoForm from "./PlanFormSections/PlanBasicInfoForm";
import PlanCoverageForm from "./PlanFormSections/PlanCoverageForm";

const InsurancePlanForm = ({
  plan,
  companies,
  isEditing,
  onClose,
  onSubmit,
}) => {
  // Initialize form state with plan data or defaults
  const [formData, setFormData] = useState({
    name: "",
    companyId: "",
    planType: "",
    eligibilityAgeMin: 50,
    eligibilityAgeMax: 75,
    inpatientCoverageLimit: 0,
    outpatientCoverageLimit: 0,
    bedLimit: "",
    premiumAmount: 0,
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load plan data if editing
  useEffect(() => {
    if (isEditing && plan) {
      // Transform plan data to match form structure
      const transformedPlan = {
        name: plan.name || "",
        companyId: plan.companyId || "",
        planType: plan.category || "",
        eligibilityAgeMin: parseInt(plan.ageRange?.split("-")[0]) || 50,
        eligibilityAgeMax: parseInt(plan.ageRange?.split("-")[1]) || 75,
        inpatientCoverageLimit:
          parseInt(plan.annualCost?.replace(/[^0-9]/g, "")) || 0,
        outpatientCoverageLimit: 0,
        bedLimit: "",
        premiumAmount: parseInt(plan.annualCost?.replace(/[^0-9]/g, "")) || 0,
      };

      setFormData(transformedPlan);
    }
  }, [isEditing, plan]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.name) newErrors.name = "Plan name is required";
    if (!formData.companyId)
      newErrors.companyId = "Insurance company is required";
    if (!formData.planType) newErrors.planType = "Plan type is required";
    if (formData.eligibilityAgeMin < 0)
      newErrors.eligibilityAgeMin = "Minimum age cannot be negative";
    if (formData.eligibilityAgeMax <= formData.eligibilityAgeMin) {
      newErrors.eligibilityAgeMax =
        "Maximum age must be greater than minimum age";
    }
    if (formData.inpatientCoverageLimit <= 0) {
      newErrors.inpatientCoverageLimit =
        "Inpatient coverage limit must be greater than zero";
    }
    if (formData.premiumAmount <= 0) {
      newErrors.premiumAmount = "Premium amount must be greater than zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Format data for API
      const formattedData = {
        ...formData,
        // Add any additional formatting here if needed
      };

      onSubmit(formattedData);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <PlanBasicInfoForm
            formData={formData}
            handleChange={handleChange}
            companies={companies}
            errors={errors}
          />
        );
      case "coverage":
        return (
          <PlanCoverageForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Modal Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-secondary-700">
            {isEditing ? "Edit Insurance Plan" : "Add New Insurance Plan"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "basic"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Info
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "coverage"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("coverage")}
          >
            Coverage Details
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="h-[calc(100vh-170px)] overflow-y-auto"
        >
          <div className="p-6">{renderTabContent()}</div>
        </form>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {Object.keys(errors).length > 0 && (
              <div className="flex items-center text-red-500">
                <TbInfoCircle className="mr-1" />
                Please fix the errors before submitting
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium transition-colors disabled:bg-primary-300"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <TbLoader2 className="animate-spin mr-2" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <TbCheck className="mr-2" />
                  {isEditing ? "Update Plan" : "Create Plan"}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default InsurancePlanForm;
