import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiX,
  FiInfo,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { useSelector } from "react-redux";

// Import mock service
import {
  getMockReportById,
  mockDownloadReportPdf,
} from "../../services/mockReportService";

// Import only the larger components
import PlanList from "../../components/results/PlanList";
import QueryDetails from "../../components/results/QueryDetails";
import PlanDetails from "../../components/results/PlanDetails";
import CallbackModal from "../../components/results/CallbackModal";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { userQuery } = useSelector((state) => state.comparison);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
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

    // Add a delay to simulate API call
    const timer = setTimeout(() => {
      try {
        // Use mock service with a fixed ID since this is a public page
        const mockReportId = "mock-report-1";
        const reportData = getMockReportById(mockReportId);

        if (reportData) {
          setReport(reportData);
          setComparisonResults(reportData.comparisonResults);

          // Auto-select first plan only on desktop
          if (
            !isMobile &&
            reportData.comparisonResults &&
            reportData.comparisonResults.length > 0
          ) {
            setSelectedPlan(reportData.comparisonResults[0]);
          }
          // Make sure no plan is selected on mobile
          else if (isMobile) {
            setSelectedPlan(null);
          }
        } else {
          setError("No plans found that match your criteria");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch insurance plans");
      } finally {
        setLoading(false);
      }
    }, 1500); // Simulate 1.5s loading time

    return () => clearTimeout(timer);
  }, [isMobile, userQuery]); // Re-run when isMobile or userQuery changes

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan === selectedPlan ? null : plan);
  };

  const handleBackToList = () => {
    setSelectedPlan(null);
  };

  const handleDownload = async () => {
    if (downloadStatus === "loading") return;

    setDownloadStatus("loading");
    try {
      // Use mock download service with a fixed ID
      const mockReportId = "mock-report-1";
      await mockDownloadReportPdf(mockReportId);
      setDownloadStatus("success");

      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus("idle"), 3000);
    } catch (error) {
      setDownloadStatus("error");
      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus("idle"), 3000);
    }
  };

  const handleCallbackRequest = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Loading State Component
  const LoadingState = () => (
    <div className="flex items-center justify-center py-20 font-outfit">
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
          We're finding the best insurance plans tailored to your unique
          needs...
        </p>
      </motion.div>
    </div>
  );

  // Error State Component
  const ErrorState = ({ error, onGoHome }) => (
    <div className="flex items-center justify-center py-20 font-outfit">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-red-400/20"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
          <FiX className="text-red-400 h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-white font-outfit">
          Something Went Wrong
        </h2>
        <p className="text-neutral-300 mb-6 font-outfit">
          {error || "We couldn't process your request. Please try again."}
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all font-outfit"
          >
            <FiArrowLeft className="mr-2" /> Try Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ onGoHome }) => (
    <div className="flex items-center justify-center py-20 font-outfit">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-primary-400/20 "
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-6">
          <FiInfo className="text-primary-400 h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-white ">
          No Results Found
        </h2>
        <p className="text-neutral-300 mb-6 ">
          We couldn't find any matching plans. Please try again with different
          criteria.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all "
          >
            <FiArrowLeft className="mr-2" /> Try Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden font-outfit">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/30 rounded-full filter blur-3xl opacity-20 transform translate-y-1/4 translate-x-[-30%]"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary-400/40 rounded-full filter blur-xl opacity-30 animate-float"></div>

      {/* Glass panels */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>

      <div className="md:mx-28 lg:mx-32 mx-auto px-0 sm:px-4 lg:px-8 py-5 sm:py-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 px-3 sm:px-1 text-sm">
            <Link
              to="/"
              className="text-secondary-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-neutral-500">
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
            <Link
              to="/compare"
              className="text-secondary-400 hover:text-white transition-colors"
            >
              Compare
            </Link>
            <span className="text-neutral-500">
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
            <span className="text-white font-medium">Comparison Results</span>
          </div>
        </motion.div>

        <header className="text-center px-3 sm:px-2 mb-6 sm:mb-8">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-white via-secondary-200 to-white bg-clip-text text-transparent font-outfit mb-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your Insurance Results
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-4xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We've analyzed multiple plans from AAR, Jubilee, and CIC Insurance
            to find your best match based on your preferences.
          </motion.p>
        </header>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onGoHome={handleGoToHome} />
        ) : !report || comparisonResults.length === 0 ? (
          <EmptyState onGoHome={handleGoToHome} />
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl sm:rounded-2xl px-2 py-5 sm:p-3 md:p-6 shadow-2xl">
            {/* Main content - desktop: side by side, mobile: sequential */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Mobile View (Sequential) */}
              <div className="md:hidden">
                {selectedPlan ? (
                  <div className="space-y-4">
                    <PlanDetails
                      plan={selectedPlan}
                      onBack={handleBackToList}
                      formatCurrency={formatCurrency}
                      onRequestCallback={handleCallbackRequest}
                      downloadStatus={downloadStatus}
                      onDownload={handleDownload}
                    />

                    <QueryDetails
                      userQuery={userQuery || report.userQuery}
                      formatCurrency={formatCurrency}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <PlanList
                      plans={report.comparisonResults}
                      onSelectPlan={handlePlanSelect}
                      formatCurrency={formatCurrency}
                      activePlanId={selectedPlan?.id || selectedPlan?.plan?.id}
                    />

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCallbackRequest}
                      className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg 
                      flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition duration-200 font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Schedule a Call
                    </motion.button>
                    <QueryDetails
                      userQuery={userQuery || report.userQuery}
                      formatCurrency={formatCurrency}
                    />
                  </div>
                )}
              </div>

              {/* Desktop View (Side by Side) */}
              <div className="hidden md:grid md:grid-cols-12 gap-6">
                {/* Left Column: PlanList + Query Details + Download */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-5 lg:col-span-4 space-y-4"
                >
                  <PlanList
                    plans={report.comparisonResults}
                    onSelectPlan={handlePlanSelect}
                    formatCurrency={formatCurrency}
                    activePlanId={selectedPlan?.id || selectedPlan?.plan?.id}
                  />

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCallbackRequest}
                    className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg 
                    flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition duration-200 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Schedule a Call
                  </motion.button>
                </motion.div>

                {/* Right Column: Plan Details */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-7 lg:col-span-8 space-y-6"
                >
                  {selectedPlan ? (
                    <PlanDetails
                      plan={selectedPlan}
                      onBack={handleBackToList}
                      formatCurrency={formatCurrency}
                      onRequestCallback={handleCallbackRequest}
                      downloadStatus={downloadStatus}
                      onDownload={handleDownload}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-500/20 rounded-full mb-6">
                          <FiArrowLeft className="h-6 w-6 text-secondary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-outfit">
                          Select a Plan
                        </h3>
                        <p className="text-neutral-300 font-outfit max-w-md">
                          Choose a plan from the list to view detailed
                          information about coverage, benefits, and exclusions.
                        </p>
                      </div>
                    </div>
                  )}
                  <QueryDetails
                    userQuery={userQuery || report.userQuery}
                    formatCurrency={formatCurrency}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Callback Modal */}
      <CallbackModal isOpen={showModal} onClose={handleCloseModal} />

      {/* Footer with subtle pattern */}
      <div className="mt-8 py-4 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 text-center text-neutral-400">
          <p className="text-xs mt-2">
            This is a comparison of senior health insurance plans from AAR,
            Jubilee, and CIC Insurance.
          </p>
        </div>
      </div>

      {/* Additional decorative elements for visual interest */}
      <div className="absolute bottom-20 right-40 w-64 h-1 bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent transform rotate-45 hidden lg:block"></div>
      <div className="absolute top-40 left-20 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform -rotate-45 hidden lg:block"></div>
    </div>
  );
};

export default ResultsPage;
