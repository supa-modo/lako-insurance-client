import React, { useState, useEffect } from "react";
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
  TbFirstAidKit,
  TbPlus,
  TbInfoCircle,
  TbStar,
} from "react-icons/tb";
import { FaUserInjured } from "react-icons/fa";

// Step components
import InsuranceTypeStep from "../../components/comparison/steps/InsuranceTypeStep";
import SeniorsCoverAgeStep from "../../components/comparison/steps/SeniorsCoverAgeStep";
import BudgetRangeStep from "../../components/comparison/steps/BudgetRangeStep";
import SummaryStep from "../../components/comparison/steps/SummaryStep";

// Personal Accident Step components
import AccidentTypeStep from "../../components/comparison/steps/AccidentTypeStep";
import AccidentCoverageAmountStep from "../../components/comparison/steps/AccidentCoverageAmountStep";
import AccidentAdditionalBenefitsStep from "../../components/comparison/steps/AccidentAdditionalBenefitsStep";

const NewComparisonPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { userQuery, updateUserQuery, setLoading } = useComparison();

  // Calculate total steps based on insurance type
  const getTotalSteps = () => {
    if (userQuery.insuranceType === "personal-accident") {
      return 4; // InsuranceType + AccidentType + CoverageAmount + AdditionalBenefits + Summary
    }
    return 4; // Default for health insurance: InsuranceType + Age + Budget + Summary
  };

  const totalSteps = getTotalSteps();

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
      Object.keys(processedData).forEach((key) => {
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
      title: "Top-Rated Insurers",
      description:
        "Compare plans from Kenya's most trusted insurance companies and get results in seconds, not hours. Make informed decisions quickly.",
    },
  ];

  // Effect to update current step when insurance type changes
  useEffect(() => {
    // If user switches insurance type after step 1, reset to step 2
    if (currentStep > 1) {
      setCurrentStep(2);
    }
  }, [userQuery.insuranceType]);

  // Define step components for health insurance
  const healthInsuranceSteps = [
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

  // Define step components for personal accident insurance
  const personalAccidentSteps = [
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
        <AccidentTypeStep
          formData={userQuery}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      title: "Accident Type",
      description: "What type of accident coverage do you need?",
      icon: <FaUserInjured className="w-6 h-6" />,
      color: "indigo",
    },
    {
      component: (
        <AccidentCoverageAmountStep
          formData={userQuery}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      title: "Coverage Amount",
      description: "Select your desired coverage amount",
      icon: <TbFirstAidKit className="w-6 h-6" />,
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

  // Choose the appropriate steps based on insurance type
  const steps =
    userQuery.insuranceType === "personal-accident"
      ? personalAccidentSteps
      : healthInsuranceSteps;

  return (
    <>
      <div className="min-h-screen bg-slate-50 font-outfit">
        <Header />

        <main className="pt-24 md:pt-28 pb-20 relative z-10">
          <div className="container mx-auto px-2.5 max-w-screen-2xl">
            {/* Page Header */}
            <div className="text-center mb-6 md:mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 mb-3 tracking-tight"
              >
                Find Your <span className="text-secondary-600">Ideal</span>{" "}
                Insurance Coverage
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
              >
                Discover premium insurance plans tailored to your specific needs
                and budget.
              </motion.p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 max-w-screen-2xl mx-auto">
              <div className="lg:w-3/4 order-2 lg:order-1">
                {/* Step Progress Indicator - */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
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
                          width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                        animate={{
                          width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step Content */}
                <div className="md:bg-white md:rounded-xl md:shadow-md md:border md:border-slate-200 p-1.5 md:p-6 ">
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
                      <TbShieldHalfFilled
                        size={20}
                        className="mr-2 text-primary-500"
                      />
                      <span>Safeguarding what matters most</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Additional Content Sections */}
        {currentStep === 1 && (
          <div className="">
            {/* FAQ Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-[75rem] mx-auto"
            >
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-secondary-600 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-[0.95rem] md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
                  Get answers to common questions about our comparison service
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    question: "Is the comparison service free?",
                    answer:
                      "Yes, our comparison service is completely free. We help you find the best insurance plans without any charges.",
                  },
                  {
                    question: "How accurate are the quotes?",
                    answer:
                      "Our quotes are real-time and directly from insurance providers, ensuring 99% accuracy in pricing and coverage details.",
                  },
                  {
                    question: "Can I purchase directly through the platform?",
                    answer:
                      "Absolutely! Once you find your ideal plan, you can purchase it instantly through our secure online platform.",
                  },
                  {
                    question: "What if I need help choosing?",
                    answer:
                      "Our expert advisors are available 24/7 to help you understand different plans and make the best choice for your needs.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className="text-base lg:text-lg font-semibold text-primary-600 mb-2 lg:mb-3 flex items-center">
                      <TbInfoCircle className="w-6 lg:w-6 h-6 lg:h-6 text-primary-600 mr-2" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-[0.95rem] md:text-base lg:text-[1.05rem]">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      <section className="font-outfit pt-16 md:pt-20 bg-gradient-to-r from-primary-800 to-primary-700 relative overflow-hidden mt-6 md:mt-10 lg:mt-12">
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
              <span className="flex h-2 w-2 rounded-full bg-secondary-600 mr-2"></span>
              Lako Insurance Agency
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Your <span className="text-secondary-500">trusted</span> insurance
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
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-500 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-white font-semibold text-base md:text-lg mb-1">
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
        className="bg-gradient-to-r from-primary-800 to-primary-700 text-center -mt-2 lg:mt-0 pt-4 font-outfit"
      >
        <p className="text-white/80 py-6 md:p-8 text-sm md:text-base border-t border-white/20 max-w-[90%] md:max-w-screen-xl mx-auto">
          Lako Insurance Agency is regulated and is authorized by IRA (the
          Insurance Regulatory Authority) to handle all forms of general
          insurance business and compliant with the Kenya Data Protection Act.
        </p>
      </motion.div>
      <Footer />
    </>
  );
};

export default NewComparisonPage;
