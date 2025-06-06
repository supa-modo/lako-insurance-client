import React from "react";
import { motion } from "framer-motion";
import {
  TbCheck,
  TbMail,
  TbPhone,
  TbDownload,
  TbHome,
  TbClipboardCheck,
  TbClock,
  TbShield,
} from "react-icons/tb";
import { Link } from "react-router-dom";

const ApplicationSuccess = ({ applicationData, onStartNew }) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <TbCheck className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Submitted Successfully!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thank you for choosing our insurance services. Your personal accident
          insurance application has been received and is being processed.
        </p>
      </motion.div>

      {/* Application Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Application Summary
          </h2>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            Submitted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Application Number
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {applicationData?.applicationNumber || "PA202412010001"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Applicant Name
              </label>
              <p className="text-gray-900">
                {[
                  applicationData?.firstName,
                  applicationData?.middleName,
                  applicationData?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Email Address
              </label>
              <p className="text-gray-900">{applicationData?.emailAddress}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Mobile Number
              </label>
              <p className="text-gray-900">{applicationData?.mobileNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Insurance Type
              </label>
              <p className="text-gray-900 capitalize">
                Personal Accident - {applicationData?.coverType}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Insurance Provider
              </label>
              <p className="text-gray-900">
                {applicationData?.insuranceProvider}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Annual Premium
              </label>
              <p className="text-lg font-semibold text-primary-600">
                {formatCurrency(applicationData?.premiumAmount || 0)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Policy Start Date
              </label>
              <p className="text-gray-900">
                {formatDate(applicationData?.policyStartDate)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-blue-50 rounded-xl border border-blue-200 p-8 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TbClipboardCheck className="w-5 h-5 mr-2 text-blue-600" />
          What Happens Next?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TbMail className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">
              Email Confirmation
            </h4>
            <p className="text-sm text-gray-600">
              You'll receive an email confirmation with your application details
              within 5 minutes.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TbClock className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Review Process</h4>
            <p className="text-sm text-gray-600">
              Our underwriting team will review your application within 2-3
              business days.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TbShield className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Policy Issuance</h4>
            <p className="text-sm text-gray-600">
              Once approved, your policy documents will be sent via email and
              SMS.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Important Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Important Information
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Payment:</strong> You will receive payment instructions
              once your application is approved. Your policy will commence on
              the payment date if paid after the selected start date.
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Additional Information:</strong> If we need any additional
              documents or information, we'll contact you via email or phone.
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Questions:</strong> If you have any questions about your
              application, please contact us using the information below.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <TbPhone className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Call Us</p>
              <p className="text-sm text-gray-600">+254 700 123 456</p>
              <p className="text-xs text-gray-500">Mon-Fri, 8AM-6PM</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <TbMail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email Us</p>
              <p className="text-sm text-gray-600">support@kolainsurance.com</p>
              <p className="text-xs text-gray-500">
                We'll respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={onStartNew}
          className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <TbShield className="w-5 h-5 mr-2" />
          Apply for Another Policy
        </button>

        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          <TbHome className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <button
          onClick={() => window.print()}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <TbDownload className="w-5 h-5 mr-2" />
          Print Summary
        </button>
      </motion.div>

      {/* Reference Number for Easy Access */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="text-center mt-8 p-4 bg-gray-50 rounded-lg"
      >
        <p className="text-sm text-gray-600">
          Please save your application number:
          <span className="font-mono font-semibold text-gray-900 ml-2">
            {applicationData?.applicationNumber || "PA202412010001"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default ApplicationSuccess;
