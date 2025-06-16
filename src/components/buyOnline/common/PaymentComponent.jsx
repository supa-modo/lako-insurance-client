import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbCreditCard,
  TbPhone,
  TbShield,
  TbCheck,
  TbX,
  TbLoader,
  TbAlertCircle,
  TbRefresh,
  TbArrowLeft,
  TbClock,
  TbDeviceMobile,
  TbReceipt,
  TbCheckupList,
} from "react-icons/tb";
import { formatCurrency } from "../../../utils/formatCurrency";
import { apiClient } from "../../../services/apiConfig";
import MpesaIcon from "../../common/MpesaIcon";

const PaymentComponent = ({ applicationData, onPaymentComplete, onCancel }) => {
  const [paymentStep, setPaymentStep] = useState("initiate"); // initiate, processing, success, failed
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Format as 0XXX XXX XXX (4-3-3 format for 10 digits)
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(
        7,
        10
      )}`;
    } else {
      // Limit to 10 digits maximum
      return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(
        7,
        10
      )}`;
    }
  };

  // Validate phone number
  const isValidPhoneNumber = (phone) => {
    const numbers = phone.replace(/\D/g, "");
    return (
      numbers.length === 10 &&
      (numbers.startsWith("07") || numbers.startsWith("01"))
    );
  };

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  // Initiate M-Pesa payment
  const initiatePayment = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      setError(
        "Please enter a valid Kenyan mobile number (07XX XXX XXX or 01XX XXX XXX)"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/payments/mpesa/initiate", {
        applicationId: applicationData.id,
        amount: applicationData.premiumAmount,
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        accountReference: applicationData.applicationNumber,
        transactionDescription: `Insurance premium for ${applicationData.firstName} ${applicationData.lastName}`,
      });
      //TODO: Uncomment this when the API is ready

      // const response = {
      //   data: {
      //     success: true,
      //     data: {
      //       paymentId: "1234567890",
      //       phoneNumber: "07XX XXX XXX",
      //       paymentReference: "1234567890",
      //       amount: applicationData.premiumAmount,
      //     },
      //   },
      // };

      //---------------------------------------
      if (response.data.success) {
        setPaymentData(response.data.data);
        setPaymentStep("processing");
        startStatusChecking(response.data.data.paymentId);
        startCountdown();
      } else {
        setError(response.data.message || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);

      // Extract specific error message from backend response
      let errorMessage = "Failed to initiate payment. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = `Failed to initiate payment. ${error.response.data.error}`;
      } else if (error.message) {
        errorMessage = `Failed to initiate payment. ${error.message}`;
      }

      // Make error messages more user-friendly
      if (
        errorMessage.toLowerCase().includes("invalid phonenumber") ||
        errorMessage.toLowerCase().includes("invalid phone number")
      ) {
        errorMessage =
          "Failed to initiate payment. Please check your phone number and try again.";
      } else if (errorMessage.toLowerCase().includes("invalid amount")) {
        errorMessage = "Failed to initiate payment. Invalid payment amount.";
      } else if (errorMessage.toLowerCase().includes("application not found")) {
        errorMessage = "Failed to initiate payment. Application not found.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Start checking payment status
  const startStatusChecking = (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const response = await apiClient.get(`/payments/${paymentId}/status`);

        //TODO: Uncomment this when the API is ready

        // const response = {
        //   data: {
        //     success: true,
        //     data: {
        //       status: "failed",
        //       mpesaReceiptNumber: "1234567890",
        //       mpesaTransactionDate: new Date().toISOString(),
        //       amount: applicationData.premiumAmount,
        //       phoneNumber: "07XX XXX XXX",
        //       paymentReference: "1234567890",
        //       resultDesc: "Payment failed",
        //       failureReason: "User cancelled payment",
        //     },
        //   },
        // };
        //---------------------------------------

        if (response.data.success) {
          const payment = response.data.data;

          if (payment.status === "completed") {
            setPaymentStep("success");
            setPaymentData(payment);
            clearInterval(interval);
            setStatusCheckInterval(null);

            // Notify parent component
            if (onPaymentComplete) {
              onPaymentComplete(payment);
            }
          } else if (
            ["failed", "cancelled", "expired"].includes(payment.status)
          ) {
            setPaymentStep("failed");
            setPaymentData(payment);
            setError(
              payment.resultDesc || payment.failureReason || "Payment failed"
            );
            clearInterval(interval);
            setStatusCheckInterval(null);
          }
        }
      } catch (error) {
        console.error("Status check error:", error);
      }
    }, 3000); // Check every 3 seconds

    setStatusCheckInterval(interval);
  };

  // Start countdown timer
  const startCountdown = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (paymentStep === "processing") {
            setPaymentStep("failed");
            setError("Payment session expired. Please try again.");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Format countdown time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Retry payment
  const retryPayment = () => {
    setPaymentStep("initiate");
    setError("");
    setPaymentData(null);
    setTimeLeft(300);
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  const renderInitiateStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto px-2 md:px-0"
    >
      {/* Payment Summary */}
      <div className="mb-4 lg:mb-6">
        <h3 className="font-semibold text-base lg:text-lg text-secondary-600 mb-2">
          Payment Summary
        </h3>
        <div className="space-y-3 text-sm lg:text-base">
          <div className="flex justify-between">
            <span className="text-gray-600">Application Number:</span>
            <span className="font-semibold text-gray-600">
              {applicationData.applicationNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Insurance Type:</span>
            <span className="font-semibold capitalize text-gray-600">
              {applicationData.insuranceType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Coverage:</span>
            <span className="font-semibold capitalize text-gray-600">
              {applicationData.coverType}
            </span>
          </div>
          {applicationData.selectedPlan?.premiumStructure === "age-based" &&
            applicationData.selectedAge && (
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Age:</span>
                <span className="font-semibold text-gray-600">
                  {applicationData.selectedAge} years
                </span>
              </div>
            )}
          <div className="border-t pt-3 flex justify-between text-base font-semibold">
            <span className="text-green-600">Amount to Pay:</span>
            <span className="text-green-600 text-lg font-bold font-lexend">
              {formatCurrency(applicationData.premiumAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          M-Pesa Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MpesaIcon width={60} height={20} className="text-gray-400" />
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="07XX XXX XXX or 01XX XXX XXX"
            className="block w-full bg-white shadow-sm font-lexend font-semibold placeholder:font-normal pl-[5.3rem] pr-3 py-2.5 border border-green-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 text-sm lg:text-base text-gray-600"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter your phone number registered with M-Pesa
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-2.5 md:p-3 mb-6"
        >
          <div className="flex items-center">
            <TbAlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-600 text-sm">{error} </p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex  flex-col-reverse md:flex-row gap-3">
        <button
          onClick={onCancel}
          className="w-full bg-gray-200 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <TbArrowLeft className="w-5 h-5 mr-2" />
          Back to Application
        </button>

        <button
          onClick={initiatePayment}
          disabled={!isValidPhoneNumber(phoneNumber) || isLoading}
          className="w-full bg-green-700 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <TbLoader className="w-5 h-5 mr-2 animate-spin" />
              Initiating Payment...
            </>
          ) : (
            <>
              <TbCreditCard className="w-5 h-5 mr-2" />
              Pay {formatCurrency(applicationData.premiumAmount)}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderProcessingStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-blue-50 rounded-xl p-5 md:p-6 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base lg:text-lg font-semibold text-blue-800 mb-4">
            Payment in Progress
          </h2>
          <div className="flex items-center justify-center mb-4">
            <TbClock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-lexend font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="space-y-2 md:space-y-3 text-sm text-blue-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span>Check your phone for the M-Pesa prompt</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span>Enter your M-Pesa PIN to complete payment</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span>Wait for confirmation message</span>
          </div>
        </div>
      </div>

      <div className="p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Amount:</span>
          <span className="font-semibold font-lexend text-gray-600">
            {formatCurrency(paymentData?.amount)}
          </span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Phone:</span>
          <span className="font-semibold font-lexend text-gray-600">
            {paymentData?.phoneNumber}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Reference:</span>
          <span className="font-semibold font-lexend text-gray-600">
            {paymentData?.paymentReference}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-[0.9rem] lg:text-base text-gray-500">
        <TbLoader className="w-5 h-5 animate-spin" />
        <span>Waiting for payment confirmation...</span>
      </div>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <TbCheck className="w-8 h-8 text-green-600" />
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
        Payment Successful!
      </h2>

      <div className="bg-green-50 rounded-xl p-6 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-green-700">M-Pesa Receipt:</span>
            <span className="font-medium text-green-800">
              {paymentData?.mpesaReceiptNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Amount Paid:</span>
            <span className="font-medium text-green-800">
              {formatCurrency(paymentData?.amount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Transaction Date:</span>
            <span className="font-medium text-green-800">
              {paymentData?.mpesaTransactionDate
                ? new Date(paymentData.mpesaTransactionDate).toLocaleString()
                : new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <TbShield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-left">
            <p className="text-blue-800 font-medium mb-1">
              Your Policy is Active
            </p>
            <p className="text-blue-700 text-sm">
              Your insurance policy is now active. You will receive your policy
              documents via email as soon .
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
      >
        <TbCheckupList className="w-5 h-5 mr-2" />
        View My Policies
      </button>
    </motion.div>
  );

  const renderFailedStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-red-100 rounded-[0.8rem] p-5 lg:p-6 mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-red-200 rounded-full flex items-center justify-center">
            <TbX className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
          </div>
          <h2 className="text-lg lg:text-xl font-semibold text-red-600">
            Payment Failed !
          </h2>
        </div>

        <div className="flex flex-col items-center pt-2 justify-center mx-auto">
          <p className="text-red-800 font-medium mb-1">
            Payment could not be completed
          </p>
          <p className="text-red-700 text-sm">
            {error} Request cancelled by user
          </p>
        </div>
      </div>

      <div className="flex  flex-col-reverse md:flex-row gap-3">
        <button
          onClick={onCancel}
          className="w-full bg-gray-200 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <TbArrowLeft className="w-5 h-5 mr-2" />
          Back to Application
        </button>

        <button
          onClick={retryPayment}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <TbRefresh className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="">
      {/* Header */}

      <div className="text-center mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">6.</span>{" "}
          <span className="">Complete Your Payment</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Secure payment powered by Safaricom's M-Pesa
        </p>
      </div>

      {/* Payment Steps */}
      <AnimatePresence mode="wait">
        {paymentStep === "initiate" && renderInitiateStep()}
        {paymentStep === "processing" && renderProcessingStep()}
        {/* {paymentStep === "success" && renderSuccessStep()} */}
        {paymentStep === "failed" && renderFailedStep()}
      </AnimatePresence>
    </div>
  );
};

export default PaymentComponent;
