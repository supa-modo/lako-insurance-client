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
  TbEye,
  TbCalendarTime,
  TbPlus,
  TbMinus,
  TbDeviceMobile,
  TbPlane,
  TbShoppingBag,
  TbChevronRight,
  TbInfoCircle,
  TbCoins,
  TbEyeglass2,
  TbCoffin,
  TbDownload,
} from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { PiTooth } from "react-icons/pi";

const PlanDetailsModal = ({
  plan,
  formatCurrency,
  onClose,
  onRequestCallback,
  onBuyPlan,
}) => {
  const [activeTab, setActiveTab] = useState("benefits");

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

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

  // Define benefit categories and icons
  const benefitCategories = {
    inpatient: [
      {
        title: "Overall Annual Limit",
        value: planData.inpatientCoverageLimit || 2000000,
        icon: <TbShieldHalfFilled className="text-primary-600" />,
        isAmount: true,
      },
      {
        title: "Room Accommodation",
        value: planData.bedLimit || planData.roomRate || "General Ward",
        icon: <TbBuildingHospital className="text-primary-600" />,
        isAmount: false,
      },
      {
        title: "Pre-existing & Chronic Conditions",
        value: (planData.inpatientCoverageLimit || 2000000) * 0.25, // Approximate value for illustration
        icon: <TbHeartRateMonitor className="text-primary-600" />,
        isAmount: true,
        note: "Subject to 1 year waiting period",
      },
      {
        title: "Last Expense Cover",
        value: planData.lastExpenseCover || 50000,
        icon: <TbClockDollar className="text-primary-600" />,
        isAmount: true,
      },
      {
        title: "Covid-19 Cover",
        value: (planData.inpatientCoverageLimit || 2000000) * 0.3, // Approximate value for illustration
        icon: <TbVirus className="text-primary-600" />,
        isAmount: true,
      },
      {
        title: "Ambulance Services",
        value: "Fully Covered",
        icon: <TbAmbulance className="text-primary-600" />,
        isAmount: false,
      },
    ],
    outpatient: [
      {
        title: "Overall Annual Limit",
        value: planData.outpatientCoverageLimit || 100000,
        icon: <FaUserDoctor className="text-primary-600" />,
        isAmount: true,
      },
      {
        title: "Consultation Fees",
        value: "Covered within limit",
        icon: <TbPhoneCall className="text-primary-600" />,
        isAmount: false,
      },
      {
        title: "Diagnostic Tests",
        value: "Covered within limit",
        icon: <TbDeviceMobile className="text-primary-600" />,
        isAmount: false,
      },
      {
        title: "Prescribed Medication",
        value: "Covered within limit",
        icon: <TbMailFilled className="text-primary-600" />,
        isAmount: false,
      },
    ],
    optional: [
      {
        title: "Dental Cover",
        value: (planData.outpatientCoverageLimit || 100000) * 0.15, // Approximate value
        icon: <PiTooth className="text-primary-600" />,
        isAmount: true,
        note: "Optional add-on with additional premium",
        isOptional: true,
      },
      {
        title: "Optical Cover",
        value: (planData.outpatientCoverageLimit || 100000) * 0.15, // Approximate value
        icon: <TbEye className="text-primary-600" />,
        isAmount: true,
        note: "Optional add-on with additional premium",
        isOptional: true,
      },
      {
        title: "Annual Health Check-up",
        value: 10000, // Standard amount across most plans
        icon: <TbCalendarTime className="text-primary-600" />,
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
        icon: <TbPlane className="text-primary-600" />,
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-start justify-end z-50 p-3 sm:p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full max-w-[750px] h-[calc(100vh-24px)] font-outfit bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-3 sm:px-6 py-4 relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            </div>
            <div className="relative flex justify-between items-center z-10">
              <h2 className="text-white font-medium text-lg flex items-center font-lexend">
                <TbShieldHalfFilled className="mr-2" /> Insurance Plan Details
              </h2>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
              >
                <TbX className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-81px)] bg-white">
            {/* Plan Header Section */}
            <div className="bg-white px-3 sm:px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mr-3 flex-shrink-0 shadow-sm">
                    <img
                      src={planData.companyLogo || "/insurance-placeholder.png"}
                      alt={planData.companyName}
                      className="max-h-8 max-w-16 object-contain"
                      onError={(e) => {
                        e.target.src = "/insurance-placeholder.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                      {planData.name || "Insurance Plan"}
                      <span className="ml-2 bg-primary-200 text-primary-700 text-xs px-2 py-0.5 rounded">
                        {planData.tier || planData.planType || "Standard"}
                      </span>
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm font-lexend">
                      {planData.companyName || "Insurance Company"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-lexend font-bold text-secondary-600">
                    {formatCurrencyFn(displayPremium || 50000)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {typeof planData.premium === "object"
                      ? "starting annual premium"
                      : "annual premium"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-primary-50 p-3 rounded-lg mb-2 border border-gray-200">
                <div>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <TbShieldHalfFilled className="mr-1 text-primary-500 h-4 w-4" />
                    <span>Inpatient</span>
                  </div>
                  <p className="text-sm font-semibold font-lexend text-gray-800">
                    {formatCurrencyFn(
                      planData.inpatientCoverageLimit || 2000000
                    )}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <TbStethoscope className="mr-1 text-primary-500 h-4 w-4" />
                    <span>Outpatient</span>
                  </div>
                  <p className="text-sm font-semibold font-lexend text-gray-800">
                    {formatCurrencyFn(
                      planData.outpatientCoverageLimit || 100000
                    )}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <TbBuildingHospital className="mr-1 text-primary-500 h-4 w-4" />
                    <span>Room Type</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {planData.roomRate || planData.bedLimit || "Standard"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-3 sm:px-6 pt-3 border-b border-gray-200">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("benefits")}
                  className={`px-4 py-2.5 text-[0.9rem] font-semibold transition-colors ${
                    activeTab === "benefits"
                      ? "text-secondary-600 border-b-2 border-secondary-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Benefits
                </button>
                <button
                  onClick={() => setActiveTab("exclusions")}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === "exclusions"
                      ? "text-secondary-600 border-b-2 border-secondary-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Exclusions
                </button>
                <button
                  onClick={() => setActiveTab("pricing")}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === "pricing"
                      ? "text-secondary-600 border-b-2 border-secondary-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Pricing
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-3 sm:px-6 py-4">
              <AnimatePresence mode="wait">
                {activeTab === "benefits" && (
                  <motion.div
                    key="benefits"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-4">
                      <h4 className="font-medium text-primary-700 flex items-center font-lexend">
                        <TbShieldHalfFilled className="mr-2 text-primary-600" />{" "}
                        Inpatient Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefitCategories.inpatient.map((benefit, index) => (
                          <div
                            key={`inpatient-${index}`}
                            className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-300 group"
                          >
                            <div className="flex items-start">
                              <div className="mt-0.5 mr-2.5 text-primary-600 group-hover:text-secondary-500 transition-colors">
                                {benefit.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">
                                  {benefit.title}
                                </div>
                                <div className="text-base font-semibold text-secondary-700 font-lexend">
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

                      <h4 className="font-medium text-primary-700 flex items-center mt-6 font-lexend">
                        <TbStethoscope className="mr-2 text-primary-600" />{" "}
                        Outpatient Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefitCategories.outpatient.map((benefit, index) => (
                          <div
                            key={`outpatient-${index}`}
                            className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-300 group"
                          >
                            <div className="flex items-start">
                              <div className="mt-0.5 mr-2.5 text-primary-600 group-hover:text-secondary-500 transition-colors">
                                {benefit.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">
                                  {benefit.title}
                                </div>
                                <div className="text-base font-semibold text-secondary-700 font-lexend">
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

                      <h4 className="font-medium text-primary-700 flex items-center mt-6 font-lexend">
                        <TbPlus className="mr-2 text-primary-600" /> Optional
                        Covers & Additional Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefitCategories.optional.map((benefit, index) => (
                          <div
                            key={`optional-${index}`}
                            className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-300 group"
                          >
                            <div className="flex items-start">
                              <div className="mt-0.5 mr-2.5 text-primary-600 group-hover:text-secondary-500 transition-colors">
                                {benefit.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800 flex items-center">
                                  {benefit.title}
                                  {benefit.isOptional && (
                                    <span className="ml-2 text-xs font-normal bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                      Optional
                                    </span>
                                  )}
                                </div>
                                <div className="text-base font-semibold text-secondary-700 font-lexend">
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
                      <h4 className="font-medium text-primary-700 flex items-center font-lexend">
                        <TbMinus className="mr-2 text-primary-600" /> Plan
                        Exclusions
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-700 mb-3 font-medium">
                          This plan does not cover the following conditions or
                          treatments:
                        </p>
                        <ul className="space-y-3">
                          {exclusions.map((exclusion, index) => (
                            <li
                              key={index}
                              className="flex items-start text-sm"
                            >
                              <span className="text-red-500 mr-2.5 mt-0.5 flex-shrink-0">
                                <TbX size={16} />
                              </span>
                              <span className="text-gray-700">{exclusion}</span>
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
                    <div className="space-y-4">
                      <h4 className="font-medium text-primary-700 flex items-center font-lexend">
                        <TbCoins className="mr-2 text-primary-600" /> Premium
                        Breakdown
                      </h4>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                        {typeof planData.premium === "object" ? (
                          <div className="space-y-3">
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <TbClockDollar
                                className="mr-2 text-secondary-600"
                                size={18}
                              />
                              Age-based Premiums
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {Object.entries(planData.premium).map(
                                ([ageRange, premium]) => (
                                  <div
                                    key={ageRange}
                                    className="flex justify-between py-2 px-3 border-b border-gray-200 hover:bg-white transition-colors rounded group"
                                  >
                                    <span className="text-gray-700 font-medium">
                                      {ageRange} years
                                    </span>
                                    <span className="font-semibold text-secondary-600 font-lexend group-hover:text-secondary-700 transition-colors">
                                      {formatCurrencyFn(premium)}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-5 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <div className="text-xl font-bold text-secondary-600 mb-1 font-lexend">
                              {formatCurrencyFn(planData.premium || 50000)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Flat annual premium for all eligible ages
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                          <TbPlus
                            className="mr-2 text-secondary-600"
                            size={18}
                          />
                          Optional Covers
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between py-2 px-3 border border-gray-200 rounded-lg bg-white hover:border-primary-200 transition-all duration-300 group">
                            <div className="flex items-center">
                              <PiTooth
                                className="text-primary-600 mr-2"
                                size={18}
                              />
                              <span className="text-gray-700 font-medium">
                                Dental Cover
                              </span>
                            </div>
                            <span className="font-semibold text-secondary-600 font-lexend group-hover:text-secondary-700 transition-colors">
                              {formatCurrencyFn(
                                planData.dentalPremium || 10000
                              )}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-2 px-3 border border-gray-200 rounded-lg bg-white hover:border-primary-200 transition-all duration-300 group">
                            <div className="flex items-center">
                              <TbEyeglass2
                                className="text-primary-600 mr-2"
                                size={18}
                              />
                              <span className="text-gray-700 font-medium">
                                Optical Cover
                              </span>
                            </div>
                            <span className="font-semibold text-secondary-600 font-lexend group-hover:text-secondary-700 transition-colors">
                              {formatCurrencyFn(
                                planData.opticalPremium || 8000
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="px-6 py-5 bg-gradient-to-br from-primary-50/50 to-white border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRequestCallback}
                  className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-primary-500 text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                >
                  <TbPhoneCall className="mr-2" size={18} /> Request Callback
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onBuyPlan && onBuyPlan(planData)}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium group"
                >
                  <TbShoppingBag className="mr-2" size={18} /> Buy This Plan
                  <TbChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlanDetailsModal;
