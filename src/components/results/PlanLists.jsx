import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbShieldHalfFilled,
  TbStethoscope,
  TbBuildingHospital,
  TbCheck,
  TbTag,
  TbCoins,
  TbEye,
  TbChevronRight,
  TbShoppingBag,
  TbInfoCircle,
  TbEyeglass2,
} from "react-icons/tb";
import { PiTooth } from "react-icons/pi";
import { MdOutlineChildFriendly } from "react-icons/md";
import { BsFillCreditCardFill } from "react-icons/bs";

const PlanList = ({
  plans,
  formatCurrency,
  // onSelectPlan,
  onBuyPlan,
  activePlanId,
  userAge,
}) => {
  // State for tracking which plans have which optional covers enabled
  const [planOptions, setPlanOptions] = useState({});

  // Sort plans by rank or match score
  const sortedPlans = [...plans].sort((a, b) => {
    console.log(plans);
    const aRank = a.rank || 0;
    const bRank = b.rank || 0;
    return aRank - bRank;
  });

  // Format currency function fallback
  const formatCurrencyFn =
    formatCurrency ||
    ((amount) => {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    });

  // Toggle optional cover for a specific plan
  const toggleOptionalCover = (planId, coverType) => {
    setPlanOptions((prevOptions) => {
      // Initialize plan options if they don't exist
      const planCurrentOptions = prevOptions[planId] || {
        dental: false,
        optical: false,
        maternity: false,
      };

      // Toggle the specific cover
      return {
        ...prevOptions,
        [planId]: {
          ...planCurrentOptions,
          [coverType]: !planCurrentOptions[coverType],
        },
      };
    });
  };

  // Calculate the adjusted premium including optional covers
  const calculateAdjustedPremium = (plan, options = {}) => {
    // Extract the actual plan data if needed
    const planData = plan.plan || plan;
    const planId = planData.id || plan.id;

    // Get default premium for the user's age bracket
    let basePremium = 0;
    if (typeof planData.premium === "object") {
      // Find the right age bracket
      const ageBrackets = Object.keys(planData.premium);
      for (const bracket of ageBrackets) {
        const [min, max] = bracket.split("-").map(Number);
        if (userAge >= min && userAge <= max) {
          basePremium = planData.premium[bracket];
          break;
        }
      }

      // If no matching bracket, use the first one
      if (basePremium === 0 && ageBrackets.length > 0) {
        basePremium = planData.premium[ageBrackets[0]];
      }
    } else {
      basePremium = planData.premium || 50000;
    }

    // Get plan's optional covers
    const planCurrentOptions = planOptions[planId] || {
      dental: false,
      optical: false,
      maternity: false,
    };

    // Adjust premium based on selected optional covers
    let adjustedPremium = basePremium;

    if (planCurrentOptions.dental) {
      adjustedPremium += planData.dentalPremium || 10000;
    }

    if (planCurrentOptions.optical) {
      adjustedPremium += planData.opticalPremium || 8000;
    }

    if (planCurrentOptions.maternity) {
      adjustedPremium += planData.maternityPremium || 15000;
    }

    return adjustedPremium;
  };

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {sortedPlans.map((planResult, index) => {
          const plan = planResult.plan || planResult;
          const planId = plan.id || planResult.id;
          const isTopPlan = index === 0;
          const isActivePlan = activePlanId && planId === activePlanId;

          // Calculate the adjusted premium based on optional covers
          const adjustedPremium = calculateAdjustedPremium(plan);

          // Get the plan's current optional covers state
          const planCurrentOptions = planOptions[planId] || {
            dental: false,
            optical: false,
            maternity: false,
          };

          return (
            <div
              key={planId || index}
              className={`relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                isActivePlan
                  ? "border-l-primary-500"
                  : isTopPlan
                  ? "border-l-secondary-500"
                  : "border-l-gray-300"
              }`}
            >
              <div className="p-4">
                {/* Header section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-20 h-14 flex items-center justify-center rounded-lg bg-gray-100 border border-gray-200 overflow-hidden mr-3 flex-shrink-0">
                      <img
                        src={
                          `${plan.companyLogo}` || "/insurance-placeholder.png"
                        }
                        alt={plan.companyName || "Insurance Company"}
                        className="max-h-8 max-w-10 object-contain"
                        onError={(e) => {
                          e.target.src = "/insurance-placeholder.png";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base flex items-center">
                        {plan.name || "Insurance Plan"}
                        <span className="hidden sm:block ml-2 bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded">
                          {plan.tier || plan.planType || "Standard"}
                        </span>
                      </h3>
                      <p className="text-gray-600 font-lexend text-[0.75rem] sm:text-sm">
                        {plan.companyName || "Insurance Company"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-lexend font-bold text-secondary-600">
                      {formatCurrencyFn(adjustedPremium)}
                    </div>
                    <div className="text-xs text-gray-500">annual premium</div>
                  </div>
                </div>

                {/* Coverage details */}
                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-3 rounded-lg mb-4">
                  <div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <span>Inpatient</span>
                    </div>
                    <p className="text-sm font-semibold font-lexend text-gray-800">
                      {formatCurrencyFn(plan.inpatientCoverageLimit || 1000000)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <span>Outpatient</span>
                    </div>
                    <p className="text-sm font-semibold font-lexend text-gray-800">
                      {formatCurrencyFn(plan.outpatientCoverageLimit || 100000)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <span>Room Type</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {plan.roomRate || plan.bedLimit || "Standard"}
                    </p>
                  </div>
                </div>

                {/* Optional covers */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <TbCoins className="text-primary-500 mr-1 h-4 w-4" />
                    <span className="text-sm font-medium text-gray-700">
                      Optional Covers
                    </span>
                    <span className="ml-1 text-[0.8rem] text-gray-500">
                      (click to add or remove)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleOptionalCover(planId, "dental")}
                      className={`flex items-center px-4 py-1 rounded-full text-xs sm:text-[0.78rem] font-medium transition-colors ${
                        planCurrentOptions.dental
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      <PiTooth className="mr-1 h-4 w-4" />
                      Dental
                      {planCurrentOptions.dental && (
                        <TbCheck className="ml-1" />
                      )}
                      <span className="ml-1 opacity-75">
                        (+{formatCurrencyFn(plan.dentalPremium || 10000)})
                      </span>
                    </button>

                    <button
                      onClick={() => toggleOptionalCover(planId, "optical")}
                      className={`flex items-center px-4 py-1 rounded-full text-xs sm:text-[0.78rem] font-medium transition-colors ${
                        planCurrentOptions.optical
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      <TbEyeglass2 className="mr-1 h-4 w-4" />
                      Optical
                      {planCurrentOptions.optical && (
                        <TbCheck className="ml-1" />
                      )}
                      <span className="ml-1 opacity-75">
                        (+{formatCurrencyFn(plan.opticalPremium || 8000)})
                      </span>
                    </button>

                    {/* <button
                      onClick={() => toggleOptionalCover(planId, "maternity")}
                      disabled={true}
                      className="flex items-center px-3 py-1 rounded-full text-xs font-medium font-strikethrough bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                      title="Not available for senior plans"
                    >
                      <MdOutlineChildFriendly className="mr-1 h-4 w-4" />
                      <span className="line-through">Maternity</span>
                      <TbInfoCircle className="ml-1" />
                    </button> */}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <button
                    // onClick={() => onBuyPlan && onBuyPlan(planResult)}
                    className="px-3 py-1.5 bg-secondary-600 font-medium text-white text-sm rounded-lg hover:bg-secondary-700 transition-colors flex items-center"
                  >
                    <BsFillCreditCardFill className="mr-1" size={14} />
                    Buy this Plan
                    <TbChevronRight className="ml-1" size={14} />
                  </button>

                  <button
                    // onClick={() => onSelectPlan(planResult)}
                    className="px-3 py-1.5 border border-primary-500 bg-white font-medium text-primary-600 text-sm rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    View Plan Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanList;
