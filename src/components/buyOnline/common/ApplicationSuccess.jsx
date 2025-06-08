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
  TbPhoneCall,
  TbMailFilled,
  TbArrowRampLeft,
  TbArrowRampRight,
  TbArrowRight,
  TbHomeDot,
  TbCreditCard,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { formatCurrency } from "../../../utils/formatCurrency";

const ApplicationSuccess = ({
  applicationData,
  onStartNew,
  paymentCompleted = false,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-4 mb-8"
      >
        {/* Success Icon */}
        <FiCheckCircle className="w-11 md:w-12 h-11 md:h-12 text-green-700 flex items-center justify-center mx-auto mb-4" />

        <h1 className="text-[1.2rem] md:text-xl lg:text-2xl font-bold text-green-700 mb-2">
          Application Completed Successfully!
        </h1>
        <p className="text-[0.95rem] md:text-base lg:text-lg  text-gray-700 max-w-3xl mx-auto">
          Thank you for choosing our insurance services. Your personal accident
          insurance application has been received and is being processed.
        </p>
      </motion.div>

      {/* Application Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 lg:p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[1.05rem] md:text-lg lg:text-xl font-semibold text-neutral-700">
            Application Summary
          </h2>
          <span className="bg-green-100 border border-green-300 text-green-800 text-[0.8rem] md:text-sm font-medium px-3 py-0.5 md:py-1 rounded-full">
            Completed
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Application Number
            </label>
            <p className="text-[0.9rem] md:text-base lg:text-[1.05rem] font-semibold font-lexend text-primary-700">
              {applicationData?.applicationNumber || "PA202412010001"}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Applicant Name
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
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
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Email Address
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {applicationData?.emailAddress}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Mobile Number
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {applicationData?.mobileNumber}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Insurance Type
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700 capitalize">
              Personal Accident - {applicationData?.coverType}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Insurance Provider
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {applicationData?.insuranceProvider}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Annual Premium
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {formatCurrency(applicationData?.premiumAmount || 0)}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Policy Start Date
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {formatDate(applicationData?.policyStartDate)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Important Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 md:p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-secondary-700 mb-4">
          Important Information
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Application:</strong> An email with confirmation of your
              application will be sent to you within 2 minutes as our
              underwriting team reviews your application & documents. Once
              approved, your policy documents will be sent via email.
            </p>
          </div>

          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Payment:</strong>{" "}
              {paymentCompleted
                ? "Your payment has been processed successfully and your policy is now active. You will receive your policy documents via email within 24 hours."
                : "Payment for this policy has been completed as part of the application process."}
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
        className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-8"
      >
        <h3 className="text-base lg:text-lg font-semibold text-primary-700 mb-4">
          Need Help?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-[0.9rem] lg:text-base">
          <div className="flex items-center space-x-3 ">
            <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
              <TbPhoneCall size={28} className=" text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Call Us</p>
              <p className="text-sm font-lexend text-gray-600">
                +254 726 581487 or +254 720 636363
              </p>
              <p className="text-xs text-gray-500">Mon-Fri, 8AM-6PM</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
              <TbMailFilled size={28} className=" text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email Us</p>
              <p className="text-sm text-gray-600">support@lako.co.ke</p>
              <p className="text-xs text-gray-500">
                We'll respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Status - Only show if payment was completed */}
      {paymentCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-6"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TbCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Payment Successful!
            </h3>
            <p className="text-green-700 mb-2 text-sm">
              Your premium payment of{" "}
              <span className="font-bold">
                {formatCurrency(applicationData?.premiumAmount || 0)}
              </span>{" "}
              has been successfully processed via M-Pesa.
            </p>
            <p className="text-green-600 text-xs">
              Your insurance policy is now active and in effect.
            </p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="flex flex-col md:flex-row gap-2.5 md:gap-4 justify-center"
      >
        <button
          onClick={onStartNew}
          className="flex items-center justify-center px-6 py-2.5 bg-primary-600 text-sm lg:text-base text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Apply for Another Policy
          <TbArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
        </button>

        <Link
          to="/"
          className="flex items-center justify-center px-6 py-2.5 bg-gray-200 text-sm lg:text-base text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          <TbHomeDot className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <button
          onClick={() => window.print()}
          className="flex items-center justify-center px-6 py-2.5 border border-gray-300 text-sm lg:text-base text-secondary-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
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
        <p className="text-[0.83rem] md:text-sm text-gray-600">
          Please save your application number:
          <span className="font-mono text-[0.9rem] font-bold text-primary-700 ml-2">
            {applicationData?.applicationNumber || "PA202412010001"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default ApplicationSuccess;
