import React from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbInfoCircle } from "react-icons/tb";

const PersonalDetailsForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(`personalDetails.${name}`, value);
  };

  const isFormValid = () => {
    const { firstName, lastName, email, phone, idNumber, dateOfBirth, address } = formData.personalDetails;
    return firstName && lastName && email && phone && idNumber && dateOfBirth && address;
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-4">Personal Details</h2>
      
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Please provide your personal information to proceed with the insurance purchase.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
        <div className="form-group">
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.personalDetails.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.personalDetails.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.personalDetails.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.personalDetails.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="idNumber" className="block text-sm font-medium text-slate-700 mb-1">
            ID Number *
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.personalDetails.idNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter your ID number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.personalDetails.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            required
          />
        </div>

        <div className="form-group md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.personalDetails.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter your address"
            required
          ></textarea>
        </div>
      </div>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Your personal information is secure and will only be used for processing your insurance application. We adhere to strict privacy policies to protect your data.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={isFormValid() ? { scale: 1.03 } : {}}
          whileTap={isFormValid() ? { scale: 0.97 } : {}}
          onClick={nextStep}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            isFormValid()
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
