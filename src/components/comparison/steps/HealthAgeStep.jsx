import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbCalendar,
  TbInfoCircle,
  TbCheck,
  TbArrowBack,
  TbArrowBackUp,
  TbArrowRight,
  TbCalendarShare,
  TbCalendarDot,
} from "react-icons/tb";
import { LuAlignStartVertical } from "react-icons/lu";
import {
  PiCheckCircleFill,
  PiUserDuotone,
  PiCaretDownDuotone,
} from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const HealthAgeStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [inputMethod, setInputMethod] = useState("dateOfBirth"); // "dateOfBirth" or "ageRange"
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth || "");
  const [selectedAgeRange, setSelectedAgeRange] = useState(
    formData.ageRange || ""
  );
  const [calculatedAge, setCalculatedAge] = useState(null);
  const [error, setError] = useState("");

  // Age ranges for health insurance
  const ageRanges = [
    { value: "18-25", label: "18 - 25 " },
    { value: "26-35", label: "26 - 35 " },
    {
      value: "36-45",
      label: "36 - 45 ",
    },
    { value: "46-55", label: "46 - 55" },
    {
      value: "56-65",
      label: "56 - 65 ",
    },
    { value: "65-75", label: "65 - 75" },
    { value: "76-85", label: "76 - 85" },
    { value: "85+", label: "85+" },
  ];

  // Calculate age from date of birth
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    if (birth > today) return null;
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Handle date of birth change
  const handleDateOfBirthChange = (value) => {
    setDateOfBirth(value);
    setError("");
    if (value) {
      const age = calculateAge(value);
      if (age === null) {
        setError("Please enter a valid date of birth (not in the future)");
        setCalculatedAge(null);
      } else if (age < 0) {
        setError("Please enter a valid date of birth");
        setCalculatedAge(null);
      } else if (age < 18) {
        setError("Minimum age for health insurance is 18 years");
        setCalculatedAge(null);
      } else if (age > 120) {
        setError("Please verify the date of birth");
        setCalculatedAge(null);
      } else {
        setCalculatedAge(age);
        setError("");
      }
    } else {
      setCalculatedAge(null);
    }
  };

  // Handle age range selection
  const handleAgeRangeChange = (value) => {
    setSelectedAgeRange(value);
    setError("");
  };

  // Handle input method change
  const handleInputMethodChange = (method) => {
    setInputMethod(method);
    setError("");
    setCalculatedAge(null);
    if (method === "dateOfBirth") {
      setSelectedAgeRange("");
    } else {
      setDateOfBirth("");
    }
  };

  // Handle continue
  const handleContinue = () => {
    if (inputMethod === "dateOfBirth") {
      if (!dateOfBirth) {
        setError("Please select your date of birth");
        return;
      }
      if (calculatedAge === null || error) {
        setError("Please enter a valid date of birth");
        return;
      }
      updateFormData("dateOfBirth", dateOfBirth);
      updateFormData("age", calculatedAge);
      updateFormData("ageMin", calculatedAge);
      updateFormData("ageMax", calculatedAge);
      updateFormData("ageRange", "");
    } else {
      if (!selectedAgeRange) {
        setError("Please select an age range");
        return;
      }
      let ageMin, ageMax;
      if (selectedAgeRange.includes("+")) {
        ageMin = parseInt(selectedAgeRange.replace("+", ""));
        ageMax = 120;
      } else {
        const parts = selectedAgeRange.split("-");
        ageMin = parseInt(parts[0]);
        ageMax = parseInt(parts[1]);
      }
      updateFormData("ageRange", selectedAgeRange);
      updateFormData("ageMin", ageMin);
      updateFormData("ageMax", ageMax);
      updateFormData("age", selectedAgeRange);
      updateFormData("dateOfBirth", "");
    }
    nextStep();
  };

  useEffect(() => {
    if (calculatedAge !== null && inputMethod === "dateOfBirth") {
      const appropriateRange = ageRanges.find((range) => {
        if (range.value.includes("+")) {
          const minAge = parseInt(range.value.replace("+", ""));
          return calculatedAge >= minAge;
        } else {
          const [min, max] = range.value.split("-").map((age) => parseInt(age));
          return calculatedAge >= min && calculatedAge <= max;
        }
      });
      if (appropriateRange) {
        // For future: could auto-select or highlight
      }
    }
  }, [calculatedAge, inputMethod]);

  // Date input min/max
  const today = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);
  const minDateString = minDate.toISOString().split("T")[0];
  const isValidAge =
    calculatedAge !== null &&
    calculatedAge >= 18 &&
    calculatedAge <= 120 &&
    !error;
  const canContinue =
    (inputMethod === "dateOfBirth" && dateOfBirth && isValidAge) ||
    (inputMethod === "ageRange" && selectedAgeRange && !error);

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
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 md:w-14 lg:w-16 md:h-14 lg:h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-[0.7rem] flex items-center justify-center shadow-lg">
                    <LuAlignStartVertical className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-gray-600 leading-tight">
                      What's your age?
                    </h1>
                    <p className="text-[0.9rem] md:text-base text-neutral-600 font-medium">
                      Step 2 of 4
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=""
              >
                <p className="text-[0.9rem] md:text-base lg:text-lg text-gray-600 leading-relaxed">
                  Enter your date of birth for exact age calculation or use an
                  age range to find suitable health insurance plans for your age
                  group.
                </p>
              </motion.div>
              <div className="">
                <button
                  onClick={() =>
                    handleInputMethodChange(
                      inputMethod === "dateOfBirth" ? "ageRange" : "dateOfBirth"
                    )
                  }
                  className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-colors duration-200 shadow-sm"
                >
                  {inputMethod === "dateOfBirth" ? (
                    <TbCalendarShare className="w-[1rem] h-[1rem] md:w-[1.4rem] md:h-[1.4rem] mr-2 " />
                  ) : (
                    <TbCalendarDot className="w-[1rem] h-[1rem] md:w-[1.4rem] md:h-[1.4rem] mr-2 " />
                  )}

                  {inputMethod === "dateOfBirth"
                    ? "Use Age Range Instead"
                    : "Use Exact Age Instead"}
                  <FaArrowRight className="w-[0.8rem] h-[0.8rem] md:w-[0.9rem] md:h-[0.9rem] ml-2 " />
                </button>
              </div>
            </div>
            <div className="hidden lg:flex justify-start">
              <button
                onClick={prevStep}
                className="inline-flex items-center underline underline-offset-4 text-primary-500 hover:text-secondary-600 font-medium transition-colors duration-200"
              >
                <TbArrowBackUp className="w-5 h-5 mr-2" />
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
                    {inputMethod === "dateOfBirth"
                      ? "Your Date of Birth"
                      : "Select Age Range"}
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 mt-1">
                  {inputMethod === "dateOfBirth"
                    ? "This helps us show you age-relevant plans to choose from."
                    : "Choose your age group for plan recommendations."}
                </p>
              </div>

              {/* Form Content */}
              <div className="px-5 md:px-7 pt-4 pb-6 space-y-4 md:space-y-6">
                {inputMethod === "dateOfBirth" ? (
                  <>
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-semibold text-gray-600 mb-3"
                      >
                        Enter your date of birth
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="dateOfBirth"
                          value={dateOfBirth}
                          onChange={(e) =>
                            handleDateOfBirthChange(e.target.value)
                          }
                          min={minDateString}
                          max={today}
                          className={`w-full px-4 md:px-5 py-3 md:py-3.5 text-base md:text-lg border-2 rounded-[0.8rem] md:rounded-xl text-neutral-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 ${
                            error
                              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                              : isValidAge
                              ? "border-green-600 focus:border-green-500 focus:ring-green-100"
                              : "border-neutral-200"
                          }`}
                          placeholder="Enter your date of birth"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          {isValidAge ? (
                            <div className="w-16 h-10 px-2 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center shadow text-white font-bold text-lg">
                              {calculatedAge}{" "}
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
                  </>
                ) : (
                  <>
                    {/* Age Range Selection */}
                    <div>
                      {/* Mobile Select Box */}
                      <div className="lg:hidden relative">
                        <select
                          value={selectedAgeRange}
                          onChange={(e) => handleAgeRangeChange(e.target.value)}
                          className="w-full px-4 py-3 rounded-[0.6rem] font-semibold text-slate-600 border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-base bg-white"
                        >
                          <option value="">Choose your age range</option>
                          {ageRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                        <PiCaretDownDuotone className="w-5 h-5 pointer-events-none text-slate-600 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {/* Desktop Button Grid */}
                      <div className="hidden lg:grid grid-cols-3 gap-3 mt-2">
                        {ageRanges.map((range) => (
                          <motion.button
                            key={range.value}
                            type="button"
                            onClick={() => handleAgeRangeChange(range.value)}
                            className={`px-3 py-2 rounded-full border-[2.5px] text-center transition-all duration-300 shadow-sm hover:shadow-md ${
                              selectedAgeRange === range.value
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-neutral-600/30 bg-white text-gray-500/80 hover:border-secondary-300 hover:bg-secondary-100"
                            }`}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="font-bold  text-lg">
                              {range.label}
                              <span className="ml-1 text-[0.8rem] text-gray-400 font-paytone font-normal">
                                yrs
                              </span>
                            </div>
                          </motion.button>
                        ))}
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
                    {/* Selected Age Range Display */}
                    {selectedAgeRange &&
                      inputMethod === "dateOf Birth" &&
                      !error && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 300,
                          }}
                          className="relative overflow-hidden"
                        >
                          <div className="bg-gradient-to-br from-primary-50 via-primary-25 to-secondary-50 border-2 border-primary-200 rounded-[1.2rem] md:rounded-2xl py-2 md:py-2.5 px-4 md:px-5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline space-x-2">
                                <span className="text-2xl font-bold text-primary-700">
                                  {
                                    ageRanges.find(
                                      (r) => r.value === selectedAgeRange
                                    )?.label
                                  }
                                </span>
                                <span className="text-base font-medium text-primary-600">
                                  selected
                                </span>
                              </div>
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                                  <PiUserDuotone className="w-7 h-7 text-white" />
                                </div>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                  className="absolute bottom-2 right-2 "
                                >
                                  <PiCheckCircleFill className="w-4 h-4 text-secondary-200" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </>
                )}
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
                    <span>Continue</span>
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

export default HealthAgeStep;
