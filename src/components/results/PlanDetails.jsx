import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbCheck,
  TbX,
  TbClockDollar,
  TbMailFilled,
  TbPhoneCall,
  TbShieldHalfFilled,
  TbBuildingHospital,
  TbHeartRateMonitor,
  TbEye,
  TbCalendarTime,
  TbAmbulance,
  TbPlane,
  TbDeviceMobile,
  TbVirus,
  TbChevronDown,
  TbChevronUp,
  TbDownload,
  TbArrowLeft,
  TbInfoCircle,
  TbCoins,
  TbEyeglass2,
  TbCoffin,
  TbStethoscope,
} from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { PiTooth } from "react-icons/pi";

const PlanDetails = ({
  plan,
  formatCurrency,
  onRequestCallback,
  onBack,
  downloadStatus,
  onDownload,
}) => {
  const [activeTab, setActiveTab] = useState("inpatient");
  const [expandedSections, setExpandedSections] = useState(new Set());

  if (!plan) return null;

  // Extract the actual plan data which might be nested
  const planData = plan.plan || plan;

  // This ensures we're using the correct ID
  const planId = planData.id || plan.id;

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

  // Status indicator messages for download
  const statusMessages = {
    loading: "Downloading report...",
    success: "Download complete!",
    error: "Download failed! Try again.",
  };

  // Define benefit categories and icons
  const benefitCategories = {
    inpatient: [
      {
        title: "Overall Annual Limit",
        value: planData.inpatientCoverageLimit,
        icon: <TbShieldHalfFilled />,
        isAmount: true,
      },
      {
        title: "Room Accommodation",
        value: planData.bedLimit || planData.roomRate || "General Ward",
        icon: <TbBuildingHospital />,
        isAmount: false,
      },
      {
        title: "Pre-existing & Chronic Conditions",
        value: planData.inpatientCoverageLimit * 0.25, // Approximate value for illustration
        icon: <TbHeartRateMonitor />,
        isAmount: true,
        note: "Subject to 1 year waiting period",
      },
      {
        title: "Last Expense Cover",
        value: planData.lastExpenseCover,
        icon: <TbClockDollar />,
        isAmount: true,
      },
      {
        title: "Covid-19 Cover",
        value: planData.inpatientCoverageLimit * 0.3, // Approximate value for illustration
        icon: <TbVirus />,
        isAmount: true,
      },
      {
        title: "Ambulance Services",
        value: "Fully Covered",
        icon: <TbAmbulance />,
        isAmount: false,
      },
    ],
    outpatient: [
      {
        title: "Overall Annual Limit",
        value: planData.outpatientCoverageLimit,
        icon: <FaUserDoctor />,
        isAmount: true,
      },
      {
        title: "Consultation Fees",
        value: "Covered within limit",
        icon: <TbPhone />,
        isAmount: false,
      },
      {
        title: "Diagnostic Tests",
        value: "Covered within limit",
        icon: <TbDeviceMobile />,
        isAmount: false,
      },
      {
        title: "Prescribed Medication",
        value: "Covered within limit",
        icon: <TbMailFilled />,
        isAmount: false,
      },
    ],
    additional: [
      {
        title: "Dental Cover (Optional)",
        value: planData.outpatientCoverageLimit * 0.15, // Approximate value
        icon: <PiTooth />,
        isAmount: true,
        note: "Annual sub-limit, if dental option is selected",
      },
      {
        title: "Optical Cover (Optional)",
        value: planData.outpatientCoverageLimit * 0.15, // Approximate value
        icon: <TbEye />,
        isAmount: true,
        note: "Annual sub-limit, if optical option is selected",
      },
      {
        title: "Annual Health Check-up",
        value: 10000, // Standard amount across most plans
        icon: <TbCalendarTime />,
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
        icon: <TbPlane />,
        isAmount: false,
      },
    ],
    waiting: [
      {
        title: "General Illness",
        value: "30 days",
        icon: <TbCalendarTime />,
      },
      {
        title: "Pre-existing Conditions",
        value: "1 year",
        icon: <TbCalendarTime />,
      },
      {
        title: "Cancer Treatment",
        value: "2 years",
        icon: <TbCalendarTime />,
      },
      {
        title: "Psychiatric Conditions",
        value: "1 year",
        icon: <TbCalendarTime />,
      },
      {
        title: "Organ Transplant",
        value: "1 year",
        icon: <TbCalendarTime />,
      },
    ],
  };

  // Common exclusions for senior health plans
  const commonExclusions = [
    "Cosmetic or beauty treatment and/or surgery unless necessitated by an accident",
    "Massage treatments (except where medically prescribed)",
    "Naval, military and air force operations",
    "Expenses recoverable under any other insurance (e.g., NHIF, GPA)",
    "Self-inflicted injuries, suicide attempts, or treatment of alcoholism",
    "Experimental treatments or unproven medical treatments",
    "Weight management treatments and drugs",
    "Participation in professional or hazardous sports",
  ];

  // Toggle a section's expanded state
  const toggleSection = (id) => {
    setExpandedSections((prevSections) => {
      const newSections = new Set(prevSections);
      if (newSections.has(id)) {
        newSections.delete(id);
      } else {
        newSections.add(id);
      }
      return newSections;
    });
  };

  // Coverage Card Component for the top section
  const CoverageCard = ({ title, amount, icon, color }) => (
    <div className="bg-white border border-gray-200 shadow-sm px-4 py-3 sm:p-5 rounded-xl transition-all duration-300 hover:shadow-md hover:border-primary-200 group">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0 text-primary-600 group-hover:bg-primary-200 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-base sm:text-lg md:text-xl font-bold text-secondary-700 font-lexend">
            {typeof amount === "number"
              ? formatCurrencyFn(amount || 0)
              : amount}
          </p>
          <h4 className="text-gray-600 text-xs sm:text-sm font-medium">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );

  // Collapsible section component
  const CollapsibleSection = ({ title, children, id }) => {
    const isExpanded = expandedSections.has(id);

    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm hover:shadow-md transition-all duration-300">
        <button
          className="w-full px-5 py-3.5 bg-gradient-to-r from-primary-50 to-primary-100/50 hover:from-primary-100 hover:to-primary-200/50 transition-colors flex justify-between items-center"
          onClick={() => toggleSection(id)}
        >
          <span className="font-medium text-primary-700 font-lexend flex items-center">
            <TbInfoCircle className="mr-2 text-primary-500" size={18} />
            {title}
          </span>
          {isExpanded ? (
            <TbChevronUp className="text-primary-600" size={20} />
          ) : (
            <TbChevronDown className="text-primary-600" size={20} />
          )}
        </button>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key={`section-${id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-5 bg-white">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Back button for all devices */}
      <motion.button
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium text-sm"
      >
        <TbArrowLeft className="mr-2" size={18} /> Back to plan list
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">

        {/* Top banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <h3 className="text-white font-medium text-lg flex items-center font-lexend">
              <TbShieldHalfFilled className="mr-2" /> Insurance Plan Details
            </h3>
            <div className="flex items-center space-x-1.5">
              <div className="h-2 w-2 rounded-full bg-white/20"></div>
              <div className="h-2 w-2 rounded-full bg-white/20"></div>
              <div className="h-2 w-2 rounded-full bg-white/30"></div>
            </div>
          </div>
        </div>
        
        {/* Rank banner */}
        <div className="bg-gradient-to-r from-secondary-600 to-secondary-500 px-6 py-3 relative border-b border-secondary-700/20">
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
              <div className="h-7 w-7 bg-white rounded-full flex items-center justify-center text-secondary-600 font-bold shadow-sm">
                <span className="text-sm">{plan.rank || 1}</span>
              </div>
              <span className="text-white text-sm font-medium font-lexend">
                Ranked #{plan.rank || 1} Match for Your Needs
              </span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
              {plan.score ? Math.round(plan.score * 100) : 95}% Match Score
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-14 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                <img
                  src={planData.companyLogo || "/insurance-placeholder.png"}
                  alt={planData.companyName || "Insurance Company"}
                  className="max-h-8 max-w-16 object-contain"
                  onError={(e) => {
                    e.target.src = "/insurance-placeholder.png";
                  }}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    {planData.name || "Insurance Plan"}
                  </h2>
                  <span className="ml-2 bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded">
                    {planData.tier || planData.planType}
                  </span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-lexend">
                  {planData.companyName || "Insurance Company"} •{" "}
                  {planData.planType || "Standard"}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
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

          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <TbShieldHalfFilled className="mr-1 text-primary-500 h-4 w-4" />
                <span>Inpatient</span>
              </div>
              <p className="text-sm font-semibold font-lexend text-gray-800">
                {formatCurrencyFn(planData.inpatientCoverageLimit || 2000000)}
              </p>
            </div>

            <div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <TbStethoscope className="mr-1 text-primary-500 h-4 w-4" />
                <span>Outpatient</span>
              </div>
              <p className="text-sm font-semibold font-lexend text-gray-800">
                {formatCurrencyFn(planData.outpatientCoverageLimit || 200000)}
              </p>
            </div>

            <div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <TbBuildingHospital className="mr-1 text-primary-500 h-4 w-4" />
                <span>Room Type</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {planData.bedLimit || planData.roomRate || "General Ward"}
              </p>
            </div>
          </div>

          {/* Tabbed sections for benefits */}
          <div className="mb-6">
            <div className="flex border-b border-neutral-400 mb-4">
              {["inpatient", "outpatient", "additional", "waiting"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === tab
                        ? "text-secondary-600 border-b-2 border-secondary-600"
                        : "text-neutral-600 hover:text-neutral-800"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Benefits
                  </button>
                )
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {benefitCategories[activeTab].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start p-3 sm:px-4 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <div className="text-secondary-500 mt-1 mr-3 shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-[0.8rem] sm:text-sm  text-neutral-800">
                      {benefit.title}
                    </span>
                    <p className="text-[0.9rem] md:text-base text-secondary-700 font-semibold mt-1">
                      {benefit.isAmount
                        ? formatCurrencyFn(benefit.value)
                        : benefit.value}
                    </p>
                    {benefit.note && (
                      <p className="text-xs text-neutral-500 mt-1 italic">
                        {benefit.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible sections */}
          <CollapsibleSection title="Age-based Premiums" id="premiums">
            {typeof planData.premium === "object" ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(planData.premium).map(([ageRange, premium]) => (
                  <div
                    key={ageRange}
                    className="flex justify-between border-b pb-2 text-[0.8rem] sm:text-sm md:text-base"
                  >
                    <span className="font-medium text-neutral-700">
                      {ageRange} years
                    </span>
                    <span className="text-secondary-600 font-semibold ">
                      {formatCurrencyFn(premium)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
                This plan offers a flat rate of{" "}
                {formatCurrencyFn(planData.premium)} regardless of age.
              </p>
            )}
          </CollapsibleSection>

          <CollapsibleSection title="Eligibility Requirements" id="eligibility">
            <ul className="space-y-2 text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>Age: {planData.eligibilityAge || "65-85 years"}</span>
              </li>
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>
                  Medical examination required for new applicants aged 70 and
                  above
                </span>
              </li>
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>Existing members can renew without age restriction</span>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Plan Exclusions" id="exclusions">
            <ul className="space-y-2 text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
              {commonExclusions.map((exclusion, idx) => (
                <li key={idx} className="flex items-start">
                  <FiX className="text-red-500 mt-1 mr-2" />
                  <span className="">{exclusion}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Value Added Benefits" id="valueAdded">
            <ul className="space-y-2 text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>24/7 Customer support</span>
              </li>
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>Telemedicine services</span>
              </li>
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>Drug delivery services for chronic conditions</span>
              </li>
              <li className="flex items-start">
                <TbCheck className="text-green-600 mt-1 mr-2" />
                <span>Wellness programs and health education</span>
              </li>
            </ul>
          </CollapsibleSection>
        </div>
      </div>

      {/* Download Report Section */}
      {onDownload && (
        <div className=" bg-primary-50 border border-secondary-100 rounded-xl p-5 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
          <div className="w-full flex items-center space-x-3 ">
            <div className="h-10 w-10 rounded-full bg-secondary-500/20 flex items-center justify-center">
              <FiDownload className="h-5 w-5 text-secondary-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-primary-600 font-outfit">
                Download Report
              </h3>
              <p className="text-[0.8rem] sm:text-sm text-neutral-600 font-outfit">
                Get a detailed PDF breakdown of this plan
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full flex items-center justify-center px-4 py-3 
              ${
                downloadStatus === "loading"
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-secondary-500 hover:bg-secondary-600"
              } 
              text-white font-medium rounded-lg transition-colors font-outfit shadow-md`}
            onClick={onDownload}
            disabled={downloadStatus === "loading"}
          >
            <TbDownload className="mr-2" />
            Download PDF Report
          </motion.button>
          </div>
          

          {downloadStatus && downloadStatus !== "idle" ? (
            <div
              className={`rounded-lg p-3 mt-3 text-sm flex items-center justify-center
              ${
                downloadStatus === "loading"
                  ? "bg-blue-100 text-blue-700"
                  : downloadStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {downloadStatus === "loading" && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {statusMessages[downloadStatus]}
            </div>
          ) : null}

          
        </div>
      )}

      <div className="bg-secondary-50 border border-secondary-100 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 md:max-w-[50%]">
              <h3 className="text-base sm:text-lg font-bold text-primary-600 mb-2">
                Need Help With This Plan?
              </h3>
              <p className="text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
                Our insurance experts are ready to answer any questions and help
                you get enrolled in the {planData.name} plan.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:+254700000000`}
                className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all text-[0.8rem] sm:text-sm md:text-base"
              >
                <TbPhoneCall className="mr-2" size={20} /> Call Expert
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all text-[0.8rem] sm:text-sm md:text-base"
                onClick={onRequestCallback}
              >
                <TbMailFilled className="mr-2" size={20} /> Request Callback
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
