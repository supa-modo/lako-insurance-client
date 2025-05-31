import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbX,
  TbCheck,
  TbShieldHalfFilled,
  TbStethoscope,
  TbBuildingHospital,
  TbHeartRateMonitor,
  TbClockDollar,
  TbVirus,
  TbAmbulance,
  TbMailFilled,
  TbPhoneCall,
  TbCalendarTime,
  TbPlus,
  TbMinus,
  TbDeviceMobile,
  TbPlane,
  TbShoppingBag,
  TbChevronRight,
  TbInfoCircle,
  TbCoins,
  TbCoffin,
  TbDownload,
  TbEyeglass2,
  TbPlaneDeparture,
  TbEdit,
  TbTrash,
  TbStar,
  TbShieldCheck,
  TbCurrencyDollar,
} from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { PiTooth } from "react-icons/pi";
import { BsFillCreditCardFill } from "react-icons/bs";

const PlanDetailsModal = ({
  plan,
  formatCurrency,
  onClose,
  onRequestCallback,
  onBuyPlan,
  onEdit,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!plan) return null;

  // Extract the actual plan data which might be nested
  const planData = plan.plan || plan;

  // Default formatCurrency if not provided
  const formatCurrencyFn =
    formatCurrency ||
    ((amount) => {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }).format(amount);
    });

  // Handle different premium formats (flat rate vs age-based)
  const displayPremium =
    typeof planData.premium === "object"
      ? planData.premium[Object.keys(planData.premium)[0]] // Show first age bracket premium
      : planData.premium;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Define benefit categories and icons
  const benefitCategories = {
    inpatient: [
      {
        title: "Overall Annual Limit",
        value: planData.inpatientCoverageLimit || 2000000,
        icon: <TbShieldHalfFilled className="h-5 w-5" />,
        isAmount: true,
      },
      {
        title: "Room Accommodation",
        value: planData.bedLimit || planData.roomRate || "General Ward",
        icon: <TbBuildingHospital className="h-5 w-5" />,
        isAmount: false,
      },
      {
        title: "Pre-existing & Chronic Conditions",
        value: (planData.inpatientCoverageLimit || 2000000) * 0.25,
        icon: <TbHeartRateMonitor className="h-5 w-5" />,
        isAmount: true,
        note: "Subject to 1 year waiting period",
      },
      {
        title: "Last Expense Cover",
        value: planData.lastExpenseCover || 50000,
        icon: <TbCoffin className="h-5 w-5" />,
        isAmount: true,
      },
      {
        title: "Covid-19 Cover",
        value: (planData.inpatientCoverageLimit || 2000000) * 0.3,
        icon: <TbVirus className="h-5 w-5" />,
        isAmount: true,
      },
      {
        title: "Ambulance Services",
        value: "Fully Covered",
        icon: <TbAmbulance className="h-5 w-5" />,
        isAmount: false,
      },
    ],
    outpatient: [
      {
        title: "Overall Annual Limit",
        value: planData.outpatientCoverageLimit || 100000,
        icon: <FaUserDoctor className="h-5 w-5" />,
        isAmount: true,
      },
      {
        title: "Consultation Fees",
        value: "Covered within limit",
        icon: <TbPhoneCall className="h-5 w-5" />,
        isAmount: false,
      },
      {
        title: "Diagnostic Tests",
        value: "Covered within limit",
        icon: <TbDeviceMobile className="h-5 w-5" />,
        isAmount: false,
      },
      {
        title: "Prescribed Medication",
        value: "Covered within limit",
        icon: <TbMailFilled className="h-5 w-5" />,
        isAmount: false,
      },
    ],
    optional: [
      {
        title: "Dental Cover",
        value: (planData.outpatientCoverageLimit || 100000) * 0.15,
        icon: <PiTooth className="h-5 w-5" />,
        isAmount: true,
        note: "Optional add-on with additional premium",
        isOptional: true,
      },
      {
        title: "Optical Cover",
        value: (planData.outpatientCoverageLimit || 100000) * 0.15,
        icon: <TbEyeglass2 className="h-5 w-5" />,
        isAmount: true,
        note: "Optional add-on with additional premium",
        isOptional: true,
      },
      {
        title: "Annual Health Check-up",
        value: 10000,
        icon: <TbCalendarTime className="h-5 w-5" />,
        isAmount: true,
      },
      {
        title: "Overseas Treatment",
        value:
          planData.tier === "Diamond" ||
          planData.tier === "Platinum" ||
          planData.tier === "Plan VI"
            ? "Covered with pre-approval"
            : "Not covered",
        icon: <TbPlaneDeparture className="h-5 w-5" />,
        isAmount: false,
      },
    ],
  };

  // Common exclusions for senior health plans
  const exclusions = [
    "Cosmetic or beauty treatment and/or surgery unless necessitated by an accident",
    "Massage treatments (except where medically prescribed)",
    "Naval, military and air force operations",
    "Expenses recoverable under any other insurance (e.g., NHIF, GPA)",
    "Self-inflicted injuries, suicide attempts, or treatment of alcoholism",
    "Experimental treatments or unproven medical treatments",
    "Weight management treatments and drugs",
    "Participation in professional or hazardous sports",
  ];

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

  const planConfig = getPlanTypeConfig(planData.planType || planData.tier);

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
              <TbShieldCheck className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Plan Details
                </h2>
                <p className="text-white/80 text-sm">
                  {planData.name || "Insurance Plan"}
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
                        {planData.name || "Insurance Plan"}
                      </h3>
                      {planData.planType && (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${planConfig.color} ${planConfig.bgColor} border ${planConfig.borderColor} mt-2`}
                        >
                          <TbStar className="w-4 h-4 mr-1" />
                          {planData.planType} Plan
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      Starting from
                    </div>
                    <div className="text-2xl font-bold text-teal-600 font-lexend">
                      {formatCurrencyFn(displayPremium || 50000)}
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
                      {formatCurrencyFn(
                        planData.inpatientCoverageLimit || 2000000
                      )}
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
                      {formatCurrencyFn(
                        planData.outpatientCoverageLimit || 100000
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2">
                      <TbCoffin className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-sm text-gray-500">Last Expense</div>
                    <div className="font-bold text-gray-900 font-lexend">
                      {formatCurrencyFn(planData.lastExpenseCover || 50000)}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                      <TbCalendarTime className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-sm text-gray-500">Age Range</div>
                    <div className="font-bold text-gray-900 font-lexend">
                      {planData.eligibilityAgeMin || "55"}-
                      {planData.eligibilityAgeMax || "75"}
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
                  { id: "exclusions", label: "Exclusions", icon: TbMinus },
                  { id: "pricing", label: "Pricing", icon: TbCurrencyDollar },
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
                  {/* Plan Summary */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbInfoCircle className="w-5 h-5 mr-2 text-teal-600" />
                      Plan Summary
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Insurance Type:
                              </span>
                              <span className="font-medium text-gray-900">
                                {planData.insuranceType === "seniors"
                                  ? "Seniors Insurance"
                                  : planData.insuranceType === "family"
                                  ? "Family Insurance"
                                  : planData.insuranceType === "individual"
                                  ? "Individual Insurance"
                                  : planData.insuranceType ===
                                    "personal-accident"
                                  ? "Personal Accident"
                                  : planData.insuranceType === "travel"
                                  ? "Travel Insurance"
                                  : "Medical Insurance"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Coverage Area:
                              </span>
                              <span className="font-medium text-gray-900">
                                {planData.geographicalCoverage || "Kenya"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Renewal Age Limit:
                              </span>
                              <span className="font-medium text-gray-900">
                                {planData.renewalAgeLimit || "No limit"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Room Accommodation:
                              </span>
                              <span className="font-medium text-gray-900">
                                {planData.bedLimit || "General Ward"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                NHIF Applicable:
                              </span>
                              <div className="flex items-center">
                                <TbCheck
                                  className={`h-4 w-4 mr-2 ${
                                    planData.isNhifApplicable
                                      ? "text-green-500"
                                      : "text-gray-400"
                                  }`}
                                />
                                <span className="text-gray-900">
                                  {planData.isNhifApplicable
                                    ? "Applicable"
                                    : "Not applicable"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbPlus className="w-5 h-5 mr-2 text-teal-600" />
                      Additional Benefits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 rounded-lg border ${
                          planData.hasDental
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <PiTooth
                            className={`w-5 h-5 mr-2 ${
                              planData.hasDental
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="font-medium text-gray-900">
                            Dental Coverage
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {planData.hasDental
                            ? `${formatCurrencyFn(
                                planData.dentalCoverageLimit || 15000
                              )} limit`
                            : "Not included"}
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-lg border ${
                          planData.hasOptical
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <TbEyeglass2
                            className={`w-5 h-5 mr-2 ${
                              planData.hasOptical
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="font-medium text-gray-900">
                            Optical Coverage
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {planData.hasOptical
                            ? `${formatCurrencyFn(
                                planData.opticalCoverageLimit || 15000
                              )} limit`
                            : "Not included"}
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-lg border ${
                          planData.hasMaternity
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <TbHeartRateMonitor
                            className={`w-5 h-5 mr-2 ${
                              planData.hasMaternity
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="font-medium text-gray-900">
                            Maternity Coverage
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {planData.hasMaternity
                            ? `${formatCurrencyFn(
                                planData.maternityCoverageLimit || 50000
                              )} limit`
                            : "Not included"}
                        </div>
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
                  {Object.entries(benefitCategories).map(
                    ([category, benefits]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center capitalize">
                          <TbShieldCheck className="w-5 h-5 mr-2 text-teal-600" />
                          {category === "inpatient"
                            ? "Inpatient Benefits"
                            : category === "outpatient"
                            ? "Outpatient Benefits"
                            : "Optional Benefits"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex items-start">
                                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg border border-gray-200 mr-3 flex-shrink-0">
                                  <div className="text-teal-600">
                                    {benefit.icon}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-800 flex items-center">
                                    {benefit.title}
                                    {benefit.isOptional && (
                                      <span className="ml-2 text-xs font-normal bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                        Optional
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-base font-semibold text-teal-700 font-lexend">
                                    {benefit.isAmount
                                      ? formatCurrencyFn(benefit.value)
                                      : benefit.value}
                                  </div>
                                  {benefit.note && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {benefit.note}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              )}

              {activeTab === "exclusions" && (
                <motion.div
                  key="exclusions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbMinus className="w-5 h-5 mr-2 text-red-600" />
                      Plan Exclusions
                    </h4>
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <p className="text-sm text-red-800 mb-4 font-medium">
                        This plan does not cover the following conditions or
                        treatments:
                      </p>
                      <ul className="space-y-3">
                        {exclusions.map((exclusion, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-red-500 mr-2.5 mt-0.5 flex-shrink-0">
                              <TbX className="w-4 h-4" />
                            </span>
                            <span className="text-red-700">{exclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "pricing" && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbCurrencyDollar className="w-5 h-5 mr-2 text-teal-600" />
                      Premium Breakdown
                    </h4>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      {typeof planData.premium === "object" ? (
                        <div className="space-y-4">
                          <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                            <TbClockDollar className="mr-2 text-teal-600" />
                            Age-based Premiums
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(planData.premium).map(
                              ([ageRange, premium]) => (
                                <div
                                  key={ageRange}
                                  className="flex justify-between py-3 px-4 bg-white border border-gray-200 rounded-lg"
                                >
                                  <span className="text-gray-700 font-medium">
                                    {ageRange} years
                                  </span>
                                  <span className="font-semibold text-teal-600 font-lexend">
                                    {formatCurrencyFn(premium)}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                          <div className="text-3xl font-bold text-teal-600 mb-2 font-lexend">
                            {formatCurrencyFn(
                              planData.premium ||
                                planData.annualPremium ||
                                50000
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            Flat annual premium for all eligible ages
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Optional Covers Pricing */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h5 className="font-medium text-gray-800 mb-4 flex items-center">
                        <TbPlus className="mr-2 text-teal-600" />
                        Optional Add-on Premiums
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between py-3 px-4 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <PiTooth className="text-teal-600 mr-2" />
                            <span className="text-gray-700 font-medium">
                              Dental Cover
                            </span>
                          </div>
                          <span className="font-semibold text-teal-600 font-lexend">
                            {formatCurrencyFn(planData.dentalPremium || 10000)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 px-4 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <TbEyeglass2 className="text-teal-600 mr-2" />
                            <span className="text-gray-700 font-medium">
                              Optical Cover
                            </span>
                          </div>
                          <span className="font-semibold text-teal-600 font-lexend">
                            {formatCurrencyFn(planData.opticalPremium || 8000)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              {/* Quick Actions */}
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(planData)}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <TbEdit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(planData)}
                    className="flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <TbTrash className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                )}
              </div>

              {/* Primary Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onRequestCallback}
                  className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 border-2 border-teal-500 text-teal-600 bg-white rounded-lg hover:bg-teal-50 transition-colors font-medium"
                >
                  <TbPhoneCall className="w-4 h-4 mr-2" />
                  Request Callback
                </button>
                <button
                  onClick={() => onBuyPlan && onBuyPlan(planData)}
                  className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  <BsFillCreditCardFill className="w-4 h-4 mr-2" />
                  Buy This Plan
                  <TbChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanDetailsModal;
