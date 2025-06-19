import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiUserCheck,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import {
  TbX,
  TbUser,
  TbMail,
  TbPhone,
  TbUserCheck,
  TbCheck,
  TbAlertCircle,
  TbUserEdit,
  TbToggleLeft,
  TbToggleRight,
  TbShieldHalfFilled,
  TbShieldOff,
} from "react-icons/tb";
import { userAPI } from "../../api/superadminApi";

const EditUserModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "staff",
    phone: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);
  const [notification, setNotification] = useState(null);

  const roles = [
    { value: "staff", label: "Staff" },
    { value: "agent", label: "Agent" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Super Admin" },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "staff",
        phone: user.phone || "",
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error updating user:", error);
      setErrors({ submit: "Failed to update user. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setNotification(null);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handle2FADisable = async () => {
    if (!user?.twoFactorEnabled) return;

    setIsDisabling2FA(true);
    try {
      await userAPI.disable2FAForUser(user.id);
      setNotification({
        type: "success",
        message: "Two-factor authentication has been disabled successfully.",
      });

      // Update local user data to reflect the change
      setFormData((prev) => ({ ...prev, twoFactorEnabled: false }));

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      setNotification({
        type: "error",
        message: "Failed to disable 2FA. Please try again.",
      });
    } finally {
      setIsDisabling2FA(false);
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-[650px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
              <div className="relative flex justify-between items-center z-10">
                <div className="flex items-center">
                  <TbUserEdit size={40} className="text-white mr-3" />
                  <div>
                    <h2 className="text-white font-semibold text-lg font-lexend">
                      Edit User Account
                    </h2>
                    <p className="text-white/80 text-sm">
                      Update user information and settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                >
                  <TbX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]"
            >
              <div className="overflow-y-auto flex-1 px-3 md:px-6 py-5">
                <div className="space-y-6">
                  {/* Notification */}
                  {notification && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg border ${
                        notification.type === "success"
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{notification.message}</p>
                        <button
                          onClick={() => setNotification(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <TbX className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <TbAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-sm text-red-800">{errors.submit}</p>
                      </div>
                    </div>
                  )}

                  {/* Personal Information */}
                  <div>
                    <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                      <TbUser size={20} className="mr-2 text-primary-600" />
                      Personal Information
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                              errors.firstName
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                            placeholder="Enter first name"
                          />
                          {errors.firstName && (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                              <TbAlertCircle className="mr-1" />
                              {errors.firstName}
                            </div>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                              errors.lastName
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                            placeholder="Enter last name"
                          />
                          {errors.lastName && (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                              <TbAlertCircle className="mr-1" />
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                            errors.email
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <div className="text-red-500 text-xs mt-1 flex items-center">
                            <TbAlertCircle className="mr-1" />
                            {errors.email}
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="+254712345678"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                      <TbUserCheck
                        size={20}
                        className="mr-2 text-primary-600"
                      />
                      Account Settings
                    </h3>

                    <div className="space-y-4">
                      {/* Role */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          User Role <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Active Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Account Status
                        </label>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700">
                              Account is{" "}
                              {formData.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                isActive: !prev.isActive,
                              }))
                            }
                            className="flex items-center space-x-2"
                          >
                            {formData.isActive ? (
                              <TbToggleRight className="h-6 w-6 text-green-500" />
                            ) : (
                              <TbToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                formData.isActive
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {formData.isActive ? "Active" : "Inactive"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                      <TbShieldHalfFilled
                        size={20}
                        className="mr-2 text-primary-600"
                      />
                      Security Settings
                    </h3>

                    <div className="space-y-4">
                      {/* 2FA Status and Management */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Two-Factor Authentication
                        </label>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {user.twoFactorEnabled ? (
                                <>
                                  <TbShieldHalfFilled className="h-5 w-5 text-green-600 mr-2" />
                                  <div>
                                    <span className="text-sm font-medium text-gray-700">
                                      2FA is Enabled
                                    </span>
                                    <p className="text-xs text-gray-500">
                                      User's account is protected with 2FA
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <TbShieldOff className="h-5 w-5 text-gray-400 mr-2" />
                                  <div>
                                    <span className="text-sm font-medium text-gray-700">
                                      2FA is Disabled
                                    </span>
                                    <p className="text-xs text-gray-500">
                                      User has not enabled 2FA
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {user.twoFactorEnabled && (
                            <button
                              type="button"
                              onClick={handle2FADisable}
                              disabled={isDisabling2FA}
                              className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                            >
                              {isDisabling2FA ? (
                                <>
                                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Disabling...
                                </>
                              ) : (
                                <>
                                  <TbShieldOff className="mr-2 h-4 w-4" />
                                  Disable 2FA
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {user.twoFactorEnabled && (
                          <p className="text-xs text-amber-600 mt-2">
                            ⚠️ Disabling 2FA will reduce account security. This
                            action will be logged.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="border-t border-gray-200 bg-white px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <TbCheck className="mr-2 h-4 w-4" />
                        Update User
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUserModal;
