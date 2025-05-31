import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbX,
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbInfoCircle,
  TbCheck,
  TbBuilding,
  TbCalendar,
  TbMapPin,
  TbEye,
  TbEdit,
  TbTrash,
  TbStar,
  TbPlus,
  TbMinus,
  TbBuildingHospital,
  TbStethoscope,
  TbHeartRateMonitor,
  TbCoffin,
  TbAmbulance,
  TbCalendarTime,
  TbEyeglass2,
  TbPlaneDeparture,
} from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { PiTooth } from "react-icons/pi";

const PlanDetailModal = ({ plan, onClose, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Plan type configuration for color coding
  const getPlanTypeConfig = (type) => {
    switch (type) {
      case "Bronze":
        return {
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "Silver":
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
      case "Gold":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
      case "Platinum":
        return {
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        };
      case "Diamond":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      default:
        return {
          color: "text-teal-600",
          bgColor: "bg-teal-50",
          borderColor: "border-teal-200",
        };
    }
  };

  const planConfig = getPlanTypeConfig(plan?.planType);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbEye className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Plan Details
                </h2>
                <p className="text-white/80 text-sm">
                  {plan?.name || "Insurance Plan"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            >
              <TbX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-81px)]">
          <div className="overflow-y-auto flex-1 px-6 py-5">
            {/* Plan Overview Section */}
            <div className="mb-6">
              <div
                className={`p-6 rounded-xl border ${planConfig.borderColor} ${planConfig.bgColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg ${planConfig.bgColor} border ${planConfig.borderColor} mr-4`}
                    >
                      <TbShieldCheck
                        className={`h-8 w-8 ${planConfig.color}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-lexend">
                        {plan?.name || "Insurance Plan"}
                      </h3>
                      {plan?.planType && (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${planConfig.color} ${planConfig.bgColor} border ${planConfig.borderColor} mt-2`}
                        >
                          <TbStar className="w-4 h-4 mr-1" />
                          {plan.planType} Plan
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Premium</div>
                    <div className="text-2xl font-bold text-teal-600 font-lexend">
                      {plan?.annualPremium
                        ? formatCurrency(plan.annualPremium)
                        : "Contact for pricing"}
                    </div>
                    <div className="text-sm text-gray-500">per year</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                      <TbBuildingHospital className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-sm text-gray-500">Inpatient Limit</div>
                    <div className="font-bold text-gray-900 font-lexend">
                      {plan?.inpatientCoverageLimit
                        ? formatCurrency(plan.inpatientCoverageLimit)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                      <FaUserDoctor className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-sm text-gray-500">
                      Outpatient Limit
                    </div>
                    <div className="font-bold text-gray-900 font-lexend">
                      {plan?.outpatientCoverageLimit
                        ? formatCurrency(plan.outpatientCoverageLimit)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2">
                      <TbCoffin className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-sm text-gray-500">Last Expense</div>
                    <div className="font-bold text-gray-900 font-lexend">
                      {plan?.lastExpenseCover
                        ? formatCurrency(plan.lastExpenseCover)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                      <TbCalendarTime className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-sm text-gray-500">Age Range</div>
                    <div className="font-bold text-gray-900 font-lexend">
                      {plan?.eligibilityAgeMin || "0"}-
                      {plan?.eligibilityAgeMax || "∞"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: TbInfoCircle },
                  { id: "benefits", label: "Benefits", icon: TbShieldCheck },
                  { id: "coverage", label: "Coverage", icon: TbBuilding },
                  { id: "premium", label: "Premium", icon: TbCurrencyDollar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbInfoCircle className="w-5 h-5 mr-2 text-teal-600" />
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Insurance Company
                        </label>
                        <div className="flex items-center">
                          <TbBuilding className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {plan?.InsuranceCompany?.name || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Insurance Type
                        </label>
                        <span className="text-gray-900 capitalize">
                          {plan?.insuranceType === "seniors"
                            ? "Seniors Insurance"
                            : plan?.insuranceType === "family"
                            ? "Family Insurance"
                            : plan?.insuranceType === "individual"
                            ? "Individual Insurance"
                            : plan?.insuranceType === "personal-accident"
                            ? "Personal Accident"
                            : plan?.insuranceType === "travel"
                            ? "Travel Insurance"
                            : "Medical Insurance"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Created Date
                        </label>
                        <div className="flex items-center">
                          <TbCalendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {plan?.createdAt
                              ? new Date(plan.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Geographical Coverage
                        </label>
                        <div className="flex items-center">
                          <TbMapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {plan?.geographicalCoverage || "Not specified"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Age Eligibility */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbUsers className="w-5 h-5 mr-2 text-teal-600" />
                      Age Eligibility
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Age
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.eligibilityAgeMin || "N/A"} years
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Age
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.eligibilityAgeMax || "N/A"} years
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Renewal Age Limit
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.renewalAgeLimit
                            ? `${plan.renewalAgeLimit} years`
                            : "No limit"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "benefits" && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Additional Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbPlus className="w-5 h-5 mr-2 text-teal-600" />
                      Additional Benefits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Dental Coverage */}
                      <div
                        className={`p-4 rounded-lg border ${
                          plan?.hasDental
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <TbCheck
                            className={`h-4 w-4 mr-2 ${
                              plan?.hasDental
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <label className="text-sm font-medium text-gray-700">
                            Dental Coverage
                          </label>
                        </div>
                        {plan?.hasDental ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600">
                              Limit:{" "}
                              {plan?.dentalCoverageLimit
                                ? formatCurrency(plan.dentalCoverageLimit)
                                : "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Premium:{" "}
                              {plan?.dentalPremium
                                ? formatCurrency(plan.dentalPremium)
                                : "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {plan?.dentalCoveredInBase
                                ? "Covered in base premium"
                                : "Additional premium required"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Not available
                          </span>
                        )}
                      </div>

                      {/* Optical Coverage */}
                      <div
                        className={`p-4 rounded-lg border ${
                          plan?.hasOptical
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <TbCheck
                            className={`h-4 w-4 mr-2 ${
                              plan?.hasOptical
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <label className="text-sm font-medium text-gray-700">
                            Optical Coverage
                          </label>
                        </div>
                        {plan?.hasOptical ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600">
                              Limit:{" "}
                              {plan?.opticalCoverageLimit
                                ? formatCurrency(plan.opticalCoverageLimit)
                                : "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Premium:{" "}
                              {plan?.opticalPremium
                                ? formatCurrency(plan.opticalPremium)
                                : "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {plan?.opticalCoveredInBase
                                ? "Covered in base premium"
                                : "Additional premium required"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Not available
                          </span>
                        )}
                      </div>

                      {/* Maternity Coverage */}
                      <div
                        className={`p-4 rounded-lg border ${
                          plan?.hasMaternity
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <TbCheck
                            className={`h-4 w-4 mr-2 ${
                              plan?.hasMaternity
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <label className="text-sm font-medium text-gray-700">
                            Maternity Coverage
                          </label>
                        </div>
                        {plan?.hasMaternity ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600">
                              Limit:{" "}
                              {plan?.maternityCoverageLimit
                                ? formatCurrency(plan.maternityCoverageLimit)
                                : "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Premium:{" "}
                              {plan?.maternityPremium
                                ? formatCurrency(plan.maternityPremium)
                                : "N/A"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Not available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "coverage" && (
                <motion.div
                  key="coverage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Coverage Limits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbShieldCheck className="w-5 h-5 mr-2 text-teal-600" />
                      Coverage Limits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Inpatient Coverage
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.inpatientCoverageLimit
                            ? formatCurrency(plan.inpatientCoverageLimit)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Outpatient Coverage
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.outpatientCoverageLimit
                            ? formatCurrency(plan.outpatientCoverageLimit)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Expense Cover
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.lastExpenseCover
                            ? formatCurrency(plan.lastExpenseCover)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bed Limit
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.bedLimit || "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Other Settings */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Other Settings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NHIF Benefits
                        </label>
                        <div className="flex items-center">
                          <TbCheck
                            className={`h-4 w-4 mr-2 ${
                              plan?.isNhifApplicable
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="text-gray-900">
                            {plan?.isNhifApplicable
                              ? "Applicable"
                              : "Not applicable"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "premium" && (
                <motion.div
                  key="premium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Premium Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbCurrencyDollar className="w-5 h-5 mr-2 text-teal-600" />
                      Premium Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Premium Structure
                        </label>
                        <span className="text-gray-900 text-lg font-semibold capitalize">
                          {plan?.premiumStructure || "N/A"}
                        </span>
                      </div>

                      {plan?.premiumStructure === "fixed" ? (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Premium
                          </label>
                          <span className="text-gray-900 text-lg font-semibold">
                            {plan?.annualPremium
                              ? formatCurrency(plan.annualPremium)
                              : "N/A"}
                          </span>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age-Based Premiums
                          </label>
                          <div className="text-sm text-gray-600">
                            {plan?.premiumsByAgeRange ? (
                              <pre className="whitespace-pre-wrap font-mono text-xs">
                                {JSON.stringify(
                                  JSON.parse(plan.premiumsByAgeRange),
                                  null,
                                  2
                                )}
                              </pre>
                            ) : (
                              "Not specified"
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-end space-x-3">
              {onEdit && (
                <button
                  onClick={() => onEdit(plan)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium flex items-center"
                >
                  <TbEdit className="w-4 h-4 mr-2" />
                  Edit Plan
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(plan)}
                  className="px-4 py-2 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors text-sm font-medium flex items-center"
                >
                  <TbTrash className="w-4 h-4 mr-2" />
                  Delete Plan
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanDetailModal;
