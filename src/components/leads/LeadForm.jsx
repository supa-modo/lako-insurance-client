import React, { useState, useEffect } from "react";
import { PiCaretDownDuotone, PiUserDuotone } from "react-icons/pi";
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
  TbMoneybag,
} from "react-icons/tb";
import { RiUserShared2Line } from "react-icons/ri";
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
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Form header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-secondary-700">
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
          className="h-[calc(100vh-84px)] overflow-y-auto flex flex-col"
        >
          <div className="p-5 space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="font-semibold text-neutral-700 mb-3 flex items-center">
                <PiUserDuotone size={18} className="mr-2 text-primary-600" />{" "}
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
                      placeholder="Enter client's full name"
                      className={`w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 px-4 py-2 rounded-lg border ${
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

                  {/* Phone Field */}
                  <div className="">
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
                        placeholder="+254 XXX XXX XXX"
                        className={`w-full font-medium text-[0.93rem] bg-neutral-100 text-neutral-800 pl-10 pr-4 py-2 rounded-lg border ${
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
                </div>
                <div className="flex flex-row gap-4">
                  {/* Email Field */}
                  <div className="w-[50%]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Email <span className="text-red-500">*</span>
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
                        placeholder="email@example.com"
                        className={`w-full font-medium text-[0.96rem] bg-neutral-100 text-neutral-800 pl-10 pr-4 py-2 rounded-lg border ${
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

                  {/* Budget Field */}
                  <div className="w-[30%]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbMoneybag className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full font-medium text-[0.93rem] bg-neutral-100 text-neutral-800 pl-10 pr-4 py-2 rounded-lg border ${
                          errors.budget
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                        placeholder="KES 50,000"
                      />
                      {errors.budget && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.budget}
                        </div>
                      )}
                    </div>
                  </div>  

                  {/* Age Field */}
                  <div className="w-[20%]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="i.e. 65"
                      min="18"
                      className={`w-full font-medium text-[0.93rem] bg-neutral-100 text-neutral-800 px-4 py-2 rounded-lg border ${
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

            {/* Lead Details */}
            <div className="border-t border-gray-200 pt-5">
            <h3 className="font-semibold text-neutral-700 mb-3 flex items-center">
            <TbInfoCircle size={20} className="mr-2 text-primary-600" /> Lead Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Status Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full font-medium text-[0.93rem] bg-neutral-100 text-neutral-800 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  >
                    <option value="new">New Lead</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="converted">Converted</option>
                  </select>

                  <PiCaretDownDuotone className="absolute right-4 top-0 bottom-0 my-auto h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                </div>

                {/* Assigned To Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiUserShared2Line className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className={`w-full font-medium text-[0.93rem] bg-neutral-100 text-neutral-800 pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  >
                    <option value="">Not Assigned</option>
                    <option value="Mary W.">Mary W.</option>
                    <option value="James O.">James O.</option>
                    <option value="Sarah N.">Sarah N.</option>
                    <option value="David K.">David K.</option>
                  </select>
                  <PiCaretDownDuotone className="absolute right-4 top-0 bottom-0 my-auto h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
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
                              ? "bg-red-200 border-red-300 text-red-800"
                              : priority === "medium"
                              ? "bg-yellow-200 border-yellow-300 text-yellow-800"
                              : "bg-blue-200 border-blue-300 text-blue-800"
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
                      <TbCalendar size={22} className=" text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="nextFollowUp"
                      value={formData.nextFollowUp}
                      onChange={handleChange}
                      className={`w-full font-medium text-[0.93rem] bg-neutral-100 text-neutral-800 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
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
                    className={`w-full font-medium placeholder:font-normal text-[0.93rem] bg-neutral-100 text-neutral-800 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                    placeholder="Add a tag"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-primary-500 text-white p-2 rounded-lg focus:outline-none hover:bg-primary-600 transition-colors"
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
                className="w-full text-[0.95rem] bg-neutral-100 text-neutral-800 placeholder:font-normal px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Add any additional notes or information about the lead"
              ></textarea>
            </div>

             {/* Form actions */}
      <div className="border-t border-gray-200 py-4 text-[0.93rem] font-medium flex justify-end space-x-3 px-5">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-200 transition-colors"
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
