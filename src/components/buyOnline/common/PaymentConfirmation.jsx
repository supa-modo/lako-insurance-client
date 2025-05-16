import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbInfoCircle, TbCreditCard, TbCheck, TbCash, TbBrandMastercard, TbBrandVisa } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";

const PaymentConfirmation = ({ formData, updateFormData, prevStep, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <TbCreditCard className="h-6 w-6" />,
      description: "Pay securely with your credit or debit card",
      brands: [<TbBrandVisa key="visa" className="h-6 w-6" />, <TbBrandMastercard key="mastercard" className="h-6 w-6" />]
    },
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: <FaMobileAlt className="h-6 w-6" />,
      description: "Pay using M-Pesa mobile money service",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <TbCash className="h-6 w-6" />,
      description: "Pay via direct bank transfer",
    }
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setPaymentMethod(methodId);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  // Calculate premium based on selected plan
  const calculatePremium = () => {
    if (!formData.selectedPlan) return 0;
    return formData.selectedPlan.premium || 0;
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-4">Payment Confirmation</h2>
      
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Review your order details and select a payment method to complete your purchase.
      </p>

      {/* Order Summary */}
      <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-600">Insurance Type:</span>
            <span className="font-medium text-slate-800 capitalize">{formData.insuranceType.replace("-", " ")}</span>
          </div>
          
          {formData.coverType && (
            <div className="flex justify-between">
              <span className="text-slate-600">Cover Type:</span>
              <span className="font-medium text-slate-800 capitalize">{formData.coverType.replace("-", " ")}</span>
            </div>
          )}
          
          {formData.selectedPlan && (
            <div className="flex justify-between">
              <span className="text-slate-600">Selected Plan:</span>
              <span className="font-medium text-slate-800">{formData.selectedPlan.name}</span>
            </div>
          )}
          
          {formData.personalDetails && (
            <div className="flex justify-between">
              <span className="text-slate-600">Policyholder:</span>
              <span className="font-medium text-slate-800">
                {formData.personalDetails.firstName} {formData.personalDetails.lastName}
              </span>
            </div>
          )}
        </div>
        
        <div className="border-t border-slate-200 pt-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-medium">Total Premium:</span>
            <span className="text-xl font-bold text-primary-600">Ksh. {calculatePremium().toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Annual premium, inclusive of all taxes and fees</p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden border-2 ${
              method.id === paymentMethod
                ? "border-primary-500 bg-primary-50 shadow-md"
                : "border-slate-200 bg-white hover:border-primary-300 shadow-sm"
            } transition-all duration-300 cursor-pointer p-4`}
            onClick={() => handlePaymentMethodSelect(method.id)}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  method.id === paymentMethod
                    ? "bg-primary-100 text-primary-600"
                    : "bg-slate-100 text-slate-500"
                } mb-3`}
              >
                {method.icon}
              </div>
              
              <h4 className={`text-base font-bold ${
                method.id === paymentMethod ? "text-primary-700" : "text-slate-700"
              }`}>
                {method.name}
              </h4>
              
              <p className={`text-sm mt-1 ${
                method.id === paymentMethod ? "text-primary-600" : "text-slate-600"
              }`}>
                {method.description}
              </p>
              
              {method.brands && (
                <div className="flex items-center justify-center mt-3 space-x-2">
                  {method.brands.map((brand, index) => (
                    <span key={index} className="text-slate-500">{brand}</span>
                  ))}
                </div>
              )}
            </div>
            
            {method.id === paymentMethod && (
              <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-sm">
                <TbCheck className="h-4 w-4" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Your payment information is secure and encrypted. After payment is processed, you'll receive your policy documents via email.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
          disabled={isProcessing}
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={paymentMethod ? { scale: 1.03 } : {}}
          whileTap={paymentMethod ? { scale: 0.97 } : {}}
          onClick={handleSubmit}
          className={`px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-200 font-medium shadow-md ${
            paymentMethod
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!paymentMethod || isProcessing}
          style={{ minWidth: "180px" }}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Complete Purchase
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
