import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useComparison } from "../../context/ComparisonContext";

// Icons
import {
  TbShieldCheck,
  TbUserCircle,
  TbCoin,
  TbClipboardCheck,
  TbShieldHalfFilled,
} from "react-icons/tb";

// Step components
import InsuranceTypeStep from "../../components/comparison/steps/InsuranceTypeStep";
import SeniorsCoverAgeStep from "../../components/comparison/steps/SeniorsCoverAgeStep";
import BudgetRangeStep from "../../components/comparison/steps/BudgetRangeStep";
import SummaryStep from "../../components/comparison/steps/SummaryStep";

const NewComparisonPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { userQuery, updateUserQuery, setLoading } = useComparison();

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

  const submitForm = (processedData) => {
    setLoading(true);

    // If we received processed data from SummaryStep, use it
    // Otherwise, process the query data here
    const processedQuery = processedData || {
      ...userQuery,
      // If we have budgetValue, use it instead of the string budget ranges
      budget: userQuery.budgetValue || userQuery.budget,
    };

    // Update the user query with the processed data
    if (processedData) {
      // Update each field individually to ensure all values are properly set
      Object.keys(processedData).forEach(key => {
        updateUserQuery(key, processedData[key]);
      });
    }

    console.log("Submitting processed query:", processedQuery);

    // Navigate to results page
    setTimeout(() => {
      setLoading(false);
      navigate("/results");
    }, 500);
  };

  // Benefits list
  const benefits = [
    {
      title: "Expert Analysis",
      description:
        "Our advanced algorithm analyzes available insurance plans to find the best matches for you.",
    },
    {
      title: "Transparent Comparison",
      description:
        "Compare coverage, premiums, and benefits side-by-side with clear, unbiased information.",
    },
    {
      title: "Trusted by Thousands",
      description:
        "Join thousands of satisfied clients who have found their perfect insurance plan through us.",
    },
  ];

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
      description: "What type of insurance are you looking for?",
      icon: <TbShieldCheck className="w-6 h-6" />,
      color: "secondary",
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
      description: "Choose the age range of the person to be insured",
      icon: <TbUserCircle className="w-6 h-6" />,
      color: "indigo",
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
      description: "What's your budget for insurance coverage (per year)?",
      icon: <TbCoin className="w-6 h-6" />,
      color: "teal",
    },
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
      icon: <TbClipboardCheck className="w-6 h-6" />,
      color: "emerald",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 font-outfit">
        <Header />

        <main className="pt-24 md:pt-28 pb-20 relative z-10">
          <div className="container mx-auto px-2.5 max-w-screen-2xl">
            {/* Page Header */}
            <div className="text-center mb-6 md:mb-12">
              {/* <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[0.8rem] md:text-sm font-medium bg-primary-50 text-primary-600 border border-primary-100 mb-3 shadow-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
                Insurance Comparison
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 mb-3 tracking-tight"
              >
                Find Your <span className="text-secondary-600">Ideal</span> Insurance
                Coverage
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
              >
                Discover premium insurance plans tailored to your specific needs and budget.
              </motion.p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 max-w-screen-2xl mx-auto">
              <div className="lg:w-3/4 order-2 lg:order-1">
                {/* Step Progress Indicator - */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="max-w-6xl mx-auto  mb-8"
                >
                  {/* Progress bar and step indicator */}
                  <div className="mb-6 lg:mb-8 px-2.5 ">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-secondary-600 text-[1.1rem] sm:text-xl md:text-2xl font-bold">
                        {steps[currentStep - 1].title}
                      </h2>
                      <span className="text-primary-600 text-[0.8rem] md:text-sm font-medium">
                        Step {currentStep} of {totalSteps}
                      </span>
                    </div>

                    <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-4">
                      {steps[currentStep - 1].description}
                    </p>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r rounded-full from-primary-500 to-secondary-500"
                        initial={{
                          width: `${((currentStep) / totalSteps) * 100}%`,
                        }}
                        animate={{ width: `${((currentStep) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step Content */}
                <div className="md:bg-white md:rounded-xl md:shadow-md md:border md:border-slate-200 p-1.5 md:p-6 mb-8">
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
              </div>

              {/* Right sidebar with benefits */}
              <div className="hidden lg:block lg:w-1/4 order-1 lg:order-2">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 py-6 px-4 sticky top-24">
                  <h3 className="text-lg font-bold text-secondary-600 mb-4 ">
                    
                    Why Choose Our Service
                  </h3>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-secondary-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-secondary-600"></div>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-md font-semibold text-slate-600">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-center text-sm text-slate-600 mt-2">
                      <TbShieldHalfFilled size={20} className="mr-2 text-primary-500" />
                      <span>Safeguarding what matters most</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default NewComparisonPage;
