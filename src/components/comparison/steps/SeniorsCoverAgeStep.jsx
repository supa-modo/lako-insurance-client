import React from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";

const ageRanges = [
  { id: "50-55", label: "50-55 years", description: "Early senior coverage" },
  { id: "56-60", label: "56-60 years", description: "Mid-range senior coverage" },
  { id: "61-65", label: "61-65 years", description: "Standard senior coverage" },
  { id: "66-70", label: "66-70 years", description: "Advanced senior coverage" },
  { id: "71-75", label: "71-75 years", description: "Premium senior coverage" },
  { id: "76-plus", label: "76+ years", description: "Elite senior coverage" },
];

const SeniorsCoverAgeStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleSelectAge = (ageId) => {
    updateFormData("age", ageId);
    nextStep();
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="pl-2 lg:px-4 flex items-center justify-center text-secondary-300 mr-4">
          <FaUserClock className="h-10 md:h-12 w-10 md:w-12" />
        </div>
        <div>
          <h3 className="text-white text-lg">
            What is the age of the person to be insured?
          </h3>
          <p className="text-white/80 font-light text-sm mt-1">
            Age affects premium rates and available coverage options
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {ageRanges.map((range) => (
          <motion.div
            key={range.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden ${
              formData.age === range.id
                ? "bg-gradient-to-r from-secondary-500/80 to-secondary-600 shadow-lg"
                : "bg-white/20 hover:bg-white/25"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => handleSelectAge(range.id)}
          >
            <div className="p-5">
              <h4 className="text-white text-xl font-medium">{range.label}</h4>
              <p className="text-white/70 font-light text-[0.9rem] md:text-base lg:mt-1">{range.description}</p>
              
              {formData.age === range.id && (
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <TbChevronRight className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
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
          className={`px-6 py-3 rounded-lg flex items-center transition-all duration-300 ${
            formData.age
              ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
          disabled={!formData.age}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default SeniorsCoverAgeStep;
