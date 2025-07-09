import React from "react";
import { motion } from "framer-motion";
import {
  TbHeartPlus,
  TbChevronRight,
  TbCheck,
  TbBuildingBank,
  TbLock,
  TbPlane,
  TbX,
} from "react-icons/tb";
import { GiLifeInTheBalance } from "react-icons/gi";
import { FaCarCrash, FaTools } from "react-icons/fa";
import { FaUserInjured } from "react-icons/fa6";
import {
  isBuyOnlineInsuranceTypeAvailable,
  isProductionMode,
} from "../../utils/featureFlags";

const insuranceTypes = [
  {
    id: "health",
    name: "Health Insurance",
    icon: <TbHeartPlus className="h-6 w-6 md:h-7 md:w-7" />,
    description: "Comprehensive medical coverage for individuals and families",
    comingSoon: false,
    popular: true,
    benefits: ["Seniors Cover", "Family Cover", "Individual"],
  },
  {
    id: "personal-accident",
    name: "Personal Accident",
    icon: <FaUserInjured className="h-6 w-6 md:h-7 md:w-7" />,
    description:
      "Protection against accidents and injuries in various situations",
    comingSoon: false,
    benefits: ["Individual Cover", "Student Cover"],
  },
  {
    id: "travel",
    name: "Travel Insurance",
    icon: <TbPlane className="h-6 w-6 md:h-7 md:w-7" />,
    description:
      "Comprehensive protection for domestic and international travel",
    comingSoon: false,
    benefits: ["Single Trip", "Annual Multi-Trip", "Emergency Medical"],
  },
  {
    id: "property",
    name: "Business/SMEs Cover",
    icon: <TbBuildingBank className="h-6 w-6 md:h-7 md:w-7" />,
    description:
      "Comprehensive protection for your business and valuable assets",
    comingSoon: true,
    benefits: ["Premises Cover", "Employees Liability", "Medical Expenses"],
  },
  {
    id: "motor",
    name: "Motor Insurance",
    icon: <FaCarCrash className="h-6 w-6 md:h-7 md:w-7" />,
    description:
      "Reliable coverage for your vehicles and third-party liability",
    comingSoon: true,
    benefits: ["Third Party Liability", "Vehicle Damage", "Driver's Liability"],
  },
];

const InsuranceTypeSelection = ({ onSelect, formData }) => {
  // Check if an insurance type should be disabled based on environment
  const isTypeDisabled = (type) => {
    // If it's already marked as coming soon, keep it disabled
    if (type.comingSoon) return true;

    // Check environment-based availability
    return !isBuyOnlineInsuranceTypeAvailable(type.id);
  };

  const getDisabledMessage = (type) => {
    if (type.comingSoon)
      return (
        <span className="bg-slate-300 text-slate-500 px-4 py-2 rounded-lg font-medium text-[0.78rem] md:text-sm shadow-sm flex items-center">
          <TbX className="h-4 md:h-5 w-4 md:w-5 text-slate-500 mr-1.5" />
          Coming Soon !
        </span>
      );
    if (isProductionMode())
      return (
        <span className="bg-secondary-300 text-primary-600 px-4 py-2 rounded-lg font-medium text-[0.78rem] md:text-sm shadow-sm flex items-center">
          <TbLock className="h-6 md:h-5 w-6 md:w-5 text-primary-600 mr-2" />
          Under Maintenance 🛠️
        </span>
      );
    return (
      <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm">
        Not Available
      </span>
    );
  };

  return (
    <div className="">
      <h2 className="text-lg md:text-xl font-bold text-primary-600 mb-2 lg:mb-4">
        Select Insurance Type
      </h2>

      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-4 lg:mb-6">
        Select the insurance category you'd like to purchase. We'll guide you
        through the rest of the process.
      </p>

      {isProductionMode() && (
        <div className="mb-6 py-2.5 px-2 md:p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <TbLock className="h-6 md:h-5 w-6 md:w-5 text-blue-600 mr-2" />
            <p className="text-blue-700 text-[0.82rem] md:text-sm">
              Some features of this section are temporarily unavailable for
              maintenance. Please check back later.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-3">
        {insuranceTypes.map((type) => {
          const isDisabled = isTypeDisabled(type);

          return (
            <motion.div
              key={type.id}
              whileTap={!isDisabled ? { scale: 0.99 } : {}}
              className={`relative rounded-xl overflow-hidden border-2 ${
                isDisabled
                  ? "border-slate-200 bg-slate-100 cursor-not-allowed"
                  : type.id === formData.insuranceType
                  ? "border-primary-500 bg-primary-50 shadow-lg "
                  : "border-slate-200 bg-white hover:border-primary-300 cursor-pointer shadow-sm"
              } transition-all duration-300 `}
              onClick={() => !isDisabled && onSelect(type.id)}
            >
              <div className="px-3 py-4 md:p-5">
                <div className="flex items-center mb-3">
                  <div
                    className={`flex-shrink-0 h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center ${
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
                    <div className="absolute top-2 right-2">
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
                <div className="absolute inset-0 bg-slate-100/50 flex items-center justify-center backdrop-blur-[0.9px]">
                  {getDisabledMessage(type)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InsuranceTypeSelection;
