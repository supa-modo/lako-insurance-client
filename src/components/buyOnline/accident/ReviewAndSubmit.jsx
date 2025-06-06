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
} from "react-icons/tb";
import applicationService from "../../../services/applicationService";

const ReviewAndSubmit = ({
  formData,
  updateFormData,
  onSubmit,
  prevStep,
  isSubmitting,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

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

    try {
      // Prepare application data
      const applicationData = {
        insuranceType: "personal-accident",
        coverType: formData.coverType,

        // Personal Details
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        universityCollegeSchool: formData.universityCollegeSchool,

        // Proposer Details
        kraPin: formData.kraPin,
        idNumber: formData.idNumber,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,
        postalAddress: formData.postalAddress,
        town: formData.town,

        // Next of Kin & Beneficiary
        nextOfKinName: formData.nextOfKinName,
        nextOfKinContacts: formData.nextOfKinContacts,
        beneficiaryName: formData.beneficiaryName,
        beneficiaryContacts: formData.beneficiaryContacts,

        // Medical History
        previousAccidents: formData.previousAccidents || false,
        physicalDisability: formData.physicalDisability || false,
        chronicIllness: formData.chronicIllness || false,
        medicalHistoryDetails: formData.medicalHistoryDetails,

        // Policy Details
        policyStartDate: formData.policyStartDate,

        // Agent Information
        isAgentPurchase: formData.isAgentPurchase || false,
        agentName: formData.agentName,
        agentEmail: formData.agentEmail,
        agentPhone: formData.agentPhone,

        // Selected Plan
        selectedPlanId: formData.selectedPlan?.id,
        premiumAmount: formData.premiumAmount,
        insuranceProvider: formData.insuranceProvider,
      };

      await onSubmit(applicationData);
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrors({ submit: "Failed to submit application. Please try again." });
    }
  };

  const personalInfoSection = (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <TbUser className="w-5 h-5 mr-2" />
          Personal Information
        </h4>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Full Name:</span>
          <p className="font-medium text-gray-900">
            {[formData.firstName, formData.middleName, formData.lastName]
              .filter(Boolean)
              .join(" ")}
          </p>
        </div>
        <div>
          <span className="text-gray-600">Date of Birth:</span>
          <p className="font-medium text-gray-900">
            {formatDate(formData.dateOfBirth)}
          </p>
        </div>
        <div>
          <span className="text-gray-600">Gender:</span>
          <p className="font-medium text-gray-900 capitalize">
            {formData.gender}
          </p>
        </div>
        <div>
          <span className="text-gray-600">ID Number:</span>
          <p className="font-medium text-gray-900">{formData.idNumber}</p>
        </div>
        {formData.universityCollegeSchool && (
          <div className="md:col-span-2">
            <span className="text-gray-600">Institution:</span>
            <p className="font-medium text-gray-900">
              {formData.universityCollegeSchool}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const contactInfoSection = (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <TbMail className="w-5 h-5 mr-2" />
          Contact Information
        </h4>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Email:</span>
          <p className="font-medium text-gray-900">{formData.emailAddress}</p>
        </div>
        <div>
          <span className="text-gray-600">Mobile:</span>
          <p className="font-medium text-gray-900">{formData.mobileNumber}</p>
        </div>
        {formData.kraPin && (
          <div>
            <span className="text-gray-600">KRA PIN:</span>
            <p className="font-medium text-gray-900">{formData.kraPin}</p>
          </div>
        )}
        {formData.postalAddress && (
          <div>
            <span className="text-gray-600">Postal Address:</span>
            <p className="font-medium text-gray-900">
              {formData.postalAddress}
            </p>
          </div>
        )}
        {formData.town && (
          <div>
            <span className="text-gray-600">Town:</span>
            <p className="font-medium text-gray-900">{formData.town}</p>
          </div>
        )}
      </div>
    </div>
  );

  const emergencyContactsSection = (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <TbPhone className="w-5 h-5 mr-2" />
          Emergency Contacts
        </h4>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {formData.nextOfKinName && (
          <>
            <div>
              <span className="text-gray-600">Next of Kin:</span>
              <p className="font-medium text-gray-900">
                {formData.nextOfKinName}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Next of Kin Contact:</span>
              <p className="font-medium text-gray-900">
                {formData.nextOfKinContacts}
              </p>
            </div>
          </>
        )}
        {formData.beneficiaryName && (
          <>
            <div>
              <span className="text-gray-600">Beneficiary:</span>
              <p className="font-medium text-gray-900">
                {formData.beneficiaryName}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Beneficiary Contact:</span>
              <p className="font-medium text-gray-900">
                {formData.beneficiaryContacts}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const medicalHistorySection = (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <TbShield className="w-5 h-5 mr-2" />
          Medical History
        </h4>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Previous Accidents:</span>
          <span
            className={`font-medium ${
              formData.previousAccidents ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {formData.previousAccidents ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Physical Disability:</span>
          <span
            className={`font-medium ${
              formData.physicalDisability ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {formData.physicalDisability ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
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
            <p className="font-medium text-gray-900 mt-1">
              {formData.medicalHistoryDetails}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const planDetailsSection = (
    <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <TbShield className="w-5 h-5 mr-2" />
          Selected Plan
        </h4>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          <TbEdit className="w-4 h-4 inline mr-1" />
          Change
        </button>
      </div>

      {formData.selectedPlan && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={formData.selectedPlan.companyLogo}
              alt={formData.selectedPlan.companyName}
              className="w-12 h-12 object-contain rounded-lg bg-white p-2"
              onError={(e) => {
                e.target.src = "/placeholder-logo.png";
              }}
            />
            <div>
              <h5 className="font-semibold text-gray-900">
                {formData.selectedPlan.name}
              </h5>
              <p className="text-sm text-gray-600">
                {formData.selectedPlan.companyName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Coverage Amount:</span>
              <p className="font-semibold text-gray-900">
                {formatCurrency(formData.selectedPlan.coverageAmount)}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Annual Premium:</span>
              <p className="font-semibold text-primary-600">
                {formatCurrency(formData.premiumAmount)}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Coverage Type:</span>
              <p className="font-medium text-gray-900 capitalize">
                {formData.coverType}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Policy Start Date:</span>
              <p className="font-medium text-gray-900">
                {formatDate(formData.policyStartDate)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const documentsSection = (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <TbFile className="w-5 h-5 mr-2" />
          Uploaded Documents
        </h4>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          <TbEdit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>

      <div className="space-y-3">
        {Object.entries(formData.documents || {}).map(([type, file]) => (
          <div
            key={type}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <TbFile className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {type
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
              </div>
            </div>
            <TbCheck className="w-5 h-5 text-green-500" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Review & Submit Application
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review all the information below carefully before submitting
          your application.
        </p>
      </div>

      <div className="space-y-6">
        {personalInfoSection}
        {contactInfoSection}
        {emergencyContactsSection}
        {medicalHistorySection}
        {planDetailsSection}
        {documentsSection}
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreement"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="agreement" className="text-sm text-gray-700">
            <span className="font-medium">I confirm that:</span>
            <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
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

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <TbInfoCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">What happens next?</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>
                Your application will be reviewed by our underwriting team
              </li>
              <li>
                You will receive an email confirmation with your application
                number
              </li>
              <li>Processing typically takes 2-3 business days</li>
              <li>
                You will be contacted if additional information is required
              </li>
              <li>
                Once approved, your policy documents will be sent via email
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <TbAlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <p className="text-red-800 text-sm">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
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
          className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors ${
            agreed && !isSubmitting
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <TbLoader className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <TbCheck className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
