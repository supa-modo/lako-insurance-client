import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbLoader,
  TbCheck,
  TbInfoCircle,
  TbShield,
  TbBuilding,
  TbStar,
  TbLoader2,
  TbRefresh,
  TbCurrencyDollar,
  TbPhone,
  TbTools,
  TbHeart,
  TbEye,
  TbBabyCarriage,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import applicationService from "../../../services/applicationService";
import { formatCurrency } from "../../../utils/formatCurrency";

const PlanSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(
    formData.selectedPlan || null
  );

  const userAge = formData.userAge || 0;

  useEffect(() => {
    fetchHealthPlans();
  }, [userAge]);

  const fetchHealthPlans = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching health plans for age:", userAge);

      const response = await applicationService.getHealthPlans({
        userAge: userAge,
      });

      if (response.success && Array.isArray(response.data)) {
        // Filter plans based on user's age eligibility
        const eligiblePlans = response.data.filter((plan) => {
          return (
            userAge >= plan.eligibilityAgeMin &&
            userAge <= plan.eligibilityAgeMax
          );
        });

        console.log("Fetched health plans:", eligiblePlans);
        setPlans(eligiblePlans);
      } else if (
        response.success &&
        response.data &&
        Array.isArray(response.data.plans)
      ) {
        // Handle paginated response
        const eligiblePlans = response.data.plans.filter((plan) => {
          return (
            userAge >= plan.eligibilityAgeMin &&
            userAge <= plan.eligibilityAgeMax
          );
        });
        setPlans(eligiblePlans);
      } else {
        console.log("No health plans found in API response");
        setPlans([]);
      }
    } catch (err) {
      console.error("Error fetching health plans:", err);
      setError("Failed to load health insurance plans. Please try again.");
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
      premium = calculatePremiumForAge(plan, userAge);
    } else {
      premium = plan.annualPremium;
    }

    updateFormData("premiumAmount", premium);
    updateFormData(
      "insuranceProvider",
      plan.company?.name || "Unknown Provider"
    );

    // Set default cover type based on plan
    updateFormData("coverType", plan.coverType || "individual");
  };

  const calculatePremiumForAge = (plan, age) => {
    if (plan.premiumStructure === "fixed" && plan.annualPremium !== null) {
      return plan.annualPremium;
    }

    if (plan.premiumStructure === "age-based" && plan.premiumsByAgeRange) {
      try {
        const premiums = JSON.parse(plan.premiumsByAgeRange);

        // Find the matching age range
        for (const range in premiums) {
          if (isAgeInRange(age, range)) {
            return premiums[range];
          }
        }
      } catch (error) {
        console.error("Error parsing premiums by age range:", error);
      }
    }

    return plan.annualPremium || 0;
  };

  const isAgeInRange = (age, range) => {
    if (range.includes("-")) {
      const [min, max] = range
        .split("-")
        .map((part) => parseInt(part.trim(), 10));
      return age >= min && age <= max;
    } else if (range.includes("+")) {
      const min = parseInt(range.replace("+", "").trim(), 10);
      return age >= min;
    } else {
      const exactAge = parseInt(range.trim(), 10);
      return age === exactAge;
    }
  };

  const handleContinue = () => {
    if (selectedPlan) {
      nextStep();
    }
  };

  const handleDownloadPlanDetails = (plan) => {
    // Create a detailed plan information object
    const planDetails = {
      planName: plan.name,
      company: plan.company?.name || "Insurance Company",
      description: plan.description || "No description available",
      planType: plan.planType,
      inpatientCoverage: formatCurrency(plan.inpatientCoverageLimit),
      outpatientCoverage: formatCurrency(plan.outpatientCoverageLimit),
      premiumAmount: formatCurrency(calculatePremiumForAge(plan, userAge)),
      ageRange: `${plan.eligibilityAgeMin} - ${plan.eligibilityAgeMax} years`,
      userAge: userAge,
    };

    // Create premium details text
    let premiumDetailsText = "";
    if (plan.premiumStructure === "fixed") {
      premiumDetailsText = `Annual Premium: ${formatCurrency(
        plan.annualPremium
      )}`;
    } else if (plan.premiumStructure === "age-based") {
      premiumDetailsText = `Age-Based Premium Structure (Your premium for age ${userAge}): ${planDetails.premiumAmount}`;
    }

    // Create a simple text content for download
    const content = `
HEALTH INSURANCE PLAN DETAILS

Plan Name: ${planDetails.planName}
Insurance Company: ${planDetails.company}
Plan Type: ${planDetails.planType}
Your Age: ${planDetails.userAge} years

COVERAGE DETAILS:
- Inpatient Coverage: ${planDetails.inpatientCoverage}
- Outpatient Coverage: ${planDetails.outpatientCoverage}
- Age Eligibility: ${planDetails.ageRange}
- Premium Structure: ${
      plan.premiumStructure === "fixed" ? "Fixed" : "Age-based"
    }
${premiumDetailsText}

DESCRIPTION:
${planDetails.description}

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
    )}_Health_Plan_Details.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderPlanCard = (plan) => {
    const isSelected = selectedPlan?.id === plan.id;
    const premium = calculatePremiumForAge(plan, userAge);

    return (
      <motion.div
        key={plan.id}
        className={`relative rounded-xl border-2 p-2 md:p-4 lg:p-6 cursor-pointer transition-all duration-200 ${
          isSelected
            ? "border-primary-500 bg-primary-50 shadow-lg"
            : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
        }`}
        onClick={() => handleSelectPlan(plan)}
      >
        {/* Selected indicator */}
        {isSelected && (
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
                  src={`/public/${plan.company?.logoUrl || "logo.png"}`}
                  alt={plan.company?.name || "Insurance Company"}
                  className="w-20 h-14 object-contain rounded-lg bg-gray-50 p-2"
                  onError={(e) => {
                    e.target.style.display = "none";
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
                Inpatient Coverage
              </div>
              <div className="text-lg lg:text-xl font-lexend font-bold text-gray-600">
                {formatCurrency(plan.inpatientCoverageLimit)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Outpatient: {formatCurrency(plan.outpatientCoverageLimit)}
              </div>
            </div>

            <div className="rounded-lg px-2 py-2.5 md:py-0 w-full">
              <div className="text-sm text-primary-600 font-medium md:mb-1">
                Annual Premium
              </div>
              <div className="text-lg lg:text-xl font-lexend font-bold text-primary-600">
                {formatCurrency(premium)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Age: {plan.eligibilityAgeMin}-{plan.eligibilityAgeMax} yrs
              </div>
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
          className={`w-full px-6 py-2.5 mt-2 rounded-lg font-medium transition-colors ${
            isSelected
              ? "bg-primary-600 text-white"
              : "bg-gray-200 border border-gray-300 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectPlan(plan);
          }}
        >
          {isSelected
            ? "Selected. Click Continue to proceed"
            : "Select this Plan"}
        </button>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <TbLoader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-neutral-700 mb-2">
          Finding Health Plans
        </h3>
        <p className="text-neutral-600">
          Searching for health insurance plans available for your age...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TbInfoCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-700 mb-2">
          Failed to Load Plans
        </h3>
        <p className="text-neutral-600 mb-4">{error}</p>
        <button
          onClick={fetchHealthPlans}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <TbRefresh className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">2.</span>
          <span className="">Choose Your Health Insurance Plan</span>
        </h3>

        {/* Help Options */}
        <div className="mt-3">
          <p className="text-gray-600 text-sm md:text-base">
            Not sure which plan to choose?
            <a
              href="tel:+2547206363638"
              className="text-secondary-600 px-2 font-medium underline underline-offset-2"
            >
              Talk to an agent
            </a>
            for personalized advice or use our
            <Link
              to="/compare"
              target="_blank"
              className="text-secondary-600 px-2 font-medium underline underline-offset-2"
            >
              comparison tool
            </Link>
            to view detailed benefits.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan) => renderPlanCard(plan))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <p className="text-gray-600">
              No health insurance plans available for age {userAge}.
            </p>
            <button
              onClick={fetchHealthPlans}
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
