import React, { useState, useEffect } from "react";
import { safeGetClientById } from "../../services/clientService";
import { PiUserDuotone } from "react-icons/pi";
import { getStatusBadgeColor, formatDate } from "../../utils/formatDate";
import {
  TbPhone,
  TbMail,
  TbX,
  TbCheck,
  TbEdit,
  TbTrash,
  TbAlertCircle,
  TbSend,
  TbBrandWhatsapp,
  TbCalendarPlus,
  TbMessage2Star,
  TbFileTextSpark,
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
      <div className="py-5 px-2 border-b border-gray-200">
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center mb-4">
            <div className="h-14 w-14 rounded-[0.7rem] uppercase bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
              {client.name.charAt(0)}
              {client.name.charAt(1)}
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-primary-700 mb-1">
                {client.name}
              </h4>
              <div className="flex items-center text-[0.83rem] text-gray-500">
                <span className="mr-3">Age: {client.age} years</span>
                <span
                  className={`${getStatusBadgeColor(
                    client.status
                  )} px-4 py-0.5 rounded-full text-xs font-medium`}
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

          <div className="bg-neutral-200 rounded-md px-8 py-2">
            <p className="text-xs text-gray-500 mb-1">Renewal Date </p>
            <div
              className={`text-sm font-semibold ${
                getDaysUntilRenewal(client.renewalDate) <= 30
                  ? "text-red-600 "
                  : "text-gray-700"
              }`}
            >
              {formatDate(client.renewalDate)}
              <span className="block text-xs">
                {getDaysUntilRenewal(client.renewalDate)} days left
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
              <div className="text-gray-600 font-medium text-[0.9rem]">
                {client.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Information */}
      <div className="py-5 px-2 border-b border-gray-200">
        <h3 className="font-semibold text-primary-700 mb-3 flex items-center">
          Policy Information
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
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
            <div className="text-xs text-gray-500">Dependents</div>
            <div className="text-gray-700">{client.dependents}</div>
          </div>

          {/* <div>
            <div className="text-xs text-gray-500">Last Contact</div>
            <div className="text-gray-700">
              {formatDate(client.lastContact)}
            </div>
          </div> */}
        </div>
      </div>

      {/* Actions */}
      <div className="px-2 border-b border-gray-200">
        <div className="py-3 text-sm text-gray-500">Actions</div>
        <div className="pb-5 flex flex-wrap gap-2 font-medium">
          <button
            onClick={() => onSave({ ...client, isEditing: true })}
            className="border hover:bg-primary-200 text-primary-600 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm"
          >
            <TbEdit className="mr-1.5 w-4 h-4" /> Edit
          </button>
          <button className="border hover:bg-blue-200 text-blue-600 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbSend className="mr-1.5 w-4 h-4" /> Email
          </button>
          <button className="border hover:bg-green-200 text-green-600 px-5 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbBrandWhatsapp className="mr-1.5 w-4 h-4" /> WhatsApp
          </button>
          <button className="border hover:bg-neutral-400 text-neutral-700 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbPhone className="mr-1.5 w-4 h-4" /> Call
          </button>
          <button className="border hover:bg-yellow-200 text-yellow-600 px-4 py-1.5 rounded-md flex items-center transition-colors text-sm">
            <TbCalendarPlus className="mr-1.5 w-4 h-4" /> Schedule
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm"
          >
            <TbTrash className="mr-1.5 w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="py-5 px-2 border-b border-gray-200">
        <h3 className="font-semibold text-primary-700 mb-3 flex items-center">
          <TbMessage2Star className="mr-2 " /> Client Notes
        </h3>
        <div className="bg-neutral-200 rounded-md px-4 py-2 min-h-[120px]">
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {client.notes || "No notes available for this client."}
          </p>
        </div>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <form
      onSubmit={handleSubmit}
      className="overflow-y-auto h-[calc(100vh-84px)] flex flex-col"
    >
      <div className="px-5 py-4 flex-grow">
        <div className="space-y-5">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-neutral-700 mb-3 flex items-center">
              <PiUserDuotone size={19} className="mr-2 text-primary-600" />{" "}
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
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
                    className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <TbAlertCircle className="mr-1" /> {errors.name}
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
                    className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending_renewal">Pending Renewal</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                {/* Email Field */}
                <div className="w-[50%]">
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
                      className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 pl-10 pr-4 py-2 rounded-lg border ${
                        errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                    />
                    {errors.email && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="w-[35%]">
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
                      className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 pl-10 pr-4 py-2 rounded-lg border ${
                        errors.phone
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                    />
                    {errors.phone && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Age Field */}
                <div className="w-[15%]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                      errors.age
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  />
                  {errors.age && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <TbAlertCircle className="mr-1" /> {errors.age}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Policy Information */}
          <div className="border-t border-gray-200 pt-5">
            <h3 className="font-semibold text-neutral-700 mb-3 flex items-center">
              <TbFileTextSpark size={20} className="mr-2 text-primary-600" />{" "}
              Policy Information
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
                  className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                    errors.policyType
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
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
                  className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                    errors.policyNumber
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
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
                    className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                      errors.premium
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
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
                  className="w-full bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                  className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                    errors.startDate
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
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
                  className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border ${
                    errors.renewalDate
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
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
                  className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                  className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block mb-2">
              <h3 className="font-semibold text-neutral-700 mb-3 flex items-center">
                <TbMessage2Star size={20} className="mr-2 text-primary-600" />{" "}
                Client Notes
              </h3>
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Add any additional notes or information about the client"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Form actions */}
      <div className="border-t border-gray-200 py-4 text-[0.93rem] font-medium flex justify-end space-x-3 px-5">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-200 transition-colors"
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
    </form>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-secondary-700">
            {!client?.id
              ? "Add New Client"
              : isEditing
              ? `Edit Client Details - ${client.name}`
              : "Client Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5">
          {isEditing || !client?.id ? renderEditMode() : renderViewMode()}
        </div>
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
