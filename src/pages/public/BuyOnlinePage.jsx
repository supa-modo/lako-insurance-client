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
  const [formData, setFormData] = useState({
    insuranceType: "",
    coverType: "",
    selectedPlan: null,

    // Personal Details
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    universityCollegeSchool: "",

    // Proposer Details
    kraPin: "",
    idNumber: "",
    mobileNumber: "",
    emailAddress: "",
    postalAddress: "",
    town: "",

    // Next of Kin & Beneficiary
    nextOfKinName: "",
    nextOfKinContacts: "",
    beneficiaryName: "",
    beneficiaryContacts: "",

    // Medical History (for accident insurance)
    previousAccidents: false,
    physicalDisability: false,
    chronicIllness: false,
    medicalHistoryDetails: "",

    // Policy Details
    policyStartDate: "",

    // Agent Information
    isAgentPurchase: false,
    agentName: "",
    agentEmail: "",
    agentPhone: "",

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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 font-outfit">
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
          <div className="bg-white max-w-[85rem] mx-auto rounded-2xl lg:rounded-xl shadow-sm border border-slate-200 px-2.5 py-5 md:p-5 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyOnlinePage;
