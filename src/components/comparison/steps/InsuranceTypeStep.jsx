import React from "react";
import { motion } from "framer-motion";
import {
  TbHeartPlus,
  TbHome,
  TbCar,
  TbUsers,
  TbChevronRight,
  TbArrowRight,
  TbHome2,
} from "react-icons/tb";
import { GiLifeInTheBalance } from "react-icons/gi";
import { FaCarCrash, FaUserTie } from "react-icons/fa";
import { PiUsersDuotone, PiUsersThreeDuotone } from "react-icons/pi";

const insuranceTypes = [
  {
    id: "seniors",
    name: "Seniors Cover",
    icon: <FaUserTie className="h-6 w-6" />,
    description: "Specialized health coverage for seniors",
    comingSoon: false,
    recommended: true,
  },
  {
    id: "health",
    name: "Health Insurance",
    icon: <TbHeartPlus className="h-6 w-6" />,
    description: "Medical coverage for individuals and families",
    comingSoon: false,
  },
  {
    id: "life",
    name: "Life Insurance",
    icon: <GiLifeInTheBalance className="h-6 w-6" />,
    description: "Financial protection for your loved ones",
    comingSoon: true,
  },
  {
    id: "property",
    name: "Property Insurance",
    icon: <TbHome2 className="h-6 w-6" />,
    description: "Protection for your home and property",
    comingSoon: true,
  },
  {
    id: "motor",
    name: "Motor Insurance",
    icon: <FaCarCrash className="h-7 w-7" />,
    description: "Coverage for your vehicles",
    comingSoon: true,
  },
  {
    id: "group",
    name: "Group Insurance",
    icon: <PiUsersThreeDuotone className="h-7 w-7" />,
    description: "Coverage for businesses and organizations",
    comingSoon: true,
  },
];

const InsuranceTypeStep = ({ formData, updateFormData, nextStep }) => {
  const handleSelectType = (typeId) => {
    updateFormData("insuranceType", typeId);
    nextStep();
  };

  return (
    <div>
      <h3 className="text-white text-lg mb-4 lg:mb-6">
        What type of insurance are you looking to compare?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insuranceTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={!type.comingSoon ? { scale: 1.02 } : {}}
            whileTap={!type.comingSoon ? { scale: 0.98 } : {}}
            className={`relative rounded-xl overflow-hidden ${
              type.comingSoon
                ? "bg-white/10 cursor-not-allowed"
                : "bg-white/30 hover:bg-white/25 cursor-pointer"
            } transition-all duration-300`}
            onClick={() => !type.comingSoon && handleSelectType(type.id)}
          >
            <div className="p-5 flex items-center">
              <div
                className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                  type.comingSoon ? "bg-white/10" : "bg-primary-600"
                } text-white mr-4`}
              >
                {type.icon}
              </div>

              <div className="flex-grow">
                <h4 className="text-secondary-200 text-lg font-medium">
                  {type.name}
                </h4>
                <p className="text-white/70 text-[0.93rem] lg:text-base">
                  {type.description}
                </p>

                {type.comingSoon && (
                  <span className="inline-block mt-2 text-xs bg-white/20 text-white px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </div>

              {!type.comingSoon && (
                <div className="flex-shrink-0 ml-2">
                  <div className="h-8 w-8 rounded-full bg-secondary-500/50 flex items-center justify-center text-secondary-300">
                    <TbChevronRight className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center text-white/80 text-sm lg:text-base font-light">
        <p>
          Select an insurance type to continue. Only Seniors Cover is currently
          available.
        </p>
      </div>
    </div>
  );
};

export default InsuranceTypeStep;
