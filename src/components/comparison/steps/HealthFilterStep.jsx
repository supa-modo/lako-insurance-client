import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbCurrencyDollar,
  TbCheck,
  TbCoins,
  TbShieldHalfFilled,
} from "react-icons/tb";
import { PiCaretDownDuotone } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Budget ranges
const budgetRanges = [
  {
    id: "0-25000",
    label: "Ksh. 0 - 25,000",
    description: "premium per year",
    minValue: 0,
    maxValue: 25000,
  },
  {
    id: "25000-50000",
    label: "Ksh. 25,000 - 50,000",
    description: "premium per year",
    minValue: 25000,
    maxValue: 50000,
  },
  {
    id: "50000-75000",
    label: "Ksh. 50,000 - 75,000",
    description: "premium per year",
    minValue: 50000,
    maxValue: 75000,
    recommended: true,
  },
  {
    id: "75000-100000",
    label: "Ksh. 75,000 - 100,000",
    description: "premium per year",
    minValue: 75000,
    maxValue: 100000,
  },
  {
    id: "100000-150000",
    label: "Ksh. 100,000 - 150,000",
    description: "premium per year",
    minValue: 100000,
    maxValue: 150000,
  },
  {
    id: "150000+",
    label: "Ksh. 150,000+",
    description: "premium per year",
    minValue: 150000,
    maxValue: 1000000,
  },
];

// Coverage limit options
const coverageLimits = [
  {
    id: "basic",
    name: "Basic",
    range: "0 - 300K",
    minValue: 0,
    maxValue: 300000,
    description: "Entry-level coverage for essential medical needs",
    color: "blue",
  },
  {
    id: "standard",
    name: "Standard",
    range: "300K - 1M",
    minValue: 300000,
    maxValue: 1000000,
    description: "Balanced coverage for most medical situations",
    color: "green",
    recommended: true,
  },
  {
    id: "enhanced",
    name: "Enhanced",
    range: "1M - 2M",
    minValue: 1000000,
    maxValue: 2000000,
    description: "Comprehensive coverage with additional benefits",
    color: "teal",
  },
  {
    id: "premium",
    name: "Premium",
    range: "2M - 3M",
    minValue: 2000000,
    maxValue: 3000000,
    description: "Premium coverage with extensive benefits",
    color: "orange",
  },
  {
    id: "executive",
    name: "Executive",
    range: "3M - 5M",
    minValue: 3000000,
    maxValue: 5000000,
    description: "High-end coverage with exclusive benefits",
    color: "red",
  },
  {
    id: "elite",
    name: "Elite",
    range: "5M+",
    minValue: 5000000,
    maxValue: 10000000,
    description: "Ultimate coverage with no compromise",
    color: "purple",
  },
];

const HealthFilterStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [filterType, setFilterType] = useState(
    formData.healthFilterType || "budget"
  );
  const [selectedBudget, setSelectedBudget] = useState(
    formData.budget || "50000-75000"
  );
  const [selectedCoverage, setSelectedCoverage] = useState(
    formData.coverageLimit || "standard"
  );

  // Initialize form data with defaults
  useEffect(() => {
    let needsUpdate = false;

    // Set default filter type
    if (!formData.healthFilterType) {
      updateFormData("healthFilterType", "budget");
      needsUpdate = true;
    }

    // Set default budget if budget filter is selected and no budget is set
    if (
      (formData.healthFilterType === "budget" || !formData.healthFilterType) &&
      !formData.budget
    ) {
      const defaultBudget = "50000-75000";
      const selectedRange = budgetRanges.find(
        (range) => range.id === defaultBudget
      );
      updateFormData("budget", defaultBudget);
      updateFormData("budgetMin", selectedRange?.minValue || 50000);
      updateFormData("budgetMax", selectedRange?.maxValue || 75000);
      setSelectedBudget(defaultBudget);
      needsUpdate = true;
    }

    // Set default coverage if coverage filter is selected and no coverage is set
    if (formData.healthFilterType === "coverage" && !formData.coverageLimit) {
      const defaultCoverage = "standard";
      const selectedRange = coverageLimits.find(
        (limit) => limit.id === defaultCoverage
      );
      updateFormData("coverageLimit", defaultCoverage);
      updateFormData("coverageLimitMin", selectedRange?.minValue || 300000);
      updateFormData("coverageLimitMax", selectedRange?.maxValue || 1000000);
      setSelectedCoverage(defaultCoverage);
      needsUpdate = true;
    }
  }, [formData.healthFilterType]);

  // Additional effect to ensure defaults are always set on mount
  useEffect(() => {
    // If budget filter is active but no budget is selected, set default
    if (
      (filterType === "budget" || formData.healthFilterType === "budget") &&
      !selectedBudget &&
      !formData.budget
    ) {
      const defaultBudget = "50000-75000";
      const selectedRange = budgetRanges.find(
        (range) => range.id === defaultBudget
      );
      handleBudgetSelect(defaultBudget);
    }

    // If coverage filter is active but no coverage is selected, set default
    if (
      (filterType === "coverage" || formData.healthFilterType === "coverage") &&
      !selectedCoverage &&
      !formData.coverageLimit
    ) {
      const defaultCoverage = "standard";
      handleCoverageSelect(defaultCoverage);
    }
  }, [
    filterType,
    selectedBudget,
    selectedCoverage,
    formData.healthFilterType,
    formData.budget,
    formData.coverageLimit,
  ]);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    updateFormData("healthFilterType", type);

    // Clear the other filter when switching and set defaults for the selected type
    if (type === "budget") {
      // Clear coverage data
      updateFormData("coverageLimit", null);
      updateFormData("coverageLimitMin", null);
      updateFormData("coverageLimitMax", null);

      // Set default budget if not already set
      if (!formData.budget || !selectedBudget) {
        const defaultBudget = "50000-75000";
        const selectedRange = budgetRanges.find(
          (range) => range.id === defaultBudget
        );
        updateFormData("budget", defaultBudget);
        updateFormData("budgetMin", selectedRange?.minValue || 50000);
        updateFormData("budgetMax", selectedRange?.maxValue || 75000);
        setSelectedBudget(defaultBudget);
      }
    } else {
      // Clear budget data
      updateFormData("budget", null);
      updateFormData("budgetMin", null);
      updateFormData("budgetMax", null);

      // Set default coverage if not already set
      if (!formData.coverageLimit || !selectedCoverage) {
        const defaultCoverage = "standard";
        const selectedRange = coverageLimits.find(
          (limit) => limit.id === defaultCoverage
        );
        updateFormData("coverageLimit", defaultCoverage);
        updateFormData("coverageLimitMin", selectedRange?.minValue || 300000);
        updateFormData("coverageLimitMax", selectedRange?.maxValue || 1000000);
        setSelectedCoverage(defaultCoverage);
      }
    }
  };

  const handleBudgetSelect = (budgetId) => {
    setSelectedBudget(budgetId);
    const selectedRange = budgetRanges.find((range) => range.id === budgetId);

    updateFormData("budget", budgetId);
    updateFormData("budgetMin", selectedRange?.minValue || 0);
    updateFormData("budgetMax", selectedRange?.maxValue || 1000000);
  };

  const handleCoverageSelect = (coverageId) => {
    setSelectedCoverage(coverageId);
    const selectedRange = coverageLimits.find(
      (limit) => limit.id === coverageId
    );

    updateFormData("coverageLimit", coverageId);
    updateFormData("coverageLimitMin", selectedRange?.minValue || 0);
    updateFormData("coverageLimitMax", selectedRange?.maxValue || 10000000);
  };

  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      blue: {
        border: isSelected ? "border-blue-500" : "border-blue-200",
        bg: isSelected ? "bg-blue-50" : "bg-white",
        text: isSelected ? "text-blue-600" : "text-blue-500",
        accent: "bg-blue-500",
        hover: "hover:border-blue-300",
      },
      green: {
        border: isSelected ? "border-green-500" : "border-green-200",
        bg: isSelected ? "bg-green-50" : "bg-white",
        text: isSelected ? "text-green-600" : "text-green-500",
        accent: "bg-green-500",
        hover: "hover:border-green-300",
      },
      teal: {
        border: isSelected ? "border-teal-500" : "border-teal-200",
        bg: isSelected ? "bg-teal-50" : "bg-white",
        text: isSelected ? "text-teal-600" : "text-teal-500",
        accent: "bg-teal-500",
        hover: "hover:border-teal-300",
      },
      orange: {
        border: isSelected ? "border-orange-500" : "border-orange-200",
        bg: isSelected ? "bg-orange-50" : "bg-white",
        text: isSelected ? "text-orange-600" : "text-orange-500",
        accent: "bg-orange-500",
        hover: "hover:border-orange-300",
      },
      red: {
        border: isSelected ? "border-red-500" : "border-red-200",
        bg: isSelected ? "bg-red-50" : "bg-white",
        text: isSelected ? "text-red-600" : "text-red-500",
        accent: "bg-red-500",
        hover: "hover:border-red-300",
      },
      purple: {
        border: isSelected ? "border-purple-500" : "border-purple-200",
        bg: isSelected ? "bg-purple-50" : "bg-white",
        text: isSelected ? "text-purple-600" : "text-purple-500",
        accent: "bg-purple-500",
        hover: "hover:border-purple-300",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div>
      <p className="hidden lg:block text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Choose how you'd like to filter health insurance plans. You can either
        set a budget limit or specify your preferred inpatient coverage amount.
      </p>

      {/* Filter Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">
          Choose your comparison preference:
        </h3>

        <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-2xl mx-auto lg:max-w-none lg:mx-0">
          {/* Budget Filter Option */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            className={`px-2.5 pt-3 pb-4 md:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              filterType === "budget"
                ? "border-primary-500 bg-primary-50 shadow-md"
                : "border-slate-200 bg-white hover:border-primary-300"
            }`}
            onClick={() => handleFilterTypeChange("budget")}
          >
            <div className="flex flex-col md:flex-row gap-1.5 md:gap-0 items-center text-center md:text-left md:mb-3">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 ${
                  filterType === "budget"
                    ? "bg-primary-100 border border-primary-300"
                    : "bg-slate-200 border border-slate-300"
                }`}
              >
                <TbCoins
                  className={`w-5 h-5 md:w-6 md:h-6 ${
                    filterType === "budget"
                      ? "text-primary-600"
                      : "text-slate-500"
                  }`}
                />
              </div>
              <div>
                <h4
                  className={`font-semibold ${
                    filterType === "budget"
                      ? "text-primary-700"
                      : "text-slate-700"
                  }`}
                >
                  Budget Range
                </h4>
                <p
                  className={`text-[0.85rem] md:text-sm ${
                    filterType === "budget"
                      ? "text-primary-600"
                      : "text-slate-500"
                  }`}
                >
                  Annual premium amount
                </p>
              </div>
            </div>
            <p
              className={`hidden md:block text-sm ${
                filterType === "budget" ? "text-primary-600" : "text-slate-600"
              }`}
            >
              Set your annual premium budget and we'll find plans within that
              range.
            </p>
          </motion.div>

          {/* Coverage Limit Option */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            className={`px-2 pt-3 pb-4 md:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              filterType === "coverage"
                ? "border-secondary-500 bg-secondary-50 shadow-md"
                : "border-slate-200 bg-white hover:border-secondary-300"
            }`}
            onClick={() => handleFilterTypeChange("coverage")}
          >
            <div className="flex flex-col md:flex-row gap-1.5 md:gap-0 items-center text-center md:text-left md:mb-3">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 ${
                  filterType === "coverage"
                    ? "bg-secondary-100 border border-secondary-300"
                    : "bg-slate-200 border border-slate-300"
                }`}
              >
                <TbShieldHalfFilled
                  className={`w-5 h-5 md:w-6 md:h-6 ${
                    filterType === "coverage"
                      ? "text-secondary-600"
                      : "text-slate-500"
                  }`}
                />
              </div>
              <div>
                <h4
                  className={`font-semibold ${
                    filterType === "coverage"
                      ? "text-secondary-700"
                      : "text-slate-700"
                  }`}
                >
                  Coverage Limit
                </h4>
                <p
                  className={`text-[0.85rem] md:text-sm ${
                    filterType === "coverage"
                      ? "text-secondary-600"
                      : "text-slate-500"
                  }`}
                >
                  Yearly Inpatient Coverage
                </p>
              </div>
            </div>
            <p
              className={`hidden md:block text-sm ${
                filterType === "coverage"
                  ? "text-secondary-600"
                  : "text-slate-600"
              }`}
            >
              Choose your desired inpatient coverage amount and we'll find
              matching plans.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Budget Range Selection */}
      {filterType === "budget" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Select your budget range (premium per year):
          </h3>

          {/* Mobile Select Box - Hidden on lg and up */}
          <div className="lg:hidden mb-6">
            <div className="relative">
              <select
                value={selectedBudget || "50000-75000"}
                onChange={(e) => handleBudgetSelect(e.target.value)}
                className="w-full px-4 py-3 rounded-[0.6rem] shadow-md font-lexend font-semibold text-slate-600 border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-base bg-white"
              >
                {budgetRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
              <PiCaretDownDuotone className="w-5 h-5 pointer-events-none text-slate-600 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Desktop Button Grid - Hidden on lg and below */}
          <div className="hidden lg:grid grid-cols-3 gap-3 mb-6">
            {budgetRanges.map((range) => (
              <motion.div
                key={range.id}
                whileTap={{ scale: 0.99 }}
                className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-colors  ${
                  selectedBudget === range.id
                    ? "border-primary-500 bg-primary-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-primary-300 shadow-sm"
                }`}
                onClick={() => handleBudgetSelect(range.id)}
              >
                <div className="p-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        selectedBudget === range.id
                          ? "bg-primary-100 text-primary-500"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <TbCoins className="w-6 h-6" />
                    </div>
                    <h4
                      className={`text-lg font-bold ${
                        selectedBudget === range.id
                          ? "text-primary-600"
                          : "text-slate-600"
                      }`}
                    >
                      {range.label}
                    </h4>
                    <p
                      className={`text-sm ${
                        selectedBudget === range.id
                          ? "text-primary-600"
                          : "text-slate-500"
                      }`}
                    >
                      {range.description}
                    </p>
                  </div>

                  {selectedBudget === range.id && (
                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-md">
                      <TbCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Coverage Limit Selection */}
      {filterType === "coverage" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Select your preferred inpatient coverage limit:
          </h3>

          {/* Mobile Select Box - Hidden on lg and up */}
          <div className="lg:hidden mb-6">
            <label className="block text-sm  font-lexend font-semibold text-secondary-700 mb-2">
              Select Coverage Limit
            </label>
            <div className="relative">
              <select
                value={selectedCoverage || "standard"}
                onChange={(e) => handleCoverageSelect(e.target.value)}
                className="w-full px-4 py-3 rounded-[0.6rem] font-lexend font-semibold  shadow-md text-slate-600 border border-slate-300 focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 text-base bg-white"
              >
                {coverageLimits.map((limit) => (
                  <option key={limit.id} value={limit.id}>
                    {limit.name} - Ksh. {limit.range}
                  </option>
                ))}
              </select>
              <PiCaretDownDuotone className="w-5 h-5 pointer-events-none text-slate-600 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Desktop Button Grid - Hidden on lg and below */}
          <div className="hidden lg:grid grid-cols-3 gap-4 mb-6">
            {coverageLimits.map((limit) => (
              <motion.div
                key={limit.id}
                whileTap={{ scale: 0.99 }}
                className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-colors ${
                  selectedCoverage === limit.id
                    ? "border-secondary-500 bg-secondary-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-secondary-300 shadow-sm"
                }`}
                onClick={() => handleCoverageSelect(limit.id)}
              >
                <div className="p-4">
                  <div className="flex flex-col items-center">
                    <p
                      className={`text-lg font-bold ${
                        selectedCoverage === limit.id
                          ? "text-secondary-600"
                          : "text-slate-500"
                      }`}
                    >
                      Ksh. {limit.range}
                    </p>
                    <p
                      className={`text-xs mt-1 text-center ${
                        selectedCoverage === limit.id
                          ? "text-secondary-600"
                          : "text-slate-500"
                      }`}
                    >
                      Inpatient Coverage Limit
                    </p>
                  </div>

                  {selectedCoverage === limit.id && (
                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-secondary-500 text-white flex items-center justify-center shadow-md">
                      <TbCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 font-lexend border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <FaChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={nextStep}
          className="px-8 py-3  font-lexend rounded-lg flex items-center transition-all duration-200 font-medium shadow-md bg-primary-600 hover:bg-primary-700 text-white"
        >
          Continue
          <FaChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default HealthFilterStep;
