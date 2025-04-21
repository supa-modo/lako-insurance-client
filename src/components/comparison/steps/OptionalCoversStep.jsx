import React from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbPlus, TbInfoCircle } from "react-icons/tb";
import { FaTooth, FaEye, FaHospital, FaPills } from "react-icons/fa";

// Optional covers for seniors
const optionalCovers = [
  {
    id: "outpatient",
    name: "Outpatient Cover",
    icon: <FaHospital className="h-5 w-5" />,
    description: "Coverage for doctor visits, prescriptions, and routine care",
    defaultChecked: true,
  },
  {
    id: "dental",
    name: "Dental Cover",
    icon: <FaTooth className="h-5 w-5" />,
    description: "Coverage for dental examinations, treatments, and procedures",
    defaultChecked: false,
  },
  {
    id: "optical",
    name: "Optical Cover",
    icon: <FaEye className="h-5 w-5" />,
    description: "Coverage for eye examinations, glasses, and vision care",
    defaultChecked: false,
  },
  {
    id: "chronic",
    name: "Chronic Condition Management",
    icon: <FaPills className="h-5 w-5" />,
    description: "Enhanced coverage for ongoing chronic conditions",
    defaultChecked: false,
    recommended: true,
  },
];

const OptionalCoversStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleToggleCover = (coverId) => {
    const currentCovers = [...(formData.optionalCovers || [])];
    
    if (currentCovers.includes(coverId)) {
      // Remove the cover if it's already selected
      updateFormData(
        "optionalCovers",
        currentCovers.filter((id) => id !== coverId)
      );
    } else {
      // Add the cover if it's not already selected
      updateFormData("optionalCovers", [...currentCovers, coverId]);
    }
  };

  // Initialize optional covers if empty
  React.useEffect(() => {
    if (!formData.optionalCovers || formData.optionalCovers.length === 0) {
      // Set default selected covers
      const defaultCovers = optionalCovers
        .filter(cover => cover.defaultChecked)
        .map(cover => cover.id);
      
      updateFormData("optionalCovers", defaultCovers);
    }
  }, []);

  return (
    <div>
      

      <div className="flex items-center mb-6">
              <div className="pl-2 lg:px-4 flex items-center justify-center text-secondary-300 mr-4">
                <TbPlus className="h-10 md:h-12 w-10 md:w-12" />
              </div>
              <div>
                <h3 className="text-white text-lg">
                  Enhance your coverage with additional benefits
                </h3>
                <p className="text-white/80 font-light text-sm mt-1">
                  Select optional covers to customize your insurance package
                </p>
              </div>
            </div>

      <div className="space-y-4 mt-6">
        {optionalCovers.map((cover) => (
          <motion.div
            key={cover.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
              formData.optionalCovers?.includes(cover.id)
                ? "bg-gradient-to-r from-secondary-500/80 to-secondary-600 shadow-lg"
                : "bg-white/20 hover:bg-white/25"
            } transition-all duration-300`}
            onClick={() => handleToggleCover(cover.id)}
          >
            {cover.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Recommended for Seniors
                </div>
              </div>
            )}
            
            <div className="p-5 flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                formData.optionalCovers?.includes(cover.id)
                  ? "bg-white text-secondary-600"
                  : "bg-primary-600 text-white"
              } mr-4`}>
                {cover.icon}
              </div>
              
              <div className="flex-grow">
                <h4 className="text-white text-lg font-medium">{cover.name}</h4>
                <p className="text-white/70 text-sm">{cover.description}</p>
              </div>
              
              <div className="flex-shrink-0 ml-2">
                <div className={`h-6 w-6 rounded-md border ${
                  formData.optionalCovers?.includes(cover.id)
                    ? "bg-white border-white"
                    : "bg-transparent border-white/40"
                } flex items-center justify-center`}>
                  {formData.optionalCovers?.includes(cover.id) && (
                    <svg className="h-4 w-4 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-primary-700/50 rounded-lg p-4 flex items-start">
        <TbInfoCircle className="text-secondary-300 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-white/80 text-sm">
          Optional covers enhance your base insurance plan with specialized coverage. 
          For seniors, we recommend considering the Chronic Condition Management cover, 
          which provides additional support for managing long-term health conditions.
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
          className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg flex items-center transition-all duration-300"
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default OptionalCoversStep;
