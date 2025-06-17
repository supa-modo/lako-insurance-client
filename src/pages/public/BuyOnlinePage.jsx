import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import InsuranceTypeSelection from "../../components/buyOnline/InsuranceTypeSelection";
import HealthInsuranceFlow from "../../components/buyOnline/health/HealthInsuranceFlow";
import PersonalAccidentFlow from "../../components/buyOnline/accident/PersonalAccidentFlow";
import TravelInsuranceFlow from "../../components/buyOnline/travel/TravelInsuranceFlow";
import {
  TbArrowLeft,
  TbClipboardText,
  TbCoins,
  TbLock,
  TbMoneybag,
  TbShieldHalf,
  TbShieldHalfFilled,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import MpesaIcon from "../../components/common/MpesaIcon";
import { FiCheckCircle } from "react-icons/fi";

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
    if (formData.insuranceType === "travel") return 7; // 6 steps + success
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

    if (formData.insuranceType === "travel") {
      return (
        <TravelInsuranceFlow
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

          {/* Layout with sidebar for step 1 */}
          {currentStep === 1 ? (
            <div className="flex flex-col lg:flex-row gap-8 max-w-[95rem] mx-auto">
              {/* Main Content */}
              <div className="lg:w-3/4 order-2 lg:order-1">
                <div className="bg-white rounded-t-2xl lg:rounded-[1.2rem] md:shadow-sm border-t md:border border-slate-200 px-2.5 py-5 md:p-5 lg:p-8">
                  {renderContent()}
                </div>
              </div>

              {/* Right Sidebar - Why Choose Online Insurance */}
              <div className="hidden lg:block lg:w-1/4 order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-xl shadow-md border border-slate-200 py-6 px-4 sticky top-24"
                >
                  <h3 className="text-lg font-bold text-secondary-600 mb-4">
                    Why Buy Insurance Online?
                  </h3>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Fast & Easy",
                        description:
                          "Complete your application in minutes with our streamlined process. No paperwork, no waiting in lines.",
                        icon: (
                          <TbArrowLeft className="w-5 h-5 text-primary-600 transform rotate-90" />
                        ),
                      },
                      {
                        title: "100% Secure",
                        description:
                          "Your personal and financial information is protected with bank-level security encryption.",
                        icon: <TbLock size={18} className="text-primary-600" />,
                      },
                      {
                        title: "Best Prices",
                        description:
                          "Access competitive rates and exclusive online discounts not available through traditional channels.",
                        icon: (
                          <TbCoins size={18} className="text-primary-600" />
                        ),
                      },
                    ].map((benefit, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                            {benefit.icon}
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-md font-semibold text-slate-700 mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-center text-sm text-slate-600">
                      <motion.svg
                        className="w-5 h-5 mr-2 text-primary-500"
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </motion.svg>
                      <span>Trusted by thousands</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            /* Regular layout for other steps */
            <div className="bg-white max-w-[85rem] mx-auto rounded-t-2xl lg:rounded-[1.2rem] md:shadow-sm border-t md:border border-slate-200 px-2.5 py-5 md:p-5 lg:p-8">
              {renderContent()}
            </div>
          )}

          {/* Additional Content Sections - Only show on step 1 */}
          {currentStep === 1 && (
            <div className="">
              {/* Simple 4-Step Process */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-[100rem] mx-auto mt-6 md:mt-10 lg:mt-16"
              >
                <div className="text-center mb-8 lg:mb-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-secondary-600 mb-4">
                    How It Works
                  </h2>
                  <p className="text-[0.95rem] md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
                    A simple, secure process to get you covered in minutes
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                  {/* Vertical connecting line for mobile/tablet */}
                  <div className="absolute lg:hidden left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-secondary-300 z-0"></div>

                  {[
                    {
                      step: "01",
                      title: "Choose Plan",
                      description:
                        "Select the insurance type and coverage that best suits your needs and budget.",
                      icon: (
                        <TbShieldHalfFilled className="text-white w-6 h-6" />
                      ),
                    },
                    {
                      step: "02",
                      title: "Fill Details",
                      description:
                        "Provide your personal information through our secure, encrypted application form.",
                      icon: <TbClipboardText className="text-white w-6 h-6" />,
                    },
                    {
                      step: "03",
                      title: "Make Payment",
                      description:
                        "Complete your purchase using M-Pesa, bank transfer, or other secure payment methods.",
                      icon: (
                        <MpesaIcon variant="white" height={24} width={55} />
                      ),
                    },
                    {
                      step: "04",
                      title: "Get Coverage",
                      description:
                        "Receive your policy documents instantly and enjoy immediate coverage protection.",
                      icon: <FiCheckCircle className="text-white w-6 h-6" />,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="lg:text-center relative px-4 lg:p-0 border lg:border-none border-primary-200 rounded-xl p-5 mx-3 lg:mx-0 bg-white lg:bg-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      {/* Horizontal connecting line for desktop */}
                      {index < 3 && (
                        <div className="hidden lg:block absolute top-8 left-[55%] w-full h-[2px] bg-secondary-400 transform -translate-x-4"></div>
                      )}

                      <div className="flex flex-row lg:flex-col items-center lg:justify-center gap-4 lg:gap-0 relative z-10">
                        <div className="relative lg:mb-6">
                          <div className="w-16 lg:w-[4.7rem] h-16 lg:h-[4.7rem] bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                            {item.icon}
                          </div>
                          <div className="text-sm font-semibold text-primary-600 mb-2 text-center">
                            STEP {item.step}
                          </div>
                        </div>

                        <div className="flex-1 lg:flex-none">
                          <h3 className="text-xl font-semibold text-neutral-700 mb-1.5 lg:mb-3">
                            {item.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          )}
        </div>
      </main>

      {/* Trust Indicators */}
      <section className="pt-16 md:pt-20 bg-primary-600 relative overflow-hidden mt-8 md:mt-12 lg:mt-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-500/40 blur-3xl"></div>
        </div>

        <div className="lg:container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-12">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] md:text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Lako Insurance Agency
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Your <span className="text-secondary-400">trusted</span> insurance
              partner
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-base lg:text-[1.1rem]"
            >
              Join thousands of satisfied customers who trust us with their
              insurance needs across Kenya. Our track record speaks for itself.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12">
            {[
              {
                number: "5,000+",
                label: "Policies Sold",
                description: "Active policies nationwide",
              },
              {
                number: "98%",
                label: "Customer Satisfaction",
                description: "Consistently high ratings",
              },
              {
                number: "24/7",
                label: "Customer Support",
                description: "Always here to help",
              },
              {
                number: "5 Min",
                label: "Average Processing",
                description: "Quick policy approval",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-2 py-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <h3 className="text-3xl lg:text-4xl font-bold text-secondary-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-white font-semibold text-lg mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white/70 text-sm">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-primary-600 text-center pt-4"
      >
        <p className="text-white/80 p-6 md:p-8 text-sm md:text-base border-t border-white/20 max-w-screen-2xl mx-auto">
          Lako Insurance Agency is regulated and is authorized by IRA (the
          Insurance Regulatory Authority) to handle all forms of general
          insurance business. Your data is protected through our Kenya Data
          Protection Act Compliant system.
        </p>
      </motion.div>

      <Footer />
    </div>
  );
};

export default BuyOnlinePage;
