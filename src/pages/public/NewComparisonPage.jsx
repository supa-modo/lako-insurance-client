import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useComparison } from "../../context/ComparisonContext";

// Step components
import InsuranceTypeStep from "../../components/comparison/steps/InsuranceTypeStep";
import SeniorsCoverAgeStep from "../../components/comparison/steps/SeniorsCoverAgeStep";
import BudgetRangeStep from "../../components/comparison/steps/BudgetRangeStep";
import CoverageLimitStep from "../../components/comparison/steps/CoverageLimitStep";
import OptionalCoversStep from "../../components/comparison/steps/OptionalCoversStep";
import SummaryStep from "../../components/comparison/steps/SummaryStep";

const NewComparisonPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { userQuery, updateUserQuery, setUserQuery, setLoading } =
    useComparison();

  // Progress percentage calculation
  const totalSteps = 4;
  const progress = Math.round((currentStep / totalSteps) * 100);

  // Update form data
  const updateFormData = (field, value) => {
    updateUserQuery(field, value);
  };

  // Navigation functions
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const submitForm = () => {
    setLoading(true);

    // Process the query data for submission
    const processedQuery = {
      ...userQuery,
      // If we have budgetValue, use it instead of the string budget ranges
      budget: userQuery.budgetValue || userQuery.budget,
    };

    console.log("Submitting processed query:", processedQuery);

    // Navigate to results page
    setTimeout(() => {
      setLoading(false);
      navigate("/results");
    }, 500);
  };

  // Step components with their respective props
  const steps = [
    {
      component: (
        <InsuranceTypeStep
          formData={userQuery}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      ),
      title: "Insurance Type",
      description: "Select the type of insurance you're looking for",
    },
    {
      component: (
        <SeniorsCoverAgeStep
          formData={userQuery}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      title: "Age Range",
      description: "Tell us about the age of the person to be insured",
    },
    {
      component: (
        <BudgetRangeStep
          formData={userQuery}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      title: "Budget Range",
      description: "What's your budget for insurance coverage?",
    },
    // {
    //   component: (
    //     <CoverageLimitStep
    //       formData={userQuery}
    //       updateFormData={updateFormData}
    //       nextStep={nextStep}
    //       prevStep={prevStep}
    //     />
    //   ),
    //   title: "Coverage Limit",
    //   description: "Select your preferred inpatient coverage limit",
    // },
    // {
    //   component: (
    //     <OptionalCoversStep
    //       formData={userQuery}
    //       updateFormData={updateFormData}
    //       nextStep={nextStep}
    //       prevStep={prevStep}
    //     />
    //   ),
    //   title: "Optional Covers",
    //   description: "Enhance your coverage with additional benefits",
    // },
    {
      component: (
        <SummaryStep
          formData={userQuery}
          submitForm={submitForm}
          prevStep={prevStep}
        />
      ),
      title: "Review & Compare",
      description: "Review your selections and proceed to comparison",
    },
  ];

  return (
    <>
      {/* Background overlay */}
      <div className="fixed top-0 left-0 right-0 h-screen -z-10">
        <img
          src="/slider01.png"
          alt="Senior couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700 opacity-60 backdrop-blur-sm"></div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-primary-700/90 to-primary-900 font-outfit">
        <Header />

        <main className="pt-32 pb-20">
          <div className="text-center px-3 sm:px-6 mb-7 sm:mb-8 space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-300 leading-tight font-outfit"
            >
              Find Your <span className="text-secondary-500">Perfect</span>{" "}
              Insurance Plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[0.94rem] sm:text-base tracking-wide md:text-lg text-white/90 max-w-5xl mx-auto "
            >
              Our comparison tool helps you discover all insurance plans
              tailored to your unique health and financial needs.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-6xl mx-auto px-4"
          >
            {/* Progress bar and step indicator */}
            <div className="mb-6 lg:mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-secondary-500 text-xl md:text-2xl font-bold">
                  {steps[currentStep - 1].title}
                </h2>
                <span className="text-secondary-500 text-sm">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              <p className="text-white/90 text-base md:text-[1.1rem] mb-4">
                {steps[currentStep - 1].description}
              </p>

              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary-400 to-secondary-500"
                  initial={{
                    width: `${((currentStep - 1) / totalSteps) * 100}%`,
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Step content with animation */}
            <div className="py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep - 1].component}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NewComparisonPage;
