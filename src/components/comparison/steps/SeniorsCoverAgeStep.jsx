import React from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbInfoCircle, TbUserCircle, TbCheck } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";

const ageRanges = [
  {
    id: "60-64",
    label: "60-64 years",
   
    minAge: 60,
    maxAge: 64,
    
  },
  {
    id: "65-69",
    label: "65-69 years",
    minAge: 65,
    maxAge: 69,
    
  },
  {
    id: "70-74",
    label: "70-74 years",
    minAge: 70,
    maxAge: 74,
    
  },
  {
    id: "75-79",
    label: "75-79 years",
    minAge: 75,
    maxAge: 79,
    
  },
  {
    id: "80+",
    label: "80+ years",
    minAge: 80,
    maxAge: 120,
    
  },
];

const SeniorsCoverAgeStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleSelectAge = (ageId) => {
    // Find the selected age range
    const selectedRange = ageRanges.find((range) => range.id === ageId);

    // Update both the display age range and the numeric min/max values needed for backend filtering
    updateFormData("age", ageId);
    updateFormData("ageMin", selectedRange.minAge);
    updateFormData("ageMax", selectedRange.maxAge);
  };

  return (
    <div>
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Age is a critical factor in determining premium rates and available coverage options. Select the appropriate age range to find the most suitable plans.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-4 mb-8">
        {ageRanges.map((range) => (
          <motion.div
            key={range.id}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-[0.7rem] md:rounded-[0.85rem] overflow-hidden border-2 ${formData.age === range.id
              ? "border-primary-500 bg-primary-50 shadow-md"
              : "border-slate-200 bg-white hover:border-primary-300 shadow-sm"
              } transition-all duration-300 cursor-pointer`}
            onClick={() => handleSelectAge(range.id)}
          >
            
            <div className="p-3 md:p-5 flex flex-row md:flex-col gap-2 items-center md:justify-center text-center">
              <div className={`w-10 md:w-12 h-10 md:h-12 md:mx-auto rounded-full flex items-center justify-center ${formData.age === range.id ? "bg-primary-200/70 text-primary-600" : "bg-slate-200/70 text-slate-500"}`}>
                <TbUserCircle className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              
              <h4 className={`text-base md:text-lg font-bold ${formData.age === range.id ? "text-primary-700" : "text-slate-600"}`}>
                {range.label}
              </h4>

              {formData.age === range.id && (
                  <div className="absolute top-1 md:top-2 right-1 md:right-2 h-6 md:h-8 w-6 md:w-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md">
                    <TbCheck className="h-4 md:h-5 w-4 md:w-5" />
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
            Insurance providers use age as a key factor to determine risk levels and coverage needs. Selecting the correct age range ensures you receive accurate quotes and appropriate coverage options tailored to your life stage.
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
          whileHover={formData.age ? { scale: 1.03 } : {}}
          whileTap={formData.age ? { scale: 0.97 } : {}}
          onClick={nextStep}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${formData.age
            ? "bg-primary-600 hover:bg-primary-700 text-white"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
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
