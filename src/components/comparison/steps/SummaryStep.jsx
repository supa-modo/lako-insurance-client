import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbArrowRight,
  TbInfoCircle,
  TbHeartPlus,
  TbCoin,
  TbUserSearch,
  TbUserCircle,
  TbCheck,
  TbShieldSearch,
  TbPlane,
  TbMapPin,
  TbUsers,
  TbMedicalCross,
  TbPlaneOff,
} from "react-icons/tb";
import { FaChevronLeft, FaChevronRight, FaUserInjured } from "react-icons/fa";
import contactService from "../../../services/contactService";

const SummaryStep = ({ formData, submitForm, prevStep }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Prepare data for submission when the user clicks Compare Now
  const prepareDataForSubmission = () => {
    // Create a copy of the form data to avoid mutating the original
    const processedData = { ...formData };

    // Ensure age is properly formatted
    if (processedData.age && typeof processedData.age === "string") {
      // If age is in string format (e.g., "65-70" or "75+"), parse it
      if (processedData.age.includes("-")) {
        const [min, max] = processedData.age.split("-").map(Number);
        processedData.ageMin = min;
        processedData.ageMax = max;
      } else if (processedData.age.includes("+")) {
        const min = parseInt(processedData.age.replace("+", ""), 10);
        processedData.ageMin = min;
        processedData.ageMax = 120; // High upper limit
      } else {
        // Single age value
        const age = parseInt(processedData.age, 10);
        if (!isNaN(age)) {
          processedData.ageMin = age;
          processedData.ageMax = age;
        }
      }
    }

    // Process budget filtering
    if (processedData.healthFilterType === "budget") {
      if (processedData.budgetValue) {
        // If we have a slider value, use it directly
        processedData.budgetMax = processedData.budgetValue;
      } else if (
        processedData.budget &&
        typeof processedData.budget === "string"
      ) {
        // If budget is in string format (e.g., "5000-10000" or "15000+"), parse it
        if (processedData.budget.includes("-")) {
          const [min, max] = processedData.budget.split("-").map(Number);
          processedData.budgetMin = min;
          processedData.budgetMax = max;
        } else if (processedData.budget.includes("+")) {
          const min = parseInt(processedData.budget.replace("+", ""), 10);
          processedData.budgetMin = min;
        } else {
          // Single budget value
          const budget = parseInt(processedData.budget, 10);
          if (!isNaN(budget)) {
            processedData.budgetMax = budget;
          }
        }
      }
    }

    // Process coverage limit filtering
    if (
      processedData.healthFilterType === "coverage" &&
      processedData.coverageLimit
    ) {
      const coverageMapping = {
        basic: { min: 0, max: 300000 },
        standard: { min: 300000, max: 1000000 },
        enhanced: { min: 1000000, max: 2000000 },
        premium: { min: 2000000, max: 3000000 },
        executive: { min: 3000000, max: 5000000 },
        elite: { min: 5000000, max: undefined },
      };

      const coverageRange = coverageMapping[processedData.coverageLimit];
      if (coverageRange) {
        processedData.coverageLimitMin = coverageRange.min;
        processedData.coverageLimitMax = coverageRange.max;
      }
    }

    // Ensure insurance type is set - default to health instead of seniors
    if (!processedData.insuranceType) {
      processedData.insuranceType = "health";
    }

    console.log("Prepared data for submission:", processedData);
    return processedData;
  };

  // Validate user details
  const validateUserDetails = () => {
    const newErrors = {};

    if (!userDetails.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^(\+254|0)[0-9]{9}$/.test(userDetails.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid Kenyan phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate comparison query message for contact system
  const generateQueryMessage = () => {
    const insuranceType = getInsuranceTypeDisplay();
    const age = formatAge();
    const budget = formatBudget();

    let message = `Insurance Comparison Query Submitted\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${userDetails.name}\n`;
    message += `Phone: ${userDetails.phone}\n\n`;
    message += `Query Details:\n`;
    message += `Insurance Type: ${insuranceType}\n`;

    // Add age for relevant insurance types
    if (
      formData.insuranceType === "health" ||
      formData.insuranceType === "seniors" ||
      formData.insuranceType === "personal-accident"
    ) {
      message += `Age: ${age}\n`;
    }

    message += `Budget: ${budget}\n`;

    // Add specific details based on insurance type
    if (formData.insuranceType === "personal-accident") {
      if (formData.accidentType) {
        message += `Accident Type: ${formData.accidentType.replace(
          "-",
          " "
        )}\n`;
      }
      if (formData.coverageAmount) {
        message += `Coverage Amount: KSh. ${formData.coverageAmount.toLocaleString()}\n`;
      }
      if (
        formData.additionalBenefits &&
        formData.additionalBenefits.length > 0
      ) {
        message += `Additional Benefits: ${formData.additionalBenefits.join(
          ", "
        )}\n`;
      }
    }

    if (formData.insuranceType === "travel") {
      if (formData.tripType) {
        message += `Trip Type: ${formData.tripType.replace("-", " ")}\n`;
      }
      if (formData.destination) {
        message += `Destination: ${formData.destination}\n`;
      }
      if (formData.tripDuration) {
        message += `Trip Duration: ${formData.tripDuration} days\n`;
      }
      if (formData.travellerCount) {
        message += `Number of Travellers: ${formData.travellerCount}\n`;
      }
      if (formData.medicalCoverageAmount) {
        message += `Medical Coverage: $${formData.medicalCoverageAmount.toLocaleString()}\n`;
      }
      const additionalCoverage = [
        formData.tripCancellation && "Trip Cancellation",
        formData.baggageCover && "Baggage Protection",
      ].filter(Boolean);
      if (additionalCoverage.length > 0) {
        message += `Additional Coverage: ${additionalCoverage.join(", ")}\n`;
      }
    }

    if (formData.healthFilterType) {
      message += `Filter Type: ${
        formData.healthFilterType === "budget"
          ? "Budget Range"
          : "Coverage Limit"
      }\n`;
    }

    message += `\nQuery submitted on: ${new Date().toLocaleString()}\n`;
    message += `\nPlease follow up with the customer to assist with their insurance comparison needs.`;

    return message;
  };

  // Send query details to contact messages system
  const sendQueryToContactSystem = async () => {
    try {
      const queryMessage = generateQueryMessage();

      await contactService.createContactMessage({
        name: userDetails.name,
        phone: userDetails.phone,
        subject: `Insurance Comparison Query - ${getInsuranceTypeDisplay()}`,
        message: queryMessage,
        type: "contact",
        priority: "medium",
      });

      console.log("Query details sent to contact system successfully");
    } catch (error) {
      console.error("Failed to send query to contact system:", error);
      // Don't block the comparison process if this fails
    }
  };

  // Handle form submission with processed data
  const handleSubmit = async () => {
    if (!validateUserDetails()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send query details to contact system for admin tracking
      await sendQueryToContactSystem();

      // Proceed with the normal comparison flow
      const processedData = prepareDataForSubmission();

      // Add user details to the processed data
      processedData.customerName = userDetails.name;
      processedData.customerPhone = userDetails.phone;

      submitForm(processedData);
    } catch (error) {
      console.error("Error during submission:", error);
      // Still proceed with comparison even if contact system fails
      const processedData = prepareDataForSubmission();
      processedData.customerName = userDetails.name;
      processedData.customerPhone = userDetails.phone;
      submitForm(processedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const formatAge = () => {
    // Check for date of birth first
    if (formData.dateOfBirth) {
      const today = new Date();
      const birth = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }

      return `${age} years (Born ${new Date(
        formData.dateOfBirth
      ).toLocaleDateString()})`;
    }

    if (formData.age && typeof formData.age === "string") {
      return formData.age.replace("-", " to ").replace("plus", "+");
    }

    // If we have numeric min/max values
    if (formData.ageMin !== undefined && formData.ageMax !== undefined) {
      if (formData.ageMin === formData.ageMax) {
        return `${formData.ageMin} years`;
      } else if (formData.ageMax >= 120) {
        return `${formData.ageMin}+ years`;
      } else {
        return `${formData.ageMin} to ${formData.ageMax} years`;
      }
    }

    return "Not specified";
  };

  const formatBudget = () => {
    // For health insurance, show different information based on filter type
    if (
      formData.insuranceType === "health" ||
      formData.insuranceType === "seniors"
    ) {
      if (formData.healthFilterType === "coverage") {
        // Show coverage limit information
        if (formData.coverageLimit) {
          const coverageLabels = {
            basic: "Basic (KSh. 0 - 300K)",
            standard: "Standard (KSh. 300K - 1M)",
            enhanced: "Enhanced (KSh. 1M - 2M)",
            premium: "Premium (KSh. 2M - 3M)",
            executive: "Executive (KSh. 3M - 5M)",
            elite: "Elite (KSh. 5M+)",
          };
          return `Inpatient Coverage: ${
            coverageLabels[formData.coverageLimit] || formData.coverageLimit
          }`;
        }
        return "Coverage limit based filtering";
      }
    }

    if (formData.budgetValue) {
      return `KSh. ${formData.budgetValue.toLocaleString()}`;
    }

    if (formData.budget && typeof formData.budget === "string") {
      // Format string budget
      if (formData.budget.includes("-")) {
        return `KSh. ${formData.budget.replace("-", " to KSh. ")}`;
      } else if (formData.budget.includes("+")) {
        return `KSh. ${formData.budget.replace("+", " and above")}`;
      }
      return `KSh. ${formData.budget}`;
    }

    // If we have numeric min/max values
    if (formData.budgetMin !== undefined || formData.budgetMax !== undefined) {
      if (
        formData.budgetMin !== undefined &&
        formData.budgetMax !== undefined
      ) {
        // Have both min and max
        return `KSh. ${formData.budgetMin?.toLocaleString()} to KSh. ${formData.budgetMax?.toLocaleString()}`;
      } else if (formData.budgetMin !== undefined) {
        // Only have min
        return `KSh. ${formData.budgetMin.toLocaleString()} and above`;
      } else if (formData.budgetMax !== undefined) {
        // Only have max
        return `Up to KSh. ${formData.budgetMax.toLocaleString()}`;
      }
    }

    return "Not specified";
  };

  const getInsuranceTypeDisplay = () => {
    switch (formData.insuranceType) {
      case "health":
        return "Health Insurance";
      case "seniors":
        return "Seniors Health Cover";
      case "personal-accident":
        return "Personal Accident Insurance";
      case "travel":
        return "Travel Insurance";
      default:
        return formData.insuranceType || "Not specified";
    }
  };

  const renderPersonalAccidentDetails = () => {
    if (formData.insuranceType !== "personal-accident") return null;

    return (
      <>
        {formData.accidentType && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Accident Type
              </h5>
              <p className="text-primary-700 font-semibold text-lg capitalize">
                {formData.accidentType.replace("-", " ")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {formData.coverageAmount && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Coverage Amount
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                KSh. {formData.coverageAmount.toLocaleString()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {formData.additionalBenefits &&
          formData.additionalBenefits.length > 0 && (
            <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200 md:col-span-2">
              <div className="flex-grow">
                <h5 className="text-slate-500 text-sm font-medium mb-1">
                  Additional Benefits
                </h5>
                <p className="text-primary-700 font-semibold text-lg">
                  {formData.additionalBenefits.join(", ")}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <TbCheck className="h-4 w-4 text-primary-600" />
                </div>
              </div>
            </div>
          )}
      </>
    );
  };

  const renderTravelDetails = () => {
    if (formData.insuranceType !== "travel") return null;

    return (
      <>
        {formData.tripType && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Trip Type
              </h5>
              <p className="text-primary-700 font-semibold text-lg capitalize">
                {formData.tripType.replace("-", " ")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {formData.destination && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Destination
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {formData.destination}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {formData.tripDuration && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Trip Duration
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {formData.tripDuration} days
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {formData.travellerCount && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Number of Travellers
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {formData.travellerCount}{" "}
                {formData.travellerCount === 1 ? "person" : "people"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {formData.medicalCoverageAmount && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Medical Coverage
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                ${formData.medicalCoverageAmount.toLocaleString()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}

        {(formData.tripCancellation || formData.baggageCover) && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200 md:col-span-2">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Additional Coverage
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {[
                  formData.tripCancellation && "Trip Cancellation",
                  formData.baggageCover && "Baggage Protection",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderHealthFilterDetails = () => {
    if (
      formData.insuranceType !== "health" &&
      formData.insuranceType !== "seniors"
    )
      return null;

    return (
      <>
        {formData.healthFilterType && (
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Filter Type
              </h5>
              <p className="text-primary-700 font-semibold text-lg capitalize">
                {formData.healthFilterType === "budget"
                  ? "Budget Range"
                  : "Coverage Limit"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      {/* User Details Section */}
      <div className="mb-8">
        <h3 className="text-[1.05rem] lg:text-lg font-semibold text-slate-700 mb-4">
          Your Contact Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-[0.83rem] lg:text-sm font-lexend font-semibold text-primary-600 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full px-3 md:px-4 py-3 md:py-2 bg-neutral-100 text-gray-600 placeholder:font-normal placeholder:text-[1.05rem]  font-medium text-[0.95rem] md:text-base lg:text-lg rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200 ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300 focus:border-primary-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <TbInfoCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-[0.83rem] lg:text-sm font-lexend font-semibold text-primary-600 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={userDetails.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="e.g., 0712345678 or +254712345678"
              className={`w-full px-3 md:px-4 py-3 md:py-2 bg-neutral-100 text-gray-600 placeholder:font-normal placeholder:text-base  font-medium font-lexend text-[0.95rem] md:text-base lg:text-lg rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200 ${
                errors.phone
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300 focus:border-primary-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <TbInfoCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Details Section */}
      <div className="mb-2">
        <h3 className="text-[1.05rem] lg:text-lg font-semibold text-slate-700">
          Your Comparison Details
        </h3>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
          {/* Insurance Type */}
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Insurance Type
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {getInsuranceTypeDisplay()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Age Range - Show for health and personal accident */}
          {(formData.insuranceType === "health" ||
            formData.insuranceType === "seniors" ||
            formData.insuranceType === "personal-accident") && (
            <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200">
              <div className="flex-grow">
                <h5 className="text-slate-500 text-sm font-medium mb-1">
                  Age Range
                </h5>
                <p className="text-primary-700 font-semibold text-lg">
                  {formatAge()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <TbCheck className="h-4 w-4 text-primary-600" />
                </div>
              </div>
            </div>
          )}

          {/* Render insurance type specific details */}
          {renderPersonalAccidentDetails()}
          {renderTravelDetails()}

          {/* Budget Range - Show for all types */}
          <div className="flex items-start p-4 rounded-[0.8rem] bg-white border border-slate-200 hover:border-primary-200 transition-all duration-200 md:col-span-2">
            <div className="flex-grow">
              <h5 className="text-slate-500 text-sm font-medium mb-1">
                Budget Range
              </h5>
              <p className="text-primary-700 font-semibold text-lg">
                {formatBudget()}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                <TbCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 font-lexend border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <FaChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !userDetails.name.trim() ||
            !userDetails.phone.trim()
          }
          className={`px-8 py-3 font-medium font-lexend rounded-lg flex items-center shadow-md transition-all duration-200 group ${
            isSubmitting ||
            !userDetails.name.trim() ||
            !userDetails.phone.trim()
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-700 hover:shadow-lg"
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Compare Now
              <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SummaryStep;
