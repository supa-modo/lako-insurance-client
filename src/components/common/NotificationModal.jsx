import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  TbCheck,
  TbX,
  TbInfoCircle,
  TbAlertTriangle,
  TbAlertOctagon,
} from "react-icons/tb";

/**
 * NotificationModal Component
 * A custom modal for displaying notifications, alerts, and confirmations
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of notification: 'success', 'error', 'info', 'warning', 'confirm'
 * @param {string} props.message - Message to display
 * @param {string} props.title - Optional title for the notification
 * @param {function} props.onConfirm - Callback for confirm button (only for 'confirm' type)
 * @param {function} props.onCancel - Callback for cancel button (only for 'confirm' type)
 * @param {number} props.autoClose - Time in ms to auto-close (0 to disable)
 * @param {function} props.onClose - Callback when modal is closed
 */
const NotificationModal = ({
  type = "info",
  message,
  title,
  onConfirm,
  onCancel,
  autoClose = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  // Get configuration based on type
  const getConfig = useCallback(() => {
    switch (type) {
      case "success":
        return {
          icon: <TbCheck className="h-6 w-6 text-white" />,
          bgColor: "bg-green-500",
          hoverBgColor: "hover:bg-green-600",
          borderColor: "border-green-600",
          textColor: "text-green-700",
          bgLight: "bg-green-50",
          title: title || "Success",
        };
      case "error":
        return {
          icon: <TbAlertOctagon className="h-6 w-6 text-white" />,
          bgColor: "bg-red-500",
          hoverBgColor: "hover:bg-red-600",
          borderColor: "border-red-600",
          textColor: "text-red-700",
          bgLight: "bg-red-50",
          title: title || "Error",
        };
      case "warning":
        return {
          icon: <TbAlertTriangle className="h-6 w-6 text-white" />,
          bgColor: "bg-yellow-500",
          hoverBgColor: "hover:bg-yellow-600",
          borderColor: "border-yellow-600",
          textColor: "text-yellow-700",
          bgLight: "bg-yellow-50",
          title: title || "Warning",
        };
      case "confirm":
        return {
          icon: <TbAlertTriangle className="h-6 w-6 text-white" />,
          bgColor: "bg-blue-500",
          hoverBgColor: "hover:bg-blue-600",
          borderColor: "border-blue-600",
          textColor: "text-blue-700",
          bgLight: "bg-blue-50",
          title: title || "Confirm",
        };
      case "info":
      default:
        return {
          icon: <TbInfoCircle className="h-6 w-6 text-white" />,
          bgColor: "bg-primary-500",
          hoverBgColor: "hover:bg-primary-600",
          borderColor: "border-primary-600",
          textColor: "text-primary-700",
          bgLight: "bg-primary-50",
          title: title || "Information",
        };
    }
  }, [type, title]);

  const config = getConfig();

  // Handle close
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose();
    if (timeoutId) clearTimeout(timeoutId);
  }, [onClose, timeoutId]);

  // Handle confirm (for confirm type)
  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm();
    handleClose();
  }, [onConfirm, handleClose]);

  // Handle cancel (for confirm type)
  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  // Set up auto-close
  useEffect(() => {
    if (autoClose > 0 && type !== "confirm") {
      const id = setTimeout(() => {
        handleClose();
      }, autoClose);
      setTimeoutId(id);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [autoClose, handleClose, type, timeoutId]);

  // If not visible, don't render
  if (!isVisible) return null;

  // Create portal to render at the end of the body
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 py-6 pointer-events-none sm:p-0">
      <div
        className={`fixed inset-0 transition-opacity ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
      </div>

      <div
        className={`${
          config.bgLight
        } rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full pointer-events-auto ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-start p-4 border-b ${config.borderColor}">
          <div
            className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${config.bgColor} sm:h-12 sm:w-12 mr-3`}
          >
            {config.icon}
          </div>
          <div className="w-0 flex-1 pt-0.5">
            <h3 className={`text-lg font-medium leading-6 ${config.textColor}`}>
              {config.title}
            </h3>
            <p className="mt-1 text-sm text-gray-700">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              onClick={handleClose}
            >
              <TbX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {type === "confirm" && (
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gray-50">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${config.bgColor} text-base font-medium text-white ${config.hoverBgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm`}
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default NotificationModal;
