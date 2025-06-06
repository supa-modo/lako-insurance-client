import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbUser,
  TbMail,
  TbPhone,
  TbCalendar,
  TbMapPin,
  TbUsers,
  TbHeart,
  TbAlertCircle,
  TbInfoCircle,
} from "react-icons/tb";

const PersonalDetailsForm = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Personal Information",
      icon: <TbUser className="w-5 h-5" />,
      fields: [
        "firstName",
        "middleName",
        "lastName",
        "dateOfBirth",
        "gender",
        "universityCollegeSchool",
      ],
    },
    {
      title: "Contact Details",
      icon: <TbMail className="w-5 h-5" />,
      fields: [
        "kraPin",
        "idNumber",
        "mobileNumber",
        "emailAddress",
        "postalAddress",
        "town",
      ],
    },
    {
      title: "Emergency Contacts",
      icon: <TbUsers className="w-5 h-5" />,
      fields: [
        "nextOfKinName",
        "nextOfKinContacts",
        "beneficiaryName",
        "beneficiaryContacts",
      ],
    },
    {
      title: "Medical History",
      icon: <TbHeart className="w-5 h-5" />,
      fields: [
        "previousAccidents",
        "physicalDisability",
        "chronicIllness",
        "medicalHistoryDetails",
      ],
    },
    {
      title: "Policy Details",
      icon: <TbCalendar className="w-5 h-5" />,
      fields: [
        "policyStartDate",
        "isAgentPurchase",
        "agentName",
        "agentEmail",
        "agentPhone",
      ],
    },
  ];

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
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18 || age > 70) {
            newErrors[name] = "Age must be between 18 and 70 years";
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
      case "policyStartDate":
        if (!value) {
          newErrors[name] = "Policy start date is required";
        } else {
          const startDate = new Date(value);
          const today = new Date();
          if (startDate < today) {
            newErrors[name] = "Policy start date cannot be in the past";
          } else {
            delete newErrors[name];
          }
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

  const validateSection = (sectionIndex) => {
    const section = sections[sectionIndex];
    let isValid = true;

    section.fields.forEach((field) => {
      const value = formData[field];
      if (!validateField(field, value)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      prevStep();
    }
  };

  const handleSubmit = () => {
    // Validate all required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "idNumber",
      "mobileNumber",
      "emailAddress",
      "policyStartDate",
    ];

    let isValid = true;
    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (isValid) {
      nextStep();
    } else {
      // Find the first section with errors and navigate to it
      for (let i = 0; i < sections.length; i++) {
        if (!validateSection(i)) {
          setCurrentSection(i);
          break;
        }
      }
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName || ""}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your middle name (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender || ""}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.gender ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        {formData.coverType === "student" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University/College/School
            </label>
            <input
              type="text"
              value={formData.universityCollegeSchool || ""}
              onChange={(e) =>
                handleInputChange("universityCollegeSchool", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your institution name"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderContactDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            KRA PIN No.
          </label>
          <input
            type="text"
            value={formData.kraPin || ""}
            onChange={(e) =>
              handleInputChange("kraPin", e.target.value.toUpperCase())
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your KRA PIN"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID No/Passport No. *
          </label>
          <input
            type="text"
            value={formData.idNumber || ""}
            onChange={(e) => handleInputChange("idNumber", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your ID or passport number"
          />
          {errors.idNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile No. *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber || ""}
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., +254712345678"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.emailAddress || ""}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.emailAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
          {errors.emailAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Address: P.O. Box
          </label>
          <input
            type="text"
            value={formData.postalAddress || ""}
            onChange={(e) => handleInputChange("postalAddress", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., P.O. Box 12345"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Town
          </label>
          <input
            type="text"
            value={formData.town || ""}
            onChange={(e) => handleInputChange("town", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your town/city"
          />
        </div>
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Next of Kin Name
          </label>
          <input
            type="text"
            value={formData.nextOfKinName || ""}
            onChange={(e) => handleInputChange("nextOfKinName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter next of kin full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Next of Kin Contacts
          </label>
          <input
            type="text"
            value={formData.nextOfKinContacts || ""}
            onChange={(e) =>
              handleInputChange("nextOfKinContacts", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Phone number or email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beneficiary Name
          </label>
          <input
            type="text"
            value={formData.beneficiaryName || ""}
            onChange={(e) =>
              handleInputChange("beneficiaryName", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter beneficiary full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beneficiary Contacts
          </label>
          <input
            type="text"
            value={formData.beneficiaryContacts || ""}
            onChange={(e) =>
              handleInputChange("beneficiaryContacts", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Phone number or email"
          />
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <TbAlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Medical History Declaration</p>
            <p>
              Please answer the following questions honestly. If you answer yes
              to any question, provide details in the space provided.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Have you suffered any accident(s) previously? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="previousAccidents"
                value="true"
                checked={formData.previousAccidents === true}
                onChange={(e) => handleInputChange("previousAccidents", true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="previousAccidents"
                value="false"
                checked={formData.previousAccidents === false}
                onChange={(e) => handleInputChange("previousAccidents", false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Have you suffered any physical disability? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="physicalDisability"
                value="true"
                checked={formData.physicalDisability === true}
                onChange={(e) => handleInputChange("physicalDisability", true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="physicalDisability"
                value="false"
                checked={formData.physicalDisability === false}
                onChange={(e) => handleInputChange("physicalDisability", false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Have you suffered from chronic or recurring illness? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="chronicIllness"
                value="true"
                checked={formData.chronicIllness === true}
                onChange={(e) => handleInputChange("chronicIllness", true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="chronicIllness"
                value="false"
                checked={formData.chronicIllness === false}
                onChange={(e) => handleInputChange("chronicIllness", false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {(formData.previousAccidents ||
          formData.physicalDisability ||
          formData.chronicIllness) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please provide details
            </label>
            <textarea
              value={formData.medicalHistoryDetails || ""}
              onChange={(e) =>
                handleInputChange("medicalHistoryDetails", e.target.value)
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Provide detailed information about your medical history..."
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderPolicyDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When would you like the policy to begin? *
          </label>
          <input
            type="date"
            value={formData.policyStartDate || ""}
            onChange={(e) =>
              handleInputChange("policyStartDate", e.target.value)
            }
            min={new Date().toISOString().split("T")[0]}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.policyStartDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.policyStartDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.policyStartDate}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Payment must be made before the starting date. If made after, the
            policy will commence on the payment date.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Purchasing through an agent? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="isAgentPurchase"
                value="true"
                checked={formData.isAgentPurchase === true}
                onChange={(e) => handleInputChange("isAgentPurchase", true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isAgentPurchase"
                value="false"
                checked={formData.isAgentPurchase === false}
                onChange={(e) => handleInputChange("isAgentPurchase", false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
      </div>

      {formData.isAgentPurchase && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Name
            </label>
            <input
              type="text"
              value={formData.agentName || ""}
              onChange={(e) => handleInputChange("agentName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter agent name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Email
            </label>
            <input
              type="email"
              value={formData.agentEmail || ""}
              onChange={(e) => handleInputChange("agentEmail", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter agent email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Phone
            </label>
            <input
              type="tel"
              value={formData.agentPhone || ""}
              onChange={(e) => handleInputChange("agentPhone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter agent phone"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderContactDetails();
      case 2:
        return renderEmergencyContacts();
      case 3:
        return renderMedicalHistory();
      case 4:
        return renderPolicyDetails();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Details
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please provide your personal information to complete your insurance
          application.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              index === currentSection
                ? "bg-primary-600 text-white"
                : index < currentSection
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {section.icon}
            <span className="ml-2 hidden sm:inline">{section.title}</span>
          </button>
        ))}
      </div>

      {/* Current Section Content */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center mb-6">
          {sections[currentSection].icon}
          <h4 className="text-lg font-semibold text-gray-900 ml-2">
            {sections[currentSection].title}
          </h4>
        </div>

        {renderCurrentSection()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevSection}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          {currentSection === 0 ? "Back" : "Previous"}
        </button>

        <div className="text-sm text-gray-500">
          Section {currentSection + 1} of {sections.length}
        </div>

        <button
          onClick={handleNextSection}
          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {currentSection === sections.length - 1 ? "Continue" : "Next"}
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentSection + 1) / sections.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
