import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbCheck,
  TbHeartPlus,
  TbUsers,
  TbCoin,
  TbShieldCheck,
  TbArrowRight,
  TbUserSearch,
} from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";

const SummaryStep = ({ formData, submitForm, prevStep }) => {
  const formatAge = () => {
    if (formData.age && typeof formData.age === "string") {
      return formData.age.replace("-", " to ").replace("plus", "+");
    }

    // If we have numeric min/max values
    if (formData.ageMin !== undefined && formData.ageMax !== undefined) {
      if (formData.ageMin === formData.ageMax) {
        return `${formData.ageMin} years`;
      } else if (formData.ageMax >= 120) {
        return `${formData.ageMin}+ years`;
      } else {
        return `${formData.ageMin} to ${formData.ageMax} years`;
      }
    }

    return "Not specified";
  };

  const formatBudget = () => {
    if (formData.budget && typeof formData.budget === "string") {
      // Format string budget
      if (formData.budget.includes("-")) {
        return `KSh. ${formData.budget.replace("-", " to KSh. ")}`;
      } else if (formData.budget.includes("+")) {
        return `KSh. ${formData.budget.replace("+", " and above")}`;
      }
      return `KSh. ${formData.budget}`;
    }

    // If we have numeric min/max values
    if (formData.budgetMin !== undefined || formData.budgetMax !== undefined) {
      if (
        formData.budgetMin !== undefined &&
        formData.budgetMax !== undefined
      ) {
        // Have both min and max
        return `KSh. ${formData.budgetMin.toLocaleString()} to KSh. ${formData.budgetMax.toLocaleString()}`;
      } else if (formData.budgetMin !== undefined) {
        // Only have min
        return `KSh. ${formData.budgetMin.toLocaleString()} and above`;
      } else if (formData.budgetMax !== undefined) {
        // Only have max
        return `Up to KSh. ${formData.budgetMax.toLocaleString()}`;
      }
    }

    return "Not specified";
  };

  const formatOptionalCovers = () => {
    if (!formData.optionalCovers || formData.optionalCovers.length === 0) {
      return "None selected";
    }

    return formData.optionalCovers
      .map((cover) => {
        // Format cover for display
        if (cover === "outpatient") return "Outpatient Cover";
        if (cover === "dental") return "Dental Cover";
        if (cover === "optical") return "Optical Cover";
        if (cover === "chronic") return "Chronic Condition Management";
        return cover; // fallback to the original value
      })
      .join(", ");
  };

  const getInsuranceTypeDisplay = () => {
    if (formData.insuranceType === "seniors") {
      return "Seniors Cover";
    } else if (formData.insuranceType === "health") {
      return "Health Insurance";
    }
    return formData.insuranceType || "Not specified";
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="pl-2 lg:px-4 flex items-center justify-center text-secondary-300 mr-4">
          <TbCheck className="h-10 md:h-12 w-10 md:w-12" />
        </div>
        <div>
          <h3 className="text-white text-lg">Review Your Selections</h3>
          <p className="text-white/80 font-light text-[0.9rem] mt-1">
            Confirm your preferences before we find your perfect insurance plans
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4 mt-6">
        {/* Insurance Type */}
        <div className="flex items-start p-5 rounded-xl bg-white/10">
          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary-600 text-white mr-4">
            <TbHeartPlus className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <h4 className="text-white text-lg font-medium">Insurance Type</h4>
            <p className="text-secondary-200 font-bold">
              {getInsuranceTypeDisplay()}
            </p>
          </div>
        </div>

        {/* Age Range */}
        <div className="flex items-start p-5 rounded-xl bg-white/10">
          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary-600 text-white mr-4">
            <FaUserClock className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <h4 className="text-white text-lg font-medium">Age</h4>
            <p className="text-secondary-200 font-bold">{formatAge()}</p>
          </div>
        </div>

        {/* Budget Range */}
        <div className="flex items-start p-5 rounded-xl bg-white/10">
          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary-600 text-white mr-4">
            <TbCoin className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <h4 className="text-white text-lg font-medium">Budget</h4>
            <p className="text-secondary-200 font-bold">{formatBudget()}</p>
          </div>
        </div>

        {/* Optional Covers */}
        <div className="flex items-start p-5 rounded-xl bg-white/10">
          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary-600 text-white mr-4">
            <TbShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <h4 className="text-white text-lg font-medium">Optional Covers</h4>
            <p className="text-secondary-200 font-bold">
              {formatOptionalCovers()}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="mt-8 bg-secondary-500/20 backdrop-blur-sm rounded-lg p-4 flex items-start">
        <TbUserSearch className="text-secondary-300 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-white/90 text-sm">
          We'll search across multiple insurance providers to find the plans
          that best match your requirements. Click Compare Now to begin.
        </p>
      </div> */}

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
          onClick={submitForm}
          className="px-8 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          Compare Now
          <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};

export default SummaryStep;
