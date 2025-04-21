import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbCoin, TbCoins, TbInfoCircle } from "react-icons/tb";

// Budget ranges with descriptions and a recommended option
const budgetRanges = [
  { 
    id: "0-25000", 
    label: "Ksh. 0 - 25,000", 
    description: "premium per year"
  },
  { 
    id: "25000-50000", 
    label: "Ksh. 25,000 - 50,000", 
    description: "premium per year"
  },
  { 
    id: "50000-75000", 
    label: "Ksh. 50,000 - 75,000", 
    description: "premium per year",
    recommended: true
  },
  { 
    id: "75000-100000", 
    label: "Ksh. 75,000 - 100,000", 
    description: "premium per year"
  },
  { 
    id: "100000-150000", 
    label: "Ksh. 100,000 - 150,000", 
    description: "premium per year"
  },
  { 
    id: "150000-plus", 
    label: "Ksh. 150,000+", 
    description: "premium per year"
  },
];

const BudgetRangeStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [selectedBudget, setSelectedBudget] = useState(
    formData.budget || (budgetRanges.find(range => range.recommended)?.id || budgetRanges[2].id)
  );

  // Set the initial budget if not already set
  useEffect(() => {
    if (!formData.budget) {
      updateFormData("budget", selectedBudget);
    }
  }, []);

  // Handle clicking on a budget range card
  const handleSelectBudget = (budgetId) => {
    setSelectedBudget(budgetId);
    updateFormData("budget", budgetId);
    nextStep();
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="pl-2 lg:px-4 flex items-center justify-center text-secondary-300 mr-4">
          <TbCoins className="h-10 md:h-12 w-10 md:w-12" />
        </div>
        <div>
          <h3 className="text-white text-lg">
            What's your annual budget for insurance?
          </h3>
          <p className="text-white/80 font-light text-[0.9rem] mt-1">
            We'll find plans that fit within your budget range
          </p>
        </div>
      </div>

      {/* Budget range cards with descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {budgetRanges.map((range) => (
          <motion.div
            key={range.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4  rounded-xl cursor-pointer transition-all duration-300 ${selectedBudget === range.id
              ? "bg-gradient-to-r from-secondary-500/80 to-secondary-600 text-white shadow-lg"
              : "bg-white/10 text-white hover:bg-white/20"
              }`}
            onClick={() => handleSelectBudget(range.id)}
          >
            <div className="flex flex-col items-center text-center">
              <p className="font-medium text-lg mb-2">{range.label}</p>
              <p className="text-sm text-white/80 mb-2">{range.description}</p>
             
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-primary-700/50 backdrop-blur-sm rounded-lg p-4 flex items-start">
        <TbInfoCircle className="text-secondary-300 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-white/80 text-sm">
          Your budget helps us find plans that offer the best value for your needs.
          Higher budgets typically provide more comprehensive coverage and additional benefits.
        </p>
      </div>

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
          onClick={nextStep}
          className="px-6 py-3 rounded-lg flex items-center transition-all duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-md hover:shadow-lg"
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default BudgetRangeStep;
