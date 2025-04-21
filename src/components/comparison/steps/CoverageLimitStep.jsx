import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbShieldCheck,
  TbInfoCircle,
} from "react-icons/tb";

// Coverage limit options
const coverageLimits = [
  {
    id: "basic",
    name: "Basic",
    inpatientRange: "0 - 300K",
    fullRange: "0 - 300,000",
    description: "Entry-level coverage for essential medical needs",
    color: "from-blue-500/80 to-blue-600",
  },
  {
    id: "standard",
    name: "Standard",
    inpatientRange: "300K - 1M",
    fullRange: "300,000 - 1,000,000",
    description: "Balanced coverage for most medical situations",
    color: "from-green-500/80 to-green-600",
    recommended: true,
  },
  {
    id: "enhanced",
    name: "Enhanced",
    inpatientRange: "1M - 2M",
    fullRange: "1,000,000 - 2,000,000",
    description: "Comprehensive coverage with additional benefits",
    color: "from-yellow-500/80 to-yellow-600",
  },
  {
    id: "premium",
    name: "Premium",
    inpatientRange: "2M - 3M",
    fullRange: "2,000,000 - 3,000,000",
    description: "Premium coverage with extensive benefits",
    color: "from-orange-500/80 to-orange-600",
  },
  {
    id: "executive",
    name: "Executive",
    inpatientRange: "3M - 5M",
    fullRange: "3,000,000 - 5,000,000",
    description: "High-end coverage with exclusive benefits",
    color: "from-red-500/80 to-red-600",
  },
  {
    id: "elite",
    name: "Elite",
    inpatientRange: "5M+",
    fullRange: "5,000,000+",
    description: "Ultimate coverage with no compromise",
    color: "from-purple-500/80 to-purple-600",
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

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="pl-2 lg:px-4 flex items-center justify-center text-secondary-300 mr-4">
          <TbShieldCheck className="h-10 md:h-12 w-10 md:w-12" />
        </div>
        <div>
          <h3 className="text-white text-lg">
            Select your preferred inpatient coverage limit
          </h3>
          <p className="text-white/80 font-light text-sm mt-1">
            This determines the maximum amount covered for hospital stays
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {coverageLimits.map((limit) => (
          <motion.div
            key={limit.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
              formData.coverageLimit === limit.id
                ? `bg-gradient-to-r ${limit.color} shadow-lg`
                : "bg-white/20 hover:bg-white/25"
            } transition-all duration-300`}
            onClick={() => handleSelectCoverage(limit.id)}
          >
            {limit.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-secondary-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Recommended
                </div>
              </div>
            )}

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-white text-xl font-medium">{limit.name}</h4>
                <span className="text-white font-bold">
                  {limit.inpatientRange}
                </span>
              </div>

              <p className="text-white/70 text-sm">{limit.description}</p>

              {formData.coverageLimit === limit.id && (
                <div className="mt-3 flex justify-end">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <TbChevronRight className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-primary-700/50 rounded-lg p-4 flex items-start">
        <TbInfoCircle className="text-secondary-300 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-white/80 text-sm">
          The inpatient coverage limit is the maximum amount an insurance
          provider will pay for hospital stays and related services. Higher
          limits provide better protection for serious medical conditions but
          typically come with higher premiums.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-all duration-300"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className={`px-6 py-3 rounded-lg flex items-center transition-all duration-300 ${
            formData.coverageLimit
              ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white"
              : "bg-white/10 text-white/50 cursor-not-allowed"
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
