import React from "react";
import { motion } from "framer-motion";
import {
  TbInfoCircle,
  TbChevronLeft,
  TbShieldCheck,
  TbPlus,
  TbChevronRight,
  TbGitCompare,
  TbArrowRight,
} from "react-icons/tb";
import { BiGitCompare } from "react-icons/bi";

// Form data based on real insurance tiers
const coverageOptions = [
  {
    value: "basic",
    inpatientRange: "0 - 300K",
    fullrange: "0 - 300,000",
  },
  {
    value: "standard",
    inpatientRange: "300K - 1M",
    fullRange: "300,000 - 1,000,000",
  },
  {
    value: "enhanced",
    inpatientRange: "1M - 2M",
    fullRange: "1,000,000 - 2,000,000",
  },
  {
    value: "premium",
    inpatientRange: "2M - 3M",
    fullRange: "2,000,000 - 3,000,000",
  },
  {
    value: "executive",
    inpatientRange: "3M - 5M",
    fullRange: "3,000,000 - 5,000,000",
  },
  {
    value: "elite",
    inpatientRange: "5M+",
    fullRange: "5,000,000+",
  },
];

const optionalCovers = [
  {
    value: "outpatient",
    label: "Outpatient Cover",
    description: "Coverage for doctor visits, prescriptions, and routine care",
    defaultChecked: true,
  },
  {
    value: "dental",
    label: "Dental Cover",
    description: "Coverage for dental examinations, treatments, and procedures",
    defaultChecked: false,
  },
  {
    value: "optical",
    label: "Optical Cover",
    description: "Coverage for eye examinations, glasses, and vision care",
    defaultChecked: false,
  },
  {
    value: "maternity",
    label: "Maternity Cover",
    description: "Coverage for pregnancy-related care and childbirth",
    defaultChecked: false,
    disabled: true,
    disabledReason: "Not available for senior age brackets",
  },
];

const InsurancePreferencesStep = ({
  register,
  errors,
  watchedValues,
  onPrev,
  onSubmit,
}) => {
  return (
    <div className="mx-auto">
      {/* Coverage Options */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          {/* <TbShieldCheck className="text-secondary-400 mr-2" /> */}
          <label className="text-sm sm:text-base font-medium text-primary-300">
            Your Preferred Coverage Limits
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {coverageOptions.map((option) => (
            <label
              key={option.value}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-center
              ${
                watchedValues.desiredCoverage === option.value
                  ? "bg-gradient-to-r from-secondary-500/90 to-secondary-600 text-white shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <input
                id={`coverage-${option.value}`}
                type="radio"
                className="sr-only"
                value={option.value}
                {...register("desiredCoverage", {
                  required: "Please select a coverage level",
                })}
              />
              <div className="text-lg sm:text-xl font-semibold">
                <span className="text-xs sm:text-sm">Ksh.</span> {option.inpatientRange}
              </div>
              <div className="text-sm text-white/80">Inpatient Limit</div>
            </label>
          ))}
        </div>
        {errors.desiredCoverage && (
          <p className="mt-1 text-red-300 text-xs flex items-center">
            <TbInfoCircle className="mr-1 h-3.5 w-3.5 text-red-400" />
            {errors.desiredCoverage.message}
          </p>
        )}
      </div>

      {/* Optional Covers */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          {/* <TbPlus className="text-secondary-400 mr-2" /> */}
          <label className="text-sm sm:text-base font-medium text-primary-300">
            Optional Benefits
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {optionalCovers.map((option) => (
            <label
              key={option.value}
              className={`px-4 py-2.5 rounded-md cursor-pointer transition-all duration-200
              ${
                option.disabled
                  ? "opacity-60 cursor-not-allowed bg-white/5"
                  : watchedValues.optionalCovers?.includes(option.value)
                  ? "bg-gradient-to-r from-secondary-500/80 to-secondary-600 text-white shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <input
                id={`optionalCover-${option.value}`}
                type="checkbox"
                className="sr-only"
                value={option.value}
                disabled={option.disabled}
                defaultChecked={option.defaultChecked}
                {...register("optionalCovers")}
              />

              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-sm mr-3 flex items-center justify-center
                  ${
                    option.disabled
                      ? "bg-white/10"
                      : watchedValues.optionalCovers?.includes(option.value)
                      ? "bg-white text-secondary-500"
                      : "border border-white/40"
                  }`}
                >
                  {watchedValues.optionalCovers?.includes(option.value) &&
                    !option.disabled && <span className="text-xs">✓</span>}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium">{option.label}</div>
                  <div className="text-xs sm:text-sm text-white/70">
                    {option.description}
                  </div>
                </div>
              </div>

              {option.disabled && (
                <p className="mt-1 text-xs text-red-300/80 italic ml-7">
                  {option.disabledReason}
                </p>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          onClick={onPrev}
          className="w-1/3 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md
          transition-all duration-300 flex items-center justify-center shadow-sm"
        >
          <TbChevronLeft className="h-4 w-4 mr-1" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-2/3 py-3 flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-600 text-white font-medium rounded-md
          shadow-md hover:shadow-lg transition-all duration-300"
        >
          <BiGitCompare className="h-5 w-5 mr-2" />
          <span className="text-sm sm:text-base">Compare Plans</span>
          <TbArrowRight className="h-5 w-5 ml-1" />
        </motion.button>
      </div>
    </div>
  );
};

export default InsurancePreferencesStep;
