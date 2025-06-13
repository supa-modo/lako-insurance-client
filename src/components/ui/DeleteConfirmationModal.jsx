import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbAlertTriangle,
  TbX,
  TbTrash,
  TbShieldX,
  TbAlertCircle,
} from "react-icons/tb";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message,
  itemName,
  confirmButtonText = "Delete",
  isLoading = false,
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-3.5"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-3 md:px-6 py-4 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TbAlertCircle className="block md:hidden h-5 w-5 text-red-500 mr-1.5" />
                  <h3 className="text-base md:text-lg font-semibold text-red-600">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded disabled:opacity-50"
                >
                  <TbX className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6">
              <div className="text-center mb-4">
                <TbAlertTriangle className="hidden md:block h-12 w-12 text-red-500 mx-auto mb-3" />

                <p className="text-gray-700 text-sm md:text-[0.95rem]">
                  {message || (
                    <>
                      Are you sure you want to delete{" "}
                      {itemName ? (
                        <span className="font-medium text-gray-900">
                          "{itemName}"
                        </span>
                      ) : (
                        "this item"
                      )}
                      ?
                    </>
                  )}
                </p>
                <p className="text-[0.78rem] md:text-sm text-gray-500 mt-2">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-3.5 md:px-4 pt-3 lg:px-6 pb-4 md:pb-[1.3rem] flex  justify-center gap-1.5 md:gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="w-full px-8 py-2 lg:py-2.5 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="w-full px-8 py-2 lg:py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Deleting..." : confirmButtonText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
