import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  TbCheck,
  TbCoins,
  TbInfoTriangleFilled,
  TbShieldHalfFilled,
  TbUsers,
  TbBuildingHospital,
} from "react-icons/tb";

// Form data based on real insurance tiers
const coverageOptions = [
  {
    value: "basic",
    label: "Basic Coverage",
    description:
      "Essential protection for fundamental health needs with lower limits",
    tiers: ["Copper", "Plan I", "Plan II"],
    inpatientRange: "300,000 - 1,000,000",
  },
  {
    value: "standard",
    label: "Standard Coverage",
    description:
      "Balanced protection with broader health benefits and moderate limits",
    tiers: ["Bronze", "Plan III"],
    inpatientRange: "1,000,000 - 2,000,000",
  },
  {
    value: "enhanced",
    label: "Enhanced Coverage",
    description:
      "Comprehensive coverage with higher limits and additional benefits",
    tiers: ["Silver", "Plan IV"],
    inpatientRange: "2,000,000 - 3,000,000",
  },
  {
    value: "premium",
    label: "Premium Coverage",
    description:
      "Premium level protection with extensive coverage and high limits",
    tiers: ["Gold", "Plan V"],
    inpatientRange: "3,000,000 - 5,000,000",
  },
  {
    value: "executive",
    label: "Executive Coverage",
    description: "Executive level coverage with superior benefits and service",
    tiers: ["Diamond", "Plan VI"],
    inpatientRange: "5,000,000 - 10,000,000",
  },
  {
    value: "royal",
    label: "Royal Coverage",
    description:
      "Top-tier protection with the highest limits and exclusive benefits",
    tiers: ["Platinum"],
    inpatientRange: "10,000,000+",
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
  // {
  //   value: "lastExpense",
  //   label: "Last Expense Cover",
  //   description: "Additional coverage for funeral expenses",
  //   defaultChecked: true,
  // },
];

const InsurancePreferencesStep = ({
  register,
  errors,
  watchedValues,
  onPrev,
  onSubmit,
}) => {
  return (
    <div className="space-y-6 sm:space-y-7">
      {/* <div className="mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary-400 flex items-center font-outfit">
          <TbShieldHalfFilled className="mr-3 text-secondary-500 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" />{" "}
          <span>Insurance Preferences</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base mt-2 text-neutral-300 font-outfit">
          Select your desired coverage level and optional covers to receive a comparison of the best insurance plans matching
          your needs.
        </p>
      </div> */}

      {/* Coverage Options with Detailed Cards */}
      <div className="space-y-3">
        <label className="text-sm sm:text-[1.1rem] font-semibold text-primary-400 flex items-center font-outfit">
          <TbShieldHalfFilled className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Desired
          Coverage Level - Inpatient Limit
        </label>
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
          {coverageOptions.map((option) => (
            <div
              key={option.value}
              className={`relative border-2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 
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
                  <div className="flex justify-between items-center">
                  <div className=" px-2 inline-block">
                    <p className="text-[0.9rem] text-neutral-800 font-semibold">
                      Kshs. {option.inpatientRange} 
                    </p>
                  </div>
                    {watchedValues.desiredCoverage === option.value && (
                      <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                        <TbCheck className="text-white h-3 w-3" />
                      </div>
                    )}
                  </div>
                 
                </div>
              </div>
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


      {/* Optional Covers */}
      <div className="space-y-3">
        <label className="text-sm sm:text-[1.1rem] font-semibold text-primary-400 flex items-center font-outfit">
          <TbBuildingHospital className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Optional Covers
        </label>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {optionalCovers.map((option) => (
            <div
              key={option.value}
              className={`relative border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 
              ${
                option.disabled
                  ? "border-neutral-200 bg-neutral-100/50 opacity-60 cursor-not-allowed"
                  : watchedValues.optionalCovers?.includes(option.value)
                  ? "border-secondary-500 bg-secondary-100 shadow-md transform scale-[1.01]"
                  : "border-neutral-200 hover:border-secondary-300 bg-white/80 hover:bg-neutral-100"
              }`}
              onClick={() => {
                if (!option.disabled) {
                  const input = document.getElementById(
                    `optionalCover-${option.value}`
                  );
                  if (input) input.click();
                }
              }}
            >
              <div className="flex items-start">
                <input
                  id={`optionalCover-${option.value}`}
                  type="checkbox"
                  className="sr-only"
                  value={option.value}
                  disabled={option.disabled}
                  defaultChecked={option.defaultChecked}
                  {...register("optionalCovers")}
                />
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-sm sm:text-base text-neutral-800 font-outfit">
                      {option.label}
                    </p>
                    {watchedValues.optionalCovers?.includes(option.value) &&
                      !option.disabled && (
                        <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                          <TbCheck className="text-white h-3 w-3" />
                        </div>
                      )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 font-outfit">
                    {option.description}
                  </p>
                  {option.disabled && (
                    <p className="mt-1 text-xs text-red-500 italic">
                      {option.disabledReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
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
