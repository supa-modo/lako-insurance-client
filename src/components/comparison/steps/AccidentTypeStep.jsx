import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbCheck,
} from "react-icons/tb";
import { FaUserInjured, FaPlane, FaBuilding, FaCar } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

const accidentTypes = [
  {
    id: "workplace",
    name: "Workplace Accidents",
    icon: <FaBuilding className="h-6 w-6" />,
    description: "Coverage for injuries occurring at your workplace or during work hours",
    benefits: ["Medical expenses", "Lost income", "Rehabilitation costs"],
  },
  {
    id: "student",
    name: "Student Personal Accidents",
    icon: <FaUserGraduate className="h-6 w-6" />,
    description: "Coverage for injuries sustained while on industrial attachment or internship",
    benefits: ["Medical expenses", "Disability benefits", "Recovery support"],
  },
  {
    id: "travel",
    name: "Travel Accidents",
    icon: <FaPlane className="h-6 w-6" />,
    description: "Protection during domestic and international travel",
    benefits: ["Emergency medical care", "Trip cancellation", "Lost baggage"],
  },
  {
    id: "personal",
    name: "Personal Accidents",
    icon: <FaUserInjured className="h-6 w-6" />,
    description: "Coverage for accidents in daily life, at home or during leisure activities",
    benefits: ["Medical treatment", "Disability benefits", "Recovery support"],
  },
  
];

const AccidentTypeStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleSelectType = (typeId) => {
    updateFormData("accidentType", typeId);
    nextStep();
  };

  return (
    <div>
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Select the type of accident coverage that best fits your needs. Different accident types offer varying levels of protection.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {accidentTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.01, boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.08)" }}
            whileTap={{ scale: 0.99 }}
            className={`relative rounded-xl overflow-hidden border-2 ${
              type.id === formData.accidentType
                ? "border-primary-500 bg-primary-50 shadow-lg"
                : "border-slate-200 bg-white hover:border-primary-300 cursor-pointer shadow-sm"
            } transition-all duration-300`}
            onClick={() => handleSelectType(type.id)}
          >
            <div className="px-3 py-5 md:p-5">
              <div className="flex items-center mb-3">
                {/* <div
                  className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center ${
                    type.id === formData.accidentType
                      ? "bg-primary-100 text-primary-600"
                      : "bg-secondary-100 text-secondary-600"
                  } mr-4 shadow-sm`}
                >
                  {type.icon}
                </div> */}

                <div className="flex-grow">
                  <h4
                    className={`text-base md:text-lg font-bold ${
                      type.id === formData.accidentType
                        ? "text-primary-700"
                        : "text-slate-600"
                    }`}
                  >
                    {type.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      type.id === formData.accidentType
                        ? "text-primary-600"
                        : "text-slate-600"
                    }`}
                  >
                    {type.description}
                  </p>
                </div>

                {type.id === formData.accidentType && (
                  <div className="absolute top-2 right-2">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary-600 text-white shadow-sm">
                      <TbCheck className="h-5 md:h-6 w-5 md:w-6" />
                    </div>
                  </div>
                )}
              </div>

              {/* Benefits list */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {type.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        type.id === formData.accidentType
                          ? "bg-primary-100/80 border border-primary-200 text-primary-700"
                          : "bg-slate-100 border border-slate-200 text-slate-700"
                      }`}
                    >
                      <TbCheck className="mr-1 h-4 w-4" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Different accident types have specific coverage benefits. Choose the one that aligns with your lifestyle and potential risk factors to ensure you're adequately protected.
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
          whileHover={formData.accidentType ? { scale: 1.03 } : {}}
          whileTap={formData.accidentType ? { scale: 0.97 } : {}}
          onClick={nextStep}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            formData.accidentType
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!formData.accidentType}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default AccidentTypeStep;
