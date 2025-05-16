import React from "react";
import { motion } from "framer-motion";
import { TbCheck, TbDownload, TbHome } from "react-icons/tb";
import { Link } from "react-router-dom";

const PurchaseSuccess = ({ formData }) => {
  // Generate a random policy number for demo purposes
  const policyNumber = `KL-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;
  
  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
      >
        <TbCheck className="h-10 w-10 text-green-600" />
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-primary-600 mb-3"
      >
        Purchase Successful!
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-slate-600 mb-8 max-w-xl mx-auto"
      >
        Thank you for purchasing insurance with us. Your policy has been successfully created and your policy documents have been sent to your email.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200 max-w-xl mx-auto text-left"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Policy Details</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Policy Number:</span>
            <span className="font-medium text-slate-800">{policyNumber}</span>
          </div>
          
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
          
          <div className="flex justify-between">
            <span className="text-slate-600">Policyholder:</span>
            <span className="font-medium text-slate-800">
              {formData.personalDetails.firstName} {formData.personalDetails.lastName}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-slate-600">Start Date:</span>
            <span className="font-medium text-slate-800">{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-slate-600">End Date:</span>
            <span className="font-medium text-slate-800">
              {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <button
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 font-medium shadow-md w-full md:w-auto"
        >
          <TbDownload className="mr-2" />
          Download Policy Document
        </button>
        
        <Link
          to="/"
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 font-medium w-full md:w-auto"
        >
          <TbHome className="mr-2" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccess;
