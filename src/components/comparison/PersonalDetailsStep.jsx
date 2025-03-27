import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiInfo,
  FiArrowRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { PiUserDuotone } from "react-icons/pi";
import { TbCalendarSmile, TbMailFilled, TbPhone } from "react-icons/tb";

const PersonalDetailsStep = ({ register, errors, onNext }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-400 mb-4 sm:mb-6 flex items-center font-outfit">
        <PiUserDuotone className="mr-3 text-secondary-400 h-7 w-7 flex-shrink-0" />
        <span>Personal Information</span>
      </h2>

      {/* Input Fields with Icons */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="ml-3 text-sm font-medium text-white flex items-center font-outfit"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <PiUserDuotone className="text-primary-200  " size={20} />
            </div>
            <input
              id="name"
              type="text"
              className={`w-full h-11 sm:h-12 pl-12 pr-3 text-[0.93rem] sm:text-[0.98rem] text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
               duration-200 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:border-0
              font-outfit placeholder-white/50
              ${
                errors.name
                  ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                  : "border-white/30"
              }`}
              placeholder="Your Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <FiInfo className="mr-1 h-3 w-3" /> {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="ml-4 text-sm font-medium text-white flex items-center font-outfit"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <TbMailFilled className="text-primary-200 " size={20} />
            </div>
            <input
              id="email"
              type="email"
              className={`w-full h-11 sm:h-12 pl-12 pr-3 text-[0.93rem] sm:text-[0.98rem] text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
              duration-200 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:border-0
              font-outfit placeholder-white/50
              ${
                errors.email
                  ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                  : "border-white/30"
              }`}
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <FiInfo className="mr-1 h-3 w-3" /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="ml-3 text-sm font-medium text-white flex items-center font-outfit"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <TbPhone className="text-primary-200 " size={20} />
            </div>
            <input
              id="phone"
              type="tel"
              className={`w-full h-11 sm:h-12 pl-12 pr-3 text-[0.93rem] sm:text-[0.98rem] text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
              duration-200 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:border-0
              font-outfit placeholder-white/50
              ${
                errors.phone
                  ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                  : "border-white/30"
              }`}
              placeholder="+254 700 000000"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <FiInfo className="mr-1 h-3 w-3" /> {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="age"
            className="ml-3 text-sm font-medium text-white flex items-center font-outfit"
          >
            Your Age
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <TbCalendarSmile className="text-primary-200 " size={20} />
            </div>
            <input
              id="age"
              type="number"
              min="60"
              max="90"
              className={`w-full h-11 sm:h-12 pl-12 pr-3 text-[0.93rem] sm:text-[0.98rem] text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
              duration-200 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:border-0
              font-outfit placeholder-white/50
              ${
                errors.age
                  ? "border-red-400/70 focus:border-red-500 focus:ring-red-400/30"
                  : "border-white/30"
              }`}
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 60,
                  message: "Age must be 60 or older",
                },
                max: {
                  value: 90,
                  message: "Age must be 90 or younger",
                },
              })}
            />
          </div>
          {errors.age && (
            <p className="mt-1 text-red-300 text-xs flex items-center">
              <FiInfo className="mr-1 h-3 w-3" /> {errors.age.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <motion.button
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full h-11 sm:h-12 bg-secondary-600 hover:bg-secondary-700 text-white text-sm sm:text-base font-semibold rounded-lg
          shadow-lg hover:shadow-xl transition-all duration-300 transform font-outfit
          flex items-center justify-center gap-2"
          onClick={onNext}
        >
          Continue to Insurance Preferences
          <FiArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
