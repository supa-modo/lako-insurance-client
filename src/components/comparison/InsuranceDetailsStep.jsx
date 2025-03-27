import React from "react";
import {
  FiDollarSign,
  FiShield,
  FiInfo,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { motion } from "framer-motion";

const InsuranceDetailsStep = ({
  register,
  errors,
  onPrevious,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center font-outfit">
        <FiShield className="mr-3 text-secondary-400 h-5 w-5 sm:h-6 sm:w-6" />{" "}
        Insurance Preferences
      </h2>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="coverage"
            className="text-sm font-medium text-white flex items-center font-outfit"
          >
            <FiShield className="mr-2 text-secondary-400 h-3.5 w-3.5" /> Desired
            Coverage
          </label>
          <select
            id="coverage"
            className={`w-full h-10 pl-3 pr-3 text-sm text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
            transition-all duration-200 focus:ring-2 focus:ring-secondary-400/30 focus:border-secondary-400 outline-none
            font-outfit appearance-none cursor-pointer
            ${
              errors.coverage
                ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                : "border-white/30"
            }`}
            {...register("coverage", {
              required: "Coverage is required",
            })}
          >
            <option value="" className="bg-neutral-800">
              Select coverage level
            </option>
            <option value="basic" className="bg-neutral-800">
              Basic Coverage
            </option>
            <option value="standard" className="bg-neutral-800">
              Standard Coverage
            </option>
            <option value="premium" className="bg-neutral-800">
              Premium Coverage
            </option>
            <option value="comprehensive" className="bg-neutral-800">
              Comprehensive Coverage
            </option>
          </select>
          {errors.coverage && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <FiInfo className="mr-1 h-3 w-3" /> {errors.coverage.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="budget"
            className="text-sm font-medium text-white flex items-center font-outfit"
          >
            <FiDollarSign className="mr-2 text-secondary-400 h-3.5 w-3.5" />{" "}
            Monthly Budget
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiDollarSign className="text-white/70 h-4 w-4" />
            </div>
            <input
              id="budget"
              type="number"
              min="100"
              step="50"
              className={`w-full h-10 pl-9 pr-3 text-sm text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
              transition-all duration-200 focus:ring-2 focus:ring-secondary-400/30 focus:border-secondary-400 outline-none
              font-outfit placeholder-white/50
              ${
                errors.budget
                  ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                  : "border-white/30"
              }`}
              placeholder="e.g. 300"
              {...register("budget", {
                required: "Budget is required",
                min: {
                  value: 100,
                  message: "Budget must be at least $100",
                },
              })}
            />
          </div>
          {errors.budget && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <FiInfo className="mr-1 h-3 w-3" /> {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="healthConditions"
            className="text-sm font-medium text-white flex items-center font-outfit"
          >
            <FiInfo className="mr-2 text-secondary-400 h-3.5 w-3.5" /> Health
            Conditions (Optional)
          </label>
          <textarea
            id="healthConditions"
            rows="3"
            className={`w-full px-3 py-2 text-sm text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
            transition-all duration-200 focus:ring-2 focus:ring-secondary-400/30 focus:border-secondary-400 outline-none
            font-outfit placeholder-white/50
            ${
              errors.healthConditions
                ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                : "border-white/30"
            }`}
            placeholder="List any pre-existing conditions..."
            {...register("healthConditions")}
          ></textarea>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="additionalInfo"
            className="text-sm font-medium text-white flex items-center font-outfit"
          >
            <FiInfo className="mr-2 text-secondary-400 h-3.5 w-3.5" />{" "}
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            rows="3"
            className={`w-full px-3 py-2 text-sm text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
            transition-all duration-200 focus:ring-2 focus:ring-secondary-400/30 focus:border-secondary-400 outline-none
            font-outfit placeholder-white/50
            ${
              errors.additionalInfo
                ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                : "border-white/30"
            }`}
            placeholder="Any other information you'd like us to know..."
            {...register("additionalInfo")}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          className="w-1/3 sm:w-1/4 h-11 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white 
          text-sm sm:text-base font-medium rounded-lg border border-white/30 hover:border-white/50
          transition-all duration-300 transform font-outfit
          flex items-center justify-center"
          onClick={onPrevious}
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-2/3 sm:w-3/4 h-11 sm:h-12 bg-secondary-500 hover:bg-secondary-600 text-white text-sm sm:text-base font-semibold rounded-lg
          shadow-lg hover:shadow-xl transition-all duration-300 transform font-outfit
          flex items-center justify-center gap-2"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Finding Best Plans...
            </>
          ) : (
            <>
              Find My Best Insurance Plans
              <FiArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default InsuranceDetailsStep;
