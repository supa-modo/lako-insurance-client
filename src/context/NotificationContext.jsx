import React, { createContext, useState, useContext, useCallback } from "react";
import NotificationModal from "../components/common/NotificationModal";

// Create the context
const NotificationContext = createContext();

/**
 * NotificationProvider Component
 * Provides notification functionality to the entire application
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Generate unique ID for each notification
  const generateId = useCallback(() => {
    return `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }, []);

  // Add a notification
  const addNotification = useCallback((notification) => {
    const id = generateId();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  }, [generateId]);

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  // Success notification
  const showSuccess = useCallback((message, options = {}) => {
    return addNotification({
      type: "success",
      message,
      ...options,
    });
  }, [addNotification]);

  // Error notification
  const showError = useCallback((message, options = {}) => {
    return addNotification({
      type: "error",
      message,
      ...options,
    });
  }, [addNotification]);

  // Info notification
  const showInfo = useCallback((message, options = {}) => {
    return addNotification({
      type: "info",
      message,
      ...options,
    });
  }, [addNotification]);

  // Warning notification
  const showWarning = useCallback((message, options = {}) => {
    return addNotification({
      type: "warning",
      message,
      ...options,
    });
  }, [addNotification]);

  // Confirmation dialog
  const showConfirmation = useCallback((message, onConfirm, onCancel, options = {}) => {
    return addNotification({
      type: "confirm",
      message,
      onConfirm,
      onCancel,
      autoClose: 0, // Don't auto-close confirmation dialogs
      ...options,
    });
  }, [addNotification]);

  // Value to be provided by the context
  const value = {
    notifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showConfirmation,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.map((notification) => (
        <NotificationModal
          key={notification.id}
          type={notification.type}
          message={notification.message}
          title={notification.title}
          onConfirm={notification.onConfirm}
          onCancel={notification.onCancel}
          autoClose={notification.autoClose}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export default NotificationContext;
