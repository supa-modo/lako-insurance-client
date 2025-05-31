import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbX, TbAlertCircle } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence>
        {toasts.map((toastItem) => (
          <motion.div
            key={toastItem.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
              toastItem.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className={`flex-shrink-0 mr-3 ${
              toastItem.type === "success" ? "text-green-600" : "text-red-600"
            }`}>
              {toastItem.type === "success" ? (
                <FiCheckCircle className="h-5 w-5" />
              ) : (
                <TbAlertCircle className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                toastItem.type === "success" ? "text-green-800" : "text-red-800"
              }`}>
                {toastItem.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toastItem.id)}
              className={`flex-shrink-0 ml-3 rounded-md p-1 hover:bg-opacity-20 transition-colors ${
                toastItem.type === "success" 
                  ? "text-green-600 hover:bg-green-600" 
                  : "text-red-600 hover:bg-red-600"
              }`}
            >
              <TbX className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;