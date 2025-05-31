import React from "react";
import { motion } from "framer-motion";
import {
  TbHeartPlus,
  TbHome2,
  TbChevronRight,
  TbInfoCircle,
  TbShieldCheck,
  TbCheck,
  TbBuildingBank,
  TbLock,
} from "react-icons/tb";
import { GiLifeInTheBalance } from "react-icons/gi";
import { FaCarCrash } from "react-icons/fa";
import { FaUserInjured } from "react-icons/fa6";
import {
  isInsuranceTypeAvailable,
  isProductionMode,
} from "../../../utils/featureFlags";

const insuranceTypes = [
  {
    id: "health",
    name: "Health Insurance",
    icon: <TbHeartPlus className="h-7 w-7" />,
    description: "Comprehensive medical coverage for individuals and families",
    comingSoon: false,
    popular: true,
    benefits: ["Seniors Cover", "Adult Cover", "Child Cover"],
  },
  {
    id: "personal-accident",
    name: "Personal Accident",
    icon: <FaUserInjured className="h-7 w-7" />,
    description:
      "Protection against accidents and injuries in various situations",
    comingSoon: false,
    benefits: ["Workplace Accidents", "Medical Expenses", "Travel Insurance"],
  },
  {
    id: "property",
    name: "Business/SMEs Cover",
    icon: <TbBuildingBank className="h-7 w-7" />,
    description: "Comprehensive protection for your home and valuable assets",
    comingSoon: true,
    benefits: ["Premises Cover", "Employees Liability", "Medical Expenses"],
  },
  {
    id: "motor",
    name: "Motor Insurance",
    icon: <FaCarCrash className="h-7 w-7" />,
    description:
      "Reliable coverage for your vehicles and third-party liability",
    comingSoon: true,
    benefits: ["Third Party Liability", "Vehicle Damage", "Driver's Liability"],
  },
];

const InsuranceTypeStep = ({ formData, updateFormData, nextStep }) => {
  // Check if an insurance type should be disabled based on environment
  const isTypeDisabled = (type) => {
    // If it's already marked as coming soon, keep it disabled
    if (type.comingSoon) return true;

    // Check environment-based availability
    return !isInsuranceTypeAvailable(type.id);
  };

  const getDisabledMessage = (type) => {
    if (type.comingSoon) return "Coming Soon";
    if (isProductionMode()) return "Available in Development";
    return "Not Available";
  };

  const handleSelectType = (typeId) => {
    updateFormData("insuranceType", typeId);

    // Set the default cover type based on insurance type
    if (typeId === "health") {
      updateFormData("coverType", "seniors");
    } else if (typeId === "personal-accident") {
      updateFormData("coverType", "personal-accident");
    }

    nextStep();
  };

  return (
    <div>
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Select the insurance category that best fits your needs. We'll guide you
        through the rest of the process.
      </p>

      {isProductionMode() && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <TbLock className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-blue-700 text-sm">
              Some insurance types are currently available in development mode
              only. Health Insurance is fully available for comparison.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {insuranceTypes.map((type) => {
          const isDisabled = isTypeDisabled(type);

          return (
            <motion.div
              key={type.id}
              whileHover={
                !isDisabled
                  ? {
                      scale: 1.01,
                      boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
                    }
                  : {}
              }
              whileTap={!isDisabled ? { scale: 0.99 } : {}}
              className={`relative rounded-xl overflow-hidden border-2 ${
                isDisabled
                  ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                  : type.id === formData.insuranceType
                  ? "border-primary-500 bg-primary-50 shadow-lg"
                  : "border-slate-200 bg-white hover:border-primary-300 cursor-pointer shadow-sm"
              } transition-all duration-300`}
              onClick={() => !isDisabled && handleSelectType(type.id)}
            >
              <div className="px-3 py-5 md:p-5">
                <div className="flex items-center mb-3">
                  <div
                    className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center ${
                      isDisabled
                        ? "bg-slate-200 text-slate-400"
                        : type.id === formData.insuranceType
                        ? "bg-primary-100 text-primary-600"
                        : "bg-secondary-100 text-secondary-600"
                    } mr-4 shadow-sm`}
                  >
                    {type.icon}
                  </div>

                  <div className="flex-grow">
                    <h4
                      className={`text-base md:text-lg font-bold ${
                        isDisabled
                          ? "text-slate-400"
                          : type.id === formData.insuranceType
                          ? "text-primary-700"
                          : "text-slate-600"
                      }`}
                    >
                      {type.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDisabled
                          ? "text-slate-400"
                          : type.id === formData.insuranceType
                          ? "text-primary-600"
                          : "text-slate-600"
                      }`}
                    >
                      {type.description}
                    </p>
                  </div>

                  {!isDisabled && (
                    <div className=" absolute top-2 right-2">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          type.id === formData.insuranceType
                            ? "bg-primary-600 text-white"
                            : "bg-slate-100 text-slate-400"
                        } shadow-sm`}
                      >
                        {type.id === formData.insuranceType ? (
                          <TbCheck className="h-5 md:h-6 w-5 md:w-6" />
                        ) : (
                          <TbChevronRight className="h-5 md:h-6 w-5 md:w-6" />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Benefits list */}
                <div className="mt-4">
                  <div
                    className={`flex flex-wrap gap-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    {type.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                          type.id === formData.insuranceType
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

              {/* Environment-based or Coming soon overlay */}
              {isDisabled && (
                <div className="absolute inset-0 bg-slate-100/50 flex items-center justify-center backdrop-blur-[0.5px]">
                  <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm">
                    {getDisabledMessage(type)}
                  </span>
                </div>
              )}

              {/* Show options for health insurance */}
              {type.id === "health" &&
                type.options &&
                type.id === formData.insuranceType && (
                  <div className="px-5 pb-5 pt-2 border-t border-primary-200 bg-primary-50/50">
                    <p className="text-sm text-primary-700 font-semibold mb-3 flex items-center">
                      <TbInfoCircle className="h-4 w-4 mr-1" /> Available
                      Coverage Options:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {type.options.map((option, index) => (
                        <li
                          key={index}
                          className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border border-primary-100"
                        >
                          <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                            <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                          </div>
                          <span className="text-sm text-slate-700 font-medium">
                            {option}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-center">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Select an insurance type to continue. Only Health Insurance is
            available for comparison for now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTypeStep;
