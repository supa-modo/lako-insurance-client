import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbCheck,
  TbPlus,
  TbMinus,
} from "react-icons/tb";
import { FaAmbulance, FaHospital, FaWheelchair, FaHandHoldingMedical } from "react-icons/fa";

const additionalBenefits = [
  {
    id: "emergency-transport",
    name: "Emergency Transport",
    icon: <FaAmbulance className="h-5 w-5" />,
    description: "Coverage for ambulance and emergency transportation costs",
    premium: 2000,
  },
  {
    id: "hospitalization",
    name: "Hospitalization Benefits",
    icon: <FaHospital className="h-5 w-5" />,
    description: "Additional daily benefits during hospital stays",
    premium: 3500,
  },
  {
    id: "rehabilitation",
    name: "Rehabilitation Coverage",
    icon: <FaWheelchair className="h-5 w-5" />,
    description: "Coverage for physical therapy and rehabilitation services",
    premium: 4000,
  },
  {
    id: "disability-income",
    name: "Disability Income",
    icon: <FaHandHoldingMedical className="h-5 w-5" />,
    description: "Monthly income if accident results in temporary or permanent disability",
    premium: 5000,
  },
];

const AccidentAdditionalBenefitsStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  // Initialize selected benefits from formData or empty array
  const [selectedBenefits, setSelectedBenefits] = useState(
    formData.accidentAdditionalBenefits || []
  );

  const toggleBenefit = (benefitId) => {
    setSelectedBenefits((prev) => {
      if (prev.includes(benefitId)) {
        return prev.filter((id) => id !== benefitId);
      } else {
        return [...prev, benefitId];
      }
    });
  };

  const handleContinue = () => {
    // Save selected benefits to form data
    updateFormData("accidentAdditionalBenefits", selectedBenefits);
    
    // Calculate and save total additional premium
    const totalAdditionalPremium = selectedBenefits.reduce((total, benefitId) => {
      const benefit = additionalBenefits.find((b) => b.id === benefitId);
      return total + (benefit ? benefit.premium : 0);
    }, 0);
    
    updateFormData("accidentAdditionalPremium", totalAdditionalPremium);
    
    nextStep();
  };

  return (
    <div>
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Enhance your personal accident coverage with these additional benefits. Select the ones that matter most to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {additionalBenefits.map((benefit) => {
          const isSelected = selectedBenefits.includes(benefit.id);
          
          return (
            <motion.div
              key={benefit.id}
              whileHover={{ scale: 1.01, boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.08)" }}
              whileTap={{ scale: 0.99 }}
              className={`relative rounded-xl overflow-hidden border-2 ${
                isSelected
                  ? "border-primary-500 bg-primary-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-primary-300 shadow-sm"
              } transition-all duration-300 cursor-pointer`}
              onClick={() => toggleBenefit(benefit.id)}
            >
              <div className="p-4 flex items-start">
                <div
                  className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-primary-100 text-primary-600"
                      : "bg-slate-100 text-slate-500"
                  } mr-4`}
                >
                  {benefit.icon}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4
                      className={`text-base md:text-lg font-bold ${
                        isSelected ? "text-primary-700" : "text-slate-700"
                      }`}
                    >
                      {benefit.name}
                    </h4>
                    <div
                      className={`ml-2 h-6 w-6 rounded-full flex items-center justify-center ${
                        isSelected
                          ? "bg-primary-500 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {isSelected ? (
                        <TbMinus className="h-4 w-4" />
                      ) : (
                        <TbPlus className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  
                  <p
                    className={`text-sm mt-1 ${
                      isSelected ? "text-primary-600" : "text-slate-600"
                    }`}
                  >
                    {benefit.description}
                  </p>
                  
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        isSelected
                          ? "bg-primary-100 text-primary-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      + Ksh. {benefit.premium.toLocaleString()} / year
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Additional benefits enhance your basic coverage but will increase your premium. Select benefits that align with your specific needs and risk factors.
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleContinue}
          className="px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md bg-primary-600 hover:bg-primary-700 text-white"
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default AccidentAdditionalBenefitsStep;
