import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  TbPhone,
  TbInfoTriangleFilled,
  TbCalendarStar,
  TbCheck,
} from "react-icons/tb";
import { PiUserDuotone } from "react-icons/pi";

// Age range options
const ageRanges = [
  {
    value: "65-69",
    label: "65-69 years",
    description: "Lower premiums available in this age bracket",
  },
  {
    value: "70-74",
    label: "70-74 years",
    description: "Moderate premium rates with comprehensive coverage",
  },
  {
    value: "75-79",
    label: "75-79 years",
    description: "Higher premium rates with specialized care options",
  },
  {
    value: "80-85",
    label: "80-85 years",
    description: "Premium rates with specialized senior care benefits",
  },
];

const PersonalDetailsStep = ({ register, errors, onSubmit, watchedValues }) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-400 flex items-center font-outfit">
          <PiUserDuotone className="mr-3 text-secondary-500 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" />{" "}
          <span>Your Contact Info & Age</span>
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="ml-3 text-[0.84rem] md:text-[0.95rem] font-medium text-white flex items-center font-outfit"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                <PiUserDuotone className="text-primary-200  " size={20} />
              </div>
              <input
                id="fullName"
                type="text"
                className={`w-full py-2 sm:py-2.5 pl-12 pr-3 text-[0.93rem] sm:text-[0.98rem] text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
                focus:ring-0 focus focus:border-secondary-400 focus:outline-none  
              font-outfit placeholder-white/50
              ${
                errors.fullName
                  ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                  : "border-white/30"
              }`}
                placeholder="Your Name"
                {...register("fullName", {
                  required: "Name is required",
                })}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-red-300 text-xs sm:text-sm flex items-center">
                <TbInfoTriangleFilled className="mr-1 h-4 w-4 text-red-400" />{" "}
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="ml-3 text-[0.84rem] md:text-[0.95rem] font-medium text-white flex items-center font-outfit"
            >
              Phone Number
            </label>
            <div className="">
              <div
                className={`flex w-full border-2 rounded-lg overflow-hidden shadow-sm
              ${
                errors.phoneNumber
                  ? "border-red-400"
                  : "border-white/30 focus-within:border-secondary-500"
              }`}
              >
                <div className="flex-shrink-0 flex items-center justify-center px-3 py-2 sm:py-2.5 bg-neutral-100/80 text-neutral-700 text-[0.9rem] sm:text-[0.98rem] font-medium font-outfit">
                  +254
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  className="block w-full px-3 py-2 sm:py-2.5 border-0 bg-white/10 backdrop-blur-sm focus:bg-white/20 
                focus:outline-none focus:ring-0 text-[0.93rem] sm:text-[0.98rem] placeholder-white/50"
                  placeholder="7XX XXX XXX"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{9}$/,
                      message:
                        "Please enter a valid 9-digit number without country code",
                    },
                  })}
                />
                <div className="flex-shrink-0 flex items-center pl-3 pr-4">
                  <TbPhone className="h-5 w-5 text-neutral-400" />
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-red-300 text-xs sm:text-sm flex items-center">
                  <TbInfoTriangleFilled className="mr-1 h-4 w-4 text-red-400" />{" "}
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Age Range Selection */}
        <div className="space-y-3">
          <label className="text-[0.84rem] md:text-[0.95rem] font-medium text-primary-400 flex items-center font-outfit">
            <TbCalendarStar className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Age Range
          </label>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {ageRanges.map((range) => (
              <div
                key={range.value}
                className={`relative border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 
                ${
                  watchedValues.ageRange === range.value
                    ? "border-secondary-500 bg-secondary-100 shadow-md transform scale-[1.01]"
                    : "border-neutral-200 hover:border-secondary-300 bg-white/80 hover:bg-neutral-100"
                }`}
                onClick={() => {
                  const input = document.getElementById(
                    `ageRange-${range.value}`
                  );
                  if (input) input.click();
                }}
              >
                <div className="flex items-start">
                  <input
                    id={`ageRange-${range.value}`}
                    type="radio"
                    className="sr-only"
                    value={range.value}
                    {...register("ageRange", {
                      required: "Please select your age range",
                    })}
                  />
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-sm sm:text-base text-neutral-800 font-outfit">
                        {range.label}
                      </p>
                      {watchedValues.ageRange === range.value && (
                        <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                          <TbCheck className="text-white h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 font-outfit">
                      {range.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.ageRange && (
            <p className="mt-1 text-red-300 text-xs sm:text-sm flex items-center">
              <TbInfoTriangleFilled className="mr-1 h-4 w-4 text-red-400" />{" "}
              {errors.ageRange.message}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Button */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full h-10 sm:h-11 bg-secondary-500 hover:bg-secondary-600 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg
          shadow-sm hover:shadow-md transition-all duration-300 transform
          flex items-center justify-center gap-2 font-outfit"
        >
          Continue <FiArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
