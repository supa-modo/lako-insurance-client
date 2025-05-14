import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbCurrencyDollar,
  TbCheck,
  TbCoins,
} from "react-icons/tb";

// Budget ranges with descriptions and a recommended option
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
    maxValue: 1000000, // Using a high value for "plus" ranges
  },
];

const BudgetRangeStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  // Find selected budget range from formData
  const getSelectedBudgetId = () => {
    if (!formData.budget) {
      return (
        budgetRanges.find((range) => range.id === "50000-75000")?.id ||
        budgetRanges[2].id
      );
    }

    // If formData.budget is a number, find the matching range
    if (typeof formData.budget === "number") {
      const matchingRange = budgetRanges.find((range) => {
        if (range.id === "150000+") {
          return formData.budget >= 150000;
        }

        const [min, max] = range.id.split("-").map(Number);
        return formData.budget >= min && formData.budget <= max;
      });

      return matchingRange?.id || budgetRanges[2].id;
    }

    // If formData.budget is already in range id format, use it
    return formData.budget;
  };

  const [selectedBudget, setSelectedBudget] = useState(getSelectedBudgetId());

  // Set the initial budget if not already set
  useEffect(() => {
    if (!formData.budget) {
      // Find the selected range
      const selectedRange = budgetRanges.find(
        (range) => range.id === selectedBudget
      );

      // Store both the range ID (for UI) and the numeric values (for API)
      updateFormData("budget", selectedBudget);
      updateFormData("budgetMin", selectedRange?.minValue || 50000);
      updateFormData("budgetMax", selectedRange?.maxValue || 75000);
    }
  }, []);

  // Handle clicking on a budget range card
  const handleSelectBudget = (budgetId) => {
    setSelectedBudget(budgetId);

    // Find the selected range
    const selectedRange = budgetRanges.find((range) => range.id === budgetId);

    // Store both the range ID (for UI) and the numeric values (for API)
    updateFormData("budget", budgetId);
    updateFormData("budgetMin", selectedRange?.minValue || 0);
    updateFormData("budgetMax", selectedRange?.maxValue || 1000000);
  };

  return (
    <div>
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        We'll find plans that fit within your budget range and provide the best
        value for your healthcare needs.
      </p>

      {/* Budget range cards with descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
        {budgetRanges.map((range) => (
          <motion.div
            key={range.id}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden border-2 ${
              selectedBudget === range.id
                ? "border-primary-500 bg-primary-50 shadow-md"
                : "border-slate-200 bg-white hover:border-primary-300 shadow-sm"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => handleSelectBudget(range.id)}
          >
            <div className="p-4">
              <div className="flex flex-row md:flex-col justify-center items-center gap-3">
                <div
                  className={`w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center ${
                    selectedBudget === range.id
                      ? "bg-primary-100 text-primary-500"
                      : "bg-slate-100 text-slate-500/80"
                  }`}
                >
                  <TbCoins className="w-6 md:w-8 h-6 md:h-8" />
                </div>
                <div className="flex flex-col items-center">
                  <h4
                    className={`text-lg md:text-xl font-bold ${
                      selectedBudget === range.id
                        ? "text-primary-600"
                        : "text-slate-500"
                    }`}
                  >
                    {range.label}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      selectedBudget === range.id
                        ? "text-primary-600"
                        : "text-slate-600"
                    }`}
                  >
                    {range.description}
                  </p>
                </div>
              </div>

              {selectedBudget === range.id && (
                <div className="absolute top-2 right-2 h-6 md:h-8 w-6 md:w-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-md">
                  <TbCheck className="h-5 w-5" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={nextStep}
          className="px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md bg-primary-600 hover:bg-primary-700 text-white"
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default BudgetRangeStep;
