import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbLoader,
  TbCheck,
  TbInfoCircle,
  TbShield,
  TbCurrencyDollar,
  TbBuilding,
  TbStar,
  TbLoader2,
  TbRefresh,
  TbDownload,
  TbCalendar,
} from "react-icons/tb";
import applicationService from "../../../services/applicationService";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  calculatePremiumForAge,
  getPremiumDisplay,
  getPremiumBreakdown,
  getAgeRangesForPlan,
} from "../../../utils/premiumUtils";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa";
import { PiCaretDownDuotone } from "react-icons/pi";

const PlanSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(
    formData.selectedPlan || null
  );
  const [selectedAgeForPlan, setSelectedAgeForPlan] = useState({});

  // Calculate user's age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const userAge = calculateAge(formData.dateOfBirth);

  useEffect(() => {
    fetchPlans();
  }, [formData.coverType]);

  // Initialize selected ages for age-based plans
  useEffect(() => {
    if (plans.length > 0) {
      const initialAges = {};
      plans.forEach((plan) => {
        if (plan.premiumStructure === "age-based") {
          // Set default age to user's age if available, otherwise use first available age range
          const ageRanges = getAgeRangesForPlan(plan);
          if (ageRanges.length > 0) {
            if (
              userAge &&
              ageRanges.some((range) => {
                if (range.includes("-")) {
                  const [min, max] = range
                    .split("-")
                    .map((part) => parseInt(part.trim(), 10));
                  return userAge >= min && userAge <= max;
                } else if (range.includes("+")) {
                  const min = parseInt(range.replace("+", "").trim(), 10);
                  return userAge >= min;
                } else {
                  const exactAge = parseInt(range.trim(), 10);
                  return userAge === exactAge;
                }
              })
            ) {
              initialAges[plan.id] = userAge;
            } else {
              // Use the first age range as default
              const firstRange = ageRanges[0];
              if (firstRange.includes("-")) {
                const [min] = firstRange
                  .split("-")
                  .map((part) => parseInt(part.trim(), 10));
                initialAges[plan.id] = min;
              } else if (firstRange.includes("+")) {
                const min = parseInt(firstRange.replace("+", "").trim(), 10);
                initialAges[plan.id] = min;
              } else {
                initialAges[plan.id] = parseInt(firstRange.trim(), 10);
              }
            }
          }
        }
      });
      setSelectedAgeForPlan(initialAges);
    }
  }, [plans, userAge]);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        coverType: formData.coverType,
        // Add more filters based on cover type
      };

      const response = await applicationService.getPersonalAccidentPlans(
        filters
      );

      if (response.success && Array.isArray(response.data)) {
        // Direct array response from applications/plans endpoint
        setPlans(response.data);
        console.log(response.data);
      } else if (
        response.success &&
        response.data &&
        Array.isArray(response.data.plans)
      ) {
        // Paginated response format
        setPlans(response.data.plans);
      } else {
        console.log("No plans found in API response");
        setPlans([]);
      }
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load insurance plans. Please try again.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    updateFormData("selectedPlan", plan);

    // Calculate premium based on user's age and plan structure
    let premium;
    if (plan.premiumStructure === "age-based") {
      const selectedAge = selectedAgeForPlan[plan.id] || userAge;
      premium = calculatePremiumForAge(plan, selectedAge);
      // Store the selected age for age-based plans
      updateFormData("selectedAge", selectedAge);
    } else {
      premium = calculatePremiumForAge(plan, userAge);
    }

    updateFormData("premiumAmount", premium);
    updateFormData(
      "insuranceProvider",
      plan.company?.name || "Unknown Provider"
    );
  };

  const handleAgeChange = (planId, age) => {
    setSelectedAgeForPlan((prev) => ({
      ...prev,
      [planId]: parseInt(age),
    }));

    // If this plan is currently selected, update the premium
    if (selectedPlan?.id === planId) {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        const premium = calculatePremiumForAge(plan, parseInt(age));
        updateFormData("premiumAmount", premium);
        updateFormData("selectedAge", parseInt(age));
      }
    }
  };

  const handleContinue = () => {
    if (selectedPlan) {
      nextStep();
    }
  };

  const handleDownloadPlanDetails = (plan) => {
    // Get premium information
    const selectedAge = selectedAgeForPlan[plan.id] || userAge;
    const premiumInfo = getPremiumDisplay(plan, selectedAge);
    const premiumBreakdown = getPremiumBreakdown(plan);

    // Create a detailed plan information object
    const planDetails = {
      planName: plan.name,
      company: plan.company?.name || "Insurance Company",
      description: plan.description || "No description available",
      coverageAmount: formatCurrency(plan.inpatientCoverageLimit),
      premiumInfo: premiumInfo,
      premiumBreakdown: premiumBreakdown,
      coverType: formData.coverType,
      // Add more details as needed
      benefits: plan.benefits || [],
      terms:
        plan.terms ||
        "Please contact the insurance company for detailed terms and conditions",
    };

    // Create premium details text
    let premiumDetailsText = "";
    if (plan.premiumStructure === "fixed") {
      premiumDetailsText = `Annual Premium: ${formatCurrency(
        plan.annualPremium
      )}`;
    } else if (plan.premiumStructure === "age-based") {
      premiumDetailsText = "Age-Based Premium Structure:\n";
      premiumBreakdown.forEach(({ ageRange, premium }) => {
        premiumDetailsText += `- ${ageRange} years: ${formatCurrency(
          premium
        )}\n`;
      });
    }

    // Create a simple text content for download
    const content = `
PERSONAL ACCIDENT INSURANCE PLAN DETAILS

Plan Name: ${planDetails.planName}
Insurance Company: ${planDetails.company}
Coverage Type: ${
      planDetails.coverType.charAt(0).toUpperCase() +
      planDetails.coverType.slice(1)
    }

COVERAGE DETAILS:
- Coverage Amount: ${planDetails.coverageAmount}
- Premium Structure: ${
      plan.premiumStructure === "fixed" ? "Fixed" : "Age-based"
    }
${premiumDetailsText}

DESCRIPTION:
${planDetails.description}

TERMS & CONDITIONS:
${planDetails.terms}

Generated on: ${new Date().toLocaleDateString(
      "en-GB"
    )} at ${new Date().toLocaleTimeString("en-GB")}

Note: This is a summary document. Please contact ${
      planDetails.company
    } directly for complete terms, conditions, and policy documents.
    `.trim();

    // Create and download the file
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${planDetails.planName.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}_Plan_Details.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Render premium display component
  const renderPremiumDisplay = (plan) => {
    const selectedAge = selectedAgeForPlan[plan.id] || userAge;
    const premiumInfo = getPremiumDisplay(plan, selectedAge);

    if (premiumInfo.isValid) {
      return (
        <div className="text-xl lg:text-2xl font-lexend font-bold text-primary-600">
          {formatCurrency(premiumInfo.value)}
        </div>
      );
    } else {
      return (
        <div className="text-sm lg:text-base font-medium text-gray-600">
          {premiumInfo.display}
        </div>
      );
    }
  };

  // Render age selector for age-based plans
  const renderAgeSelector = (plan) => {
    if (plan.premiumStructure !== "age-based") return null;

    const ageRanges = getAgeRangesForPlan(plan);
    const selectedAge = selectedAgeForPlan[plan.id] || userAge;

    if (ageRanges.length === 0) return null;

    return (
      <div className="p-2 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200">
        <div className="relative flex items-center">
          <select
            value={selectedAge || ""}
            onChange={(e) => handleAgeChange(plan.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            onClick={(e) => e.stopPropagation()}
          >
            {ageRanges.map((range) => {
              let ageValue, ageLabel;
              if (range.includes("-")) {
                const [min, max] = range
                  .split("-")
                  .map((part) => parseInt(part.trim(), 10));
                ageValue = min;
                ageLabel = `${range} years`;
              } else if (range.includes("+")) {
                const min = parseInt(range.replace("+", "").trim(), 10);
                ageValue = min;
                ageLabel = `${range} years`;
              } else {
                ageValue = parseInt(range.trim(), 10);
                ageLabel = `${range} years`;
              }
              return (
                <option key={range} value={ageValue}>
                  {ageLabel}
                </option>
              );
            })}
          </select>

          <PiCaretDownDuotone className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="mt-2 text-xs text-gray-500">
          {renderPremiumDisplay(plan)}
        </div>
      </div>
    );
  };

  // Render age-based premium breakdown
  const renderAgeBasedBreakdown = (plan) => {
    if (plan.premiumStructure !== "age-based") return null;

    const breakdown = getPremiumBreakdown(plan);
    if (breakdown.length === 0) return null;

    return (
      <div className="mt-2 text-xs text-gray-500">
        <div className="font-medium mb-1">Available age ranges:</div>
        <div className="space-y-1">
          {breakdown.slice(0, 3).map(({ ageRange, premium }, index) => (
            <div key={index} className="flex justify-between">
              <span>{ageRange} yrs:</span>
              <span>{formatCurrency(premium)}</span>
            </div>
          ))}
          {breakdown.length > 3 && (
            <div className="text-gray-400 italic">
              +{breakdown.length - 3} more age ranges
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <TbLoader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-primary-600 text-sm lg:text-base">
            Loading available plans...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 text-[0.9rem] lg:text-base mb-4">
            {error}
          </p>
          <button
            onClick={fetchPlans}
            className="bg-red-600 text-white text-sm lg:text-base px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show no plans available message
  if (!Array.isArray(plans) || plans.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="">
          <TbInfoCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Plans Available
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            No {formData.coverType} accident insurance plans are currently
            available. Please try a different coverage type or contact support.
          </p>
          <button
            onClick={fetchPlans}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-primary-700 transition-colors"
          >
            <TbRefresh className="mr-2" />
            Refresh Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center ">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">2.</span>{" "}
          <span className="">
            Choose Preferred{" "}
            {formData.coverType === "student" ? "Student" : "Individual"}{" "}
            Accident Cover
          </span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          Compare plans from top insurance providers and select the one that
          best fits your needs and budget.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-xl border-2 p-2 md:p-4 lg:p-6 cursor-pointer transition-all duration-200 ${
                selectedPlan?.id === plan.id
                  ? "border-primary-500 bg-primary-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {/* Popular badge */}
              {/* {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )} */}

              {/* Selected indicator */}
              {selectedPlan?.id === plan.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <TbCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                {/* Plan Info */}
                <div className="flex-1">
                  <div className="flex items-start space-x-4 mb-2 md:mb-3 lg:mb-4">
                    <div className="flex-shrink-0">
                      <img
                        src={plan.company?.logoUrl || "/placeholder-logo.png"}
                        alt={plan.company?.name || "Insurance Company"}
                        className="w-20 h-14 object-contain rounded-lg bg-gray-50 p-2"
                        onError={(e) => {
                          e.target.src = "/placeholder-logo.png";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="">
                        <h4 className="text-lg font-semibold text-secondary-600">
                          {plan.name}
                        </h4>
                      </div>
                      <p className="text-sm font-medium text-neutral-700">
                        {plan.company?.name || "Insurance Company"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-w-[23%] flex flex-row items-start justify-between border-t md:border-none border-gray-200">
                  <div className="rounded-lg px-2 py-2.5 md:py-0 w-full">
                    <div className="text-sm font-medium text-neutral-700 md:mb-1">
                      Coverage Amount
                    </div>
                    <div className="text-lg lg:text-xl font-lexend font-bold text-gray-600">
                      {formatCurrency(plan.inpatientCoverageLimit)}
                    </div>
                    {/*show age based premium text if premium structure is age based */}
                    {plan.premiumStructure === "age-based" && (
                      <div className="text-sm font-semibold text-primary-700 mt-3 md:mb-1">
                        Age-based Premium:
                      </div>
                    )}
                  </div>

                  <div className=" rounded-lg px-2 py-2.5 md:py-0 w-full">
                    <div
                      className={`text-sm text-primary-600 font-medium ${
                        plan.premiumStructure === "age-based"
                          ? "hidden"
                          : "block"
                      } md:mb-1`}
                    >
                      Cover Premium
                    </div>
                    {plan.premiumStructure === "age-based"
                      ? renderAgeSelector(plan)
                      : renderPremiumDisplay(plan)}
                  </div>
                </div>
              </div>

              <p className="text-sm pl-2 font-medium text-gray-600 pt-1 mb-2 lg:mb-3.5">
                Download plan details for more information{" "}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadPlanDetails(plan);
                  }}
                  className="text-primary-600 underline underline-offset-4 font-medium transition-colors hover:bg-primary-50"
                >
                  here
                </button>
              </p>

              <button
                type="button"
                className={`w-full px-6 py-2.5 mt-2  rounded-lg font-medium transition-colors ${
                  selectedPlan?.id === plan.id
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 border border-gray-300 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan);
                }}
              >
                {selectedPlan?.id === plan.id
                  ? "Selected. Click Continue to proceed"
                  : "Select this Plan"}
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No plans available for the selected coverage type.
            </p>
            <button
              onClick={fetchPlans}
              className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedPlan
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PlanSelection;
