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
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, damping: 25, stiffness: 300 }}
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl"
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            
            Insurance Coverage Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-81px)] bg-white">
          {/* Plan Header Section */}
          <div className="bg-primary-50 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-16 h-12 bg-white rounded-md flex items-center justify-center border border-gray-200 mr-4">
                <img
                  src={planData.companyLogo || "/insurance-placeholder.png"}
                  alt={planData.companyName}
                  className="h-8 object-contain"
                  onError={(e) => {
                    e.target.src = "/insurance-placeholder.png";
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 flex items-center">
                  {planData.name || "Insurance Plan"}
                  <span className="ml-2 bg-primary-100 text-primary-600 text-xs font-medium px-2 py-0.5 rounded">
                    {planData.tier || planData.planType || "Standard"}
                  </span>
                </h3>
                <p className="text-gray-600 text-sm">
                  {planData.companyName || "Insurance Company"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Annual Premium</div>
                <div className="text-lg font-bold text-secondary-600">
                  {formatCurrencyFn(displayPremium || 50000)}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Inpatient Limit</div>
                <div className="text-lg font-bold text-secondary-600">
                  {formatCurrencyFn(planData.inpatientCoverageLimit || 2000000)}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Outpatient Limit</div>
                <div className="text-lg font-bold text-secondary-600">
                  {formatCurrencyFn(planData.outpatientCoverageLimit || 100000)}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pt-3 border-b border-gray-200">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("benefits")}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === "benefits"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab("exclusions")}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === "exclusions"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Exclusions
              </button>
              <button
                onClick={() => setActiveTab("pricing")}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === "pricing"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Pricing
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-6 py-4">
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
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <TbShieldHalfFilled className="mr-2" /> Inpatient Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {benefitCategories.inpatient.map((benefit, index) => (
                        <div
                          key={`inpatient-${index}`}
                          className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start">
                            <div className="mt-0.5 mr-2 text-primary-600">
                              {benefit.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-800">
                                {benefit.title}
                              </div>
                              <div className="text-base font-semibold text-primary-600">
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

                    <h4 className="font-medium text-gray-700 flex items-center mt-6">
                      <TbStethoscope className="mr-2" /> Outpatient Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {benefitCategories.outpatient.map((benefit, index) => (
                        <div
                          key={`outpatient-${index}`}
                          className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start">
                            <div className="mt-0.5 mr-2 text-primary-600">
                              {benefit.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-800">
                                {benefit.title}
                              </div>
                              <div className="text-base font-semibold text-primary-600">
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

                    <h4 className="font-medium text-gray-700 flex items-center mt-6">
                      <TbPlus className="mr-2" /> Optional Covers & Additional
                      Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {benefitCategories.optional.map((benefit, index) => (
                        <div
                          key={`optional-${index}`}
                          className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start">
                            <div className="mt-0.5 mr-2 text-primary-600">
                              {benefit.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-800 flex items-center">
                                {benefit.title}
                                {benefit.isOptional && (
                                  <span className="ml-2 text-xs font-normal bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                                    Optional
                                  </span>
                                )}
                              </div>
                              <div className="text-base font-semibold text-primary-600">
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
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <TbMinus className="mr-2" /> Plan Exclusions
                    </h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 mb-3">
                        This plan does not cover the following conditions or
                        treatments:
                      </p>
                      <ul className="space-y-2">
                        {exclusions.map((exclusion, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-red-500 mr-2 mt-0.5">
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
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <TbClockDollar className="mr-2" /> Premium Breakdown
                    </h4>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      {typeof planData.premium === "object" ? (
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-700 mb-2">
                            Age-based Premiums
                          </h5>
                          <div className="space-y-2">
                            {Object.entries(planData.premium).map(
                              ([ageRange, premium]) => (
                                <div
                                  key={ageRange}
                                  className="flex justify-between py-2 border-b border-gray-100"
                                >
                                  <span className="text-gray-700">
                                    {ageRange} years
                                  </span>
                                  <span className="font-semibold text-secondary-600">
                                    {formatCurrencyFn(premium)}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="text-lg font-bold text-secondary-600 mb-1">
                            {formatCurrencyFn(planData.premium || 50000)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Flat annual premium for all eligible ages
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h5 className="font-medium text-gray-700 mb-3">
                        Optional Covers
                      </h5>

                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-700">Dental Cover</span>
                          <span className="font-semibold text-secondary-600">
                            {formatCurrencyFn(planData.dentalPremium || 10000)}
                          </span>
                        </div>

                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-700">Optical Cover</span>
                          <span className="font-semibold text-secondary-600">
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

          {/* Action buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex space-x-3 justify-between">
              <button
                onClick={onRequestCallback}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-700 bg-white rounded-lg hover:bg-primary-50 transition-colors"
              >
                <TbPhoneCall className="mr-2" /> Request Callback
              </button>

              <button
                onClick={() => onBuyPlan && onBuyPlan(planData)}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
              >
                <TbShoppingBag className="mr-2" /> Buy This Plan
                <TbChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanDetailsModal;
