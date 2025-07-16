import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiX,
  FiInfo,
  FiArrowLeft,
  FiArrowRight,
  FiHelpCircle,
} from "react-icons/fi";
import { useComparison } from "../../context/ComparisonContext";

// Import services
import insuranceService from "../../services/insuranceService";

// Import components
import PlanList from "../../components/results/PlanLists";
import ComparisonTable from "../../components/results/ComparisonTable";
import PlanDetailsModal from "../../components/results/PlanDetailsModal";
import DownloadReport from "../../components/results/DownloadReport";
import CallbackModal from "../../components/results/CallbackModal";
import Footer from "../../components/layout/Footer";
import {
  TbArrowBack,
  TbInfoCircle,
  TbInfoTriangle,
  TbMailFilled,
  TbPhoneCall,
} from "react-icons/tb";
import Header from "../../components/layout/Header";
import ToastContainer from "../../components/ui/ToastContainer";
import { useToast } from "../../hooks/useToast";
import SocialMediaBar from "../../components/common/SocialMediaBar";

const ResultsPage = () => {
  const { toasts, removeToast } = useToast();
  const navigate = useNavigate();
  const {
    userQuery,
    comparisonResults,
    setComparisonResults,
    loading,
    setLoading,
    error,
    setError,
  } = useComparison();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [report, setReport] = useState(null);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(null); // null, 'pdf-loading', 'pdf-success', etc.
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint in Tailwind
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    // Set loading to true at the beginning
    setLoading(true);

    const fetchComparisonResults = async () => {
      try {
        console.log("Current query data:", userQuery);

        // Validate userQuery before making the API call
        if (
          !userQuery ||
          !userQuery.insuranceType ||
          (userQuery.ageMin === undefined &&
            userQuery.ageMax === undefined &&
            !userQuery.age)
        ) {
          console.warn("No user query data available or incomplete data");
          setError(
            "Invalid search parameters. Please go back and complete your search criteria."
          );
          setComparisonResults([]);
          setReport(null);
          setLoading(false);
          return;
        }

        // The query should already be properly formatted from SummaryStep,
        // but let's ensure all parameters are correct
        let processedQuery = { ...userQuery };

        // Ensure insurance type is set
        if (!processedQuery.insuranceType) {
          processedQuery.insuranceType = "seniors";
        }

        // Ensure age parameters are correctly formatted
        if (
          processedQuery.ageMin === undefined &&
          processedQuery.ageMax === undefined &&
          processedQuery.age
        ) {
          // Try to extract age values if only the string format is available
          if (
            typeof processedQuery.age === "string" &&
            processedQuery.age.includes("-")
          ) {
            const [min, max] = processedQuery.age.split("-").map(Number);
            processedQuery.ageMin = min;
            processedQuery.ageMax = max;
          } else if (
            typeof processedQuery.age === "string" &&
            processedQuery.age.includes("+")
          ) {
            const min = parseInt(processedQuery.age.replace("+", ""), 10);
            processedQuery.ageMin = min;
            processedQuery.ageMax = 120; // Use a high upper limit
          } else if (typeof processedQuery.age === "number") {
            processedQuery.ageMin = processedQuery.age;
            processedQuery.ageMax = processedQuery.age;
          } else {
            // Parse single age as string
            const age = parseInt(processedQuery.age, 10);
            if (!isNaN(age)) {
              processedQuery.ageMin = age;
              processedQuery.ageMax = age;
            }
          }
        }

        // Ensure we have default age values if still undefined
        if (
          processedQuery.ageMin === undefined ||
          processedQuery.ageMax === undefined
        ) {
          processedQuery.ageMin = processedQuery.ageMin || 65;
          processedQuery.ageMax = processedQuery.ageMax || 70;
        }

        // Ensure budget parameters are correctly formatted
        // If we have budgetValue, use it as budgetMax
        if (
          processedQuery.budgetValue !== undefined &&
          processedQuery.budgetMax === undefined
        ) {
          processedQuery.budgetMax = Number(processedQuery.budgetValue);
        }
        // If we have a budget string that's a range
        else if (
          processedQuery.budgetMax === undefined &&
          typeof processedQuery.budget === "string" &&
          processedQuery.budget.includes("-")
        ) {
          const [min, max] = processedQuery.budget.split("-").map(Number);
          processedQuery.budgetMin = min;
          processedQuery.budgetMax = max;
        }
        // If we have a budget string with a plus sign
        else if (
          processedQuery.budgetMax === undefined &&
          typeof processedQuery.budget === "string" &&
          processedQuery.budget.includes("+")
        ) {
          const min = parseInt(processedQuery.budget.replace("+", ""), 10);
          processedQuery.budgetMin = min;
          processedQuery.budgetMax = 1000000; // Use a high upper limit
        }
        // If we have a single budget value
        else if (
          processedQuery.budgetMax === undefined &&
          typeof processedQuery.budget === "number"
        ) {
          processedQuery.budgetMax = processedQuery.budget;
        }

        // Clean up unnecessary properties before sending to API
        const apiQuery = {
          insuranceType: processedQuery.insuranceType,
          ageMin: processedQuery.ageMin,
          ageMax: processedQuery.ageMax,
          budgetMin: processedQuery.budgetMin,
          budgetMax: processedQuery.budgetMax,
          coverageLimitMin: processedQuery.coverageLimitMin,
          coverageLimitMax: processedQuery.coverageLimitMax,
          healthFilterType: processedQuery.healthFilterType,
          optionalCovers: processedQuery.optionalCovers,
        };

        console.log("Using processed user query for API call:", apiQuery);

        try {
          const reportData = await insuranceService.comparePlans(apiQuery);

          if (
            reportData &&
            reportData.comparisonResults &&
            reportData.comparisonResults.length > 0
          ) {
            setReport(reportData);
            setComparisonResults(reportData.comparisonResults);
            setError(null); // Clear any previous errors
            console.log(
              `Successfully found ${reportData.comparisonResults.length} matching plans`
            );
          } else {
            // No plans found - show appropriate message
            console.log("No plans found matching the criteria");
            setReport(reportData); // Still set the report for query info
            setComparisonResults([]);
            setError(
              reportData?.error
                ? "We're experiencing technical difficulties. Please try again later."
                : "No insurance plans found matching your criteria. Please try adjusting your filters or contact us for assistance."
            );
          }
        } catch (error) {
          console.error("Error fetching comparison results:", error);
          setError(
            "We couldn't find plans matching your criteria. Please try different parameters."
          );
        }
      } catch (err) {
        console.error("Error fetching comparison results:", err);
        setError("Failed to fetch comparison results. Please try again.");
        setComparisonResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Execute the fetch function
    fetchComparisonResults();
  }, [userQuery, setComparisonResults, setLoading, setError]);

  const handlePlanSelect = async (plan) => {
    try {
      // If we have a real plan ID, fetch detailed information
      if (plan && plan.plan && plan.plan.id) {
        const planDetails = await insuranceService.getPlanDetails(plan.plan.id);
        if (planDetails) {
          // Create a result object with the same structure expected by the modal
          const detailedPlan = {
            plan: planDetails,
            score: plan.score,
            rank: plan.rank,
          };
          setSelectedPlan(detailedPlan);
        } else {
          setSelectedPlan(plan);
        }
      } else {
        setSelectedPlan(plan);
      }
      setShowPlanDetailsModal(true);
    } catch (error) {
      console.error("Error fetching plan details:", error);
    }
  };

  const handleBuyPlan = (plan) => {
    //navigate to the buy-online page for now
    window.open("/buy-online", "_blank");
  };

  const handleDownloadPdf = async () => {
    setDownloadStatus("pdf-loading");
    try {
      // PDF download functionality not yet implemented
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDownloadStatus("pdf-error");
      alert(
        "PDF download feature is not yet implemented. Please contact support for assistance."
      );

      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      setDownloadStatus("pdf-error");
      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const handleRequestCallback = () => {
    setShowCallbackModal(true);
  };

  const handleCloseCallbackModal = () => {
    setShowCallbackModal(false);
  };

  const handleGoBack = () => {
    navigate("/compare");
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Loading State Component
  const LoadingState = () => (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative h-20 w-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-white/20 opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-secondary-400 border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-white font-outfit">
          Analyzing Your Perfect Plans
        </h2>
        <p className="text-neutral-300 max-w-md font-outfit">
          We're finding the best insurance plans matching your selections...
        </p>
      </motion.div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ onGoBack }) => (
    <div className="flex items-center justify-center py-16 px-4 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl w-full p-8 md:p-12 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400/20 rounded-full filter blur-2xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-400/20 rounded-full filter blur-xl opacity-30"></div>

        {/* Icon with animated glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-full mb-8 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/40 to-secondary-400/40 rounded-full animate-pulse"></div>
          <FiInfo className="text-white h-12 w-12 relative z-10" />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-white font-lexend bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent"
        >
          No Matching Plans Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-neutral-300 mb-8 font-outfit text-lg leading-relaxed"
        >
          We couldn't find any insurance plans that match your current criteria.
          Don't worry - let's adjust your preferences to find the perfect plan
          for you.
        </motion.p>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20"
        >
          <h3 className="text-white font-semibold mb-3 font-outfit">
            Try adjusting:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-300">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
              Your budget range
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
              Coverage limits
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
              Age requirements
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
              Optional benefits
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onGoBack}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-xl shadow-lg transition-all group font-outfit"
          >
            <TbArrowBack
              size={25}
              className="mr-3 group-hover:-translate-x-1 transition-transform"
            />
            Adjust My Preferences
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRequestCallback}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 font-semibold rounded-xl transition-all group font-outfit"
          >
            <FiHelpCircle className="mr-3" />
            Get Expert Help
          </motion.button>
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-neutral-400 text-sm mt-6 font-outfit"
        >
          Need immediate assistance? Call us at{" "}
          <a
            href="tel:+254720636363"
            className="text-primary-300 hover:text-primary-200 underline"
          >
            +254 720 636 3638
          </a>
        </motion.p>
      </motion.div>
    </div>
  );

  // Error State Component
  const ErrorState = ({ error, onGoBack }) => (
    <div className="flex items-center justify-center py-2 md:py-4 lg:py-12 px-4 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl w-full relative overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center">
          <TbInfoCircle className="text-white h-12 lg:h-[4.3rem] text-center w-12 lg:w-[4.3rem] mb-4 lg:mb-6" />
          <h2 className="text-[1.3rem] md:text-3xl font-bold mb-4 text-white font-lexend bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
            No Matching Plans Found !
          </h2>
        </div>

        {/* Description */}
        <motion.p
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5, delay: 0.1 }}
          className="text-neutral-300 mb-8 font-outfit text-[0.93rem] md:text-base lg:text-lg leading-relaxed"
        >
          We couldn't find any insurance plans that match your current criteria.
          Please try adjusting your budget or coverage limit preferences and try
          again.
        </motion.p>

        {/* Action buttons */}
        <motion.div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4 justify-center items-center">
          <motion.button
            whileHover={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.99 }}
            onClick={onGoBack}
            className="w-full md:w-auto inline-flex items-center justify-center font-lexend px-4 py-3 md:px-8 md:py-3.5 focus:outline-none bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-[0.7rem] shadow-lg transition-colors group border-2 border-secondary-500  "
          >
            <TbArrowBack
              size={25}
              className="mr-3 group-hover:-translate-x-1 transition-transform"
            />
            Adjust My Preferences
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={handleRequestCallback}
            className="w-full md:w-auto inline-flex items-center justify-center px-4 py-3 md:py-3.5 md:px-8 border-2 border-white/40 focus:outline-none hover:border-white/60 text-white hover:bg-white/10 font-semibold rounded-[0.7rem] transition-all group font-lexend"
          >
            <FiHelpCircle size={20} className="mr-2" />
            Get Expert Help
          </motion.button>
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-neutral-400 text-sm mt-6 font-outfit"
        >
          Need immediate assistance? Call us at{" "}
          <a
            href="tel:+254720636363"
            className="text-primary-300 hover:text-primary-200 underline underline-offset-4"
          >
            +254 720 636 3638
          </a>
        </motion.p>
      </motion.div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-800 via-neutral-800 to-primary-800 text-white relative overflow-hidden">
        <Header />

        {/* Social Media Bar */}
        <SocialMediaBar />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-500/40 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/30 rounded-full filter blur-3xl opacity-20 transform translate-y-1/4 translate-x-[-30%]"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-400/60 rounded-full filter blur-xl opacity-30 animate-float"></div>

        {/* Main content */}
        <div className="mx-auto px-0 sm:px-3 md:px-6 lg:px-10  pt-24 md:pt-28 lg:pt-32 py-4 sm:py-6 relative z-10 font-outfit">
          <header className="text-center mb-8">
            <motion.h1
              className="text-xl sm:text-3xl lg:text-4xl font-bold text-gradient bg-gradient-to-r from-white via-secondary-200 to-white bg-clip-text text-transparent mb-2 font-lexend"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your Insurance Comparison Results
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-3xl mx-auto font-outfit"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We've found {comparisonResults.length || "0"} insurance plans that
              match your preferences and budget
            </motion.p>
          </header>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onGoBack={handleGoBack} />
          ) : !report || comparisonResults.length === 0 ? (
            <EmptyState onGoBack={handleGoBack} />
          ) : (
            <div className="space-y-6 lg:space-y-8">
              {/* Two Column Layout - Desktop */}
              <div className="hidden lg:flex lg:flex-row gap-6">
                {/* Left Column - Plan List */}
                <motion.div variants={itemVariants} className="w-[33%]">
                  <div className="">
                    <PlanList
                      plans={report.comparisonResults}
                      // onSelectPlan={handlePlanSelect}
                      onBuyPlan={handleBuyPlan}
                      activePlanId={selectedPlan?.id || selectedPlan?.plan?.id}
                      userAge={report.userQuery?.age || 69}
                    />

                    <div className="mt-5 text-center">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={handleRequestCallback}
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md transition-all text-sm font-medium group"
                      >
                        <FiHelpCircle className="mr-2" />
                        Need Help? Schedule a Call
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Comparison Table & Download */}
                <motion.div
                  variants={itemVariants}
                  className="w-[67%] space-y-6"
                >
                  <ComparisonTable
                    plans={report.comparisonResults}
                    onDownload={handleDownloadPdf}
                  />

                  <motion.div
                    variants={itemVariants}
                    className="bg-secondary-50 border border-secondary-100 rounded-xl overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-6 md:mb-0 md:mr-6 md:max-w-[50%]">
                          <h3 className="text-base md:text-lg font-bold text-primary-600 mb-2">
                            Need Help Choosing a Plan?
                          </h3>
                          <p className="text-neutral-700 text-[0.83rem] sm:text-sm md:text-base">
                            Our insurance experts are ready to answer any
                            questions and help you get enrolled into the best
                            option.
                          </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-3">
                          <div>
                            <motion.a
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              href={`tel:+254720636363`}
                              className="w-full lg:w-auto flex items-center justify-center px-4 sm:px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all text-[0.8rem] md:text-sm lg:text-base"
                            >
                              <TbPhoneCall className="mr-2" size={20} /> Call
                              Expert
                            </motion.a>
                          </div>
                          <div>
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className="w-full lg:w-auto flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all text-[0.8rem] md:text-sm lg:text-base"
                              onClick={handleRequestCallback}
                            >
                              <TbMailFilled className="mr-2" size={20} />{" "}
                              Request Callback
                            </motion.button>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Mobile Layout - Stacked */}
              <div className="lg:hidden space-y-6">
                {/* Plan List */}
                <motion.div variants={itemVariants}>
                  <div className="px-2">
                    <PlanList
                      plans={report.comparisonResults}
                      onSelectPlan={handlePlanSelect}
                      onBuyPlan={handleBuyPlan}
                      activePlanId={selectedPlan?.id || selectedPlan?.plan?.id}
                      userAge={report.userQuery?.age || 69}
                    />

                    <div className="mt-5 text-center">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={handleRequestCallback}
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md transition-all text-sm font-medium group"
                      >
                        <FiHelpCircle className="mr-2" />
                        Need Help? Schedule a Call
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Comparison Table */}
                <motion.div variants={itemVariants}>
                  <ComparisonTable
                    plans={report.comparisonResults}
                    onDownload={handleDownloadPdf}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-secondary-50 mx-2 border border-secondary-100 rounded-xl overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0 md:mr-6 lg:max-w-[50%]">
                        <h3 className="text-base font-bold text-primary-600 mb-2">
                          Need Help With choosing a Plan?
                        </h3>
                        <p className="text-neutral-700 text-[0.83rem] md:text-sm lg:text-base">
                          Our insurance experts are ready to answer any
                          questions and help you get enrolled into the best
                          option.
                        </p>
                      </div>
                      <div className="w-full flex flex-col lg:flex-row gap-2">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`tel:+254720636363`}
                          className="btn inline-flex items-center justify-center px-4 sm:px-5 py-2.5 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all text-[0.8rem] md:text-sm"
                        >
                          <TbPhoneCall className="mr-2" size={20} /> Call Expert
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="btn inline-flex items-center justify-center px-4 sm:px-5 py-2.5 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all text-[0.8rem] md:text-sm"
                          onClick={handleRequestCallback}
                        >
                          <TbMailFilled className="mr-2" size={20} /> Request
                          Callback
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 py-4 border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 text-center text-neutral-400">
            <p className="text-xs mt-2 font-outfit">
              This is a system generated comparison of insurance plans based on
              your preferences. Please consult with our insurance experts for
              better detailed advice.
            </p>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {/*{showPlanDetailsModal && selectedPlan && (
            <PlanDetailsModal
              plan={selectedPlan}
              onClose={handleClosePlanDetails}
              onRequestCallback={handleRequestCallback}
              onBuyPlan={handleBuyPlan}
            />
          )} */}

          {showCallbackModal && (
            <CallbackModal
              isOpen={showCallbackModal}
              onClose={handleCloseCallbackModal}
            />
          )}
        </AnimatePresence>
      </div>

      <Footer />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default ResultsPage;
