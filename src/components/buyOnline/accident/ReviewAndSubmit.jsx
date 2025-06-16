import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbCheck,
  TbLoader,
  TbUser,
  TbMail,
  TbPhone,
  TbCalendar,
  TbShield,
  TbCurrencyDollar,
  TbFile,
  TbEdit,
  TbAlertCircle,
  TbInfoCircle,
  TbCheckbox,
  TbLoader2,
  TbExclamationCircle,
} from "react-icons/tb";
import applicationService from "../../../services/applicationService";

const ReviewAndSubmit = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting = false,
  validationErrors: serverValidationErrors = {},
  setValidationErrors: setServerValidationErrors,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [clientValidationErrors, setClientValidationErrors] = useState({});

  // Clear validation errors when form data changes
  React.useEffect(() => {
    // Clear both client and server validation errors when form data changes
    setClientValidationErrors({});
    setErrors({});
    if (setServerValidationErrors) {
      setServerValidationErrors({});
    }
  }, [formData, setServerValidationErrors]);

  // Navigation functions for edit buttons
  const goToStep = (stepNumber) => {
    // Calculate how many steps to go back
    const stepsToGoBack = 5 - stepNumber; // Current step is 5 (Review & Submit)

    // Call prevStep multiple times to go back to the desired step
    for (let i = 0; i < stepsToGoBack; i++) {
      setTimeout(() => prevStep(), i * 100); // Small delay to ensure smooth navigation
    }
  };

  const goToCoverTypeStep = () => goToStep(1);
  const goToPlanSelectionStep = () => goToStep(2);
  const goToPersonalDetailsStep = () => goToStep(3);
  const goToDocumentsStep = () => goToStep(4);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setErrors({ agreement: "You must agree to the terms and conditions" });
      return;
    }

    setErrors({});
    setClientValidationErrors({});

    // Clear server validation errors when trying to submit again
    if (setServerValidationErrors) {
      setServerValidationErrors({});
    }

    // Basic client-side validation
    const requiredFields = {
      firstName: "First name is required",
      lastName: "Last name is required",
      dateOfBirth: "Date of birth is required",
      gender: "Gender is required",
      idNumber: "ID number is required",
      mobileNumber: "Mobile number is required",
      emailAddress: "Email address is required",
    };

    const newClientValidationErrors = {};

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newClientValidationErrors[field] = message;
      }
    });

    if (Object.keys(newClientValidationErrors).length > 0) {
      setClientValidationErrors(newClientValidationErrors);
      setErrors({
        submit:
          "Please fill in all required fields before proceeding to payment.",
      });
      return;
    }

    // All validation passed, proceed to payment step
    nextStep();
  };

  // Helper function to get field error message (combining client and server errors)
  const getFieldError = (fieldName) => {
    return (
      clientValidationErrors[fieldName] ||
      serverValidationErrors[fieldName] ||
      null
    );
  };

  // Helper function to check if field has error (combining client and server errors)
  const hasFieldError = (fieldName) => {
    return !!(
      clientValidationErrors[fieldName] || serverValidationErrors[fieldName]
    );
  };

  // Get all validation errors (combining client and server errors)
  const getAllValidationErrors = () => {
    return { ...clientValidationErrors, ...serverValidationErrors };
  };

  const personalInfoSection = (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base md:text-lg font-semibold text-neutral-700 ">
          Personal Information
        </h4>
        <button
          onClick={goToPersonalDetailsStep}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-[0.8rem] md:text-sm lg:text-[0.9rem]">
        <div
          className={
            hasFieldError("firstName") || hasFieldError("lastName")
              ? "col-span-2 lg:col-span-1"
              : ""
          }
        >
          <span className="text-gray-600">Full Name:</span>
          <p
            className={`font-semibold text-sm md:text-[0.9rem] lg:text-base ${
              hasFieldError("firstName") || hasFieldError("lastName")
                ? "text-red-600"
                : "text-primary-700"
            }`}
          >
            {[formData.firstName, formData.middleName, formData.lastName]
              .filter(Boolean)
              .join(" ")}
          </p>
          {(hasFieldError("firstName") || hasFieldError("lastName")) && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("firstName") || getFieldError("lastName")}
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-600">Date of Birth:</span>
          <p
            className={`font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base ${
              hasFieldError("dateOfBirth") ? "text-red-600" : "text-primary-700"
            }`}
          >
            {formatDate(formData.dateOfBirth)}
          </p>
          {hasFieldError("dateOfBirth") && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("dateOfBirth")}
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-600">Gender:</span>
          <p
            className={`font-semibold text-sm md:text-[0.9rem] lg:text-base capitalize ${
              hasFieldError("gender") ? "text-red-600" : "text-primary-700"
            }`}
          >
            {formData.gender}
          </p>
          {hasFieldError("gender") && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("gender")}
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-600">ID Number:</span>
          <p
            className={`font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base ${
              hasFieldError("idNumber") ? "text-red-600" : "text-primary-700"
            }`}
          >
            {formData.idNumber}
          </p>
          {hasFieldError("idNumber") && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("idNumber")}
            </p>
          )}
        </div>
        {formData.universityCollegeSchool && (
          <div className="md:col-span-2">
            <span className="text-gray-600">Institution:</span>
            <p className="font-semibold text-sm md:text-[0.9rem] lg:text-base text-primary-700">
              {formData.universityCollegeSchool}
            </p>
          </div>
        )}

        <div>
          <span className="text-gray-600">Email:</span>
          <p
            className={`font-semibold text-sm md:text-[0.9rem] lg:text-base ${
              hasFieldError("emailAddress")
                ? "text-red-600"
                : "text-primary-700"
            }`}
          >
            {formData.emailAddress}
          </p>
          {hasFieldError("emailAddress") && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("emailAddress")}
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-600">Mobile:</span>
          <p
            className={`font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base ${
              hasFieldError("mobileNumber")
                ? "text-red-600"
                : "text-primary-700"
            }`}
          >
            {formData.mobileNumber}
          </p>
          {hasFieldError("mobileNumber") && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("mobileNumber")}
            </p>
          )}
        </div>
        {formData.kraPin && (
          <div>
            <span className="text-gray-600">KRA PIN:</span>
            <p className="font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base text-primary-700">
              {formData.kraPin}
            </p>
          </div>
        )}
        {formData.postalAddress && (
          <div>
            <span className="text-gray-600">Postal Address:</span>
            <p className="font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base text-primary-700">
              {formData.postalAddress}
            </p>
          </div>
        )}
        {formData.town && (
          <div>
            <span className="text-gray-600">Town:</span>
            <p className="font-semibold text-sm md:text-[0.9rem] lg:text-base text-primary-700">
              {formData.town}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const emergencyContactsSection = (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base md:text-lg font-semibold text-neutral-700 ">
          Emergency Contacts
        </h4>
        <button
          onClick={goToPersonalDetailsStep}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-[0.8rem] md:text-sm lg:text-[0.9rem]">
        {formData.nextOfKinName && (
          <>
            <div>
              <span className="text-gray-600">Next of Kin:</span>
              <p className="font-semibold  text-sm md:text-[0.9rem] lg:text-base text-primary-700">
                {formData.nextOfKinName}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Next of Kin Contact:</span>
              <p className="font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base text-primary-700">
                {formData.nextOfKinContacts}
              </p>
            </div>
          </>
        )}
        {formData.beneficiaryName && (
          <>
            <div>
              <span className="text-gray-600">Beneficiary:</span>
              <p className="font-semibold text-sm md:text-[0.9rem] lg:text-base text-primary-700">
                {formData.beneficiaryName}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Beneficiary Contact:</span>
              <p className="font-medium font-lexend text-sm md:text-[0.9rem] lg:text-base text-primary-700">
                {formData.beneficiaryContacts}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const medicalHistorySection = (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base md:text-lg font-semibold text-neutral-700 ">
          Medical History
        </h4>
        <button
          onClick={goToPersonalDetailsStep}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="space-y-3 text-sm lg:text-[0.9rem]">
        <div className="flex justify-between mr-4 md:mr-8">
          <span className="text-gray-600">Previous Accidents:</span>
          <span
            className={`font-medium ${
              formData.previousAccidents ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {formData.previousAccidents ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between mr-4 md:mr-8">
          <span className="text-gray-600">Physical Disability:</span>
          <span
            className={`font-medium ${
              formData.physicalDisability ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {formData.physicalDisability ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between mr-4 md:mr-8">
          <span className="text-gray-600">Chronic Illness:</span>
          <span
            className={`font-medium ${
              formData.chronicIllness ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {formData.chronicIllness ? "Yes" : "No"}
          </span>
        </div>
        {formData.medicalHistoryDetails && (
          <div>
            <span className="text-gray-600">Additional Details:</span>
            <p className="font-semibold text-gray-700 mt-1">
              {formData.medicalHistoryDetails}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const planDetailsSection = (
    <div className="bg-primary-50 rounded-xl border border-primary-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-neutral-700 ">
          Selected Insurance Plan
        </h4>
        <button
          onClick={goToPlanSelectionStep}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <TbEdit className="w-4 h-4 inline mr-1" />
          Change
        </button>
      </div>

      {formData.selectedPlan && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={
                formData.selectedPlan.company?.logoUrl ||
                "/placeholder-logo.png"
              }
              alt={formData.selectedPlan.company?.name || "Insurance Company"}
              className="w-28 h-14 object-contain rounded-lg bg-white p-2"
              onError={(e) => {
                e.target.src = "/placeholder-logo.png";
              }}
            />
            <div>
              <h5 className="font-semibold text-primary-700">
                {formData.selectedPlan.name}
              </h5>
              <p className="text-sm text-gray-600">
                {formData.selectedPlan.company?.name || "Insurance Company"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[0.8rem] md:text-sm">
            <div>
              <span className="text-gray-600">Coverage Amount:</span>
              <p className="font-semibold font-lexend text-[0.9rem] md:text-base text-primary-700">
                {formatCurrency(
                  formData.selectedPlan.inpatientCoverageLimit ||
                    formData.selectedPlan.coverageAmount
                )}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Annual Premium:</span>
              <p className="font-semibold font-lexend text-[0.9rem] md:text-base text-primary-700">
                {formatCurrency(
                  formData.premiumAmount || formData.selectedPlan.annualPremium
                )}
                {formData.selectedPlan?.premiumStructure === "age-based" &&
                  formData.selectedAge && (
                    <span className="text-sm text-gray-500 ml-2">
                      (Age: {formData.selectedAge} years)
                    </span>
                  )}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Coverage Type:</span>
              <p className="font-medium text-[0.9rem] md:text-base text-primary-700 capitalize">
                {formData.coverType}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Policy Start Date:</span>
              <p className="font-medium font-lexend text-[0.9rem] md:text-base text-primary-700">
                {formatDate(formData.policyStartDate)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const documentsSection = (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-3.5 md:mb-4">
        <h4 className="text-base md:text-lg font-semibold text-neutral-700 ">
          Uploaded Documents
        </h4>
        <button
          onClick={goToDocumentsStep}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="space-y-1.5 md:space-y-3">
        {formData.documents && formData.documents.length > 0 ? (
          formData.documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <TbFile className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {doc.file?.name || doc.name || "Uploaded Document"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.type
                      ? doc.type
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())
                      : "Document"}
                  </p>
                </div>
              </div>
              <TbCheck className="w-5 h-5 text-green-600" />
            </div>
          ))
        ) : Object.entries(formData.documents || {}).length > 0 ? (
          Object.entries(formData.documents || {}).map(([type, file]) => (
            <div
              key={type}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <TbFile className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {type
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
              </div>
              <TbCheck className="w-5 h-5 text-green-600" />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No documents uploaded</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">5.</span>{" "}
          <span className="">Review & Submit Application</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Please review all the information below carefully before submitting
          your application.
        </p>
      </div>

      {/* Validation Errors Summary */}
      {Object.keys(getAllValidationErrors()).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <TbExclamationCircle className="text-red-600 h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-red-800 font-medium text-sm mb-2">
                Please correct the following errors before submitting:
              </h4>
              <ul className="text-red-700 text-sm space-y-1">
                {Object.entries(getAllValidationErrors()).map(
                  ([fieldName, error]) => (
                    <li key={fieldName} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="capitalize">
                          {fieldName
                            .replace(/([A-Z])/g, " $1")
                            .toLowerCase()
                            .replace("email address", "email")
                            .replace("kra pin", "KRA PIN")}
                          :
                        </strong>{" "}
                        {error}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {personalInfoSection}
        {emergencyContactsSection}
        {medicalHistorySection}
        {planDetailsSection}
        {documentsSection}
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-2 md:p-4 lg:p-6">
        <div className="flex items-start space-x-3">
          <label className="pt-0.5 flex items-center">
            <div
              className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-[0.2rem] border focus:outline-none ${
                agreed === true
                  ? "border-primary-600 bg-primary-100"
                  : "border-gray-500"
              }`}
            >
              <input
                type="checkbox"
                name="agreement"
                checked={agreed === true}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setErrors({});
                }}
                className="absolute opacity-0 h-full w-full cursor-pointer"
              />
              {agreed === true && (
                <div className="">
                  <TbCheck className="text-primary-600" />
                </div>
              )}
            </div>
          </label>

          <label
            htmlFor="agreement"
            className="text-sm md:text-base text-gray-600"
          >
            <span
              className={`font-medium ${
                agreed === true ? "text-primary-700" : "text-gray-600"
              }`}
            >
              By checking this field, I confirm that:
            </span>
            <ul className="mt-2 space-y-1 list-disc list-inside text-xs md:text-sm lg:text-[0.95rem]">
              <li>
                The information I have provided is accurate and complete to the
                best of my knowledge
              </li>
              <li>
                I understand that submitting incorrect or incomplete information
                may result in delays or issues with processing
              </li>
              <li>
                I agree and accept the {formData.insuranceProvider} Privacy
                Policy and Terms and Conditions
              </li>
              <li>
                I authorize the insurance company to verify the information
                provided
              </li>
            </ul>
          </label>
        </div>
        {errors.agreement && (
          <p className="text-red-500 text-xs mt-2 ml-7">{errors.agreement}</p>
        )}
      </div>

      {/* Error Display */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <TbExclamationCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <p className="text-red-800 text-sm">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-5 md:pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={!agreed || isSubmitting}
          className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition-colors ${
            agreed && !isSubmitting
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <TbLoader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <TbCheckbox className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Proceed to Payment
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
