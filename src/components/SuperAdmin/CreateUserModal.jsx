import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiUserCheck,
} from "react-icons/fi";
import {
  TbX,
  TbUser,
  TbMail,
  TbPhone,
  TbUserCheck,
  TbLock,
  TbCheck,
  TbAlertCircle,
  TbUserPlus,
} from "react-icons/tb";

const CreateUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "staff",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = [
    { value: "staff", label: "Staff" },
    { value: "agent", label: "Agent" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Super Admin" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "staff",
        phone: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors({ submit: "Failed to create user. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "staff",
      phone: "",
    });
    setErrors({});
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

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
                  <TbUserPlus size={40} className="text-white mr-3" />
                  <div>
                    <h2 className="text-white font-semibold text-lg font-lexend">
                      Create New User
                    </h2>
                    <p className="text-white/80 text-sm">
                      Add a new user account to the system
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

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                            errors.password
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                          placeholder="Enter password"
                        />
                        {errors.password && (
                          <div className="text-red-500 text-xs mt-1 flex items-center">
                            <TbAlertCircle className="mr-1" />
                            {errors.password}
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number (Optional)
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <TbCheck className="mr-2 h-4 w-4" />
                        Create User
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

export default CreateUserModal;
