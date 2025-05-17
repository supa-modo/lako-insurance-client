import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbArrowRight,
  TbInfoCircle,
  TbHeartPlus,
  TbCoin,
  TbUserSearch,
  TbUserCircle,
  TbCheck,
  TbShieldSearch,
} from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";

const SummaryStep = ({ formData, submitForm, prevStep }) => {
  // Prepare data for submission when the user clicks Compare Now
  const prepareDataForSubmission = () => {
    // Create a copy of the form data to avoid mutating the original
    const processedData = { ...formData };
    
    // Ensure age is properly formatted
    if (processedData.age && typeof processedData.age === "string") {
      // If age is in string format (e.g., "65-70" or "75+"), parse it
      if (processedData.age.includes("-")) {
        const [min, max] = processedData.age.split("-").map(Number);
        processedData.ageMin = min;
        processedData.ageMax = max;
      } else if (processedData.age.includes("+")) {
        const min = parseInt(processedData.age.replace("+", ""), 10);
        processedData.ageMin = min;
        processedData.ageMax = 120; // High upper limit
      } else {
        // Single age value
        const age = parseInt(processedData.age, 10);
        if (!isNaN(age)) {
          processedData.ageMin = age;
          processedData.ageMax = age;
        }
      }
    }
    
    // Ensure budget is properly formatted
    if (processedData.budgetValue) {
      // If we have a slider value, use it directly
      processedData.budgetMax = processedData.budgetValue;
    } else if (processedData.budget && typeof processedData.budget === "string") {
      // If budget is in string format (e.g., "5000-10000" or "15000+"), parse it
      if (processedData.budget.includes("-")) {
        const [min, max] = processedData.budget.split("-").map(Number);
        processedData.budgetMin = min;
        processedData.budgetMax = max;
      } else if (processedData.budget.includes("+")) {
        const min = parseInt(processedData.budget.replace("+", ""), 10);
        processedData.budgetMin = min;
      } else {
        // Single budget value
        const budget = parseInt(processedData.budget, 10);
        if (!isNaN(budget)) {
          processedData.budgetMax = budget;
        }
      }
    }
    
    // Ensure insurance type is set
    if (!processedData.insuranceType) {
      processedData.insuranceType = "seniors";
    }
    
    console.log("Prepared data for submission:", processedData);
    return processedData;
  };
  
  // Handle form submission with processed data
  const handleSubmit = () => {
    const processedData = prepareDataForSubmission();
    submitForm(processedData);
  };

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
    if (formData.budgetValue) {
      return `KSh. ${formData.budgetValue.toLocaleString()}`;
    }
    
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
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
          {/* Insurance Type */}
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            {/* <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 mr-4 shadow-sm">
              <TbHeartPlus className="h-6 w-6" />
            </div> */}
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Insurance Type
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {getInsuranceTypeDisplay()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Age Range */}
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            {/* <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 mr-4 shadow-sm">
              <TbUserCircle className="h-6 w-6" />
            </div> */}
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Age Range
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {formatAge()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Budget Range */}
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200 md:col-span-2">
            {/* <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 mr-4 shadow-sm">
              <TbCoin className="h-6 w-6" />
            </div> */}
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Budget Range
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {formatBudget()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbShieldSearch className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 font-semibold mb-1">
            What happens next?
          </p>
          <p className="text-primary-600 text-sm">
            We'll search across multiple insurance providers to find the plans
            with the most suitable options based on your preferences.
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
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center shadow-md hover:shadow-lg transition-all duration-200 group"
        >
          Compare Now
          <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};

export default SummaryStep;
