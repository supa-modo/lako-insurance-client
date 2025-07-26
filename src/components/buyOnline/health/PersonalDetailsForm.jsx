import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbUser,
  TbMail,
  TbStethoscope,
  TbHeartPlus,
  TbUsers,
  TbPlus,
  TbTrash,
  TbCalendar,
  TbAlertCircle,
  TbInfoCircle,
  TbX,
  TbCheck,
  TbPhoneCall,
} from "react-icons/tb";
import { PiUserDuotone } from "react-icons/pi";

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

const PersonalDetailsForm = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [dependents, setDependents] = useState(formData.dependents || []);

  // Section structure
  const sections = [
    {
      id: "personal",
      title: "Your Personal Details",
      icon: <PiUserDuotone className="w-5 h-5" />,
      fields: [
        "firstName",
        "lastName",
        "dateOfBirth",
        "gender",
        "idNumber",
        "kraPin",
      ],
    },
    {
      id: "contact",
      title: "Email & Contact Information",
      icon: <TbPhoneCall className="w-5 h-5" />,
      fields: [
        "mobileNumber",
        "emailAddress",
        "postalAddress",
        "town",
        "nextOfKinName",
        "nextOfKinContacts",
      ],
    },
    {
      id: "health",
      title: "Medical Health History & Details",
      icon: <TbStethoscope className="w-5 h-5" />,
      fields: [
        "preExistingConditions",
        "currentMedication",
        "allergies",
        "familyMedicalHistory",
      ],
    },
    {
      id: "lifestyle",
      title: "Lifestyle",
      icon: <TbHeartPlus className="w-5 h-5" />,
      fields: [
        "smokingStatus",
        "alcoholConsumption",
        "exerciseFrequency",
        "occupation",
      ],
    },
    ...(formData.coverType === "family"
      ? [
          {
            id: "dependents",
            title: "Family Members",
            icon: <TbUsers className="w-5 h-5" />,
            fields: ["dependents"],
          },
        ]
      : []),
  ];

  // --- Validation ---
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || value.trim().length < 2)
          error = "This field must be at least 2 characters";
        break;
      case "dateOfBirth":
        if (!value) error = "Date of birth is required";
        else {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          )
            age--;
          if (birthDate >= today)
            error = "Date of birth cannot be in the future";
          else if (age < 0) error = "Invalid date of birth";
          else if (age < 0 || age > 120) error = "Please enter a valid age";
        }
        break;
      case "gender":
        if (!value) error = "Please select your gender";
        break;
      case "idNumber":
        if (!value || value.trim().length < 7)
          error = "Please enter a valid ID number";
        break;
      case "kraPin":
        if (!value || value.trim().length === 0) error = "KRA PIN is required";
        break;
      case "mobileNumber":
        if (!value || !/^\+?\d{10,15}$/.test(value))
          error = "Please enter a valid phone number";
        break;
      case "emailAddress":
        if (!value || !/^\S+@\S+\.\S+$/.test(value))
          error = "Please enter a valid email address";
        break;
      case "postalAddress":
        if (!value) error = "Postal address is required";
        break;
      case "town":
        if (!value) error = "Town is required";
        break;
      case "dependents":
        if (
          formData.coverType === "family" &&
          (!dependents || dependents.length === 0)
        )
          error = "At least one family member is required for family cover";
        break;
      default:
        break;
    }
    return error;
  };

  const validateSection = (sectionIndex) => {
    const section = sections[sectionIndex];
    let newErrors = { ...errors };
    let isValid = true;
    section.fields.forEach((field) => {
      let value = field === "dependents" ? dependents : formData[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      } else {
        delete newErrors[field];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  // --- Navigation ---
  const handleNextSection = () => {
    if (validateSection(currentSection)) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        nextStep();
      }
    }
  };
  const handlePrevSection = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
    else prevStep();
  };

  // --- Dependents ---
  const addDependent = () => {
    setDependents([
      ...dependents,
      {
        id: Date.now(),
        relationship: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
      },
    ]);
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

  // --- Render Section Content ---
  const renderPersonalSection = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => updateFormData("firstName", e.target.value)}
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
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => updateFormData("lastName", e.target.value)}
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
              onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
              className={`w-full px-3 py-2.5 pr-10 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
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
            onChange={(e) => updateFormData("gender", e.target.value)}
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
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            ID Number *
          </label>
          <input
            type="text"
            value={formData.idNumber || ""}
            onChange={(e) => updateFormData("idNumber", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your national ID number"
          />
          {errors.idNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            KRA PIN *
          </label>
          <input
            type="text"
            value={formData.kraPin || ""}
            onChange={(e) => updateFormData("kraPin", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.kraPin ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your KRA PIN"
          />
          {errors.kraPin && (
            <p className="text-red-500 text-xs mt-1">{errors.kraPin}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber || ""}
            onChange={(e) => updateFormData("mobileNumber", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. +254701234567"
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
            onChange={(e) => updateFormData("emailAddress", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.emailAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.emailAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Postal Address *
          </label>
          <input
            type="text"
            value={formData.postalAddress || ""}
            onChange={(e) => updateFormData("postalAddress", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.postalAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="P.O. Box 12345"
          />
          {errors.postalAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.postalAddress}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
            Town/City *
          </label>
          <input
            type="text"
            value={formData.town || ""}
            onChange={(e) => updateFormData("town", e.target.value)}
            className={`w-full px-3 py-2.5 bg-neutral-100 border rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${
              errors.town ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. Nairobi"
          />
          {errors.town && (
            <p className="text-red-500 text-xs mt-1">{errors.town}</p>
          )}
        </div>
      </div>
      {/* Next of Kin */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Next of Kin Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
              Next of Kin Name
            </label>
            <input
              type="text"
              value={formData.nextOfKinName || ""}
              onChange={(e) => updateFormData("nextOfKinName", e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="Full name of next of kin"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-800/90 mb-2">
              Next of Kin Contact
            </label>
            <input
              type="tel"
              value={formData.nextOfKinContacts || ""}
              onChange={(e) =>
                updateFormData("nextOfKinContacts", e.target.value)
              }
              className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Modern switch/toggle for checkboxes
  const renderSwitch = (checked, onChange) => (
    <div
      className={`relative flex items-center justify-center h-6 min-w-[2.9rem] rounded-full border-2 transition-all duration-200 cursor-pointer ${
        checked
          ? "bg-primary-500 border-primary-500"
          : "bg-gray-200 border-gray-300"
      }`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`absolute left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          checked ? "transform translate-x-5" : ""
        }`}
      />
      {checked ? (
        <TbCheck size={13} className="absolute left-1  text-white z-10" />
      ) : (
        <TbX size={13} className="absolute right-1 text-gray-400 z-10" />
      )}
    </div>
  );

  // Custom radio style
  const renderRadio = (name, value, checked, onChange, label) => (
    <label className="flex items-center cursor-pointer">
      <div
        className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border-2 focus:outline-none ${
          checked ? "border-primary-500 bg-primary-50" : "border-neutral-400"
        }`}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="absolute opacity-0 h-full w-full cursor-pointer"
        />
        {checked && <div className="h-2 w-2 rounded-sm bg-primary-500"></div>}
      </div>
      <span
        className={`ml-2 text-sm ${
          checked ? "text-primary-700" : "text-gray-600"
        } font-medium capitalize`}
      >
        {label}
      </span>
    </label>
  );

  const renderHealthSection = () => (
    <div className="space-y-6">
      {/* Pre-existing conditions */}
      <div>
        <label className="block text-sm md:text-[0.9rem] lg:text-base font-medium text-gray-700 mb-3">
          Do you have any pre-existing medical conditions?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {commonConditions.map((condition) => (
            <div
              key={condition}
              className="flex items-center space-x-2 text-sm"
            >
              {renderSwitch(
                formData.preExistingConditions?.includes(condition) || false,
                (checked) => {
                  const conditions = formData.preExistingConditions || [];
                  if (checked) {
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
                }
              )}
              <span className="text-gray-700">{condition}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Current medication */}
      <div>
        <label className="block text-sm md:text-[0.9rem] lg:text-base font-medium text-gray-700 mb-2">
          Current Medications
        </label>
        <textarea
          value={formData.currentMedication || ""}
          onChange={(e) => updateFormData("currentMedication", e.target.value)}
          className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          rows={3}
          placeholder="List any medications you are currently taking (optional)"
        />
      </div>
      {/* Allergies */}
      <div>
        <label className="block text-sm md:text-[0.9rem] lg:text-base font-medium text-gray-700 mb-2">
          Known Allergies
        </label>
        <textarea
          value={formData.allergies || ""}
          onChange={(e) => updateFormData("allergies", e.target.value)}
          className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          rows={2}
          placeholder="List any known allergies (optional)"
        />
      </div>
      {/* Family medical history */}
      <div>
        <label className="block text-sm md:text-[0.9rem] lg:text-base font-medium text-gray-700 mb-2">
          Family Medical History
        </label>
        <textarea
          value={formData.familyMedicalHistory || ""}
          onChange={(e) =>
            updateFormData("familyMedicalHistory", e.target.value)
          }
          className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          rows={3}
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
        <div className="flex flex-wrap gap-4">
          {[
            "Non-smoker",
            "Occasional smoker",
            "Regular smoker",
            "Former smoker",
          ].map((status) =>
            renderRadio(
              "smokingStatus",
              status,
              formData.smokingStatus === status,
              (val) => updateFormData("smokingStatus", val),
              status
            )
          )}
        </div>
      </div>
      {/* Alcohol consumption */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Alcohol Consumption
        </label>
        <div className="flex flex-wrap gap-4">
          {["No alcohol", "Occasional", "Moderate", "Regular"].map((level) =>
            renderRadio(
              "alcoholConsumption",
              level,
              formData.alcoholConsumption === level,
              (val) => updateFormData("alcoholConsumption", val),
              level
            )
          )}
        </div>
      </div>
      {/* Exercise frequency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Exercise Frequency
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            "Daily",
            "3-4 times a week",
            "1-2 times a week",
            "Rarely",
            "Never",
          ].map((frequency) =>
            renderRadio(
              "exerciseFrequency",
              frequency,
              formData.exerciseFrequency === frequency,
              (val) => updateFormData("exerciseFrequency", val),
              frequency
            )
          )}
        </div>
      </div>
      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Occupation
        </label>
        <input
          type="text"
          value={formData.occupation || ""}
          onChange={(e) => updateFormData("occupation", e.target.value)}
          className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
                  className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
                  className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
                  className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
                  className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
                  className="w-full px-3 py-2.5 bg-neutral-100 border border-gray-300 rounded-lg text-gray-600 font-medium placeholder:font-normal focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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

  // --- Section Navigation ---
  const renderSectionNav = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 lg:mb-8">
      {sections.map((section, index) => {
        const sectionHasErrors = section.fields.some((field) => errors[field]);
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
  );

  // --- Error Summary ---
  const renderErrorSummary = () =>
    Object.keys(errors).length > 0 ? (
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
    ) : null;

  // --- Render Current Section ---
  const renderCurrentSection = () => {
    switch (sections[currentSection].id) {
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

  // --- Main Render ---
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center ">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">3.</span>
          <span className="">Personal & Health Information</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Please provide your personal details and health information to
          complete your application.
        </p>
      </div>
      {renderErrorSummary()}
      {/* {renderSectionNav()} */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white lg:rounded-xl lg:border border-gray-200 lg:p-6"
      >
        <div className="flex items-center mb-4 md:mb-6">
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
          {currentSection === sections.length - 1 ? "Continue" : "Next"}
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
