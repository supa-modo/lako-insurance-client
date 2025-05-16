import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbCheck,
  TbCurrencyDollar,
} from "react-icons/tb";

const coverageAmounts = [
  {
    id: "500000",
    label: "Ksh. 500,000",
    description: "Basic coverage",
    value: 500000,
  },
  {
    id: "1000000",
    label: "Ksh. 1,000,000",
    description: "Standard coverage",
    value: 1000000,
    recommended: true,
  },
  {
    id: "2000000",
    label: "Ksh. 2,000,000",
    description: "Enhanced coverage",
    value: 2000000,
  },
  {
    id: "3000000",
    label: "Ksh. 3,000,000",
    description: "Premium coverage",
    value: 3000000,
  },
  {
    id: "5000000",
    label: "Ksh. 5,000,000",
    description: "Comprehensive coverage",
    value: 5000000,
  },
];

const AccidentCoverageAmountStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleSelectAmount = (amountId) => {
    const selectedAmount = coverageAmounts.find(
      (amount) => amount.id === amountId
    );
    
    updateFormData("accidentCoverageAmount", amountId);
    updateFormData("accidentCoverageValue", selectedAmount.value);
  };

  return (
    <div>
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Select the maximum coverage amount for your personal accident insurance. This is the total amount the insurance will pay in case of a covered accident.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
        {coverageAmounts.map((amount) => (
          <motion.div
            key={amount.id}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden border-2 ${
              formData.accidentCoverageAmount === amount.id
                ? "border-primary-500 bg-primary-50 shadow-md"
                : "border-slate-200 bg-white hover:border-primary-300 shadow-sm"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => handleSelectAmount(amount.id)}
          >
            <div className="p-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center ${
                    formData.accidentCoverageAmount === amount.id
                      ? "bg-primary-100 text-primary-500"
                      : "bg-slate-100 text-slate-500/80"
                  } mb-3`}
                >
                  <TbCurrencyDollar className="w-6 md:w-8 h-6 md:h-8" />
                </div>
                <h4
                  className={`text-lg md:text-xl font-bold ${
                    formData.accidentCoverageAmount === amount.id
                      ? "text-primary-600"
                      : "text-slate-500"
                  }`}
                >
                  {amount.label}
                </h4>
                <p
                  className={`text-sm mt-1 ${
                    formData.accidentCoverageAmount === amount.id
                      ? "text-primary-600"
                      : "text-slate-600"
                  }`}
                >
                  {amount.description}
                </p>
              </div>

              {amount.recommended && (
                <div className="absolute top-0 right-0">
                  <div className="bg-secondary-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-md">
                    Recommended
                  </div>
                </div>
              )}

              {formData.accidentCoverageAmount === amount.id && (
                <div className="absolute top-2 right-2 h-6 md:h-8 w-6 md:w-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-md">
                  <TbCheck className="h-5 w-5" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            The coverage amount determines the maximum benefit you'll receive in case of an accident. Consider your lifestyle, occupation, and financial obligations when selecting a coverage amount. Higher coverage provides more protection but may come with higher premiums.
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
          whileHover={formData.accidentCoverageAmount ? { scale: 1.03 } : {}}
          whileTap={formData.accidentCoverageAmount ? { scale: 0.97 } : {}}
          onClick={nextStep}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            formData.accidentCoverageAmount
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!formData.accidentCoverageAmount}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default AccidentCoverageAmountStep;
