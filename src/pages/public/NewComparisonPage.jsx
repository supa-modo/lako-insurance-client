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
      title: "Trusted by Thousands",
      description:
        "Join thousands of satisfied clients who have found their perfect insurance plan through us.",
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
          <div className="bg-slate-50 py-16">
            <div className="container mx-auto px-2.5 max-w-screen-2xl space-y-16">
              {/* How Comparison Works */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary-700 mb-4">
                    How Our Smart Comparison Works
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our intelligent algorithm analyzes hundreds of insurance
                    plans to find the perfect match for your needs
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                          className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center"
                        >
                          <TbShieldCheck className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Smart Analysis
                    </h3>
                    <p className="text-gray-600">
                      Our AI analyzes your preferences, budget, and requirements
                      to understand your unique needs.
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                          className="w-10 h-10 bg-secondary-600 rounded-xl flex items-center justify-center"
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </motion.div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Real-time Comparison
                    </h3>
                    <p className="text-gray-600">
                      Compare live rates from top insurers with detailed
                      breakdowns of coverage and benefits.
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <motion.div
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center"
                        >
                          <TbClipboardCheck className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Personalized Results
                    </h3>
                    <p className="text-gray-600">
                      Get ranked recommendations with clear explanations of why
                      each plan suits your specific situation.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Comparison Features */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                    Why Compare with{" "}
                    <span className="text-primary-600">Kola Insurance</span>?
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: "🎯",
                        title: "Tailored Recommendations",
                        description:
                          "Get personalized insurance recommendations based on your specific needs and budget.",
                      },
                      {
                        icon: "💰",
                        title: "Transparent Pricing",
                        description:
                          "See all costs upfront with no hidden fees. Compare premiums, deductibles, and coverage limits easily.",
                      },
                      {
                        icon: "⚡",
                        title: "Instant Results",
                        description:
                          "Get comprehensive comparison results in seconds, not hours. Make informed decisions quickly.",
                      },
                      {
                        icon: "🏆",
                        title: "Top-Rated Insurers",
                        description:
                          "Compare plans from Kenya's most trusted insurance companies with verified ratings and reviews.",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <div className="text-2xl">{feature.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { metric: "500+", label: "Insurance Plans" },
                        { metric: "50+", label: "Insurance Providers" },
                        { metric: "95%", label: "Accuracy Rate" },
                        { metric: "2 Min", label: "Average Time" },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className="text-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.3,
                          }}
                        >
                          <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                            {stat.metric}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-500 rounded-full opacity-10"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-500 rounded-full opacity-10"></div>
                </div>
              </motion.section>

              {/* Testimonials */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    What Our Customers Say
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Join thousands of satisfied customers who found their
                    perfect insurance match
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Sarah Mwangi",
                      role: "Teacher, Nairobi",
                      comment:
                        "Found the perfect health insurance for my family in under 5 minutes. The comparison was so detailed and easy to understand!",
                      rating: 5,
                      avatar: "👩‍🏫",
                    },
                    {
                      name: "James Kiprop",
                      role: "Business Owner, Eldoret",
                      comment:
                        "Saved over KSH 15,000 annually by comparing different plans. The personalized recommendations were spot on!",
                      rating: 5,
                      avatar: "👨‍💼",
                    },
                    {
                      name: "Grace Achieng",
                      role: "Student, Kisumu",
                      comment:
                        "As a student on a tight budget, I found affordable coverage that actually works. The process was incredibly smooth!",
                      rating: 5,
                      avatar: "👩‍🎓",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-xl p-6 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-3">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <TbStar
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">
                        "{testimonial.comment}"
                      </p>
                      <div className="absolute top-4 right-4 text-4xl text-gray-200">
                        "
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* FAQ Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 lg:p-12"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <TbInfoCircle className="w-5 h-5 text-primary-600 mr-2" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewComparisonPage;
