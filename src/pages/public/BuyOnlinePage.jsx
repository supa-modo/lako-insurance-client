import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import InsuranceTypeSelection from "../../components/buyOnline/InsuranceTypeSelection";
import HealthInsuranceFlow from "../../components/buyOnline/health/HealthInsuranceFlow";
import PersonalAccidentFlow from "../../components/buyOnline/accident/PersonalAccidentFlow";
import { TbArrowLeft } from "react-icons/tb";
import { Link } from "react-router-dom";

const BuyOnlinePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // const [formData, setFormData] = useState({
  //   insuranceType: "",
  //   coverType: "",
  //   selectedPlan: null,

  //   // Personal Details
  //   firstName: "",
  //   middleName: "",
  //   lastName: "",
  //   dateOfBirth: "",
  //   gender: "",
  //   universityCollegeSchool: "",

  //   // Proposer Details
  //   kraPin: "",
  //   idNumber: "",
  //   mobileNumber: "",
  //   emailAddress: "",
  //   postalAddress: "",
  //   town: "",

  //   // Next of Kin & Beneficiary
  //   nextOfKinName: "",
  //   nextOfKinContacts: "",
  //   beneficiaryName: "",
  //   beneficiaryContacts: "",

  //   // Medical History (for accident insurance)
  //   previousAccidents: false,
  //   physicalDisability: false,
  //   chronicIllness: false,
  //   medicalHistoryDetails: "",

  //   // Policy Details
  //   policyStartDate: "",

  //   // Agent Information
  //   isAgentPurchase: true,
  //   agentName: "Yvonne Kola",
  //   agentEmail: "ykola@lako.co.ke",
  //   agentPhone: "0722345678",

  //   // Documents
  //   documents: {},
  // });
  const [formData, setFormData] = useState({
    insuranceType: "",
    coverType: "",
    selectedPlan: null,

    // Personal Details
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    universityCollegeSchool: "University of Nairobi",

    // Proposer Details
    kraPin: "A014672443sS",
    idNumber: "38353499",
    mobileNumber: "+254722345678",
    emailAddress: "john.doe@example.com",
    postalAddress: "1234567890",
    town: "Nairobi",

    // Next of Kin & Beneficiary
    nextOfKinName: "Jane Doe",
    nextOfKinContacts: "1234567890",
    beneficiaryName: "John Doe",
    beneficiaryContacts: "1234567890",

    // Medical History (for accident insurance)
    previousAccidents: false,
    physicalDisability: false,
    chronicIllness: true,
    medicalHistoryDetails: "I have a history of heart disease",

    // Policy Details
    policyStartDate: "2025-01-01",

    // Agent Information
    isAgentPurchase: true,
    agentName: "Yvonne Kola",
    agentEmail: "ykola@lako.co.ke",
    agentPhone: "0722345678",

    // Documents
    documents: {},
  });

  // Update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle insurance type selection
  const handleInsuranceTypeSelect = (type) => {
    updateFormData("insuranceType", type);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  // Navigation functions
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // Reset to insurance type selection
  const resetFlow = () => {
    setCurrentStep(1);
    updateFormData("insuranceType", "");
    window.scrollTo(0, 0);
  };

  // Get max steps for current insurance type
  const getMaxSteps = () => {
    if (formData.insuranceType === "personal-accident") return 7; // 6 steps + success
    if (formData.insuranceType === "health") return 6; // 5 steps + success
    return 1;
  };

  // Determine which flow to show based on selected insurance type and current step
  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <InsuranceTypeSelection
          onSelect={handleInsuranceTypeSelect}
          formData={formData}
        />
      );
    }

    if (formData.insuranceType === "health") {
      return (
        <HealthInsuranceFlow
          currentStep={currentStep - 1}
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          resetFlow={resetFlow}
        />
      );
    }

    if (formData.insuranceType === "personal-accident") {
      return (
        <PersonalAccidentFlow
          currentStep={currentStep - 1}
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          resetFlow={resetFlow}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 from-neutral-50 to-neutral-100 font-outfit">
      <Header />

      <main className="pt-24 md:pt-28 pb-20 relative z-10">
        <div className="container mx-auto max-w-screen-2xl">
          {/* Page Header */}
          <div className="text-center px-2.5 mb-6 md:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 mb-3 tracking-tight"
            >
              Buy <span className="text-secondary-600">Insurance</span> Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Purchase premium insurance plans tailored to your specific needs
              with just a few clicks.
            </motion.p>
          </div>

          {/* Back button if not on first step and not on success page */}
          {currentStep > 1 && currentStep < getMaxSteps() && (
            <div className="px-2.5 mb-3 md:mb-4 lg:mb-6 max-w-[85rem] mx-auto">
              <button
                onClick={resetFlow}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <TbArrowLeft className="mr-2" />
                Back to Insurance Selection
              </button>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white max-w-[85rem] mx-auto rounded-t-2xl lg:rounded-[1.2rem] md:shadow-sm border-t md:border border-slate-200 px-2.5 py-5 md:p-5 lg:p-8">
            {renderContent()}
          </div>

          {/* Additional Content Sections */}
          {currentStep === 1 && (
            <div className="max-w-[85rem] mx-auto mt-16 space-y-16">
              {/* Why Choose Online Insurance */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="px-4 py-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary-700 mb-4">
                    Why Buy Insurance Online?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Experience the convenience and benefits of purchasing
                    insurance digitally
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                      <TbArrowLeft className="w-8 h-8 text-primary-600 transform rotate-90" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Fast & Easy
                    </h3>
                    <p className="text-gray-600">
                      Complete your application in minutes with our streamlined
                      process. No paperwork, no waiting in lines.
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-200 transition-colors duration-300">
                      <motion.svg
                        className="w-8 h-8 text-secondary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </motion.svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      100% Secure
                    </h3>
                    <p className="text-gray-600">
                      Your personal and financial information is protected with
                      bank-level security encryption.
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                      <motion.svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </motion.svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Best Prices
                    </h3>
                    <p className="text-gray-600">
                      Access competitive rates and exclusive online discounts
                      not available through traditional channels.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Coverage Types */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="px-4"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Comprehensive Coverage Options
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Choose from our wide range of insurance products designed to
                    protect what matters most
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Personal Accident",
                      description: "24/7 protection against accidents",
                      icon: "🛡️",
                      color: "from-blue-500 to-blue-600",
                      features: [
                        "Disability coverage",
                        "Medical expenses",
                        "Death benefits",
                      ],
                    },
                    {
                      title: "Health Insurance",
                      description: "Comprehensive medical coverage",
                      icon: "🏥",
                      color: "from-green-500 to-green-600",
                      features: [
                        "Hospitalization",
                        "Outpatient care",
                        "Emergency services",
                      ],
                    },
                    {
                      title: "Motor Insurance",
                      description: "Complete vehicle protection",
                      icon: "🚗",
                      color: "from-purple-500 to-purple-600",
                      features: [
                        "Third party liability",
                        "Comprehensive coverage",
                        "Roadside assistance",
                      ],
                    },
                    {
                      title: "Life Insurance",
                      description: "Financial security for loved ones",
                      icon: "❤️",
                      color: "from-red-500 to-red-600",
                      features: ["Term life", "Whole life", "Investment plans"],
                    },
                  ].map((product, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className={`h-2 bg-gradient-to-r ${product.color}`}
                      ></div>
                      <div className="p-6">
                        <div className="text-3xl mb-4">{product.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {product.description}
                        </p>
                        <ul className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Simple Process */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="px-4 py-16 bg-gray-50 rounded-2xl"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Simple 4-Step Process
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Get insured in just a few minutes with our hassle-free
                    process
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Choose Plan",
                      description:
                        "Select the insurance type and coverage that suits your needs",
                    },
                    {
                      step: "2",
                      title: "Fill Details",
                      description:
                        "Provide your personal information and documents securely",
                    },
                    {
                      step: "3",
                      title: "Make Payment",
                      description:
                        "Pay securely using M-Pesa or other payment methods",
                    },
                    {
                      step: "4",
                      title: "Get Covered",
                      description:
                        "Receive your policy documents instantly via email",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {index < 3 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-x-2"></div>
                      )}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold shadow-lg">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Trust Indicators */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="px-4 py-12 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      10,000+
                    </div>
                    <div className="text-gray-600">Policies Sold</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary-600 mb-2">
                      98%
                    </div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      24/7
                    </div>
                    <div className="text-gray-600">Customer Support</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      5 Min
                    </div>
                    <div className="text-gray-600">Average Processing</div>
                  </div>
                </div>
              </motion.section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyOnlinePage;
