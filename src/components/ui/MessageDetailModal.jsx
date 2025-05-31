import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbX,
  TbMail,
  TbPhone,
  TbCalendar,
  TbClock,
  TbUser,
  TbNotes,
  TbCheck,
  TbPhoneCall,
  TbMessage2,
  TbInfoCircle,
  TbAlertCircle,
  TbMailFilled,
  TbExternalLink,
} from "react-icons/tb";
import { formatDateWithTime } from "../../utils/formatDate";

const MessageDetailModal = ({
  isOpen,
  onClose,
  message,
  onProcessMessage,
  processingNotes,
  setProcessingNotes,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleProcess = async () => {
    if (!message) return;
    setIsProcessing(true);
    try {
      await onProcessMessage(message.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border border-red-300 text-red-800";
      case "medium":
        return "bg-yellow-100 border border-yellow-300 text-yellow-800";
      case "low":
        return "bg-green-100 border border-green-300 text-green-800";
      default:
        return "bg-gray-100 border border-gray-300 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 border border-orange-300 text-orange-800";
      case "processed":
        return "bg-green-100 border border-green-300 text-green-800";
      case "closed":
        return "bg-gray-100 border border-gray-300 text-gray-800";
      default:
        return "bg-gray-100 border border-gray-300 text-gray-800";
    }
  };

  if (!message) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Message Details
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <TbX className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{message.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <p className="text-gray-900 capitalize">{message.type}</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {message.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {message.email}
                    </a>
                  </div>
                )}
                {message.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <a
                      href={`tel:${message.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {message.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                      message.status
                    )}`}
                  >
                    {message.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getPriorityColor(
                      message.priority
                    )}`}
                  >
                    {message.priority}
                  </span>
                </div>
              </div>

              {/* Subject & Message */}
              {message.subject && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <p className="text-gray-900">{message.subject}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="bg-gray-50 rounded p-3 border">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>

              {/* Preferred Time */}
              {message.preferredTime && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <p className="text-gray-900">{message.preferredTime}</p>
                </div>
              )}

              {/* Processing Info */}
              {message.processedBy && (
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Information
                  </label>
                  <p className="text-sm text-gray-600 mb-1">
                    Processed by {message.processedByName} on{" "}
                    {formatDateWithTime(message.processedAt, true)}
                  </p>
                  {message.notes && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        Notes:
                      </p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {message.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Processing Notes for pending */}
              {message.status === "pending" && (
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Notes (Optional)
                  </label>
                  <textarea
                    value={processingNotes}
                    onChange={(e) => setProcessingNotes(e.target.value)}
                    placeholder="Add any notes about how this message was handled..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Created: {formatDateWithTime(message.createdAt, true)}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  Close
                </button>
                {message.status === "pending" && (
                  <button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Mark as Processed"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageDetailModal;
