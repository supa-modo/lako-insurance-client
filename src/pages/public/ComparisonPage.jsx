"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserQuery, setLoading } from "../../store/slices/comparisonSlice";
import { submitQuery } from "../../services/queryService";

// Component imports
import PersonalDetailsStep from "../../components/comparison/PersonalDetailsStep";
import InsurancePreferencesStep from "../../components/comparison/InsurancePreferencesStep";
import { TbCloudLock, TbShieldCheck, TbUser } from "react-icons/tb";
import Footer from "../../components/layout/Footer";

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
      {/* Background overlay */}
      <div className="fixed top-0 left-0 right-0 h-screen -z-10">
        <img
          src="/seniors.jpg"
          alt="Senior couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 opacity-80 backdrop-blur-sm"></div>
        {/* Fade-out gradient at the bottom */}
        <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-b from-transparent to-neutral-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
        </div>
      </div>

      {/* Main content with footer */}
      <div className="flex flex-col min-h-screen">
        {/* Content area */}
        <div className="flex-grow relative font-outfit z-10">
          <div className="container-custom mx-auto px-0 sm:px-6 pb-16 pt-3 sm:pb-24 sm:pt-6">
            {/* Breadcrumb Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 px-3 sm:px-6"
            >
              <div className="flex items-center space-x-2 text-sm">
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors"
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
            <div className="text-center px-3 sm:px-6 mb-7 sm:mb-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-sm border border-white/20"
              >
                <div className="flex items-center">
                  <span className="flex h-2 w-2 rounded-full bg-secondary-400 mr-2"></span>
                  <span>Insurance Comparison</span>
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
                Our comparison tool helps you discover all insurance
                plans tailored to your unique health and financial needs.
              </motion.p>
            </div>

            

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl border border-white/30 md:max-w-5xl mx-auto"
            >
             <div className="py-6 px-3 sm:p-6 md:p-8">
                <form
                  onSubmit={handleSubmit(step === 2 ? onSubmit : nextStep)}
                  className="space-y-6"
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
                      onSubmit={handleSubmit(onSubmit)}
                    />
                  )}

                  {/* Security note */}
                  <div className="text-center text-xs sm:text-[0.8rem] text-white/50 flex items-center justify-center mt-4">
                    <TbCloudLock size={22} className="mr-1.5 text-white/50" />
                    Safeguarding what's truly yours. Lako Insurance
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default ComparisonPage;
