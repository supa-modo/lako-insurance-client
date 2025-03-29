import React from "react";
import { FiPhone, FiX, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TbPhoneCall } from "react-icons/tb";

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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-700 transition-colors"
              onClick={onClose}
            >
              <FiX className="h-5 w-5" />
            </button>
            <div className="text-center mb-6">
              <div className="h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TbPhoneCall className="h-9 w-9 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-600 font-outfit">
                Request a Callback
              </h3>
              <p className="text-neutral-700 text-sm font-outfit">
                We'll have an expert contact you shortly
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                  Preferred Time
                </label>
                <select className="w-full h-11 px-3 rounded-lg border-2 bg-white text-gray-600 font-medium border-gray-300 focus:ring-1 focus:ring-primary-100 focus:border-primary-500 outline-none font-outfit">
                  <option>Morning (9am - 12pm)</option>
                  <option>Afternoon (12pm - 4pm)</option>
                  <option>Evening (4pm - 7pm)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                  Additional Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border-2 bg-white text-gray-600 font-medium border-gray-300 focus:ring-1 focus:ring-primary-100 focus:border-primary-500 outline-none font-outfit"
                  rows={3}
                  placeholder="Any specific questions or concerns?"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full py-3 bg-secondary-600 hover:bg-secondary-600 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center font-outfit"
                onClick={onClose}
              >
                Request Callback <FiChevronRight className="ml-1" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;
