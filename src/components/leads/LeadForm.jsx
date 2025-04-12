import React, { useState, useEffect } from "react";
import {
  TbCheck,
  TbX,
  TbUser,
  TbPhone,
  TbMail,
  TbCalendar,
  TbCurrencyDollar,
  TbStar,
  TbPlus,
  TbInfoCircle,
  TbCircleCheck,
  TbAlertCircle,
  TbTrash,
  TbTag,
} from "react-icons/tb";

const LeadForm = ({ initialData, onSave, onCancel }) => {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    budget: "",
    status: "new", // Default status is 'new'
    priority: "medium",
    assignedTo: "",
    tags: [],
    nextFollowUp: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Load initial data if provided (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags || [],
      });
    }
  }, [initialData]);

  // Form validation
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

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (
      isNaN(formData.age) ||
      Number(formData.age) < 18 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = "Age must be between 18 and 120";
    }

    if (!formData.budget.trim()) {
      newErrors.budget = "Budget is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        age: Number(formData.age),
      };
      onSave(dataToSubmit);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

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
        {/* Form header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Edit Lead" : "Add New Lead"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
            onClick={onCancel}
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-[calc(100vh-84px)] overflow-y-auto"
        >
          <div className="p-5 space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <TbUser className="mr-2 text-primary-600" /> Personal
                Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      placeholder="Enter client's full name"
                    />
                    {errors.name && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.name}
                      </div>
                    )}
                  </div>
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
                        placeholder="client@example.com"
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
                        placeholder="+254 712 345678"
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
                    <div className="relative">
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="120"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.age
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                        placeholder="Age in years"
                      />
                      {errors.age && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.age}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Budget Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbCurrencyDollar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                          errors.budget
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                        placeholder="KES 50,000"
                      />
                      {errors.budget && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.budget}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <TbInfoCircle className="mr-2 text-primary-600" /> Lead Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
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
                    <option value="new">New Lead</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>

                {/* Assigned To Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Not Assigned</option>
                    <option value="Mary W.">Mary W.</option>
                    <option value="James O.">James O.</option>
                    <option value="Sarah N.">Sarah N.</option>
                    <option value="David K.">David K.</option>
                  </select>
                </div>

                {/* Priority Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="flex space-x-1">
                    {["low", "medium", "high"].map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        className={`flex-1 py-1.5 px-2 rounded-lg border text-sm ${
                          formData.priority === priority
                            ? priority === "high"
                              ? "bg-red-100 border-red-300 text-red-800"
                              : priority === "medium"
                              ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                              : "bg-blue-100 border-blue-300 text-blue-800"
                            : "bg-white border-gray-300 text-gray-700"
                        } transition-colors`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, priority }))
                        }
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Follow-up Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Follow-up
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TbCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="nextFollowUp"
                      value={formData.nextFollowUp}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="border-t border-gray-200 pt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbTag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Add a tag"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <TbPlus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-2 text-primary-400 hover:text-primary-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <TbX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {formData.tags.length === 0 && (
                  <span className="text-gray-500 text-sm">
                    No tags added yet
                  </span>
                )}
              </div>
            </div>

            {/* Notes Field */}
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
                placeholder="Add any additional notes or information about the lead"
              ></textarea>
            </div>

            {/* Form actions */}
            <div className="border-t border-gray-200 pt-5 pb-3 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <TbCheck className="mr-2" />
                {initialData ? "Update Lead" : "Add Lead"}
              </button>
            </div>
          </div>
        </form>
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

export default LeadForm;
