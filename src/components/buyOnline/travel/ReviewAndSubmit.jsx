import React from "react";
import { motion } from "framer-motion";
import {
  TbCheck,
  TbEdit,
  TbUser,
  TbMapPin,
  TbCalendar,
  TbShield,
  TbFileText,
  TbArrowLeft,
  TbArrowRight,
  TbAlertCircle,
  TbPhone,
  TbMail,
  TbUsers,
  TbPlane,
  TbClock,
} from "react-icons/tb";
import { formatCurrency } from "../../../utils/formatCurrency";

const ReviewAndSubmit = ({
  formData,
  nextStep,
  prevStep,
  isSubmitting,
  validationErrors,
}) => {
  const getTripDuration = () => {
    if (formData.departureDate && formData.returnDate) {
      const departureDate = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = Math.abs(returnDate - departureDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const reviewSections = [
    {
      title: "Trip Information",
      icon: <TbMapPin className="w-5 h-5" />,
      content: [
        {
          label: "Trip Type",
          value: formData.tripType?.replace("-", " ") || "Not specified",
        },
        {
          label: "Destination",
          value:
            formData.destination === "Other"
              ? formData.customDestination
              : formData.destination || "Not specified",
        },
        { label: "Departure Date", value: formatDate(formData.departureDate) },
        { label: "Return Date", value: formatDate(formData.returnDate) },
        { label: "Trip Duration", value: `${getTripDuration()} days` },
        {
          label: "Purpose",
          value: formData.travelPurpose?.replace("-", " ") || "Not specified",
        },
        {
          label: "Number of Travelers",
          value: formData.numberOfTravelers || 1,
        },
      ],
    },
    {
      title: "Personal Information",
      icon: <TbUser className="w-5 h-5" />,
      content: [
        {
          label: "Full Name",
          value:
            `${formData.firstName || ""} ${formData.middleName || ""} ${
              formData.lastName || ""
            }`.trim() || "Not specified",
        },
        { label: "Date of Birth", value: formatDate(formData.dateOfBirth) },
        { label: "Gender", value: formData.gender || "Not specified" },
        { label: "ID Number", value: formData.idNumber || "Not specified" },
        {
          label: "Mobile Number",
          value: formData.mobileNumber || "Not specified",
        },
        {
          label: "Email Address",
          value: formData.emailAddress || "Not specified",
        },
        {
          label: "Address",
          value:
            formData.postalAddress && formData.town
              ? `${formData.postalAddress}, ${formData.town}`
              : "Not specified",
        },
      ],
    },
    {
      title: "Emergency Contacts",
      icon: <TbUsers className="w-5 h-5" />,
      content: [
        {
          label: "Next of Kin",
          value: formData.nextOfKinName || "Not specified",
        },
        {
          label: "Next of Kin Phone",
          value: formData.nextOfKinContacts || "Not specified",
        },
        {
          label: "Beneficiary",
          value: formData.beneficiaryName || "Not specified",
        },
        {
          label: "Beneficiary Phone",
          value: formData.beneficiaryContacts || "Not specified",
        },
      ],
    },
    {
      title: "Selected Plan",
      icon: <TbShield className="w-5 h-5" />,
      content: formData.selectedPlan
        ? [
            { label: "Plan Name", value: formData.selectedPlan.name },
            {
              label: "Premium Amount",
              value: formatCurrency(formData.premiumAmount),
            },
            {
              label: "Medical Coverage",
              value: `$${formData.selectedPlan.features?.medical || "N/A"}`,
            },
            {
              label: "Luggage Protection",
              value: `$${formData.selectedPlan.features?.luggage || "N/A"}`,
            },
            {
              label: "Trip Cancellation",
              value: `$${
                formData.selectedPlan.features?.cancellation || "N/A"
              }`,
            },
            {
              label: "Insurance Provider",
              value: formData.insuranceProvider || "AAR Insurance",
            },
          ]
        : [{ label: "Selected Plan", value: "No plan selected" }],
    },
    {
      title: "Uploaded Documents",
      icon: <TbFileText className="w-5 h-5" />,
      content:
        formData.documents && Object.keys(formData.documents).length > 0
          ? Object.entries(formData.documents).map(([docType, docData]) => ({
              label: docType
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
              value: docData.name || "Document uploaded",
            }))
          : [{ label: "Documents", value: "No documents uploaded" }],
    },
  ];

  const hasValidationErrors =
    validationErrors && Object.keys(validationErrors).length > 0;

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-3">
            <span className="block lg:hidden mr-1">6.</span>
            <TbCheck className="w-6 h-6 md:w-7 md:h-7 mr-2" />
            Review & Submit Application
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Please review all information carefully before submitting your
            travel insurance application
          </p>
        </div>

        {/* Validation Errors */}
        {hasValidationErrors && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-start">
              <TbAlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">
                  Please correct the following errors:
                </h4>
                <ul className="text-red-700 text-sm space-y-1">
                  {Object.entries(validationErrors).map(([field, error]) => (
                    <li key={field}>
                      •{" "}
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      : {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Review Sections */}
        <div className="space-y-6">
          {reviewSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h4 className="flex items-center text-lg font-semibold text-gray-800">
                  <span className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    {section.icon}
                  </span>
                  {section.title}
                </h4>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.content.map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <span className="text-gray-600 font-medium">
                        {item.label}:
                      </span>
                      <span className="text-gray-800 text-right max-w-xs">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-primary-50 border border-primary-200 rounded-lg p-6 mt-8"
        >
          <h4 className="text-lg font-semibold text-primary-800 mb-4">
            Application Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {formatCurrency(formData.premiumAmount || 0)}
              </div>
              <div className="text-sm text-primary-700">Total Premium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {getTripDuration()}
              </div>
              <div className="text-sm text-primary-700">Days Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {formData.numberOfTravelers || 1}
              </div>
              <div className="text-sm text-primary-700">
                {formData.numberOfTravelers === 1 ? "Traveler" : "Travelers"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms and Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8"
        >
          <h4 className="font-semibold text-gray-800 mb-4">
            Terms and Conditions
          </h4>
          <div className="space-y-3 text-sm text-gray-700">
            <label className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" required />
              <span>
                I declare that all information provided is true and accurate to
                the best of my knowledge. I understand that any false
                information may void my policy.
              </span>
            </label>
            <label className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" required />
              <span>
                I have read and agree to the{" "}
                <a href="#" className="text-primary-600 hover:underline">
                  terms and conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary-600 hover:underline">
                  privacy policy
                </a>
                .
              </span>
            </label>
            <label className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" required />
              <span>
                I understand that this policy does not cover pre-existing
                medical conditions unless specifically declared and accepted.
              </span>
            </label>
            <label className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" required />
              <span>
                I consent to the processing of my personal data for the purpose
                of providing insurance coverage and related services.
              </span>
            </label>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6"
        >
          <div className="flex items-start">
            <TbAlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Important Notice
              </h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>
                  • Your policy will be active immediately upon successful
                  payment verification
                </li>
                <li>
                  • Policy documents will be sent to your email address within
                  24 hours
                </li>
                <li>
                  • Coverage begins 24 hours before departure or immediately if
                  purchased within 24 hours of departure
                </li>
                <li>
                  • Keep your policy documents and emergency contact numbers
                  accessible during travel
                </li>
                <li>
                  • For emergencies, contact our 24/7 assistance hotline: +254
                  703 063 000
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            disabled={isSubmitting}
          >
            <TbArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={nextStep}
            disabled={isSubmitting || hasValidationErrors}
            className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
              isSubmitting || hasValidationErrors
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment
                <TbArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewAndSubmit;
