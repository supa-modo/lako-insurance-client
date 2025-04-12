import React, { useState, useEffect } from "react";
import {
  TbUser,
  TbPhone,
  TbMail,
  TbCalendar,
  TbCurrencyDollar,
  TbUserCheck,
  TbX,
  TbCheck,
  TbId,
  TbCreditCard,
  TbUsers,
  TbCalendarTime,
  TbHistory,
  TbFileReport,
  TbEdit,
  TbTrash,
  TbAlertCircle,
  TbSend,
  TbBrandWhatsapp,
  TbCalendarPlus,
} from "react-icons/tb";

const ClientModal = ({
  client,
  isEditing = false,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    status: "active",
    policyType: "",
    policyNumber: "",
    startDate: "",
    renewalDate: "",
    premium: "",
    claims: 0,
    dependents: 0,
    lastContact: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (client) {
      setFormData({
        ...client,
        notes: client.notes || "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || Number(formData.age) < 18) {
      newErrors.age = "Age must be at least 18";
    }

    if (!formData.policyType.trim()) {
      newErrors.policyType = "Policy type is required";
    }

    if (!formData.premium.trim()) {
      newErrors.premium = "Premium amount is required";
    }

    if (!formData.renewalDate) {
      newErrors.renewalDate = "Renewal date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending_renewal":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate days until renewal
  const getDaysUntilRenewal = (renewalDate) => {
    if (!renewalDate) return "—";
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderViewMode = () => (
    <div className="overflow-y-auto h-[calc(100vh-84px)]">
      {/* Client Summary */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
            {client.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h4 className="text-xl font-semibold text-gray-800">
              {client.name}
            </h4>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-3">Age: {client.age}</span>
              <span
                className={`${getStatusBadgeColor(
                  client.status
                )} px-2 py-0.5 rounded-full text-xs font-medium`}
              >
                {client.status === "active"
                  ? "Active"
                  : client.status === "inactive"
                  ? "Inactive"
                  : "Pending Renewal"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-start">
            <div className="mt-0.5 text-gray-400">
              <TbMail className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <div className="text-xs text-gray-500">Email</div>
              <div className="text-gray-700">{client.email}</div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mt-0.5 text-gray-400">
              <TbPhone className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <div className="text-xs text-gray-500">Phone</div>
              <div className="text-gray-700">{client.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Information */}
      <div className="p-5 border-b border-gray-200">
        <h3 className="font-medium text-gray-800 mb-3">Policy Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs text-gray-500">Policy Type</div>
            <div className="text-gray-700 font-medium">{client.policyType}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Policy Number</div>
            <div className="text-gray-700">{client.policyNumber}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Premium</div>
            <div className="text-gray-700">{client.premium}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Claims</div>
            <div className="text-gray-700">{client.claims} claims filed</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Start Date</div>
            <div className="text-gray-700">{formatDate(client.startDate)}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Renewal Date</div>
            <div
              className={
                getDaysUntilRenewal(client.renewalDate) <= 30
                  ? "text-red-600 font-medium"
                  : "text-gray-700"
              }
            >
              {formatDate(client.renewalDate)}
              <span className="block text-xs">
                {getDaysUntilRenewal(client.renewalDate)} days left
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Dependents</div>
            <div className="text-gray-700">{client.dependents}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Last Contact</div>
            <div className="text-gray-700">
              {formatDate(client.lastContact)}
            </div>
          </div>
        </div>
      </div>

      {/* Notes (if available) */}
      {client.notes && (
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Notes</h3>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {client.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="p-5">
        <h3 className="font-medium text-gray-800 mb-3">Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSave({ ...client, isEditing: true })}
            className="bg-primary-100 hover:bg-primary-200 text-primary-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm"
          >
            <TbEdit className="mr-1.5 w-4 h-4" /> Edit
          </button>
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbSend className="mr-1.5 w-4 h-4" /> Email
          </button>
          <button className="bg-green-100 hover:bg-green-200 text-green-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbBrandWhatsapp className="mr-1.5 w-4 h-4" /> WhatsApp
          </button>
          <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbPhone className="mr-1.5 w-4 h-4" /> Call
          </button>
          <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbCalendarPlus className="mr-1.5 w-4 h-4" /> Schedule
          </button>
        </div>
        <div className="mt-3">
          <button
            onClick={() => onDelete(client.id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm"
          >
            <TbTrash className="mr-1.5 w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <form
      onSubmit={handleSubmit}
      className="overflow-y-auto h-[calc(100vh-84px)]"
    >
      <div className="p-5 space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <TbUser className="mr-2 text-primary-600" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
              />
              {errors.name && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <TbAlertCircle className="mr-1" /> {errors.name}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <TbAlertCircle className="mr-1" /> {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      errors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <TbAlertCircle className="mr-1" /> {errors.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Age Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.age ? "border-red-300 bg-red-50" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                />
                {errors.age && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <TbAlertCircle className="mr-1" /> {errors.age}
                  </div>
                )}
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending_renewal">Pending Renewal</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Information */}
        <div className="border-t border-gray-200 pt-5">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <TbFileReport className="mr-2 text-primary-600" /> Policy
            Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Policy Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="policyType"
                value={formData.policyType}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.policyType
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
              />
              {errors.policyType && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <TbAlertCircle className="mr-1" /> {errors.policyType}
                </div>
              )}
            </div>

            {/* Policy Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.policyNumber
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
              />
              {errors.policyNumber && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <TbAlertCircle className="mr-1" /> {errors.policyNumber}
                </div>
              )}
            </div>

            {/* Premium */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Premium <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="premium"
                  value={formData.premium}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.premium
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                />
                {errors.premium && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <TbAlertCircle className="mr-1" /> {errors.premium}
                  </div>
                )}
              </div>
            </div>

            {/* Claims */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Claims
              </label>
              <input
                type="number"
                name="claims"
                value={formData.claims}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.startDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
              />
              {errors.startDate && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <TbAlertCircle className="mr-1" /> {errors.startDate}
                </div>
              )}
            </div>

            {/* Renewal Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Renewal Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.renewalDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
              />
              {errors.renewalDate && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <TbAlertCircle className="mr-1" /> {errors.renewalDate}
                </div>
              )}
            </div>

            {/* Dependents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dependents
              </label>
              <input
                type="number"
                name="dependents"
                value={formData.dependents}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Last Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Contact
              </label>
              <input
                type="date"
                name="lastContact"
                value={formData.lastContact}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="border-t border-gray-200 pt-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Add any additional notes or information about the client"
          ></textarea>
        </div>

        {/* Form actions */}
        <div className="border-t border-gray-200 pt-5 pb-3 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
          >
            <TbCheck className="mr-2" />
            {client?.id ? "Update Client" : "Add Client"}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50 p-3"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[550px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-2xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-800">
            {!client?.id
              ? "Add New Client"
              : isEditing
              ? "Edit Client"
              : "Client Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        {isEditing || !client?.id ? renderEditMode() : renderViewMode()}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ClientModal;
