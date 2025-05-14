import React from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbPlus, TbInfoCircle, TbCheck } from "react-icons/tb";
import { FaTooth, FaEye, FaHospital, FaPills } from "react-icons/fa";

// Optional covers for seniors
const optionalCovers = [
  {
    id: "outpatient",
    name: "Outpatient Cover",
    icon: <FaHospital className="h-5 w-5" />,
    description: "Coverage for doctor visits, prescriptions, and routine care",
    defaultChecked: true,
    benefits: ["Regular doctor visits", "Basic prescriptions", "Preventive care"],
  },
  {
    id: "dental",
    name: "Dental Cover",
    icon: <FaTooth className="h-5 w-5" />,
    description: "Coverage for dental examinations, treatments, and procedures",
    defaultChecked: false,
    benefits: ["Dental check-ups", "Basic dental procedures", "Emergency dental care"],
  },
  {
    id: "optical",
    name: "Optical Cover",
    icon: <FaEye className="h-5 w-5" />,
    description: "Coverage for eye examinations, glasses, and vision care",
    defaultChecked: false,
    benefits: ["Eye examinations", "Prescription glasses", "Vision treatments"],
  },
  {
    id: "chronic",
    name: "Chronic Condition Management",
    icon: <FaPills className="h-5 w-5" />,
    description: "Enhanced coverage for ongoing chronic conditions",
    defaultChecked: false,
    recommended: true,
    benefits: ["Chronic disease management", "Specialized medications", "Regular monitoring"],
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
      <h3 className="text-slate-800 text-xl font-semibold mb-4">
        Enhance your coverage with additional benefits
      </h3>
      <p className="text-slate-600 mb-6">
        Customize your insurance package with optional covers that provide specialized protection for your specific healthcare needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {optionalCovers.map((cover) => {
          const isSelected = formData.optionalCovers?.includes(cover.id);
          
          return (
            <motion.div
              key={cover.id}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-xl overflow-hidden border-2 ${isSelected 
                ? "border-blue-500 bg-blue-50 shadow-md" 
                : "border-slate-200 bg-white hover:border-blue-300 shadow-sm"
              } transition-all duration-300 cursor-pointer`}
              onClick={() => handleToggleCover(cover.id)}
            >
              {cover.recommended && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    RECOMMENDED FOR SENIORS
                  </div>
                </div>
              )}
              
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${isSelected 
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-slate-100 text-slate-600"
                  } mr-4`}>
                    {cover.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className={`text-xl font-bold ${isSelected ? "text-blue-700" : "text-slate-800"}`}>
                      {cover.name}
                    </h4>
                    <p className={`text-sm ${isSelected ? "text-blue-600" : "text-slate-600"}`}>
                      {cover.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 ml-2">
                    <div className={`h-6 w-6 rounded-md border-2 ${isSelected 
                      ? "bg-blue-600 border-blue-600" 
                      : "bg-white border-slate-300"
                    } flex items-center justify-center transition-all duration-200`}>
                      {isSelected && (
                        <TbCheck className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="flex flex-col space-y-2 mt-4 pl-16">
                  {cover.benefits.map((benefit, idx) => (
                    <div key={idx} className={`flex items-center text-xs font-medium ${isSelected ? "text-blue-700" : "text-slate-600"}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${isSelected ? "bg-blue-100" : "bg-slate-100"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-blue-600" : "bg-slate-500"}`}></div>
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-blue-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-blue-800 font-semibold mb-1">Why Optional Covers Matter</p>
          <p className="text-blue-700 text-sm">
            Optional covers enhance your base insurance plan with specialized coverage for specific healthcare needs. For seniors, these additional benefits can provide crucial protection for age-related conditions and treatments that might not be fully covered under standard plans.
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
          onClick={nextStep}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-all duration-200 font-medium shadow-md"
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default OptionalCoversStep;
