import React, { useState, useEffect } from "react";
import {
  TbUser,
  TbPhone,
  TbMail,
  TbCalendar,
  TbCurrencyDollar,
  TbArrowLeft,
  TbCheck,
  TbX,
  TbAlertCircle,
  TbEdit,
  TbTrash,
  TbFileText,
  TbCalendarTime,
  TbFileDescription,
  TbInfoCircle,
  TbShieldCheck,
  TbMessageCircle,
  TbHistory,
} from "react-icons/tb";

const RenewalModal = ({ renewal, onClose, onSave, onDelete, onProcess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    policyNumber: "",
    policyType: "",
    currentPremium: "",
    dueDate: "",
    status: "upcoming",
    notes: "",
    lastContact: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    updatedPremium: "",
    updatedCoverage: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (renewal) {
      // For a new renewal, default values are already set
      // For an existing renewal, update with its values
      setFormData({
        ...renewal,
        updatedPremium: renewal.updatedPremium || "",
        updatedCoverage: renewal.updatedCoverage || "",
      });
    }
  }, [renewal]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.clientName.trim())
      newErrors.clientName = "Client name is required";
    if (!formData.policyNumber.trim())
      newErrors.policyNumber = "Policy number is required";
    if (!formData.policyType.trim())
      newErrors.policyType = "Policy type is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    // If we have errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save the renewal
    onSave(formData);
    setIsEditing(false);
  };

  const handleProcess = () => {
    const processedRenewal = {
      ...formData,
      status: "processed",
      processedDate: new Date().toISOString(),
    };

    onProcess(processedRenewal);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status info for display
  const getStatusInfo = (status) => {
    switch (status) {
      case "upcoming":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          label: "Upcoming",
        };
      case "overdue":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          label: "Overdue",
        };
      case "processed":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          label: "Processed",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          label: status,
        };
    }
  };

  const statusInfo = getStatusInfo(formData.status);

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
          <h2 className="text-lg font-semibold text-secondary-700 flex items-center">
            <span>{isEditing ? "Edit Renewal" : "Renewal Details"}</span>
          </h2>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-primary-600 rounded-full p-1 hover:bg-gray-100"
              >
                <TbEdit className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-200"
            >
              <TbX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-84px)]">
          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-neutral-900 flex items-center">
                  <TbUser className="mr-2 text-primary-500" />
                  Client Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Client Name*
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${
                        errors.clientName
                          ? "border-red-300"
                          : "border-neutral-300"
                      } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {errors.clientName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <TbAlertCircle className="h-4 w-4 mr-1" />
                        {errors.clientName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Due Date*
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate.substring(0, 10)}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${
                        errors.dueDate ? "border-red-300" : "border-neutral-300"
                      } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {errors.dueDate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <TbAlertCircle className="h-4 w-4 mr-1" />
                        {errors.dueDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbMail className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="email"
                        name="contactInfo.email"
                        value={formData.contactInfo.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-neutral-300 py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbPhone className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="tel"
                        name="contactInfo.phone"
                        value={formData.contactInfo.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-neutral-300 py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-neutral-900 flex items-center">
                  <TbFileText className="mr-2 text-primary-500" />
                  Policy Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Policy Number*
                    </label>
                    <input
                      type="text"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${
                        errors.policyNumber
                          ? "border-red-300"
                          : "border-neutral-300"
                      } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {errors.policyNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <TbAlertCircle className="h-4 w-4 mr-1" />
                        {errors.policyNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Policy Type*
                    </label>
                    <input
                      type="text"
                      name="policyType"
                      value={formData.policyType}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${
                        errors.policyType
                          ? "border-red-300"
                          : "border-neutral-300"
                      } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {errors.policyType && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <TbAlertCircle className="h-4 w-4 mr-1" />
                        {errors.policyType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Current Premium*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbCurrencyDollar className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        name="currentPremium"
                        value={formData.currentPremium}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-neutral-300 py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Contact Date
                    </label>
                    <input
                      type="date"
                      name="lastContact"
                      value={
                        formData.lastContact
                          ? formData.lastContact.substring(0, 10)
                          : ""
                      }
                      onChange={handleChange}
                      className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Renewal Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-neutral-900 flex items-center">
                  <TbShieldCheck className="mr-2 text-primary-500" />
                  Renewal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Updated Premium
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbCurrencyDollar className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        name="updatedPremium"
                        value={formData.updatedPremium}
                        onChange={handleChange}
                        placeholder="Enter updated premium amount"
                        className="block w-full rounded-md border border-neutral-300 py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="overdue">Overdue</option>
                      <option value="processed">Processed</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Updated Coverage
                    </label>
                    <input
                      type="text"
                      name="updatedCoverage"
                      value={formData.updatedCoverage}
                      onChange={handleChange}
                      placeholder="Enter updated coverage details"
                      className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      rows="4"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add notes about the renewal"
                      className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="p-6">
              {/* Client Information */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
                    {formData.clientName.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h4 className="text-xl font-bold text-neutral-800 mr-3">
                        {formData.clientName}
                      </h4>
                      <span
                        className={`${statusInfo.bgColor} ${statusInfo.textColor} px-3 py-0.5 rounded-md text-xs font-medium`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-500">
                      {formData.contactInfo.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h5 className="text-sm font-medium text-neutral-600 mb-3">
                      Contact Information
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <TbMail className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-sm text-neutral-800">
                            {formData.contactInfo.email || "—"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TbPhone className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-sm text-neutral-800">
                            {formData.contactInfo.phone || "—"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TbCalendarTime className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-xs text-neutral-500">
                            Last Contact
                          </div>
                          <div className="text-sm text-neutral-800">
                            {formData.lastContact
                              ? formatDate(formData.lastContact)
                              : "—"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-neutral-600 mb-3">
                      Policy Information
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <TbFileText className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-xs text-neutral-500">
                            Policy Number
                          </div>
                          <div className="text-sm text-neutral-800">
                            {formData.policyNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TbShieldCheck className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-xs text-neutral-500">
                            Policy Type
                          </div>
                          <div className="text-sm text-neutral-800">
                            {formData.policyType}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TbCurrencyDollar className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-xs text-neutral-500">
                            Current Premium
                          </div>
                          <div className="text-sm text-neutral-800 font-medium">
                            {formData.currentPremium}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TbCalendar className="h-5 w-5 text-neutral-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-xs text-neutral-500">
                            Due Date
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              formData.status === "overdue"
                                ? "text-red-600"
                                : "text-neutral-800"
                            }`}
                          >
                            {formatDate(formData.dueDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Renewal Details */}
              {(formData.notes ||
                formData.updatedPremium ||
                formData.updatedCoverage) && (
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-neutral-600 mb-3">
                    Renewal Details
                  </h5>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    {formData.updatedPremium && (
                      <div className="mb-3">
                        <div className="text-xs text-neutral-500 mb-1">
                          Updated Premium
                        </div>
                        <div className="text-sm font-medium text-neutral-800">
                          {formData.updatedPremium}
                        </div>
                      </div>
                    )}

                    {formData.updatedCoverage && (
                      <div className="mb-3">
                        <div className="text-xs text-neutral-500 mb-1">
                          Updated Coverage
                        </div>
                        <div className="text-sm text-neutral-800">
                          {formData.updatedCoverage}
                        </div>
                      </div>
                    )}

                    {formData.notes && (
                      <div>
                        <div className="text-xs text-neutral-500 mb-1">
                          Notes
                        </div>
                        <div className="text-sm text-neutral-800 whitespace-pre-line">
                          {formData.notes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEditing && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex flex-wrap gap-3">
              {formData.status !== "processed" && (
                <button
                  onClick={handleProcess}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                >
                  <TbCheck className="mr-2 h-5 w-5" /> Mark as Processed
                </button>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
              >
                <TbEdit className="mr-2 h-5 w-5" /> Edit Renewal
              </button>

              <button
                onClick={() => onDelete(formData.id)}
                className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center"
              >
                <TbTrash className="mr-2 h-5 w-5" /> Delete
              </button>
            </div>
          </div>
        )}
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

export default RenewalModal;
