import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbUser,
  TbUsers,
  TbPlus,
  TbTrash,
  TbStethoscope,
  TbInfoCircle,
  TbAlertCircle,
  TbHeartPlus,
  TbCalendar,
  TbMail,
  TbPhone,
  TbMapPin,
  TbUserCheck,
  TbX,
} from "react-icons/tb";

const PersonalDetailsForm = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [dependents, setDependents] = useState(formData.dependents || []);
  const [medicalHistory, setMedicalHistory] = useState(
    formData.medicalHistory || {}
  );
  const [lifestyle, setLifestyle] = useState(formData.lifestyle || {});

  const sections = [
    { id: "personal", title: "Personal Information", icon: TbUser },
    { id: "contact", title: "Contact Details", icon: TbMail },
    { id: "health", title: "Health Information", icon: TbStethoscope },
    { id: "lifestyle", title: "Lifestyle", icon: TbHeartPlus },
    ...(formData.coverType === "family"
      ? [{ id: "dependents", title: "Family Members", icon: TbUsers }]
      : []),
  ];

  // Pre-existing conditions list
  const commonConditions = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Arthritis",
    "Cancer",
    "Mental Health Conditions",
    "Kidney Disease",
    "Liver Disease",
    "Thyroid Disorders",
  ];

  // Update form data when local state changes
  useEffect(() => {
    updateFormData("dependents", dependents);
  }, [dependents]); // Remove updateFormData from dependencies to prevent infinite re-renders

  useEffect(() => {
    updateFormData("medicalHistory", medicalHistory);
  }, [medicalHistory]); // Remove updateFormData from dependencies

  useEffect(() => {
    updateFormData("lifestyle", lifestyle);
  }, [lifestyle]); // Remove updateFormData from dependencies

  const validateSection = (sectionId) => {
    const newErrors = {};

    switch (sectionId) {
      case "personal":
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.idNumber) newErrors.idNumber = "ID number is required";
        if (!formData.kraPin) newErrors.kraPin = "KRA PIN is required";
        break;
      case "contact":
        if (!formData.mobileNumber)
          newErrors.mobileNumber = "Mobile number is required";
        if (!formData.emailAddress)
          newErrors.emailAddress = "Email address is required";
        if (!formData.postalAddress)
          newErrors.postalAddress = "Postal address is required";
        if (!formData.town) newErrors.town = "Town is required";
        break;
      case "health":
        // Health section is optional for basic plans
        break;
      case "lifestyle":
        // Lifestyle section is optional
        break;
      case "dependents":
        if (formData.coverType === "family" && dependents.length === 0) {
          newErrors.dependents =
            "At least one family member is required for family cover";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(sections[currentSection].id)) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        nextStep();
      }
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      prevStep();
    }
  };

  const addDependent = () => {
    const newDependent = {
      id: Date.now(),
      relationship: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
    };
    setDependents([...dependents, newDependent]);
  };

  const updateDependent = (id, field, value) => {
    setDependents(
      dependents.map((dep) =>
        dep.id === id ? { ...dep, [field]: value } : dep
      )
    );
  };

  const removeDependent = (id) => {
    setDependents(dependents.filter((dep) => dep.id !== id));
  };

  const updateMedicalHistory = (field, value) => {
    setMedicalHistory((prev) => ({ ...prev, [field]: value }));
  };

  const updateLifestyle = (field, value) => {
    setLifestyle((prev) => ({ ...prev, [field]: value }));
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName || ""}
            onChange={(e) => updateFormData("middleName", e.target.value)}
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
            onChange={(e) => updateFormData("lastName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender || ""}
            onChange={(e) => updateFormData("gender", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.gender ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Number *
          </label>
          <input
            type="text"
            value={formData.idNumber || ""}
            onChange={(e) => updateFormData("idNumber", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your national ID number"
          />
          {errors.idNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          KRA PIN *
        </label>
        <input
          type="text"
          value={formData.kraPin || ""}
          onChange={(e) => updateFormData("kraPin", e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.kraPin ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your KRA PIN"
        />
        {errors.kraPin && (
          <p className="text-red-500 text-sm mt-1">{errors.kraPin}</p>
        )}
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber || ""}
            onChange={(e) => updateFormData("mobileNumber", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. +254701234567"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.emailAddress || ""}
            onChange={(e) => updateFormData("emailAddress", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.emailAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.emailAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Address *
          </label>
          <input
            type="text"
            value={formData.postalAddress || ""}
            onChange={(e) => updateFormData("postalAddress", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.postalAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="P.O. Box 12345"
          />
          {errors.postalAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.postalAddress}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Town/City *
          </label>
          <input
            type="text"
            value={formData.town || ""}
            onChange={(e) => updateFormData("town", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.town ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. Nairobi"
          />
          {errors.town && (
            <p className="text-red-500 text-sm mt-1">{errors.town}</p>
          )}
        </div>
      </div>

      {/* Next of Kin */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Next of Kin Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next of Kin Name
            </label>
            <input
              type="text"
              value={formData.nextOfKinName || ""}
              onChange={(e) => updateFormData("nextOfKinName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Full name of next of kin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next of Kin Contact
            </label>
            <input
              type="tel"
              value={formData.nextOfKinContacts || ""}
              onChange={(e) =>
                updateFormData("nextOfKinContacts", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthSection = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <TbInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h5 className="text-blue-800 font-medium mb-1">
              Health Information
            </h5>
            <p className="text-blue-700 text-sm">
              This information helps us provide accurate quotes and ensure
              proper coverage. All information is kept confidential.
            </p>
          </div>
        </div>
      </div>

      {/* Pre-existing conditions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Do you have any pre-existing medical conditions?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {commonConditions.map((condition) => (
            <label
              key={condition}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                checked={
                  formData.preExistingConditions?.includes(condition) || false
                }
                onChange={(e) => {
                  const conditions = formData.preExistingConditions || [];
                  if (e.target.checked) {
                    updateFormData("preExistingConditions", [
                      ...conditions,
                      condition,
                    ]);
                  } else {
                    updateFormData(
                      "preExistingConditions",
                      conditions.filter((c) => c !== condition)
                    );
                  }
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-gray-700">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Current medication */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Medications
        </label>
        <textarea
          value={formData.currentMedication || ""}
          onChange={(e) => updateFormData("currentMedication", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows="3"
          placeholder="List any medications you are currently taking (optional)"
        />
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Known Allergies
        </label>
        <textarea
          value={formData.allergies || ""}
          onChange={(e) => updateFormData("allergies", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows="2"
          placeholder="List any known allergies (optional)"
        />
      </div>

      {/* Family medical history */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Family Medical History
        </label>
        <textarea
          value={formData.familyMedicalHistory || ""}
          onChange={(e) =>
            updateFormData("familyMedicalHistory", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows="3"
          placeholder="Brief family medical history (optional)"
        />
      </div>
    </div>
  );

  const renderLifestyleSection = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <TbHeartPlus className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h5 className="text-green-800 font-medium mb-1">
              Lifestyle Information
            </h5>
            <p className="text-green-700 text-sm">
              This information may affect your premium rates and help us
              recommend the best coverage options.
            </p>
          </div>
        </div>
      </div>

      {/* Smoking status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Smoking Status
        </label>
        <div className="space-y-2">
          {[
            "Non-smoker",
            "Occasional smoker",
            "Regular smoker",
            "Former smoker",
          ].map((status) => (
            <label key={status} className="flex items-center space-x-2">
              <input
                type="radio"
                name="smokingStatus"
                value={status}
                checked={lifestyle.smokingStatus === status}
                onChange={(e) =>
                  updateLifestyle("smokingStatus", e.target.value)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700 text-sm">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Alcohol consumption */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Alcohol Consumption
        </label>
        <div className="space-y-2">
          {["No alcohol", "Occasional", "Moderate", "Regular"].map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                name="alcoholConsumption"
                value={level}
                checked={lifestyle.alcoholConsumption === level}
                onChange={(e) =>
                  updateLifestyle("alcoholConsumption", e.target.value)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700 text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Exercise frequency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Exercise Frequency
        </label>
        <div className="space-y-2">
          {[
            "Daily",
            "3-4 times a week",
            "1-2 times a week",
            "Rarely",
            "Never",
          ].map((frequency) => (
            <label key={frequency} className="flex items-center space-x-2">
              <input
                type="radio"
                name="exerciseFrequency"
                value={frequency}
                checked={lifestyle.exerciseFrequency === frequency}
                onChange={(e) =>
                  updateLifestyle("exerciseFrequency", e.target.value)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700 text-sm">{frequency}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Occupation
        </label>
        <input
          type="text"
          value={lifestyle.occupation || ""}
          onChange={(e) => updateLifestyle("occupation", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Your current occupation"
        />
      </div>
    </div>
  );

  const renderDependentsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-700">
            Family Members
          </h4>
          <p className="text-gray-600 text-sm">
            Add family members to be covered under this plan
          </p>
        </div>
        <button
          onClick={addDependent}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <TbPlus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      {errors.dependents && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{errors.dependents}</p>
        </div>
      )}

      <div className="space-y-4">
        {dependents.map((dependent, index) => (
          <motion.div
            key={dependent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-gray-700">
                Family Member {index + 1}
              </h5>
              <button
                onClick={() => removeDependent(dependent.id)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <TbTrash className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <select
                  value={dependent.relationship}
                  onChange={(e) =>
                    updateDependent(
                      dependent.id,
                      "relationship",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={dependent.firstName}
                  onChange={(e) =>
                    updateDependent(dependent.id, "firstName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={dependent.lastName}
                  onChange={(e) =>
                    updateDependent(dependent.id, "lastName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dependent.dateOfBirth}
                  onChange={(e) =>
                    updateDependent(dependent.id, "dateOfBirth", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={dependent.gender}
                  onChange={(e) =>
                    updateDependent(dependent.id, "gender", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {dependents.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <TbUsers className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            No family members added
          </h4>
          <p className="text-gray-600 mb-4">
            Add family members to be covered under this plan
          </p>
          <button
            onClick={addDependent}
            className="flex items-center mx-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <TbPlus className="w-4 h-4 mr-2" />
            Add First Member
          </button>
        </div>
      )}
    </div>
  );

  const renderCurrentSection = () => {
    const section = sections[currentSection];
    switch (section.id) {
      case "personal":
        return renderPersonalSection();
      case "contact":
        return renderContactSection();
      case "health":
        return renderHealthSection();
      case "lifestyle":
        return renderLifestyleSection();
      case "dependents":
        return renderDependentsSection();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">3.</span>
          <span className="">Personal & Health Information</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Please provide your personal details and health information to
          complete your application.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  index === currentSection
                    ? "bg-primary-100 text-primary-700"
                    : index < currentSection
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{section.title}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentSection + 1) / sections.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Current Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentSection()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={handlePrev}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          {currentSection === 0 ? "Back" : "Previous"}
        </button>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>
            {currentSection + 1} of {sections.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {currentSection === sections.length - 1 ? "Continue" : "Next"}
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
