import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbInfoCircle, TbShieldHalfFilled, TbUserCircle } from "react-icons/tb";

const AgeInputStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [age, setAge] = useState(formData.age || "");
  const [error, setError] = useState("");

  // Determine cover type based on age
  const determineCoverType = (ageValue) => {
    const numAge = parseInt(ageValue, 10);
    
    if (isNaN(numAge)) {
      return "";
    } else if (numAge < 18) {
      return "child";
    } else if (numAge >= 60) {
      return "seniors";
    } else {
      return "adult";
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    
    // Validate age
    if (value && (isNaN(value) || parseInt(value, 10) <= 0 || parseInt(value, 10) > 120)) {
      setError("Please enter a valid age between 1 and 120");
    } else {
      setError("");
      updateFormData("age", value);
      
      // Determine and update cover type
      const coverType = determineCoverType(value);
      updateFormData("coverType", coverType);
    }
  };

  const handleContinue = () => {
    if (!error && age) {
      nextStep();
    }
  };

  // Get cover type label
  const getCoverTypeLabel = () => {
    const coverType = formData.coverType;
    
    if (!coverType) return "";
    
    switch (coverType) {
      case "child":
        return "Child Cover (Below 18 years)";
      case "adult":
        return "Adult Cover (18-59 years)";
      case "seniors":
        return "Seniors Cover (60+ years)";
      default:
        return "";
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-2 md:mb-4">Enter Age</h2>
      
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Please enter the age of the person to be insured. This will help us determine the appropriate cover type.
      </p>

      <div className="max-w-md mx-auto">
        <div className="form-group mb-6">
          <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-2">
            Age (years) *
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
            className={`w-full px-4 py-3 bg-slate-100 text-gray-600 rounded-lg border focus:ring-1 ${
              error ? "border-red-300 focus:ring-red-300 focus:border-red-500" : "border-slate-400/60 focus:ring-primary-300 focus:border-primary-500"
            } outline-none transition-all text-base md:text-lg text-center font-medium`}
            placeholder="Enter age"
            min="1"
            max="120"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {formData.coverType && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 p-4 rounded-lg border border-secondary-200 bg-secondary-50"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                <TbShieldHalfFilled className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <h4 className="text-slate-500 text-sm md:text-base font-medium">Cover Type Determined:</h4>
                <p className="text-secondary-600 font-semibold">{getCoverTypeLabel()}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
          <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-primary-700 text-sm">
             We'll show you plans that are specifically designed for the age group you select.
            </p>
          </div>
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
          whileHover={age && !error ? { scale: 1.03 } : {}}
          whileTap={age && !error ? { scale: 0.97 } : {}}
          onClick={handleContinue}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            age && !error
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!age || error}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default AgeInputStep;
