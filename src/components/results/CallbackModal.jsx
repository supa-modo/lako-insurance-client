import React from "react";
import { FiPhone, FiX, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TbCalendarTime, TbMessageCircle, TbPhoneCall } from "react-icons/tb";

const CallbackModal = ({ isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 bg-black/60 backdrop-blur-[3px] flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition-colors"
              onClick={onClose}
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="text-center mb-4 relative z-10">
              <div className="h-16 w-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <TbPhoneCall className="h-9 w-9 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-700 font-outfit mb-1">
                Request a Callback
              </h3>
              <p className="text-neutral-600 text-sm font-outfit">
                We'll have an insurance expert contact you shortly
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                  Preferred Time
                </label>
                <select className="w-full h-11 px-3 rounded-lg border-2 focus:border bg-white text-gray-700 border-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none font-outfit  shadow-sm hover:border-primary-300">
                  <option value="Morning (9am - 12pm)">
                    Morning (9am - 12pm)
                  </option>
                  <option value="Afternoon (12pm - 4pm)">
                    Afternoon (12pm - 4pm)
                  </option>
                  <option value="Evening (4pm - 7pm)">
                    Evening (4pm - 7pm)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                  Additional Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border-2 focus:border bg-white text-gray-700 border-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:outline-none font-outfit shadow-sm hover:border-primary-300"
                  rows={3}
                  placeholder="Any specific questions or concerns?"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border-2 focus:border bg-white text-gray-700 border-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:outline-none font-outfit shadow-sm hover:border-primary-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center font-outfit mt-2"
                onClick={onClose}
              >
                <span className="inline-flex items-center font-semibold">
                  Request Callback
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <p className="text-xs text-center text-gray-500 mt-2 font-outfit">
                We will call you on the phone number you entered while selecting
                your preferences.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;
