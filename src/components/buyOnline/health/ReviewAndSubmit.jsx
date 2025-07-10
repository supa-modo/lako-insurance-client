import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbCheck,
  TbEdit,
  TbUser,
  TbMail,
  TbPhone,
  TbMapPin,
  TbStethoscope,
  TbHeartPlus,
  TbUsers,
  TbShield,
  TbCurrencyDollar,
  TbCalendar,
  TbBuilding,
  TbInfoCircle,
  TbAlertCircle,
  TbCreditCard,
  TbFileText,
  TbEye,
  TbLoader,
} from "react-icons/tb";
import { formatCurrency } from "../../../utils/formatCurrency";

const ReviewAndSubmit = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting,
  validationErrors,
  setValidationErrors,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "Not specified";
    // Format as +254 XXX XXX XXX
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("254")) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        9
      )} ${cleaned.slice(9)}`;
    }
    return phone;
  };

  const handleSubmit = () => {
    if (!agreed) {
      alert("Please agree to the terms and conditions to continue");
      return;
    }

    // Clear any previous validation errors
    setValidationErrors({});

    // Proceed to next step (payment or final submission)
    nextStep();
  };

  const renderValidationErrors = () => {
    if (!validationErrors || Object.keys(validationErrors).length === 0) {
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div className="flex items-start">
          <TbAlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-red-800 font-medium mb-2">
              Please correct the following errors:
            </h4>
            <ul className="text-red-700 text-sm space-y-1">
              {Object.entries(validationErrors).map(([field, error]) => (
                <li key={field} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>
                    <strong className="capitalize">
                      {field.replace(/([A-Z])/g, " $1").toLowerCase()}:
                    </strong>{" "}
                    {error}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPersonalInformation = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center">
          <TbUser className="w-5 h-5 mr-2" />
          Personal Information
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-medium">Full Name</label>
          <p className="text-sm text-gray-700 font-medium">
            {[formData.firstName, formData.middleName, formData.lastName]
              .filter(Boolean)
              .join(" ") || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">
            Date of Birth
          </label>
          <p className="text-sm text-gray-700 font-medium">
            {formatDate(formData.dateOfBirth)}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">Gender</label>
          <p className="text-sm text-gray-700 font-medium">
            {formData.gender || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">ID Number</label>
          <p className="text-sm text-gray-700 font-medium">
            {formData.idNumber || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">KRA PIN</label>
          <p className="text-sm text-gray-700 font-medium">
            {formData.kraPin || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContactInformation = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center">
          <TbMail className="w-5 h-5 mr-2" />
          Contact Information
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-medium">
            Mobile Number
          </label>
          <p className="text-sm text-gray-700 font-medium">
            {formatPhoneNumber(formData.mobileNumber)}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">
            Email Address
          </label>
          <p className="text-sm text-gray-700 font-medium">
            {formData.emailAddress || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">
            Postal Address
          </label>
          <p className="text-sm text-gray-700 font-medium">
            {formData.postalAddress || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium">Town/City</label>
          <p className="text-sm text-gray-700 font-medium">
            {formData.town || "Not specified"}
          </p>
        </div>
      </div>

      {(formData.nextOfKinName || formData.nextOfKinContacts) && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-3">
            Next of Kin
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-medium">Name</label>
              <p className="text-sm text-gray-700 font-medium">
                {formData.nextOfKinName || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium">
                Contact
              </label>
              <p className="text-sm text-gray-700 font-medium">
                {formatPhoneNumber(formData.nextOfKinContacts)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderHealthInformation = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center">
          <TbStethoscope className="w-5 h-5 mr-2" />
          Health Information
        </h4>
      </div>

      <div className="space-y-4">
        {/* Pre-existing conditions */}
        <div>
          <label className="text-xs text-gray-500 font-medium">
            Pre-existing Conditions
          </label>
          <div className="mt-1">
            {formData.preExistingConditions &&
            formData.preExistingConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.preExistingConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">None declared</p>
            )}
          </div>
        </div>

        {/* Current medication */}
        {formData.currentMedication && (
          <div>
            <label className="text-xs text-gray-500 font-medium">
              Current Medications
            </label>
            <p className="text-sm text-gray-700 mt-1">
              {formData.currentMedication}
            </p>
          </div>
        )}

        {/* Allergies */}
        {formData.allergies && (
          <div>
            <label className="text-xs text-gray-500 font-medium">
              Known Allergies
            </label>
            <p className="text-sm text-gray-700 mt-1">{formData.allergies}</p>
          </div>
        )}

        {/* Family medical history */}
        {formData.familyMedicalHistory && (
          <div>
            <label className="text-xs text-gray-500 font-medium">
              Family Medical History
            </label>
            <p className="text-sm text-gray-700 mt-1">
              {formData.familyMedicalHistory}
            </p>
          </div>
        )}

        {!formData.preExistingConditions?.length &&
          !formData.currentMedication &&
          !formData.allergies &&
          !formData.familyMedicalHistory && (
            <p className="text-sm text-gray-500 italic">
              No health information provided
            </p>
          )}
      </div>
    </div>
  );

  const renderLifestyleInformation = () => {
    const lifestyle = formData.lifestyle || {};

    if (
      !lifestyle.smokingStatus &&
      !lifestyle.alcoholConsumption &&
      !lifestyle.exerciseFrequency &&
      !lifestyle.occupation
    ) {
      return null;
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <TbHeartPlus className="w-5 h-5 mr-2" />
            Lifestyle Information
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lifestyle.smokingStatus && (
            <div>
              <label className="text-xs text-gray-500 font-medium">
                Smoking Status
              </label>
              <p className="text-sm text-gray-700 font-medium">
                {lifestyle.smokingStatus}
              </p>
            </div>
          )}
          {lifestyle.alcoholConsumption && (
            <div>
              <label className="text-xs text-gray-500 font-medium">
                Alcohol Consumption
              </label>
              <p className="text-sm text-gray-700 font-medium">
                {lifestyle.alcoholConsumption}
              </p>
            </div>
          )}
          {lifestyle.exerciseFrequency && (
            <div>
              <label className="text-xs text-gray-500 font-medium">
                Exercise Frequency
              </label>
              <p className="text-sm text-gray-700 font-medium">
                {lifestyle.exerciseFrequency}
              </p>
            </div>
          )}
          {lifestyle.occupation && (
            <div>
              <label className="text-xs text-gray-500 font-medium">
                Occupation
              </label>
              <p className="text-sm text-gray-700 font-medium">
                {lifestyle.occupation}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDependents = () => {
    if (
      formData.coverType !== "family" ||
      !formData.dependents ||
      formData.dependents.length === 0
    ) {
      return null;
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <TbUsers className="w-5 h-5 mr-2" />
            Family Members ({formData.dependents.length})
          </h4>
        </div>

        <div className="space-y-4">
          {formData.dependents.map((dependent, index) => (
            <div
              key={dependent.id}
              className="border border-gray-100 rounded-lg p-4"
            >
              <h5 className="font-medium text-gray-700 mb-2">
                {dependent.relationship
                  ? `${dependent.relationship} ${index + 1}`
                  : `Family Member ${index + 1}`}
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    Name
                  </label>
                  <p className="text-gray-700">
                    {[dependent.firstName, dependent.lastName]
                      .filter(Boolean)
                      .join(" ") || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    Relationship
                  </label>
                  <p className="text-gray-700 capitalize">
                    {dependent.relationship || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    Date of Birth
                  </label>
                  <p className="text-gray-700">
                    {formatDate(dependent.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    Gender
                  </label>
                  <p className="text-gray-700">
                    {dependent.gender || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPlanSummary = () => (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-primary-700 flex items-center">
          <TbShield className="w-5 h-5 mr-2" />
          Selected Plan
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Plan Name
            </label>
            <p className="text-sm text-primary-800 font-semibold">
              {formData.selectedPlan?.name || "Not selected"}
            </p>
          </div>
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Insurance Provider
            </label>
            <p className="text-sm text-primary-800 font-medium">
              {formData.selectedPlan?.provider || "Not specified"}
            </p>
          </div>
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Coverage Type
            </label>
            <p className="text-sm text-primary-800 font-medium capitalize">
              {formData.coverType} Cover
            </p>
          </div>
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Coverage Limit
            </label>
            <p className="text-sm text-primary-800 font-medium">
              {formData.selectedPlan?.coverageLimit
                ? formatCurrency(formData.selectedPlan.coverageLimit)
                : "Not specified"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Annual Premium
            </label>
            <p className="text-xl text-primary-800 font-bold">
              {formData.premiumAmount
                ? formatCurrency(formData.premiumAmount)
                : "Not calculated"}
            </p>
          </div>
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Policy Start Date
            </label>
            <p className="text-sm text-primary-800 font-medium">
              {formatDate(formData.policyStartDate) ||
                formatDate(new Date().toISOString().split("T")[0])}
            </p>
          </div>
          <div>
            <label className="text-xs text-primary-600 font-medium">
              Plan Type
            </label>
            <p className="text-sm text-primary-800 font-medium capitalize">
              {formData.selectedPlan?.type || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Health verification notice */}
      {formData.requiresHealthVerification && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <TbInfoCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h5 className="text-yellow-800 font-medium mb-1">
                Health Verification Required
              </h5>
              <p className="text-yellow-700 text-sm">
                This plan requires medical underwriting. Your application will
                be reviewed before final approval, and payment will be processed
                after approval.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDocumentsSummary = () => {
    const documents = formData.documents || {};
    const documentCount = Object.keys(documents).length;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <TbFileText className="w-5 h-5 mr-2" />
            Documents ({documentCount})
          </h4>
        </div>

        {documentCount > 0 ? (
          <div className="space-y-2">
            {Object.entries(documents).map(([docType, fileData]) => (
              <div
                key={docType}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <TbFileText className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 capitalize">
                    {docType.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <TbCheck className="w-4 h-4 text-green-500 mr-1" />
                  Uploaded
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No documents uploaded yet
          </p>
        )}
      </div>
    );
  };

  const renderPaymentInfo = () => {
    if (formData.requiresHealthVerification) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <TbInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h5 className="text-blue-800 font-medium mb-1">
                Payment Process
              </h5>
              <p className="text-blue-700 text-sm">
                Since this plan requires health verification, payment will be
                arranged after your application is reviewed and approved by our
                underwriting team.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <TbCreditCard className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h5 className="text-green-800 font-medium mb-1">Payment Process</h5>
            <p className="text-green-700 text-sm">
              After submitting your application, you'll be redirected to
              complete payment via M-Pesa. Your policy will be active
              immediately upon successful payment.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">5.</span>
          <span className="">Review & Submit Application</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Please review all your information carefully before submitting your
          health insurance application.
        </p>
      </div>

      {/* Validation Errors */}
      {renderValidationErrors()}

      {/* Application Summary */}
      <div className="space-y-6">
        {renderPlanSummary()}
        {renderPersonalInformation()}
        {renderContactInformation()}
        {renderHealthInformation()}
        {renderLifestyleInformation()}
        {renderDependents()}
        {renderDocumentsSummary()}
        {renderPaymentInfo()}
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
          />
          <div className="flex-1">
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 cursor-pointer"
            >
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-primary-600 hover:text-primary-700 underline"
              >
                terms and conditions
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-primary-600 hover:text-primary-700 underline"
              >
                privacy policy
              </button>
              . I understand that the information provided is accurate and
              complete.
            </label>
          </div>
        </div>

        {!agreed && (
          <p className="text-red-600 text-sm mt-2 ml-7">
            Please agree to the terms and conditions to continue
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={!agreed || isSubmitting}
          className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors ${
            agreed && !isSubmitting
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <TbLoader className="w-4 h-4 mr-2 animate-spin" />
              {formData.requiresHealthVerification
                ? "Submitting Application..."
                : "Preparing Payment..."}
            </>
          ) : (
            <>
              {formData.requiresHealthVerification
                ? "Submit Application"
                : "Proceed to Payment"}
              <TbChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>

      {!agreed && (
        <div className="text-center">
          <p className="text-sm text-red-600">
            Please agree to the terms and conditions to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewAndSubmit;
