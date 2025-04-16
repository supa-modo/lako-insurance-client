import React from "react";
import { motion } from "framer-motion";
import { TbInfoCircle, TbPhone, TbCalendar, TbCoin } from "react-icons/tb";

const budgetRanges = [
  { value: 25000, label: "Ksh. 0 - 25,000" },
  { value: 50000, label: "Ksh. 25,000 - 50,000" },
  { value: 75000, label: "Ksh. 50,000 - 75,000" },
  { value: 100000, label: "Ksh. 75,000 - 100,000" },
  { value: 150000, label: "Ksh. 100,000 - 150,000" },
  { value: 250000, label: "Ksh. 150,000 +" },
];

const PersonalDetailsStep = ({ register, errors, onSubmit, watchedValues }) => {
  return (
    <div className="mx-auto">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Phone Number Field */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="text-sm sm:text-base font-medium text-primary-300"
            >
              Phone Number
            </label>
            <div className="flex rounded-md mt-2 overflow-hidden shadow-sm font-lexend">
              <div className="flex-shrink-0 flex items-center justify-center px-3 py-3 bg-white/20 text-white text-sm sm:text-base font-medium border-r border-white/10">
                +254
              </div>
              <input
                id="phoneNumber"
                type="tel"
                className={`block w-full px-4 py-3 border-0 bg-white/10 focus:bg-white/20 
              focus:outline-none focus:ring-1 focus:ring-secondary-400 text-sm sm:text-base placeholder-white/50 text-white 
              ${errors.phoneNumber ? "ring-1 ring-red-400" : ""}`}
                placeholder="7XX XXX XXX"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: "Please enter a valid 9-digit number",
                  },
                })}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-red-300 text-xs flex items-center">
                <TbInfoCircle className="mr-1 h-3.5 w-3.5 text-red-400" />
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="text-sm sm:text-base font-medium text-primary-300"
            >
              Your Age
            </label>
            <input
              id="age"
              type="number"
              className={`w-full py-3 px-4 mt-2 text-sm sm:text-base text-white font-lexend rounded-md border-0 bg-white/10 
              focus:outline-none focus:ring-1 focus:ring-secondary-400 shadow-sm
              placeholder-white/50
              ${errors.age ? "ring-1 ring-red-400" : ""}`}
              placeholder="Enter your age"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old",
                },
                max: {
                  value: 100,
                  message: "You must be less than 100 years old",
                },
              })}
            />
            {errors.age && (
              <p className="mt-1 text-red-300 text-xs flex items-center">
                <TbInfoCircle className="mr-1 h-3.5 w-3.5 text-red-400" />
                {errors.age.message}
              </p>
            )}
          </div>
        </div>

        {/* Budget Selector */}
        <div className="mb-4">
          <label className="text-sm sm:text-base font-medium text-primary-300">
            Annual Budget Range
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {budgetRanges.map((range) => (
              <label
                key={range.value}
                className={`px-3 py-4 rounded-md cursor-pointer text-center text-sm sm:text-base transition-all duration-200 
                ${
                  Number(watchedValues.budget) === range.value
                    ? "bg-gradient-to-r from-secondary-500/90 to-secondary-600 text-white shadow-sm"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <input
                  id={`budget-${range.value}`}
                  type="radio"
                  className="sr-only"
                  value={range.value}
                  {...register("budget", {
                    required: "Please select a budget range",
                  })}
                />
                <div className="flex flex-col ">
                  <span className="font-medium font-lexend text-base sm:text-lg ">{range.label}</span>
                  <span className="mt-  text-sm sm:text-[0.8rem] text-neutral-400">
                    per year
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.budget && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <TbInfoCircle className="mr-1 h-3.5 w-3.5 text-red-400" />
              {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-600 text-white font-medium rounded-md
        shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        Continue
      </motion.button>
    </div>
  );
};

export default PersonalDetailsStep;
