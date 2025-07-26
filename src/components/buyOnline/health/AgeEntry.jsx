import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbCalendar,
  TbChevronRight,
  TbInfoCircle,
  TbUser,
  TbShieldCheck,
  TbClock,
  TbCheck,
  TbCurrencyDollar,
  TbChevronLeft,
  TbArrowBack,
} from "react-icons/tb";
import { LuAlignStartVertical } from "react-icons/lu";
import {
  PiCheckCircleFill,
  PiCheckDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa6";

const AgeEntry = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth || "");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  // Update age when date of birth changes
  useEffect(() => {
    const calculatedAge = calculateAge(dateOfBirth);
    setAge(calculatedAge);

    // Clear previous error
    setError("");

    // Validate age
    if (calculatedAge !== null) {
      if (calculatedAge < 0) {
        setError("Please enter a valid date of birth");
      } else if (calculatedAge > 120) {
        setError("Please enter a valid date of birth");
      }
    }
  }, [dateOfBirth]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDateOfBirth(newDate);
    updateFormData("dateOfBirth", newDate);
  };

  const handleContinue = () => {
    if (!dateOfBirth) {
      setError("Please enter your date of birth");
      return;
    }

    if (age === null || age < 0 || age > 120) {
      setError("Please enter a valid date of birth");
      return;
    }

    if (age < 18) {
      setError("Health insurance is available for ages 18 and above");
      return;
    }

    // Update form data with calculated age
    updateFormData("userAge", age);
    nextStep();
  };

  // Calculate max date (today) for date input
  const today = new Date().toISOString().split("T")[0];
  // Calculate min date (120 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);
  const minDateString = minDate.toISOString().split("T")[0];

  const isValidAge = age !== null && age >= 18 && age <= 120 && !error;
  const canContinue = dateOfBirth && isValidAge;

  return (
    <div className="min-h-[50vh] flex items-center justify-center md:py-3 lg:py-4">
      <div className="max-w-5xl w-full mx-auto md:px-2 lg:px-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Section - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-8"
          >
            {/* Header Section */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 md:w-14 lg:w-16 md:h-14 lg:h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-[0.7rem] flex items-center justify-center shadow-lg">
                    <LuAlignStartVertical className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-gray-600 leading-tight">
                      Let's Get Started
                    </h1>
                    <p className="text-[0.9rem] md:text-base text-neutral-600 font-medium">
                      Step 1 of 6
                    </p>
                  </div>
                </motion.div>

                {/* Back Button */}
                <div className="flex justify-start lg:hidden">
                  <button
                    onClick={prevStep}
                    className="inline-flex items-center text-[0.95rem] md:text-base underline underline-offset-4 text-primary-500 hover:text-secondary-600 font-semibold transition-colors duration-200"
                  >
                    <TbArrowBack className="w-5 h-5 mr-2" />
                    Go Back
                  </button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <p className="text-[0.9rem] md:text-base lg:text-lg text-gray-600 leading-relaxed">
                  Enter your date of birth to get eligible health insurance
                  plans for your age group.
                </p>
              </motion.div>
            </div>

            {/* Back Button */}
            <div className="hidden lg:flex justify-start">
              <button
                onClick={prevStep}
                className="inline-flex items-center underline underline-offset-4 text-primary-500 hover:text-secondary-600 font-medium transition-colors duration-200"
              >
                <TbArrowBack className="w-5 h-5 mr-2" />
                Back to Insurance Types
              </button>
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Form Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-neutral-300 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-neutral-100/60 to-neutral-100 px-5 md:px-8 py-4 md:py-6 border-b border-neutral-200">
                <div className="flex items-center space-x-3">
                  <TbCalendar className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg md:text-xl font-bold text-neutral-800">
                    Your Date of Birth
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 mt-1">
                  This helps us show you age-relevant plans to choose from.
                </p>
              </div>

              {/* Form Content */}
              <div className="px-5 md:px-8 pt-4 pb-6 space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-semibold text-gray-600 mb-3"
                  >
                    Select your date of birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="dateOfBirth"
                      value={dateOfBirth}
                      onChange={handleDateChange}
                      min={minDateString}
                      max={today}
                      className={`w-full px-4 md:px-5 py-3 md:py-3.5 text-base md:text-lg border-2 rounded-[0.8rem] md:rounded-xl text-neutral-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 ${
                        error
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : isValidAge
                          ? "border-green-600 focus:border-green-500 focus:ring-green-100"
                          : "border-neutral-200"
                      }`}
                      placeholder="Select your date of birth"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {isValidAge ? (
                        <div className="w-16 h-10 px-2 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center shadow text-white font-bold text-lg">
                          {age}{" "}
                          <span className="text-[0.8rem] ml-1 font-medium">
                            yrs
                          </span>
                        </div>
                      ) : (
                        <TbCalendar className="w-6 h-6 text-neutral-400" />
                      )}
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 md:mt-3 flex items-center space-x-2 text-red-600"
                    >
                      <TbInfoCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </motion.div>
                  )}
                </div>

                {/* Age Display */}
                {/* Removed: was below input, now shown in input as circle */}

                {/* Continue Button */}
                <motion.button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  whileHover={canContinue ? { scale: 1.01 } : {}}
                  whileTap={canContinue ? { scale: 0.99 } : {}}
                  className={`w-full py-3 md:py-3.5 px-5 md:px-6 rounded-[0.8rem] md:rounded-xl font-semibold text-base md:text-lg transition-all duration-300 ${
                    canContinue
                      ? "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>Click to Continue</span>
                    <FaChevronRight className="w-[1rem] h-[1rem] md:w-[1.1rem] md:h-[1.1rem]" />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AgeEntry;
