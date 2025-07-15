import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbAlertTriangle,
  TbX,
  TbTrash,
  TbUsers,
  TbCalendar,
  TbFileDescription,
  TbShield,
  TbTransfer,
  TbArchive,
  TbLoader2,
  TbExclamationMark,
} from "react-icons/tb";

const DependencyHandlingModal = ({
  isOpen,
  onClose,
  onConfirm,
  dependencies,
  itemName,
  itemType = "user",
  availableUsers = [],
  loading = false,
}) => {
  const [selectedOption, setSelectedOption] = useState("block");
  const [reassignToUser, setReassignToUser] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedOption("block");
      setReassignToUser("");
    }
  }, [isOpen]);

  const getDependencyIcon = (type) => {
    switch (type) {
      case "events":
        return TbCalendar;
      case "applications":
        return TbFileDescription;
      case "leads":
        return TbUsers;
      case "tasks":
        return TbShield;
      default:
        return TbFileDescription;
    }
  };

  const getDependencyLabel = (type) => {
    switch (type) {
      case "events":
        return "Events";
      case "applications":
        return "Applications";
      case "leads":
        return "Leads";
      case "tasks":
        return "Tasks";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);

    const options = {
      handleDependencies: selectedOption,
      reassignTo: selectedOption === "reassign" ? reassignToUser : null,
      cascade: selectedOption === "cascade",
    };

    try {
      await onConfirm(options);
    } finally {
      setIsProcessing(false);
    }
  };

  const canProceed = () => {
    if (selectedOption === "reassign") {
      return reassignToUser !== "";
    }
    return selectedOption !== "block";
  };

  const getOptionDescription = (option) => {
    switch (option) {
      case "block":
        return "Cancel the deletion. The user and all their data will remain intact.";
      case "cascade":
        return "Delete the user and ALL their related data. This action cannot be undone.";
      case "reassign":
        return "Transfer ownership of all related data to another user, then delete the user.";
      case "soft":
        return "Mark the user as deleted but keep all data in the database for future reference.";
      default:
        return "";
    }
  };

  const getTotalDependencies = () => {
    return Object.values(dependencies).reduce((sum, count) => sum + count, 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <TbExclamationMark className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">Deletion Blocked</h3>
                    <p className="text-amber-100 text-sm">
                      This {itemType} has dependencies that prevent deletion
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/20 disabled:opacity-50 transition-all"
                >
                  <TbX className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Dependencies Overview */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Found {getTotalDependencies()} Related Records
                </h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-amber-800 text-sm mb-3">
                    <strong>"{itemName}"</strong> cannot be deleted because it
                    has the following dependencies:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(dependencies).map(([type, count]) => {
                      const IconComponent = getDependencyIcon(type);
                      return (
                        <div
                          key={type}
                          className="flex items-center space-x-2 text-amber-700"
                        >
                          <IconComponent className="h-5 w-5" />
                          <span className="font-medium">
                            {count} {getDependencyLabel(type)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  How would you like to proceed?
                </h4>

                {/* Block Deletion */}
                <label className="block">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="block"
                    checked={selectedOption === "block"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedOption === "block"
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === "block"
                              ? "border-gray-400"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedOption === "block" && (
                            <div className="h-2 w-2 rounded-full bg-gray-400" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          Cancel Deletion
                        </h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {getOptionDescription("block")}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Reassign */}
                <label className="block">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="reassign"
                    checked={selectedOption === "reassign"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedOption === "reassign"
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === "reassign"
                              ? "border-blue-400"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedOption === "reassign" && (
                            <div className="h-2 w-2 rounded-full bg-blue-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <TbTransfer className="h-5 w-5 text-blue-600" />
                          <h5 className="font-semibold text-gray-900">
                            Reassign & Delete
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {getOptionDescription("reassign")}
                        </p>
                        {selectedOption === "reassign" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Transfer ownership to:
                            </label>
                            <select
                              value={reassignToUser}
                              onChange={(e) =>
                                setReassignToUser(e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select a user...</option>
                              {availableUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.firstName} {user.lastName} ({user.email}
                                  )
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </label>

                {/* Soft Delete */}
                <label className="block">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="soft"
                    checked={selectedOption === "soft"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedOption === "soft"
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === "soft"
                              ? "border-purple-400"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedOption === "soft" && (
                            <div className="h-2 w-2 rounded-full bg-purple-400" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <TbArchive className="h-5 w-5 text-purple-600" />
                          <h5 className="font-semibold text-gray-900">
                            Archive {itemType}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          {getOptionDescription("soft")}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Cascade Delete */}
                <label className="block">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="cascade"
                    checked={selectedOption === "cascade"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedOption === "cascade"
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === "cascade"
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedOption === "cascade" && (
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <TbTrash className="h-5 w-5 text-red-600" />
                          <h5 className="font-semibold text-gray-900">
                            Delete Everything
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {getOptionDescription("cascade")}
                        </p>
                        <div className="bg-red-100 border border-red-200 rounded-lg p-2">
                          <p className="text-red-800 text-xs font-medium">
                            ⚠️ WARNING: This will permanently delete{" "}
                            {getTotalDependencies()} related records!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!canProceed() || isProcessing}
                className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg disabled:opacity-50 transition-all flex items-center space-x-2 ${
                  selectedOption === "cascade"
                    ? "bg-red-600 hover:bg-red-700"
                    : selectedOption === "reassign"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : selectedOption === "soft"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {isProcessing && <TbLoader2 className="h-4 w-4 animate-spin" />}
                <span>
                  {selectedOption === "block"
                    ? "Keep Everything"
                    : selectedOption === "cascade"
                    ? "Delete All"
                    : selectedOption === "reassign"
                    ? "Reassign & Delete"
                    : "Archive User"}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DependencyHandlingModal;
