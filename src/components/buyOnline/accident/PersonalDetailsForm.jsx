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
  TbClockHeart,
  TbActivity,
  TbPhoneCall,
} from "react-icons/tb";
import { MdEmergency } from "react-icons/md";
import { PiUserDuotone } from "react-icons/pi";

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
      icon: <PiUserDuotone className="w-5 h-5" />,
      fields: [
        "firstName",
        "middleName",
        "lastName",
        "dateOfBirth",
        "gender",
        "universityCollegeSchool",
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
      icon: <MdEmergency className="w-5 h-5" />,
      fields: [
        "nextOfKinName",
        "nextOfKinContacts",
        "beneficiaryName",
        "beneficiaryContacts",
      ],
    },
    {
      title: "Medical History",
      icon: <TbActivity className="w-5 h-5" />,
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

          // Calculate age more accurately
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
          } else if (age > 70) {
            newErrors[name] = "Maximum age for coverage is 70 years";
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
      case "kraPin":
        if (!value || value.trim().length === 0) {
          newErrors[name] = "KRA PIN is required";
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
          today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

          if (startDate < today) {
            newErrors[name] =
              "Policy start date must be today or in the future";
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
    // Validate current section before proceeding
    const currentSectionFields = sections[currentSection].fields;
    let hasErrors = false;

    // Check required fields in current section
    const requiredFieldsInSection = currentSectionFields.filter((field) => {
      const isRequired = [
        "firstName",
        "lastName",
        "dateOfBirth",
        "gender",
        "idNumber",
        "mobileNumber",
        "emailAddress",
        "policyStartDate",
      ].includes(field);
      return isRequired;
    });

    requiredFieldsInSection.forEach((field) => {
      if (!validateField(field, formData[field])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      // Stay on current section and show errors
      return;
    }

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
    const newErrors = { ...errors };

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
          // Show a notification about errors in this section
          const sectionErrors = sections[i].fields
            .filter((field) => errors[field])
            .map((field) => errors[field]);

          if (sectionErrors.length > 0) {
            // You could add a toast notification here if needed
            console.log(`Please complete the ${sections[i].title} section`);
          }
          break;
        }
      }
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4 md:gap-5 lg:gap-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName || ""}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Enter your middle name (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Date of Birth *
          </label>
          <div className="relative">
            <TbCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />

            <input
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className={`w-full px-3 py-2.5 pr-10 decoration-slate-600 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender || ""}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
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
            <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
              University/College/School
            </label>
            <input
              type="text"
              value={formData.universityCollegeSchool || ""}
              onChange={(e) =>
                handleInputChange("universityCollegeSchool", e.target.value)
              }
              className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="Enter your institution name"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            KRA PIN No. *
          </label>
          <input
            type="text"
            value={formData.kraPin || ""}
            onChange={(e) =>
              handleInputChange("kraPin", e.target.value.toUpperCase())
            }
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.kraPin ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your KRA PIN"
          />
          {errors.kraPin && (
            <p className="text-red-500 text-xs mt-1">{errors.kraPin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            ID No/Passport No. *
          </label>
          <input
            type="text"
            value={formData.idNumber || ""}
            onChange={(e) => handleInputChange("idNumber", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your ID or passport number"
          />
          {errors.idNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Mobile No. *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber || ""}
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., +254712345678"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.emailAddress || ""}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.emailAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
          {errors.emailAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Postal Address
          </label>
          <input
            type="text"
            value={formData.postalAddress || ""}
            onChange={(e) => handleInputChange("postalAddress", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="e.g., P.O. Box 12345 - 00100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Town
          </label>
          <input
            type="text"
            value={formData.town || ""}
            onChange={(e) => handleInputChange("town", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Next of Kin Name
          </label>
          <input
            type="text"
            value={formData.nextOfKinName || ""}
            onChange={(e) => handleInputChange("nextOfKinName", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Enter next of kin full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Next of Kin Contacts
          </label>
          <input
            type="text"
            value={formData.nextOfKinContacts || ""}
            onChange={(e) =>
              handleInputChange("nextOfKinContacts", e.target.value)
            }
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Phone number or email"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Beneficiary Name
          </label>
          <input
            type="text"
            value={formData.beneficiaryName || ""}
            onChange={(e) =>
              handleInputChange("beneficiaryName", e.target.value)
            }
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Enter beneficiary full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Beneficiary Contacts
          </label>
          <input
            type="text"
            value={formData.beneficiaryContacts || ""}
            onChange={(e) =>
              handleInputChange("beneficiaryContacts", e.target.value)
            }
            className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
          <TbAlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
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
          <label className="block text-sm md:text-[0.9rem] lg:text-base font-medium text-gray-700 mb-3">
            Have you suffered any accident(s) previously? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <div
                className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border focus:outline-none ${
                  formData.previousAccidents === true
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="previousAccidents"
                  value="true"
                  checked={formData.previousAccidents === true}
                  onChange={(e) => handleInputChange("previousAccidents", true)}
                  className="absolute opacity-0 h-full w-full cursor-pointer"
                />
                {formData.previousAccidents === true && (
                  <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                )}
              </div>
              <span
                className={`ml-2 text-sm md:text-[0.9rem] lg:text-base ${
                  formData.previousAccidents === true
                    ? "text-primary-700"
                    : "text-gray-600"
                } font-medium capitalize`}
              >
                Yes
              </span>
            </label>
            <label className="flex items-center">
              <div
                className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border focus:outline-none ${
                  formData.previousAccidents === false
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="previousAccidents"
                  value="false"
                  checked={formData.previousAccidents === false}
                  onChange={(e) =>
                    handleInputChange("previousAccidents", false)
                  }
                  className="absolute opacity-0 h-full w-full cursor-pointer"
                />
                {formData.previousAccidents === false && (
                  <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                )}
              </div>
              <span
                className={`ml-2 text-sm md:text-[0.9rem] lg:text-base ${
                  formData.previousAccidents === false
                    ? "text-primary-700 "
                    : "text-gray-600"
                } font-medium capitalize`}
              >
                No
              </span>
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you have any physical disability? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <div
                className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border focus:outline-none ${
                  formData.physicalDisability === true
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="physicalDisability"
                  value="true"
                  checked={formData.physicalDisability === true}
                  onChange={(e) =>
                    handleInputChange("physicalDisability", true)
                  }
                  className="absolute opacity-0 h-full w-full cursor-pointer"
                />
                {formData.physicalDisability === true && (
                  <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                )}
              </div>
              <span
                className={`ml-2 text-sm md:text-[0.9rem] lg:text-base ${
                  formData.physicalDisability === true
                    ? "text-primary-700"
                    : "text-gray-600"
                } font-medium capitalize`}
              >
                Yes
              </span>
            </label>
            <label className="flex items-center">
              <div
                className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border focus:outline-none ${
                  formData.physicalDisability === false
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="physicalDisability"
                  value="false"
                  checked={formData.physicalDisability === false}
                  onChange={(e) =>
                    handleInputChange("physicalDisability", false)
                  }
                  className="absolute opacity-0 h-full w-full cursor-pointer"
                />
                {formData.physicalDisability === false && (
                  <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                )}
              </div>
              <span
                className={`ml-2 text-sm md:text-[0.9rem] lg:text-base ${
                  formData.physicalDisability === false
                    ? "text-primary-700"
                    : "text-gray-600"
                } font-medium capitalize`}
              >
                No
              </span>
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you have any chronic or recurring illness? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <div
                className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border focus:outline-none ${
                  formData.chronicIllness === true
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="chronicIllness"
                  value="true"
                  checked={formData.chronicIllness === true}
                  onChange={(e) => handleInputChange("chronicIllness", true)}
                  className="absolute opacity-0 h-full w-full cursor-pointer"
                />
                {formData.chronicIllness === true && (
                  <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                )}
              </div>
              <span
                className={`ml-2 text-sm md:text-[0.9rem] lg:text-base ${
                  formData.chronicIllness === true
                    ? "text-primary-700"
                    : "text-gray-600"
                } font-medium capitalize`}
              >
                Yes
              </span>
            </label>
            <label className="flex items-center">
              <div
                className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border focus:outline-none ${
                  formData.chronicIllness === false
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="chronicIllness"
                  value="false"
                  checked={formData.chronicIllness === false}
                  onChange={(e) => handleInputChange("chronicIllness", false)}
                  className="absolute opacity-0 h-full w-full cursor-pointer"
                />
                {formData.chronicIllness === false && (
                  <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                )}
              </div>
              <span
                className={`ml-2 text-sm md:text-[0.9rem] lg:text-base ${
                  formData.chronicIllness === false
                    ? "text-primary-700"
                    : "text-gray-600"
                } font-medium capitalize`}
              >
                No
              </span>
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
              className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When would you like the policy to begin? *
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.policyStartDate || ""}
              onChange={(e) =>
                handleInputChange("policyStartDate", e.target.value)
              }
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-3 py-2.5 pr-10 decoration-slate-600 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                errors.policyStartDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            <TbCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
          </div>
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
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderEmergencyContacts();
      case 2:
        return renderMedicalHistory();
      case 3:
        return renderPolicyDetails();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center ">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">3.</span>{" "}
          <span className="">Your Personal Details</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Please provide your personal information to complete your insurance
          application.
        </p>
      </div>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 py-3 px-2 md:p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <TbAlertCircle className="text-red-600 h-5 w-5 mr-1.5 md:mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-red-800 font-medium text-sm mb-1.5 md:mb-2">
                Please correct the following errors to continue:
              </h4>
              <ul className="text-red-700 text-sm space-y-1">
                {Object.entries(errors).map(([fieldName, error]) => (
                  <li key={fieldName} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    <span>
                      <strong className="capitalize">
                        {fieldName.replace(/([A-Z])/g, " $1").toLowerCase()}:
                      </strong>{" "}
                      {error}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 lg:mb-8">
        {sections.map((section, index) => {
          const sectionHasErrors = section.fields.some(
            (field) => errors[field]
          );
          return (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`flex items-center px-4 md:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                index === currentSection
                  ? "bg-primary-600 text-white"
                  : sectionHasErrors
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : index < currentSection
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {sectionHasErrors && <TbAlertCircle className="w-4 h-4 mr-1" />}
              {section.icon}
              <span className="ml-2 hidden md:inline">{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Current Section Content */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white lg:rounded-xl lg:border border-gray-200 lg:p-6"
      >
        <div className="flex items-center mb-4 md:mb-6">
          {sections[currentSection].icon}
          <h4 className="text-lg font-semibold text-secondary-700 ml-1">
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
          {currentSection === sections.length - 1 ? "Proceed" : "Next"}
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${((currentSection + 1) / sections.length) * 100}%`,
          }}
          transition={{ duration: 0.7 }}
          className="bg-primary-600 h-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
