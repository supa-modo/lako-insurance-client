import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbBuilding,
  TbMail,
  TbPhone,
  TbWorld,
  TbFileDescription,
  TbCheck,
  TbAlertCircle,
  TbStar,
} from "react-icons/tb";
import insuranceService from "../../services/insuranceService";

const EditCompanyModal = ({ company, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    logoUrl: "",
    description: "",
    rating: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form data with company details
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        contactEmail: company.contactEmail || "",
        contactPhone: company.contactPhone || "",
        website: company.website || "",
        logoUrl: company.logoUrl || "",
        description: company.description || "",
        rating: company.rating ? company.rating.toString() : "",
      });
    }
  }, [company]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email address is invalid";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    }

    if (
      formData.rating &&
      (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)
    ) {
      newErrors.rating = "Rating must be a number between 0 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Process form data
      const processedData = {
        ...formData,
        rating: formData.rating ? parseFloat(formData.rating) : null,
      };

      const response = await insuranceService.updateCompany(
        company.id,
        processedData
      );

      if (response && response.success) {
        onSave(response.data);
        onClose();
      } else {
        setErrors({ submit: response?.message || "Failed to update company" });
      }
    } catch (error) {
      console.error("Error updating company:", error);
      setErrors({ submit: "Failed to update company. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRatingSelect = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating: rating.toString(),
    }));

    if (errors.rating) {
      setErrors((prev) => ({
        ...prev,
        rating: "",
      }));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const ratingOptions = [
    {
      value: "5",
      label: "Excellent (5.0)",
      color: "text-green-600 bg-green-50 border-green-200",
    },
    {
      value: "4.5",
      label: "Very Good (4.5)",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      value: "4",
      label: "Good (4.0)",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    {
      value: "3.5",
      label: "Fair (3.5)",
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      value: "3",
      label: "Average (3.0)",
      color: "text-red-600 bg-red-50 border-red-200",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbBuilding className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Edit Insurance Company
                </h2>
                <p className="text-white/80 text-sm">
                  Update company information for {company?.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            >
              <TbX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-[calc(100vh-81px)]"
        >
          <div className="overflow-y-auto flex-1 px-6 py-5">
            <div className="space-y-6">
              {/* Logo Preview */}
              {formData.logoUrl && (
                <div className="text-center">
                  <div className="inline-block p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <img
                      src={formData.logoUrl}
                      alt="Company logo preview"
                      className="h-16 w-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Current Logo</p>
                </div>
              )}

              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbBuilding size={20} className="mr-2 text-blue-600" />
                  Basic Information
                </h3>

                <div className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Enter company name"
                    />
                    {errors.name && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Description
                    </label>
                    <div className="relative">
                      <TbFileDescription className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Brief description of the company..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbMail size={20} className="mr-2 text-blue-600" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <TbMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 pl-10 pr-4 py-2.5 rounded-lg border ${
                          errors.contactEmail
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        placeholder="contact@company.com"
                      />
                    </div>
                    {errors.contactEmail && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.contactEmail}
                      </div>
                    )}
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <TbPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 pl-10 pr-4 py-2.5 rounded-lg border ${
                          errors.contactPhone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        placeholder="+254-20-1234567"
                      />
                    </div>
                    {errors.contactPhone && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.contactPhone}
                      </div>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <TbWorld className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="https://www.company.com"
                      />
                    </div>
                  </div>

                  {/* Logo URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://www.company.com/logo.png"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbStar size={20} className="mr-2 text-blue-600" />
                  Company Rating
                </h3>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Company Rating (Optional)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {ratingOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                          formData.rating === option.value
                            ? option.color
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={formData.rating === option.value}
                          onChange={() => handleRatingSelect(option.value)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-4 h-4 border-2 rounded-full mr-3 ${
                            formData.rating === option.value
                              ? "border-current bg-current"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.rating === option.value && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <TbStar className="w-4 h-4 mr-2" />
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.rating && (
                    <div className="text-red-500 text-xs flex items-center">
                      <TbAlertCircle className="mr-1" /> {errors.rating}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <TbAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-sm text-red-800">{errors.submit}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <TbCheck className="mr-2 h-4 w-4" />
                    Update Company
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditCompanyModal;
