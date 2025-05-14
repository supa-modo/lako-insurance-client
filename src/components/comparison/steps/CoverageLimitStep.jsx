import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbShieldCheck,
  TbInfoCircle,
  TbCheck,
  TbCurrencyDollar,
} from "react-icons/tb";

// Coverage limit options
const coverageLimits = [
  {
    id: "basic",
    name: "Basic",
    inpatientRange: "0 - 300K",
    fullRange: "0 - 300,000",
    description: "Entry-level coverage for essential medical needs",
    color: "blue",
    benefits: ["Basic hospital care", "Emergency services"],
  },
  {
    id: "standard",
    name: "Standard",
    inpatientRange: "300K - 1M",
    fullRange: "300,000 - 1,000,000",
    description: "Balanced coverage for most medical situations",
    color: "green",
    recommended: true,
    benefits: ["Enhanced hospital care", "Specialist consultations"],
  },
  {
    id: "enhanced",
    name: "Enhanced",
    inpatientRange: "1M - 2M",
    fullRange: "1,000,000 - 2,000,000",
    description: "Comprehensive coverage with additional benefits",
    color: "yellow",
    benefits: ["Comprehensive hospital care", "Advanced diagnostics"],
  },
  {
    id: "premium",
    name: "Premium",
    inpatientRange: "2M - 3M",
    fullRange: "2,000,000 - 3,000,000",
    description: "Premium coverage with extensive benefits",
    color: "orange",
    benefits: ["Premium hospital care", "International coverage"],
  },
  {
    id: "executive",
    name: "Executive",
    inpatientRange: "3M - 5M",
    fullRange: "3,000,000 - 5,000,000",
    description: "High-end coverage with exclusive benefits",
    color: "red",
    benefits: ["Executive hospital care", "VIP medical services"],
  },
  {
    id: "elite",
    name: "Elite",
    inpatientRange: "5M+",
    fullRange: "5,000,000+",
    description: "Ultimate coverage with no compromise",
    color: "purple",
    benefits: ["Elite hospital care", "Global medical access"],
  },
];

const CoverageLimitStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleSelectCoverage = (coverageId) => {
    updateFormData("coverageLimit", coverageId);
  };

  // Helper function to get color classes based on the color name and selection state
  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      blue: {
        bg: isSelected ? "bg-blue-50" : "bg-white",
        border: isSelected ? "border-blue-500" : "border-slate-200",
        text: isSelected ? "text-blue-700" : "text-slate-800",
        secondaryText: isSelected ? "text-blue-600" : "text-slate-600",
        accent: "bg-blue-600",
        hover: "hover:border-blue-300",
        icon: "text-blue-500",
      },
      green: {
        bg: isSelected ? "bg-green-50" : "bg-white",
        border: isSelected ? "border-green-500" : "border-slate-200",
        text: isSelected ? "text-green-700" : "text-slate-800",
        secondaryText: isSelected ? "text-green-600" : "text-slate-600",
        accent: "bg-green-600",
        hover: "hover:border-green-300",
        icon: "text-green-500",
      },
      yellow: {
        bg: isSelected ? "bg-yellow-50" : "bg-white",
        border: isSelected ? "border-yellow-500" : "border-slate-200",
        text: isSelected ? "text-yellow-700" : "text-slate-800",
        secondaryText: isSelected ? "text-yellow-600" : "text-slate-600",
        accent: "bg-yellow-600",
        hover: "hover:border-yellow-300",
        icon: "text-yellow-500",
      },
      orange: {
        bg: isSelected ? "bg-orange-50" : "bg-white",
        border: isSelected ? "border-orange-500" : "border-slate-200",
        text: isSelected ? "text-orange-700" : "text-slate-800",
        secondaryText: isSelected ? "text-orange-600" : "text-slate-600",
        accent: "bg-orange-600",
        hover: "hover:border-orange-300",
        icon: "text-orange-500",
      },
      red: {
        bg: isSelected ? "bg-red-50" : "bg-white",
        border: isSelected ? "border-red-500" : "border-slate-200",
        text: isSelected ? "text-red-700" : "text-slate-800",
        secondaryText: isSelected ? "text-red-600" : "text-slate-600",
        accent: "bg-red-600",
        hover: "hover:border-red-300",
        icon: "text-red-500",
      },
      purple: {
        bg: isSelected ? "bg-purple-50" : "bg-white",
        border: isSelected ? "border-purple-500" : "border-slate-200",
        text: isSelected ? "text-purple-700" : "text-slate-800",
        secondaryText: isSelected ? "text-purple-600" : "text-slate-600",
        accent: "bg-purple-600",
        hover: "hover:border-purple-300",
        icon: "text-purple-500",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
    <div>
      <h3 className="text-slate-800 text-xl font-semibold mb-4">
        Select your preferred inpatient coverage limit
      </h3>
      <p className="text-slate-600 mb-6">
        The inpatient coverage limit determines the maximum amount covered for hospital stays and related medical services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {coverageLimits.map((limit) => {
          const isSelected = formData.coverageLimit === limit.id;
          const colors = getColorClasses(limit.color, isSelected);
          
          return (
            <motion.div
              key={limit.id}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-xl overflow-hidden border-2 ${colors.border} ${colors.bg} ${isSelected ? "shadow-md" : "shadow-sm"} ${!isSelected && colors.hover} transition-all duration-300 cursor-pointer`}
              onClick={() => handleSelectCoverage(limit.id)}
            >
              {limit.recommended && (
                <div className="absolute top-0 right-0">
                  <div className={`${colors.accent} text-white text-xs font-bold px-3 py-1 rounded-bl-lg`}>
                    RECOMMENDED
                  </div>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 rounded-full ${colors.bg === "bg-white" ? "bg-slate-100" : colors.bg} flex items-center justify-center mr-4`}>
                    <TbCurrencyDollar className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  
                  <div>
                    <h4 className={`text-xl font-bold ${colors.text}`}>{limit.name}</h4>
                    <p className={`text-sm ${colors.secondaryText}`}>
                      Kshs. {limit.inpatientRange}
                    </p>
                  </div>
                </div>

                <p className={`text-sm mb-3 ${colors.secondaryText}`}>{limit.description}</p>
                
                {/* Benefits */}
                <div className="flex flex-col space-y-2 mt-4">
                  {limit.benefits.map((benefit, idx) => (
                    <div key={idx} className={`flex items-center text-xs font-medium ${colors.secondaryText}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${isSelected ? colors.bg : "bg-slate-100"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? colors.accent : "bg-slate-500"}`}></div>
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>

                {isSelected && (
                  <div className="mt-4 flex justify-end">
                    <div className={`h-8 w-8 rounded-full ${colors.accent} text-white flex items-center justify-center shadow-md`}>
                      <TbCheck className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-blue-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-blue-800 font-semibold mb-1">Why Coverage Limits Matter</p>
          <p className="text-blue-700 text-sm">
            The inpatient coverage limit is the maximum amount an insurance provider will pay for hospital stays and related services. Higher limits provide better protection for serious medical conditions but typically come with higher premiums. Choose a limit that balances your healthcare needs with your budget constraints.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={formData.coverageLimit ? { scale: 1.03 } : {}}
          whileTap={formData.coverageLimit ? { scale: 0.97 } : {}}
          onClick={nextStep}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            formData.coverageLimit
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!formData.coverageLimit}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default CoverageLimitStep;
