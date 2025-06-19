import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbCalendar,
  TbUser,
  TbUserCheck,
  TbInfoCircle,
  TbArrowRight,
} from "react-icons/tb";
import {
  PiCaretDownDuotone,
  PiUserCheckBold,
  PiUserCheckDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    { value: "18-25", label: "18 - 25 years", description: "Young adults" },
    { value: "26-35", label: "26 - 35 years", description: "Adults" },
    {
      value: "36-45",
      label: "36 - 45 years",
      description: "Middle-aged adults",
    },
    { value: "46-55", label: "46 - 55 years", description: "Mature adults" },
    {
      value: "56-65",
      label: "56 - 65 years",
      description: "Pre-senior adults",
    },
    { value: "65-75", label: "65 - 75 years", description: "Senior citizens" },
    { value: "76-85", label: "76 - 85 years", description: "Elderly" },
    { value: "85+", label: "85+ years", description: "Very elderly" },
  ];

  // Calculate age from date of birth
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) {
      return null; // Invalid future date
    }

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

    // Clear the other input
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

      // Update form data with date of birth and calculated age
      updateFormData("dateOfBirth", dateOfBirth);
      updateFormData("age", calculatedAge);
      updateFormData("ageMin", calculatedAge);
      updateFormData("ageMax", calculatedAge);

      // Clear age range since we're using date of birth
      updateFormData("ageRange", "");
    } else {
      // inputMethod === "ageRange"
      if (!selectedAgeRange) {
        setError("Please select an age range");
        return;
      }

      // Parse age range
      let ageMin, ageMax;
      if (selectedAgeRange.includes("+")) {
        ageMin = parseInt(selectedAgeRange.replace("+", ""));
        ageMax = 120;
      } else {
        const parts = selectedAgeRange.split("-");
        ageMin = parseInt(parts[0]);
        ageMax = parseInt(parts[1]);
      }

      // Update form data with age range
      updateFormData("ageRange", selectedAgeRange);
      updateFormData("ageMin", ageMin);
      updateFormData("ageMax", ageMax);
      updateFormData("age", selectedAgeRange);

      // Clear date of birth since we're using age range
      updateFormData("dateOfBirth", "");
    }

    nextStep();
  };

  // Auto-select appropriate age range based on calculated age
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
        console.log(
          `Auto-selected age range ${appropriateRange.value} for age ${calculatedAge}`
        );
      }
    }
  }, [calculatedAge, inputMethod]);

  return (
    <div className="lg:px-6">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 mb-3 md:mb-4">
          What's your age?
        </h2>
        <p className="text-slate-600 text-[0.95rem] md:text-base lg:text-lg mb-3 md:mb-6">
          Help us find the most suitable health insurance plans for your age
          group.
        </p>

        {/* Input Method Selection */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6">
          <motion.button
            type="button"
            onClick={() => handleInputMethodChange("dateOfBirth")}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              inputMethod === "dateOfBirth"
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.98 }}
          >
            <TbCalendar className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">Date of Birth</span>
            <p className="text-sm mt-1 opacity-80">Exact age calculation</p>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => handleInputMethodChange("ageRange")}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              inputMethod === "ageRange"
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.98 }}
          >
            <PiUserDuotone className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">Age Range</span>
            <p className="text-sm mt-1 opacity-80">Select age group</p>
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {inputMethod === "dateOfBirth" ? (
          <motion.div
            key="dateOfBirth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => handleDateOfBirthChange(e.target.value)}
                max={new Date().toISOString().split("T")[0]} // Prevent future dates
                min="1920-01-01" // Reasonable minimum date
                className="w-full px-4 py-3 rounded-[0.6rem] border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-base md:text-lg"
                placeholder="Select your date of birth"
              />
            </div>

            {calculatedAge !== null && !error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 border border-green-200 rounded-[0.6rem] p-3 md:p-4"
              >
                <div className="flex items-center">
                  <PiUserCheckDuotone className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    Your current age: {calculatedAge} years
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="ageRange"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Mobile Select Box - Hidden on md and up */}
            <div className="lg:hidden">
              <label className="block text-sm font-lexend font-semibold text-primary-700 mb-2">
                Select Age Range
              </label>
              <div className="relative">
                <select
                  value={selectedAgeRange}
                  onChange={(e) => handleAgeRangeChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-[0.6rem] font-lexend font-semibold text-slate-600 border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-base bg-white"
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
            </div>

            {/* Desktop Button Grid - Hidden on sm and below */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              {ageRanges.map((range) => (
                <motion.button
                  key={range.value}
                  type="button"
                  onClick={() => handleAgeRangeChange(range.value)}
                  className={`p-4  rounded-xl border-2 text-left transition-all duration-300 shadow-sm hover:shadow-md ${
                    selectedAgeRange === range.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="font-semibold text-lg mb-1">
                    {range.label}
                  </div>
                  <div className="text-sm opacity-80 truncate">
                    {range.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-red-100 border border-red-200 rounded-[0.6rem] text-[0.95rem] md:text-base p-3 md:p-4"
          >
            <div className="flex items-center text-red-800">
              <TbInfoCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8 pb-3">
        <motion.button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 flex items-center justify-center font-lexend border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaChevronLeft className="mr-2" />
          <span>Back</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleContinue}
          disabled={
            (inputMethod === "dateOfBirth" &&
              (!dateOfBirth || calculatedAge === null || error)) ||
            (inputMethod === "ageRange" && !selectedAgeRange)
          }
          className={`px-8 py-3 rounded-lg font-medium font-lexend transition-all flex items-center justify-center ${
            (inputMethod === "dateOfBirth" &&
              (!dateOfBirth || calculatedAge === null || error)) ||
            (inputMethod === "ageRange" && !selectedAgeRange)
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-primary-700 to-primary-600 text-white hover:from-primary-800 hover:to-primary-700 shadow-lg hover:shadow-xl"
          }`}
          whileHover={
            !(
              (inputMethod === "dateOfBirth" &&
                (!dateOfBirth || calculatedAge === null || error)) ||
              (inputMethod === "ageRange" && !selectedAgeRange)
            )
              ? { scale: 1.005 }
              : {}
          }
          whileTap={
            !(
              (inputMethod === "dateOfBirth" &&
                (!dateOfBirth || calculatedAge === null || error)) ||
              (inputMethod === "ageRange" && !selectedAgeRange)
            )
              ? { scale: 0.98 }
              : {}
          }
        >
          <span>Continue</span>
          <FaChevronRight className="w-4 md:w-5 h-4 md:h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default HealthAgeStep;
