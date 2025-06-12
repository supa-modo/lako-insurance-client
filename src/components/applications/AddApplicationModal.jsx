import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbShield,
  TbUser,
  TbMail,
  TbPhone,
  TbCalendar,
  TbMapPin,
  TbSchool,
  TbId,
  TbCheck,
  TbAlertCircle,
  TbUsers,
  TbFileText,
  TbCurrencyDollar,
  TbMailFilled,
} from "react-icons/tb";
import applicationService from "../../services/applicationService";
import { PiUserDuotone } from "react-icons/pi";
import { MdEmergency } from "react-icons/md";

const AddApplicationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    insuranceType: "personal-accident",
    coverType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    idNumber: "",
    mobileNumber: "",
    emailAddress: "",
    postalAddress: "",
    town: "",
    universityCollegeSchool: "",
    kraPin: "",
    nextOfKinName: "",
    nextOfKinContacts: "",
    beneficiaryName: "",
    beneficiaryContacts: "",
    previousAccidents: false,
    physicalDisability: false,
    chronicIllness: false,
    medicalHistoryDetails: "",
    policyStartDate: "",
    premiumAmount: "",
    insuranceProvider: "",
    isAgentPurchase: false,
    agentName: "",
    agentEmail: "",
    agentPhone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^(\+254|0)[17]\d{8}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid Kenyan mobile number";
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    // Optional validations
    if (formData.kraPin && !/^[A-Z]\d{9}[A-Z]$/.test(formData.kraPin)) {
      newErrors.kraPin = "KRA PIN must be in format A123456789B";
    }

    if (formData.agentEmail && !/\S+@\S+\.\S+/.test(formData.agentEmail)) {
      newErrors.agentEmail = "Please enter a valid agent email address";
    }

    if (
      formData.agentPhone &&
      !/^(\+254|0)[17]\d{8}$/.test(formData.agentPhone)
    ) {
      newErrors.agentPhone = "Please enter a valid agent phone number";
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
        premiumAmount: formData.premiumAmount
          ? parseFloat(formData.premiumAmount)
          : null,
        policyStartDate:
          formData.policyStartDate || new Date().toISOString().split("T")[0],
      };

      const response = await applicationService.createApplication(
        processedData
      );

      if (response && response.success) {
        onSave(response.data);
        onClose();
      } else {
        setErrors({
          submit: response?.message || "Failed to create application",
        });
      }
    } catch (error) {
      console.error("Error creating application:", error);
      setErrors({ submit: "Failed to create application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbShield className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Create New Insurance Application
                </h2>
                <p className="text-white/80 text-sm">
                  Add a new insurance application to the system
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
          className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]"
        >
          <div className="overflow-y-auto flex-1 px-3 md:px-6 py-5">
            <div className="space-y-6">
              {/* Insurance Type & Cover Type */}
              <div>
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbShield size={20} className="mr-2 text-primary-600" />
                  Insurance Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="insuranceType"
                      value={formData.insuranceType}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="personal-accident">
                        Personal Accident
                      </option>
                      <option value="health">Health Insurance</option>
                      <option value="motor">Motor Insurance</option>
                      <option value="life">Life Insurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Type
                    </label>
                    <select
                      name="coverType"
                      value={formData.coverType}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select cover type</option>
                      <option value="individual">Individual</option>
                      <option value="student">Student</option>
                      <option value="family">Family</option>
                      <option value="group">Group</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <PiUserDuotone size={20} className="mr-2 text-primary-600" />
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                          errors.firstName
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter middle name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                          errors.lastName
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                          errors.dateOfBirth
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      />
                      {errors.dateOfBirth && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" />{" "}
                          {errors.dateOfBirth}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                          errors.gender
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.gender}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                          errors.idNumber
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                        placeholder="Enter ID number"
                      />
                      {errors.idNumber && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <TbAlertCircle className="mr-1" /> {errors.idNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbMailFilled size={20} className="mr-2 text-primary-600" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                        errors.mobileNumber
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      placeholder="+254712345678"
                    />
                    {errors.mobileNumber && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.mobileNumber}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      className={`w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border ${
                        errors.emailAddress
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      placeholder="john@example.com"
                    />
                    {errors.emailAddress && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <TbAlertCircle className="mr-1" /> {errors.emailAddress}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Address
                    </label>
                    <input
                      type="text"
                      name="postalAddress"
                      value={formData.postalAddress}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="P.O. Box 123-00100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Town/City
                    </label>
                    <input
                      type="text"
                      name="town"
                      value={formData.town}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Nairobi"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <MdEmergency size={20} className="mr-2 text-primary-600" />
                  Emergency Contacts & Beneficiaries
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next of Kin Name
                    </label>
                    <input
                      type="text"
                      name="nextOfKinName"
                      value={formData.nextOfKinName}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter next of kin name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next of Kin Contact
                    </label>
                    <input
                      type="text"
                      name="nextOfKinContacts"
                      value={formData.nextOfKinContacts}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Phone number or email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficiary Name
                    </label>
                    <input
                      type="text"
                      name="beneficiaryName"
                      value={formData.beneficiaryName}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter beneficiary name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficiary Contact
                    </label>
                    <input
                      type="text"
                      name="beneficiaryContacts"
                      value={formData.beneficiaryContacts}
                      onChange={handleInputChange}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Phone number or email"
                    />
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbFileText size={20} className="mr-2 text-primary-600" />
                  Medical History
                </h3>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-6">
                    <label className=" flex items-center">
                      <div
                        className={`relative flex items-center justify-center h-[1rem] w-[1rem] rounded-[0.2rem] border focus:outline-none ${
                          formData.previousAccidents === true
                            ? "border-primary-600 bg-primary-100"
                            : "border-gray-500"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="agreement"
                          checked={formData.previousAccidents === true}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              previousAccidents: e.target.checked,
                            });
                            setErrors({});
                          }}
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        />
                        {formData.previousAccidents === true && (
                          <div className="">
                            <TbCheck className="text-primary-600" />
                          </div>
                        )}
                      </div>

                      <span className="ml-2 text-[0.9rem] font-medium  text-gray-600">
                        Previous accidents
                      </span>
                    </label>
                    <label className=" flex items-center">
                      <div
                        className={`relative flex items-center justify-center h-[1rem] w-[1rem] rounded-[0.2rem] border focus:outline-none ${
                          formData.physicalDisability === true
                            ? "border-primary-600 bg-primary-100"
                            : "border-gray-500"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="agreement"
                          checked={formData.physicalDisability === true}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              physicalDisability: e.target.checked,
                            });
                            setErrors({});
                          }}
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        />
                        {formData.physicalDisability === true && (
                          <div className="">
                            <TbCheck className="text-primary-600" />
                          </div>
                        )}
                      </div>

                      <span className="ml-2 text-[0.9rem] font-medium  text-gray-600">
                        Physical disability
                      </span>
                    </label>
                    <label className=" flex items-center">
                      <div
                        className={`relative flex items-center justify-center h-[1rem] w-[1rem] rounded-[0.2rem] border focus:outline-none ${
                          formData.chronicIllness === true
                            ? "border-primary-600 bg-primary-100"
                            : "border-gray-500"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="agreement"
                          checked={formData.chronicIllness === true}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              chronicIllness: e.target.checked,
                            });
                            setErrors({});
                          }}
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        />
                        {formData.chronicIllness === true && (
                          <div className="">
                            <TbCheck className="text-primary-600" />
                          </div>
                        )}
                      </div>

                      <span className="ml-2 text-[0.9rem] font-medium  text-gray-600">
                        Chronic illness
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical History Details
                    </label>
                    <textarea
                      name="medicalHistoryDetails"
                      value={formData.medicalHistoryDetails}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Provide any relevant medical history details..."
                    />
                  </div>
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
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <TbCheck className="mr-2 h-4 w-4" />
                    Create Application
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

export default AddApplicationModal;
