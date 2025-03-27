import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiDownload,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiStar,
  FiShield,
  FiDollarSign,
  FiClock,
  FiPhone,
  FiMail,
  FiChevronRight,
  FiHeart,
  FiTrendingUp,
  FiInfo,
} from "react-icons/fi";
import { getReportById, downloadReportPdf } from "../../services/queryService";

const ResultsPage = () => {
  const { id } = useParams();
  const { userQuery } = useSelector((state) => state.comparison);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch report from API
        const reportData = await getReportById(id);
        setReport(reportData);

        // Transform data for the component
        const results = reportData.comparisonResults.map((result) => {
          const plan = result.plan;
          const company = plan.company;

          return {
            id: plan.id,
            companyName: company.name,
            companyLogo: `/${company.name.toLowerCase().split(" ")[0]}.png`,
            planName: plan.name,
            planType: plan.planType,
            premium: getPremiumForAge(plan),
            inpatientCoverage: plan.inpatientCoverageLimit,
            outpatientCoverage: plan.outpatientCoverageLimit,
            lastExpenseCover: plan.lastExpenseCover,
            score: result.score,
            rank: result.rank,
            benefits: plan.benefits || [],
            exclusions: plan.exclusions || [],
          };
        });

        setComparisonResults(results);

        // Select the highest scoring plan by default
        if (results.length > 0) {
          setSelectedPlan(results[0].id);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load the report. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Helper function to get premium for age
  const getPremiumForAge = (plan) => {
    if (!plan.premiums || plan.premiums.length === 0) return 0;

    const userAge = report?.userQuery?.age || 0;

    // Find matching premium for age bracket
    const premium = plan.premiums.find((p) => {
      const [minAge, maxAge] = p.ageBracket.split("-").map(Number);
      return userAge >= minAge && userAge <= maxAge;
    });

    return premium ? premium.annualPremium : 0;
  };

  // Handle PDF download
  const handleDownloadPdf = async () => {
    if (!id) return;

    try {
      await downloadReportPdf(id);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Failed to download the PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="relative h-20 w-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-secondary-200 opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-4 border-secondary-500 border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-2xl font-heading font-bold mb-2 text-gray-800">
            Analyzing Your Perfect Plans
          </h2>
          <p className="text-gray-600 max-w-md">
            We're finding the best insurance plans tailored to your unique
            needs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <FiX className="text-red-500 h-8 w-8" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3 text-gray-800">
            Something Went Wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/compare"
            className="btn inline-flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all"
          >
            <FiArrowLeft className="mr-2" /> Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (!report || comparisonResults.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FiInfo className="text-primary-500 h-8 w-8" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3 text-gray-800">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any matching plans. Please try again with different
            criteria.
          </p>
          <Link
            to="/compare"
            className="btn inline-flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all"
          >
            <FiArrowLeft className="mr-2" /> Try Again
          </Link>
        </div>
      </div>
    );
  }

  const currentPlan = comparisonResults.find(
    (plan) => plan.id === selectedPlan
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-neutral-50 py-12 min-h-screen relative">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/compare"
            className="flex items-center text-gray-600 hover:text-secondary-500 transition-colors group"
          >
            <div className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center mr-2 group-hover:bg-secondary-50 transition-colors">
              <FiArrowLeft className="h-4 w-4" />
            </div>
            <span>Back to Comparison Form</span>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center px-4 py-1.5 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium">
              <FiHeart className="mr-2" />
              <span>Your personalized insurance matches</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Plan list */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-800">
                  Your Results
                </h2>
                <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FiTrendingUp className="mr-1 h-4 w-4" />
                  Top {comparisonResults.length}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Based on your preferences, we've matched these plans to your
                specific needs:
              </p>
              <div className="space-y-3">
                {comparisonResults.map((result) => (
                  <div
                    key={result.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedPlan === result.id
                        ? "border-secondary-500 bg-secondary-50 shadow-md"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedPlan(result.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={result.companyLogo || "/fallback-logo.png"}
                            alt={result.companyName}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.src = "/fallback-logo.png";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {result.planName}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {result.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-secondary-100 text-secondary-700 px-2.5 py-1 rounded-full text-sm font-medium">
                        <FiStar className="mr-1 h-3.5 w-3.5" />
                        {result.score}%
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-gray-600 text-sm">
                        {result.planType}
                      </span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(result.premium)}
                        <span className="text-gray-500 text-xs">/yr</span>
                      </span>
                    </div>
                    {selectedPlan === result.id && (
                      <div className="mt-3 flex items-center justify-center">
                        <span className="text-xs bg-secondary-500 text-white px-3 py-1 rounded-full">
                          Currently viewing
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 divide-y divide-gray-100">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Your Query Details
                </h3>
                <p className="text-sm text-gray-500">
                  Information you provided
                </p>
              </div>

              {report && report.userQuery && (
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <FiUser className="mr-2 h-4 w-4 text-secondary-400" />
                      Name:
                    </span>
                    <span className="font-medium text-gray-800">
                      {report.userQuery.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <FiCalendar className="mr-2 h-4 w-4 text-secondary-400" />
                      Age:
                    </span>
                    <span className="font-medium text-gray-800">
                      {report.userQuery.age}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <FiDollarSign className="mr-2 h-4 w-4 text-secondary-400" />
                      Budget:
                    </span>
                    <span className="font-medium text-gray-800">
                      {report.userQuery.budget
                        ? formatCurrency(report.userQuery.budget)
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <FiShield className="mr-2 h-4 w-4 text-secondary-400" />
                      Coverage:
                    </span>
                    <span className="font-medium text-gray-800">
                      {report.userQuery.desiredCoverage
                        ? report.userQuery.desiredCoverage
                            .charAt(0)
                            .toUpperCase() +
                          report.userQuery.desiredCoverage.slice(1)
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
                  <FiDownload className="h-5 w-5 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Download Report
                  </h3>
                  <p className="text-sm text-gray-500">
                    Get a detailed PDF breakdown
                  </p>
                </div>
              </div>
              <button
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-secondary-500 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                onClick={handleDownloadPdf}
              >
                <FiDownload className="mr-2" />
                Download PDF Report
              </button>
            </div>
          </div>

          {/* Main content - Selected plan details */}
          {currentPlan && (
            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200">
                {/* Top banner */}
                <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 p-4 relative">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
                  </div>
                  <div className="relative flex justify-between items-center z-10">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-secondary-600 font-bold">
                        {currentPlan.rank}
                      </div>
                      <span className="text-white font-medium">
                        Ranked #{currentPlan.rank} Match
                      </span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium">
                      {currentPlan.score}% Match Score
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={currentPlan.companyLogo || "/fallback-logo.png"}
                          alt={currentPlan.companyName}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.src = "/fallback-logo.png";
                          }}
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-gray-800">
                          {currentPlan.planName}
                        </h2>
                        <p className="text-gray-600">
                          {currentPlan.companyName} • {currentPlan.planType}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-center bg-secondary-50 rounded-xl px-6 py-3 border border-secondary-100">
                      <div className="text-3xl font-bold text-secondary-700">
                        {formatCurrency(currentPlan.premium)}
                      </div>
                      <p className="text-gray-500 text-sm">Annual Premium</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <CoverageCard
                      title="Inpatient Cover"
                      amount={currentPlan.inpatientCoverage}
                      formatCurrency={formatCurrency}
                      icon={<FiShield className="text-primary-500" />}
                      color="primary"
                    />
                    <CoverageCard
                      title="Outpatient Cover"
                      amount={currentPlan.outpatientCoverage}
                      formatCurrency={formatCurrency}
                      icon={<FiDollarSign className="text-secondary-500" />}
                      color="secondary"
                    />
                    <CoverageCard
                      title="Last Expense Cover"
                      amount={currentPlan.lastExpenseCover}
                      formatCurrency={formatCurrency}
                      icon={<FiClock className="text-primary-500" />}
                      color="primary"
                    />
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FiCheck className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Key Benefits
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentPlan.benefits.map((benefit) => (
                        <div
                          key={benefit.id}
                          className="flex items-start p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                        >
                          <FiCheck className="text-green-500 mt-1 mr-3 shrink-0" />
                          <div>
                            <span className="font-medium text-gray-800">
                              {benefit.category}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              {benefit.description}
                            </p>
                            {benefit.coverageLimit && (
                              <div className="text-xs text-gray-500 mt-2 flex items-center">
                                <span className="font-medium">Limit:</span>
                                <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                  {formatCurrency(benefit.coverageLimit)}
                                </span>
                              </div>
                            )}
                            {benefit.waitingPeriod &&
                              benefit.waitingPeriod !== "None" && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                  <span className="font-medium">
                                    Waiting period:
                                  </span>
                                  <span className="ml-1">
                                    {benefit.waitingPeriod}
                                  </span>
                                </p>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <FiX className="h-4 w-4 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Exclusions
                      </h3>
                    </div>
                    <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-4">
                      <ul className="space-y-3">
                        {currentPlan.exclusions.map((exclusion) => (
                          <li key={exclusion.id} className="flex items-start">
                            <FiX className="text-red-500 mt-1 mr-3 shrink-0" />
                            <span className="text-gray-700">
                              {exclusion.exclusionText}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-50 border border-secondary-100 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-6 md:mb-0 md:mr-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Need Help With This Plan?
                      </h3>
                      <p className="text-gray-600">
                        Our insurance experts are ready to answer any questions
                        and help you get enrolled.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`tel:+254700000000`}
                        className="btn inline-flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all"
                      >
                        <FiPhone className="mr-2" /> Call Expert
                      </a>
                      <button
                        className="btn inline-flex items-center justify-center px-6 py-3 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all"
                        onClick={() => setShowCallbackModal(true)}
                      >
                        <FiMail className="mr-2" /> Request Callback
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Callback Request Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowCallbackModal(false)}
            >
              <FiX />
            </button>
            <div className="text-center mb-6">
              <div className="h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Request a Callback
              </h3>
              <p className="text-gray-600 text-sm">
                We'll have an expert contact you shortly
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select className="w-full h-11 px-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 outline-none">
                  <option>Morning (9am - 12pm)</option>
                  <option>Afternoon (12pm - 4pm)</option>
                  <option>Evening (4pm - 7pm)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 outline-none"
                  rows={3}
                  placeholder="Any specific questions or concerns?"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center"
                onClick={() => setShowCallbackModal(false)}
              >
                Request Callback <FiChevronRight className="ml-1" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Coverage card component
const CoverageCard = ({ title, amount, formatCurrency, icon, color }) => (
  <div className={`bg-${color}-50 p-5 rounded-xl border border-${color}-100`}>
    <div className="flex items-center mb-3">
      <div
        className={`h-10 w-10 rounded-full bg-${color}-100 flex items-center justify-center mr-3`}
      >
        {icon}
      </div>
      <h4 className="font-medium text-gray-700">{title}</h4>
    </div>
    <p className="text-2xl font-bold text-gray-800">{formatCurrency(amount)}</p>
  </div>
);

export default ResultsPage;
