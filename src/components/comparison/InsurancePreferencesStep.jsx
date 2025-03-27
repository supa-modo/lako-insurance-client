import React from "react";
import {
  FiShield,
  FiDollarSign,
  FiInfo,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { TbCheck, TbCoins, TbInfoTriangleFilled, TbShieldHalfFilled } from "react-icons/tb";

// Form data
const coverageOptions = [
  {
    value: "basic",
    label: "Basic Coverage",
    description: "Essential protection for fundamental health needs",
  },
  {
    value: "standard",
    label: "Standard Coverage",
    description: "Balanced protection with broader health benefits",
  },
  {
    value: "comprehensive",
    label: "Comprehensive Coverage",
    description: "Extensive coverage with additional wellness features",
  },
  {
    value: "premium",
    label: "Premium Coverage",
    description: "Top-tier protection with premium healthcare services",
  },
];

const budgetRanges = [
  {
    value: 30000,
    label: "Ksh 30,000 - 50,000",
    description: "Budget-friendly option",
  },
  {
    value: 50000,
    label: "Ksh 50,000 - 70,000",
    description: "Moderate coverage",
  },
  {
    value: 70000,
    label: "Ksh 70,000 - 100,000",
    description: "Comprehensive protection",
  },
  {
    value: 100000,
    label: "Ksh 100,000+",
    description: "Premium health security",
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
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-400 mb-4 sm:mb-6 flex items-center font-outfit">
        <TbShieldHalfFilled className="mr-3 text-secondary-500 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" />{" "}
        <span>Insurance Preferences</span>
      </h2>

      {/* Coverage Options with Detailed Cards */}
      <div className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {coverageOptions.map((option) => (
            <div
              key={option.value}
              className={`relative border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 
              ${
                watchedValues.desiredCoverage === option.value
                  ? "border-secondary-500 bg-secondary-100 shadow-md transform scale-[1.01]"
                  : "border-neutral-200 hover:border-secondary-300 bg-white/80 hover:bg-neutral-100"
              }`}
              onClick={() => {
                const input = document.getElementById(
                  `coverage-${option.value}`
                );
                if (input) input.click();
              }}
            >
              <div className="flex items-start">
                <input
                  id={`coverage-${option.value}`}
                  type="radio"
                  className="sr-only"
                  value={option.value}
                  {...register("desiredCoverage", {
                    required: "Please select a coverage level",
                  })}
                />
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-sm sm:text-base text-neutral-800 font-outfit">
                      {option.label}
                    </p>
                    {watchedValues.desiredCoverage === option.value && (
                      <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                        <TbCheck className="text-white h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 font-outfit">
                    {option.description}
                  </p>
                </div>
              </div>
              {/* {watchedValues.desiredCoverage === option.value && (
                <div className="absolute -top-1.5 -right-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-secondary-500 flex items-center justify-center shadow-md">
                  <TbCheck className="text-white h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </div>
              )} */}
            </div>
          ))}
        </div>
        {errors.desiredCoverage && (
          <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center">
            <TbInfoTriangleFilled className="mr-1 h-4 w-4 text-red-500" />{" "}
            {errors.desiredCoverage.message}
          </p>
        )}
      </div>

      {/* Budget Ranges with Detailed Cards */}
      <div className="space-y-3">
        <label className="text-sm sm:text-base font-semibold text-primary-400 flex items-center font-outfit">
          <TbCoins className="mr-2  h-5 w-5 sm:h-6 sm:w-6" /> Budget Range
          (Annual Premium)
        </label>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {budgetRanges.map((range) => (
            <div
              key={range.value}
              className={`relative border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 
              ${
                Number(watchedValues.budget) === range.value
                  ? "border-secondary-500 bg-secondary-100 shadow-md transform scale-[1.01]"
                  : "border-neutral-200 hover:border-secondary-300 bg-white/80 hover:bg-neutral-100"
              }`}
              onClick={() => {
                const input = document.getElementById(`budget-${range.value}`);
                if (input) input.click();
              }}
            >
              <div className="flex items-start">
                <input
                  id={`budget-${range.value}`}
                  type="radio"
                  className="sr-only"
                  value={range.value}
                  {...register("budget", {
                    required: "Please select a budget range",
                  })}
                />
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-sm sm:text-base text-neutral-800 font-outfit">
                      {range.label}
                    </p>
                    {Number(watchedValues.budget) === range.value && (
                      <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                        <TbCheck className="text-white h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 font-outfit">
                    {range.description}
                  </p>
                </div>
              </div>
              {/* {Number(watchedValues.budget) === range.value && (
                <div className="absolute -top-1.5 -right-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-secondary-500 flex items-center justify-center shadow-md">
                  <FiCheck className="text-white h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </div>
              )} */}
            </div>
          ))}
        </div>
        {errors.budget && (
          <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center">
            <TbInfoTriangleFilled className="mr-1 h-4 w-4 text-red-500" />{" "}
            {errors.budget.message}
          </p>
        )}
      </div>

      {/* Information Alert */}
      <div className="flex items-start p-3 sm:p-4 bg-primary-50 border border-primary-200 rounded-lg text-primary-800 space-x-3">
        <FiInfo className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-outfit">
            On submission of this form, you'll receive a comparison of
            insurance plans matched to your specific criteria.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 sm:gap-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          onClick={onPrev}
          className="w-1/2 h-10 sm:h-11 bg-white border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 
          text-xs sm:text-sm md:text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 
          transform font-outfit flex items-center justify-center gap-2"
        >
          <FiArrowLeft className="h-3.5 w-3.5" /> Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-1/2 h-10 sm:h-11 bg-secondary-500 hover:bg-secondary-600 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg
          shadow-md hover:shadow-lg transition-all duration-300 transform
          flex items-center justify-center gap-2 font-outfit"
        >
          Compare Plans <FiArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </div>
  );
};

export default InsurancePreferencesStep;
