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
  TbEye,
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
        return "text-red-600 bg-red-100 border-red-300";
      case "medium":
        return "text-amber-600 bg-amber-100 border-amber-300";
      case "low":
        return "text-green-600 bg-green-100 border-green-300";
      default:
        return "text-gray-600 bg-gray-100 border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-100 border-orange-300";
      case "processed":
        return "text-green-600 bg-green-100 border-green-300";
      case "closed":
        return "text-gray-600 bg-gray-100 border-gray-300";
      default:
        return "text-gray-600 bg-gray-100 border-gray-300";
    }
  };

  if (!message) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] transition-all duration-300 flex items-start justify-end z-50 p-3 font-outfit"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-[700px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
              </div>
              <div className="relative flex justify-between items-center z-10">
                <div>
                  <h2 className="text-white font-semibold text-lg font-lexend">
                    Message Details
                  </h2>
                  <p className="text-white/80 text-sm">
                    Review customer inquiry details
                  </p>  
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                >
                  <TbX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-110px)] flex flex-col">
              <div className="overflow-y-auto flex-1 px-6 py-5">
                <div className="space-y-6">
                  {/* Message Overview */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`p-3 rounded-lg border ${
                            message.type === "callback"
                              ? "bg-red-50 border-red-200 text-red-600"
                              : "bg-blue-50 border-blue-200 text-blue-600"
                          }`}
                        >
                          {message.type === "callback" ? (
                            <TbPhoneCall className="h-6 w-6" />
                          ) : (
                            <TbMailFilled className="h-6 w-6" />
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900 font-lexend">
                            {message.name} -{" "}
                            {message.email && (
                              <span className="text-gray-900">
                                {message.email}
                              </span>
                            )}
                            {message.phone && (
                              <span className="text-gray-900">
                                {message.phone}
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {message.type === "callback"
                              ? "Callback Request"
                              : "Contact Message"}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span
                          className={`inline-flex px-4 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                            message.priority
                          )}`}
                        >
                          {message.priority}
                        </span>
                        <span
                          className={`inline-flex px-4 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {message.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 flex items-center">
                      <TbCalendar className="h-4 w-4 mr-1" />
                      Created: {formatDateWithTime(message.createdAt, true)}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TbMessage2 className="w-5 h-5 mr-2 text-primary-600" />
                      Message Content
                    </h4>
                    <div className="space-y-4">
                      {message.subject && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Subject
                          </label>
                          <p className="text-gray-900 font-medium">
                            {message.subject}
                          </p>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Message
                        </label>
                        <div className="p-2">
                          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                            {message.message}
                          </p>
                        </div>
                      </div>

                      {message.preferredTime && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Contact Time
                          </label>
                          <p className="text-gray-900">
                            {message.preferredTime}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Processing Information */}
                  {message.processedBy && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <TbCheck className="w-5 h-5 mr-2 text-green-600" />
                        Processing Information
                      </h4>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center text-sm text-green-700 mb-3">
                          <TbUser className="h-4 w-4 mr-2" />
                          <span>
                            Processed by {message.processedByName} on{" "}
                            {formatDateWithTime(message.processedAt, true)}
                          </span>
                        </div>
                        {message.notes && (
                          <div>
                            <div className="flex items-center text-sm text-green-600 mb-2">
                              <TbNotes className="h-4 w-4 mr-2" />
                              <span className="font-medium">
                                Processing Notes:
                              </span>
                            </div>
                            <div className="bg-white border border-green-200 rounded-lg p-3">
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                {message.notes}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Processing Notes for pending messages */}
                  {message.status === "pending" && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <TbNotes className="w-5 h-5 mr-2 text-primary-600" />
                        Processing Notes
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Add notes about how this message was handled
                          (Optional)
                        </label>
                        <textarea
                          value={processingNotes}
                          onChange={(e) => setProcessingNotes(e.target.value)}
                          placeholder="Add any notes about how this message was handled..."
                          rows={4}
                          className="w-full px-3 py-2 bg-neutral-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-gray-600 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="border-t border-gray-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Message ID: {message.id}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </button>
                    {message.status === "pending" && (
                      <button
                        onClick={handleProcess}
                        disabled={isProcessing}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center font-medium"
                      >
                        {isProcessing ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <TbCheck className="mr-2 h-4 w-4" />
                            Mark as Processed
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessageDetailModal;
