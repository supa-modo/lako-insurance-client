"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserQuery, setLoading } from "../../store/slices/comparisonSlice";
import { submitQuery } from "../../services/queryService";

// Component imports
import StepIndicator from "../../components/comparison/StepIndicator";
import PersonalDetailsStep from "../../components/comparison/PersonalDetailsStep";
import InsurancePreferencesStep from "../../components/comparison/InsurancePreferencesStep";
import { TbCloudLock } from "react-icons/tb";
import Footer from "../../components/layout/Footer";

// Form data
const coverageOptions = [
  {
    value: "basic",
    label: "Basic Coverage",
    description: "Essential protection for fundamental health needs",
  },
  {
    value: "standard",
    label: "Standard Coverage",
    description: "Balanced protection with broader health benefits",
  },
  {
    value: "comprehensive",
    label: "Comprehensive Coverage",
    description: "Extensive coverage with additional wellness features",
  },
  {
    value: "premium",
    label: "Premium Coverage",
    description: "Top-tier protection with premium healthcare services",
  },
];

const budgetRanges = [
  {
    value: 30000,
    label: "Ksh 30,000 - 50,000",
    description: "Budget-friendly option",
  },
  {
    value: 50000,
    label: "Ksh 50,000 - 70,000",
    description: "Moderate coverage",
  },
  {
    value: 70000,
    label: "Ksh 70,000 - 100,000",
    description: "Comprehensive protection",
  },
  {
    value: 100000,
    label: "Ksh 100,000+",
    description: "Premium health security",
  },
];

const ComparisonPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      ageRange: "",
      desiredCoverage: "",
      budget: 0,
      roomType: "",
      optionalCovers: ["outpatient", "lastExpense"],
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setUserQuery(data));

      // For development, use mock data
      // In production, this would call an actual API
      // const response = await submitQuery(data);

      dispatch(setLoading(false));

      // Navigate to results page without a report ID parameter
      navigate("/results");
    } catch (error) {
      console.error("Error submitting query:", error);
      dispatch(setLoading(false));
      // Handle error (could display an error message here)
    }
  };

  const nextStep = (data) => {
    // Save the data from step 1 to the Redux store
    dispatch(setUserQuery(data));
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Background overlay - positioned fixed but not covering the footer */}
      <div className="fixed top-0 left-0 right-0 h-screen -z-10">
        <img
          src="/seniors.jpg"
          alt="Senior couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 opacity-75 backdrop-blur-sm"></div>
        {/* Fade-out gradient at the bottom */}
        <div className="absolute left-0 right-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-neutral-50"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="">
        <div className="relative font-outfit min-h-screen container-custom mx-auto px-4 sm:px-6 pb-32 pt-3 sm:pb-40 sm:pt-6">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <span className="text-white/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className="text-white font-medium">Compare</span>
            </div>
          </motion.div>

          {/* Header Section */}
          <div className="text-center mb-7 sm:mb-8 md:mb-10 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-sm border border-white/20"
            >
              <div className="flex items-center">
                <span className="flex h-2 w-2 rounded-full bg-secondary-400 mr-2"></span>
                <span>Personalized Insurance Matching</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-400 leading-tight font-outfit"
            >
              Find Your <span className="text-secondary-400">Perfect</span>{" "}
              Insurance Plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[0.94rem] sm:text-base tracking-wide md:text-lg text-white/90 max-w-2xl mx-auto "
            >
              Our intelligent matching system helps you discover all insurance
              plans tailored to your unique health and financial needs.
            </motion.p>
          </div>

          {/* Two-column layout with StepIndicator on left and Form content on right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl border border-white/30 max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row">
              {/* StepIndicator - Left Column on Desktop, Top Row on Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full md:w-[280px] lg:w-[320px] bg-white/5 backdrop-blur-sm md:border-r md:border-b-0 border-b border-white/10 p-5 md:py-10 md:px-0 py-6"
              >
                <div className="h-full md:min-h-[280px] min-h-[100px] flex justify-center">
                  <StepIndicator currentStep={step} />
                </div>
              </motion.div>

              {/* Form Content - Right Column on Desktop, Bottom Section on Mobile */}
              <div className="flex-1 p-5 sm:p-6">
                <form
                  onSubmit={handleSubmit(step === 2 ? onSubmit : nextStep)}
                  className="space-y-6 sm:space-y-8"
                >
                  {step === 1 ? (
                    <PersonalDetailsStep
                      register={register}
                      errors={errors}
                      watchedValues={watchedValues}
                      onSubmit={handleSubmit(nextStep)}
                    />
                  ) : (
                    <InsurancePreferencesStep
                      register={register}
                      errors={errors}
                      watchedValues={watchedValues}
                      onPrev={prevStep}
                      onSubmit={onSubmit}
                    />
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Mobile-friendly footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center text-[0.8rem] text-white/80 font-outfit"
          >
            <div className="flex items-center justify-center">
              <TbCloudLock className="text-secondary-400 h-6 w-6 mr-2" />
              <p>Secure and confidential. Your information is protected.</p>
            </div>
          </motion.div>
        </div>

        <Footer/>
      </div>
    </>
  );
};

export default ComparisonPage;
