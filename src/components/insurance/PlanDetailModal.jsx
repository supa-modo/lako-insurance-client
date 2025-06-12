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
    if (!amount) return "N/A";
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

  // Plan type configuration for styling
  const getPlanTypeConfig = (type) => {
    switch (type?.toLowerCase()) {
      case "bronze":
        return {
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          icon: "🥉",
        };
      case "silver":
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          icon: "🥈",
        };
      case "gold":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          icon: "🥇",
        };
      case "platinum":
        return {
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          icon: "💎",
        };
      case "diamond":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: "💍",
        };
      default:
        return {
          color: "text-primary-600",
          bgColor: "bg-primary-50",
          borderColor: "border-primary-200",
          icon: "🛡️",
        };
    }
  };

  const planConfig = getPlanTypeConfig(plan?.planType);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] transition-all duration-300 flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbEye className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Insurance Plan Details
                </h2>
                <p className="text-white/80 text-sm">
                  Complete plan information and coverage details
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
        <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-110px)] flex flex-col">
          <div className="overflow-y-auto flex-1 px-6 py-5">
            {/* Plan Overview Header */}
            <div className="mb-6">
              <div
                className={`p-6 rounded-xl border ${planConfig.borderColor} ${planConfig.bgColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg bg-white border ${planConfig.borderColor} mr-4`}
                    >
                      <div className="text-2xl">{planConfig.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-lexend">
                        {plan?.name || "Insurance Plan"}
                      </h3>
                      <div className="flex items-center mt-2 space-x-3">
                        {plan?.planType && (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${planConfig.color} ${planConfig.bgColor} ${planConfig.borderColor}`}
                          >
                            {plan.planType} Plan
                          </span>
                        )}
                        {plan?.insuranceType && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
                            {plan.insuranceType === "seniors"
                              ? "Seniors Insurance"
                              : plan.insuranceType === "family"
                              ? "Family Insurance"
                              : plan.insuranceType === "individual"
                              ? "Individual Insurance"
                              : plan.insuranceType === "personal-accident"
                              ? "Personal Accident"
                              : plan.insuranceType === "travel"
                              ? "Travel Insurance"
                              : "Medical Insurance"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      Annual Premium
                    </div>
                    <div className="text-2xl font-bold text-primary-600 font-lexend">
                      {plan?.rawAnnualPremium
                        ? formatCurrency(plan.rawAnnualPremium)
                        : plan?.premiumStructure === "age-based"
                        ? "Age-based"
                        : "Contact for pricing"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan?.premiumStructure === "age-based"
                        ? "Varies by age"
                        : "per year"}
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-3">
                      <TbBuildingHospital className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Inpatient Limit
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {plan?.inpatientCoverageLimit
                        ? formatCurrency(plan.inpatientCoverageLimit)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-3">
                      <FaUserDoctor className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Outpatient Limit
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {plan?.outpatientCoverageLimit
                        ? formatCurrency(plan.outpatientCoverageLimit)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg mb-3">
                      <TbCoffin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Last Expense
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {plan?.lastExpenseCover
                        ? formatCurrency(plan.lastExpenseCover)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-3">
                      <TbCalendarTime className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">Age Range</div>
                    <div className="font-semibold text-gray-900 text-sm">
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
                  {
                    id: "coverage",
                    label: "Coverage",
                    icon: TbBuildingHospital,
                  },
                  { id: "premium", label: "Premium", icon: TbCurrencyDollar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-primary-500 text-primary-600"
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
                  {/* Company Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbBuilding className="w-5 h-5 mr-2 text-primary-600" />
                      Insurance Company
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center">
                        {plan?.companyLogo && (
                          <img
                            src={plan.companyLogo}
                            alt={plan.companyName}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {plan?.companyName || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            Insurance Provider
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbInfoCircle className="w-5 h-5 mr-2 text-primary-600" />
                      Plan Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Plan Type
                        </label>
                        <span className="text-gray-900 font-medium">
                          {plan?.planType || "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
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

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
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

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
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
                      <TbUsers className="w-5 h-5 mr-2 text-primary-600" />
                      Age Eligibility
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Age
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.eligibilityAgeMin || "N/A"} years
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Age
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.eligibilityAgeMax || "N/A"} years
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
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
                      <TbPlus className="w-5 h-5 mr-2 text-primary-600" />
                      Additional Benefits
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {/* Dental Coverage */}
                      <div
                        className={`p-4 rounded-lg border ${
                          plan?.hasDental
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <PiTooth
                              className={`h-5 w-5 mr-3 ${
                                plan?.hasDental
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium text-gray-900">
                              Dental Coverage
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              plan?.hasDental
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {plan?.hasDental ? "Available" : "Not Available"}
                          </span>
                        </div>
                        {plan?.hasDental && (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">
                                Coverage Limit:
                              </span>
                              <div className="font-medium text-gray-900">
                                {plan?.dentalCoverageLimit
                                  ? formatCurrency(plan.dentalCoverageLimit)
                                  : "N/A"}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Additional Premium:
                              </span>
                              <div className="font-medium text-gray-900">
                                {plan?.dentalPremium
                                  ? formatCurrency(plan.dentalPremium)
                                  : "Included"}
                              </div>
                            </div>
                          </div>
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
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <TbEyeglass2
                              className={`h-5 w-5 mr-3 ${
                                plan?.hasOptical
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium text-gray-900">
                              Optical Coverage
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              plan?.hasOptical
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {plan?.hasOptical ? "Available" : "Not Available"}
                          </span>
                        </div>
                        {plan?.hasOptical && (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">
                                Coverage Limit:
                              </span>
                              <div className="font-medium text-gray-900">
                                {plan?.opticalCoverageLimit
                                  ? formatCurrency(plan.opticalCoverageLimit)
                                  : "N/A"}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Additional Premium:
                              </span>
                              <div className="font-medium text-gray-900">
                                {plan?.opticalPremium
                                  ? formatCurrency(plan.opticalPremium)
                                  : "Included"}
                              </div>
                            </div>
                          </div>
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
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <TbHeartRateMonitor
                              className={`h-5 w-5 mr-3 ${
                                plan?.hasMaternity
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium text-gray-900">
                              Maternity Coverage
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              plan?.hasMaternity
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {plan?.hasMaternity ? "Available" : "Not Available"}
                          </span>
                        </div>
                        {plan?.hasMaternity && (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">
                                Coverage Limit:
                              </span>
                              <div className="font-medium text-gray-900">
                                {plan?.maternityCoverageLimit
                                  ? formatCurrency(plan.maternityCoverageLimit)
                                  : "N/A"}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Additional Premium:
                              </span>
                              <div className="font-medium text-gray-900">
                                {plan?.maternityPremium
                                  ? formatCurrency(plan.maternityPremium)
                                  : "Included"}
                              </div>
                            </div>
                          </div>
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
                      <TbShieldCheck className="w-5 h-5 mr-2 text-primary-600" />
                      Coverage Limits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Inpatient Coverage
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.inpatientCoverageLimit
                            ? formatCurrency(plan.inpatientCoverageLimit)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Outpatient Coverage
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.outpatientCoverageLimit
                            ? formatCurrency(plan.outpatientCoverageLimit)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Expense Cover
                        </label>
                        <span className="text-gray-900 text-lg font-semibold">
                          {plan?.lastExpenseCover
                            ? formatCurrency(plan.lastExpenseCover)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      Additional Settings
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">NHIF Benefits</span>
                        <span
                          className={`text-sm font-medium ${
                            plan?.isNhifApplicable
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {plan?.isNhifApplicable
                            ? "Applicable"
                            : "Not applicable"}
                        </span>
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
                      <TbCurrencyDollar className="w-5 h-5 mr-2 text-primary-600" />
                      Premium Structure
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Premium Type
                        </label>
                        <span className="text-gray-900 text-lg font-semibold capitalize">
                          {plan?.premiumStructure || "N/A"}
                        </span>
                      </div>

                      {plan?.premiumStructure === "fixed" ? (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Annual Premium
                          </label>
                          <span className="text-gray-900 text-2xl font-bold">
                            {plan?.rawAnnualPremium
                              ? formatCurrency(plan.rawAnnualPremium)
                              : "N/A"}
                          </span>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Age-Based Premium Structure
                          </label>
                          {plan?.premiumsByAgeRange ? (
                            <div className="bg-white border border-gray-200 rounded p-3">
                              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                {JSON.stringify(
                                  JSON.parse(plan.premiumsByAgeRange),
                                  null,
                                  2
                                )}
                              </pre>
                            </div>
                          ) : (
                            <span className="text-gray-500">Not specified</span>
                          )}
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
            <div className="flex justify-between">
              <div className="text-xs text-gray-500">Plan ID: {plan?.id}</div>
              <button
                onClick={onClose}
                className="px-8 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-[0.93rem]"
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
