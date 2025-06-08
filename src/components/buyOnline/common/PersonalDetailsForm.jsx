import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbAlertCircle,
} from "react-icons/tb";

const PersonalDetailsForm = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value || value.trim().length === 0) {
          error = "First name is required";
        } else if (value.trim().length < 2) {
          error = "First name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s-']+$/.test(value)) {
          error = "First name contains invalid characters";
        }
        break;

      case "lastName":
        if (!value || value.trim().length === 0) {
          error = "Last name is required";
        } else if (value.trim().length < 2) {
          error = "Last name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s-']+$/.test(value)) {
          error = "Last name contains invalid characters";
        }
        break;

      case "email":
        if (!value || value.trim().length === 0) {
          error = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value || value.trim().length === 0) {
          error = "Phone number is required";
        } else if (
          !/^(?:\+254|0)[17]\d{8}$/.test(value.replace(/[\s-]/g, ""))
        ) {
          error =
            "Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)";
        }
        break;

      case "idNumber":
        if (!value || value.trim().length === 0) {
          error = "ID number is required";
        } else if (!/^\d{7,8}$/.test(value)) {
          error = "ID number must be 7-8 digits";
        }
        break;

      case "dateOfBirth":
        if (!value) {
          error = "Date of birth is required";
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          if (birthDate >= today) {
            error = "Date of birth cannot be in the future";
          } else if (age < 18) {
            error = "You must be at least 18 years old";
          } else if (age > 100) {
            error = "Please enter a valid date of birth";
          }
        }
        break;

      case "address":
        if (!value || value.trim().length === 0) {
          error = "Address is required";
        } else if (value.trim().length < 10) {
          error = "Please provide a complete address (minimum 10 characters)";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(`personalDetails.${name}`, value);

    // Validate field and update errors
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validateAllFields = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      idNumber,
      dateOfBirth,
      address,
    } = formData.personalDetails;
    const fields = {
      firstName,
      lastName,
      email,
      phone,
      idNumber,
      dateOfBirth,
      address,
    };

    const newErrors = {};
    const newTouched = {};

    Object.keys(fields).forEach((fieldName) => {
      const error = validateField(fieldName, fields[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
      newTouched[fieldName] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateAllFields()) {
      nextStep();
    }
  };

  const isFormValid = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      idNumber,
      dateOfBirth,
      address,
    } = formData.personalDetails;
    return (
      firstName &&
      lastName &&
      email &&
      phone &&
      idNumber &&
      dateOfBirth &&
      address &&
      Object.keys(errors).every((key) => !errors[key])
    );
  };

  const getFieldClassName = (fieldName) => {
    const baseClasses =
      "w-full px-4 py-2.5 rounded-lg bg-slate-100 text-gray-600 font-medium placeholder:font-normal border focus:ring-1 focus:border-primary-500 outline-none transition-all";

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClasses} border-red-400 focus:ring-red-500 focus:border-red-500`;
    } else if (
      touched[fieldName] &&
      !errors[fieldName] &&
      formData.personalDetails[fieldName]
    ) {
      return `${baseClasses} border-green-400 focus:ring-green-500 focus:border-green-500`;
    } else {
      return `${baseClasses} border-slate-400/60 focus:ring-primary-500`;
    }
  };

  const hasErrors = Object.keys(errors).some((key) => errors[key]);

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-4">
        Personal Details
      </h2>

      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Please provide your personal information to proceed with the insurance
        purchase.
      </p>

      {hasErrors && Object.keys(touched).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <TbAlertCircle className="text-red-600 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-red-800 font-medium text-sm mb-2">
                Please correct the following errors:
              </h4>
              <ul className="text-red-700 text-sm space-y-1">
                {Object.keys(errors).map(
                  (fieldName) =>
                    errors[fieldName] && (
                      <li key={fieldName} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                        {errors[fieldName]}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
        <div className="form-group">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.personalDetails.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName("firstName")}
            placeholder="Enter your first name"
            required
          />
          {touched.firstName && errors.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.personalDetails.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName("lastName")}
            placeholder="Enter your last name"
            required
          />
          {touched.lastName && errors.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.personalDetails.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName("email")}
            placeholder="Enter your email address"
            required
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.personalDetails.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName("phone")}
            placeholder="e.g., +254712345678 or 0712345678"
            required
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="idNumber"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            ID Number *
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.personalDetails.idNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName("idNumber")}
            placeholder="Enter your 7-8 digit ID number"
            required
          />
          {touched.idNumber && errors.idNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.idNumber}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.personalDetails.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName("dateOfBirth")}
            max={
              new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
            required
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
          {!errors.dateOfBirth && !touched.dateOfBirth && (
            <p className="mt-1 text-xs text-gray-500">
              You must be at least 18 years old
            </p>
          )}
        </div>

        <div className="form-group md:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.personalDetails.address}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="3"
            className={getFieldClassName("address")}
            placeholder="Enter your complete address"
            required
          ></textarea>
          {touched.address && errors.address && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {errors.address}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Your personal information is secure and will only be used for
            processing your insurance application. We adhere to strict privacy
            policies to protect your data.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={isFormValid() ? { scale: 1.03 } : {}}
          whileTap={isFormValid() ? { scale: 0.97 } : {}}
          onClick={handleNext}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            isFormValid()
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
