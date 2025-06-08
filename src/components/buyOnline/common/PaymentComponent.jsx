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

    // Format as 0XXX XXX XXX
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(
        6
      )}`;
    } else {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(
        6,
        9
      )}`;
    }
  };

  // Validate phone number
  const isValidPhoneNumber = (phone) => {
    const numbers = phone.replace(/\D/g, "");
    return (
      numbers.length === 9 &&
      (numbers.startsWith("7") || numbers.startsWith("1"))
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
        phoneNumber: `0${phoneNumber.replace(/\D/g, "")}`,
        accountReference: applicationData.applicationNumber,
        transactionDescription: `Insurance premium for ${applicationData.firstName} ${applicationData.lastName}`,
      });

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
      setError(
        error.response?.data?.message ||
          "Failed to initiate payment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Start checking payment status
  const startStatusChecking = (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const response = await apiClient.get(`/payments/${paymentId}/status`);

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
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TbCreditCard className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Complete Your Payment
        </h2>
        <p className="text-gray-600">
          Pay your insurance premium securely using M-Pesa
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Application Number:</span>
            <span className="font-medium">
              {applicationData.applicationNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Insurance Type:</span>
            <span className="font-medium">Personal Accident</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Coverage:</span>
            <span className="font-medium capitalize">
              {applicationData.coverType}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-green-600">
              {formatCurrency(applicationData.premiumAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          M-Pesa Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <TbPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="07XX XXX XXX"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
            maxLength={11}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter the phone number registered with M-Pesa
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center">
            <TbAlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={initiatePayment}
          disabled={!isValidPhoneNumber(phoneNumber) || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
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

        <button
          onClick={onCancel}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <TbArrowLeft className="w-5 h-5 mr-2" />
          Back to Application
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
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <TbDeviceMobile className="w-8 h-8 text-blue-600 animate-pulse" />
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Payment in Progress
      </h2>

      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <TbClock className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-medium">
            Time remaining: {formatTime(timeLeft)}
          </span>
        </div>

        <div className="space-y-3 text-sm text-blue-800">
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

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">
            {formatCurrency(paymentData?.amount)}
          </span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Phone:</span>
          <span className="font-medium">{paymentData?.phoneNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Reference:</span>
          <span className="font-medium">{paymentData?.paymentReference}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-gray-500">
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
              documents via email within 24 hours.
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
      <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <TbX className="w-8 h-8 text-red-600" />
      </div>

      <h2 className="text-lg md:text-xl font-bold text-red-800 mb-4">
        Payment Failed
      </h2>

      <div className="bg-red-50 rounded-xl p-6 mb-6">
        <div className="flex items-start">
          <TbAlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-left">
            <p className="text-red-800 font-medium mb-1">
              Payment could not be completed
            </p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={retryPayment}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <TbRefresh className="w-5 h-5 mr-2" />
          Try Again
        </button>

        <button
          onClick={onCancel}
          className="w-full bg-gray-200 border border-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <TbArrowLeft className="w-5 h-5 mr-2" />
          Back to Application
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
          Secure payment powered by M-Pesa
        </p>
      </div>

      {/* Payment Steps */}
      <AnimatePresence mode="wait">
        {paymentStep === "initiate" && renderInitiateStep()}
        {paymentStep === "processing" && renderProcessingStep()}
        {paymentStep === "success" && renderSuccessStep()}
        {paymentStep === "failed" && renderFailedStep()}
      </AnimatePresence>
    </div>
  );
};

export default PaymentComponent;
