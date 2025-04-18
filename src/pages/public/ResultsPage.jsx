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
import { useSelector } from "react-redux";

// Import mock service
import {
  getMockReportById,
  mockDownloadReportPdf,
} from "../../services/mockReportService";

// Import components
import PlanList from "../../components/results/PlanLists";
import ComparisonTable from "../../components/results/ComparisonTable";
import PlanDetailsModal from "../../components/results/PlanDetailsModal";
import DownloadReport from "../../components/results/DownloadReport";
import CallbackModal from "../../components/results/CallbackModal";
import Footer from "../../components/layout/Footer";
import { TbMailFilled, TbPhoneCall } from "react-icons/tb";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { userQuery } = useSelector((state) => state.comparison);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

    // Add a delay to simulate API call
    const timer = setTimeout(() => {
      try {
        // Use mock service with a fixed ID since this is a public page
        const mockReportId = "mock-report-1";
        const reportData = getMockReportById(mockReportId);

        if (reportData) {
          setReport(reportData);
          setComparisonResults(reportData.comparisonResults);

          // Don't auto-select any plan initially
          setSelectedPlan(null);
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
  }, [userQuery]); // Re-run when userQuery changes

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPlanDetailsModal(true);
  };

  const handleBuyPlan = (plan) => {
    // This would normally navigate to a checkout flow
    // For now, we'll just show a notice and open the plan details
    alert("The purchase functionality will be implemented in the future.");
    setSelectedPlan(plan);
    setShowPlanDetailsModal(true);
  };

  const handleClosePlanDetails = () => {
    setShowPlanDetailsModal(false);
  };

  const handleDownloadPdf = async () => {
    setDownloadStatus("pdf-loading");
    try {
      // Use mock download service
      await mockDownloadReportPdf("mock-report-1");
      setDownloadStatus("pdf-success");

      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      setDownloadStatus("pdf-error");
      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const handleDownloadCsv = async () => {
    setDownloadStatus("csv-loading");
    try {
      // Simulate download
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDownloadStatus("csv-success");

      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      setDownloadStatus("csv-error");
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const handleDownloadText = async () => {
    setDownloadStatus("text-loading");
    try {
      // Simulate download
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDownloadStatus("text-success");

      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      setDownloadStatus("text-error");
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const handleRequestCallback = () => {
    setShowCallbackModal(true);
  };

  const handleCloseCallbackModal = () => {
    setShowCallbackModal(false);
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
          We're finding the best insurance plans tailored to your unique needs
          and preferences...
        </p>
      </motion.div>
    </div>
  );

  // Error State Component
  const ErrorState = ({ error, onGoHome }) => (
    <div className="flex items-center justify-center py-20">
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
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-medium rounded-lg shadow-md transition-all group"
          >
            <FiArrowLeft className="mr-2" /> Try Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ onGoHome }) => (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-primary-400/20"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-6">
          <FiInfo className="text-primary-400 h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-white font-outfit">
          No Results Found
        </h2>
        <p className="text-neutral-300 mb-6 font-outfit">
          We couldn't find any matching plans. Please try again with different
          criteria.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-medium rounded-lg shadow-md transition-all group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
            Try Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-neutral-800 to-primary-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-500/40 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/30 rounded-full filter blur-3xl opacity-20 transform translate-y-1/4 translate-x-[-30%]"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-400/60 rounded-full filter blur-xl opacity-30 animate-float"></div>

        {/* Main content */}
        <div className="mx-auto px-0 sm:px-3 md:px-6 lg:px-10 py-4 sm:py-6 relative z-10 font-outfit">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-8 md:mb-2 pl-3 md:pl-10"
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
              <Link
                to="/compare"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Compare
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
              <span className="text-white font-medium">Comparison Results</span>
            </div>
          </motion.div>

          <header className="text-center mb-8">
            <motion.h1
              className="text-xl sm:text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-white via-secondary-200 to-white bg-clip-text text-transparent mb-2 font-lexend"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your Insurance Comparison Results
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-3xl mx-auto font-outfit"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We've analyzed {comparisonResults.length || "several"} insurance
              plans based on your preferences and budget to find the best plan
            </motion.p>
          </header>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onGoHome={handleGoToHome} />
          ) : !report || comparisonResults.length === 0 ? (
            <EmptyState onGoHome={handleGoToHome} />
          ) : (
            <div className="space-y-6 lg:space-y-8">
              {/* Two Column Layout - Desktop */}
              <div className="hidden lg:flex lg:flex-row gap-6">
                {/* Left Column - Plan List */}
                <motion.div variants={itemVariants} className="w-[33%]">
                  <div className="">
                    <PlanList
                      plans={report.comparisonResults}
                      formatCurrency={formatCurrency}
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

                {/* Right Column - Comparison Table & Download */}
                <motion.div
                  variants={itemVariants}
                  className="w-[67%] space-y-6"
                >
                  <ComparisonTable
                    plans={report.comparisonResults}
                    formatCurrency={formatCurrency}
                    onDownload={handleDownloadPdf}
                  />

                  <motion.div
                    variants={itemVariants}
                    className="bg-secondary-50 border border-secondary-100 rounded-xl overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-6 md:mb-0 md:mr-6 md:max-w-[50%]">
                          <h3 className="text-base sm:text-lg font-bold text-primary-600 mb-2">
                            Need Help Choosing a Plan?
                          </h3>
                          <p className="text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
                            Our insurance experts are ready to answer any
                            questions and help you get enrolled into the best
                            option.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={`tel:+2547206363638`}
                            className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all text-[0.8rem] sm:text-sm md:text-base"
                          >
                            <TbPhoneCall className="mr-2" size={20} /> Call
                            Expert
                          </motion.a>
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all text-[0.8rem] sm:text-sm md:text-base"
                            onClick={handleRequestCallback}
                          >
                            <TbMailFilled className="mr-2" size={20} /> Request
                            Callback
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* <DownloadReport
                    onDownloadPdf={handleDownloadPdf}
                    onDownloadCsv={handleDownloadCsv}
                    onDownloadText={handleDownloadText}
                    downloadStatus={downloadStatus}
                  /> */}
                </motion.div>
              </div>

              {/* Mobile Layout - Stacked */}
              <div className="lg:hidden space-y-6">
                {/* Plan List */}
                <motion.div variants={itemVariants}>
                  <div className="px-2">
                    <PlanList
                      plans={report.comparisonResults}
                      formatCurrency={formatCurrency}
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
                    formatCurrency={formatCurrency}
                    onDownload={handleDownloadPdf}
                  />
                </motion.div>

                {/* Download Report
                <motion.div variants={itemVariants}>
                  <DownloadReport
                    onDownloadPdf={handleDownloadPdf}
                    onDownloadCsv={handleDownloadCsv}
                    onDownloadText={handleDownloadText}
                    downloadStatus={downloadStatus}
                  />
                </motion.div> */}

                <motion.div
                  variants={itemVariants}
                  className="bg-secondary-50 mx-2 border border-secondary-100 rounded-xl overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-6 md:mb-0 md:mr-6 md:max-w-[50%]">
                        <h3 className="text-base sm:text-lg font-bold text-primary-600 mb-2">
                          Need Help With choosing a Plan?
                        </h3>
                        <p className="text-neutral-700 text-[0.8rem] sm:text-sm md:text-base">
                          Our insurance experts are ready to answer any
                          questions and help you get enrolled into the best
                          option.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`tel:+2547206363638`}
                          className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all text-[0.8rem] sm:text-sm md:text-base"
                        >
                          <TbPhoneCall className="mr-2" size={20} /> Call Expert
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all text-[0.8rem] sm:text-sm md:text-base"
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
              This is a comparison of senior health insurance plans based on
              your preferences.
            </p>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showPlanDetailsModal && selectedPlan && (
            <PlanDetailsModal
              plan={selectedPlan}
              formatCurrency={formatCurrency}
              onClose={handleClosePlanDetails}
              onRequestCallback={handleRequestCallback}
              onBuyPlan={handleBuyPlan}
            />
          )}

          {showCallbackModal && (
            <CallbackModal
              isOpen={showCallbackModal}
              onClose={handleCloseCallbackModal}
            />
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
};

export default ResultsPage;
