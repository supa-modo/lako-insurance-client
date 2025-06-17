import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbUser,
  TbMail,
  TbPhone,
  TbCalendar,
  TbMapPin,
  TbUsers,
  TbArrowLeft,
  TbArrowRight,
  TbId,
  TbAlertCircle,
} from "react-icons/tb";

const PersonalDetailsForm = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || value.trim().length < 2) {
          newErrors[name] = "This field must be at least 2 characters";
        } else {
          delete newErrors[name];
        }
        break;
      case "emailAddress":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          newErrors[name] = "Please enter a valid email address";
        } else {
          delete newErrors[name];
        }
        break;
      case "mobileNumber":
        const phoneRegex = /^(\+254|0)[17]\d{8}$/;
        if (!value || !phoneRegex.test(value)) {
          newErrors[name] = "Please enter a valid Kenyan phone number";
        } else {
          delete newErrors[name];
        }
        break;
      case "idNumber":
        if (!value || value.trim().length < 7) {
          newErrors[name] = "Please enter a valid ID number";
        } else {
          delete newErrors[name];
        }
        break;
      case "dateOfBirth":
        if (!value) {
          newErrors[name] = "Date of birth is required";
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
            newErrors[name] = "Date of birth cannot be in the future";
          } else if (age < 18) {
            newErrors[name] = "You must be at least 18 years old";
          } else if (age > 80) {
            newErrors[name] = "Maximum age for travel insurance is 80 years";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "gender":
        if (!value) {
          newErrors[name] = "Please select your gender";
        } else {
          delete newErrors[name];
        }
        break;
      case "nextOfKinName":
      case "beneficiaryName":
        if (!value || value.trim().length < 2) {
          newErrors[name] = "Please enter a valid name";
        } else {
          delete newErrors[name];
        }
        break;
      case "nextOfKinContacts":
      case "beneficiaryContacts":
        if (!value || value.trim().length < 10) {
          newErrors[name] = "Please enter valid contact information";
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    updateFormData(name, value);
    validateField(name, value);
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "idNumber",
      "mobileNumber",
      "emailAddress",
      "nextOfKinName",
      "nextOfKinContacts",
      "beneficiaryName",
      "beneficiaryContacts",
    ];

    let isValid = true;
    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-3">
            <span className="block lg:hidden mr-1">4.</span>
            <TbUser className="w-6 h-6 md:w-7 md:h-7 mr-2" />
            Personal Details
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Provide your personal information and emergency contacts for your
            travel insurance policy
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
              <TbUser className="w-5 h-5 mr-2 text-primary-600" />
              Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.firstName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName || ""}
                  onChange={(e) =>
                    handleInputChange("middleName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  placeholder="Enter your middle name (optional)"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.lastName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dateOfBirth || ""}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.dateOfBirth
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender || ""}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.gender
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              {/* ID Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ID Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbId className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.idNumber || ""}
                    onChange={(e) =>
                      handleInputChange("idNumber", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.idNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Enter your ID number"
                  />
                </div>
                {errors.idNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
              <TbPhone className="w-5 h-5 mr-2 text-primary-600" />
              Contact Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.mobileNumber || ""}
                    onChange={(e) =>
                      handleInputChange("mobileNumber", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.mobileNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="0712345678 or +254712345678"
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.emailAddress || ""}
                    onChange={(e) =>
                      handleInputChange("emailAddress", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.emailAddress
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailAddress}
                  </p>
                )}
              </div>

              {/* Postal Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Postal Address
                </label>
                <div className="relative">
                  <TbMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.postalAddress || ""}
                    onChange={(e) =>
                      handleInputChange("postalAddress", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    placeholder="P.O. Box 1234"
                  />
                </div>
              </div>

              {/* Town */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Town/City
                </label>
                <input
                  type="text"
                  value={formData.town || ""}
                  onChange={(e) => handleInputChange("town", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  placeholder="Nairobi"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
              <TbUsers className="w-5 h-5 mr-2 text-primary-600" />
              Emergency Contacts
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Next of Kin Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Next of Kin Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nextOfKinName || ""}
                  onChange={(e) =>
                    handleInputChange("nextOfKinName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.nextOfKinName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Full name of next of kin"
                />
                {errors.nextOfKinName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nextOfKinName}
                  </p>
                )}
              </div>

              {/* Next of Kin Contacts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Next of Kin Phone Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.nextOfKinContacts || ""}
                  onChange={(e) =>
                    handleInputChange("nextOfKinContacts", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.nextOfKinContacts
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="0712345678"
                />
                {errors.nextOfKinContacts && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nextOfKinContacts}
                  </p>
                )}
              </div>

              {/* Beneficiary Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Beneficiary Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.beneficiaryName || ""}
                  onChange={(e) =>
                    handleInputChange("beneficiaryName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.beneficiaryName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Full name of beneficiary"
                />
                {errors.beneficiaryName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.beneficiaryName}
                  </p>
                )}
              </div>

              {/* Beneficiary Contacts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Beneficiary Phone Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.beneficiaryContacts || ""}
                  onChange={(e) =>
                    handleInputChange("beneficiaryContacts", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.beneficiaryContacts
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="0712345678"
                />
                {errors.beneficiaryContacts && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.beneficiaryContacts}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <TbAlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">
                  Important Information
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>
                    • Ensure all information is accurate as it appears on your
                    travel documents
                  </li>
                  <li>
                    • Your passport name must match the names provided above
                  </li>
                  <li>
                    • Emergency contacts should be reachable during your travel
                    period
                  </li>
                  <li>
                    • Policy documents will be sent to the email address
                    provided
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <TbArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Continue
            <TbArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalDetailsForm;
