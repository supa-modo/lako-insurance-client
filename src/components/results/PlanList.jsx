import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiArrowRight, FiCheck, FiShield } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import {
  TbBuildingHospital,
  TbCheck,
  TbCoins,
  TbShieldCheck,
  TbStethoscope,
} from "react-icons/tb";
import PropTypes from "prop-types";

const PlanList = ({ plans, onSelectPlan, formatCurrency, activePlanId }) => {
  // Sort plans by rank
  const sortedPlans = [...plans].sort((a, b) => a.rank - b.rank);

  // Use provided formatCurrency or define a default one
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

  return (
    <div className="space-y-5">
      <h2 className="text-lg sm:text-xl pl-3  sm:pl-3 font-semibold text-white mb-4 font-outfit flex items-center">
        <FaRegThumbsUp className="mr-3 text-secondary-400" />
        Recommended Plans for You
      </h2>

      <div className="space-y-4">
        {sortedPlans.map((planResult, index) => {
          const plan = planResult.plan;
          const isTopPlan = index === 0;
          const isActivePlan =
            activePlanId &&
            (plan.id === activePlanId || planResult.id === activePlanId);

          // Handle different premium formats (flat rate vs age-based)
          const displayPremium =
            typeof plan.premium === "object"
              ? plan.premium[Object.keys(plan.premium)[0]] // Show first age bracket premium
              : plan.premium;

          return (
            <div
              key={plan.id || index}
              className={`relative bg-white/10 backdrop-blur-sm border rounded-xl overflow-hidden shadow-lg transition-all duration-300 group hover:shadow-xl ${
                isActivePlan
                  ? "border-primary-400 ring-1 ring-primary-400"
                  : isTopPlan
                  ? "border-secondary-400 ring-1 ring-secondary-400"
                  : "border-white/20 hover:border-secondary-400/40"
              } cursor-pointer`}
              onClick={() => onSelectPlan(planResult)}
            >
              {isTopPlan && (
                <div className="absolute top-0 right-0">
                  <div className="bg-secondary-500 text-white text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] font-semibold px-3 py-1 tracking-wide uppercase rounded-bl-lg font-outfit flex items-center">
                    <FiAward className="mr-1" size={16} /> Best Match
                  </div>
                </div>
              )}

              {isActivePlan && (
                <div className="absolute top-0 left-0">
                  <div className="bg-primary-400 text-white text-[0.55rem]  font-semibold px-3 py-0.5 tracking-wide uppercase rounded-br-lg font-outfit">
                    Current Selection
                  </div>
                </div>
              )}

              <div className="p-4 pt-6">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center w-[65%] md:w-auto">
                    <div className="w-14 h-12 flex items-center justify-center rounded-lg bg-white overflow-hidden mr-3 md:mr-4 flex-shrink-0">
                      <img
                        src={plan.companyLogo || "/insurance-placeholder.png"}
                        alt={plan.companyName || "Insurance Company"}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.target.src = "/insurance-placeholder.png";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg leading-tight group-hover:text-secondary-300 transition-colors">
                          {plan.name || "Insurance Plan"}
                        </h3>
                        <span className="ml-2 bg-primary-500/40 text-primary-300 text-[0.7rem] font-medium px-2 py-0.5 rounded-md">
                          {plan.tier || plan.planType}
                        </span>
                      </div>
                      <p className="text-neutral-300 text-[0.78rem] sm:text-sm truncate">
                        {plan.companyName || "Insurance Company"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center w-[35%] md:w-auto justify-end">
                    <div className="text-right">
                      <div className="text-base sm:text-lg md:text-xl font-semibold text-primary-300 font-outfit">
                        {formatCurrencyFn(displayPremium || 50000)}
                      </div>
                      <div className="text-neutral-400 text-[0.7rem]">
                        {typeof plan.premium === "object"
                          ? "starting at"
                          : "per year"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-1 md:gap-4">
                    <div className="col-span-1">
                      <div className="flex items-center mb-1 text-xs text-neutral-400">
                        <TbShieldCheck className="mr-1 text-secondary-400" />
                        <p>Inpatient</p>
                      </div>
                      <p className="text-sm text-white font-medium">
                        {formatCurrencyFn(
                          plan.inpatientCoverageLimit || 1000000
                        )}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center mb-1 text-xs text-neutral-400">
                        <TbStethoscope className="mr-1 text-secondary-400" />
                        <p>Outpatient</p>
                      </div>
                      <p className="text-sm text-white font-medium">
                        {formatCurrencyFn(
                          plan.outpatientCoverageLimit || 100000
                        )}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center mb-1 text-xs text-neutral-400">
                        <TbBuildingHospital className="mr-1 text-secondary-400" />
                        <p>Room Type</p>
                      </div>
                      <p className="text-sm text-white font-medium">
                        {plan.roomRate || "Standard"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-1">
                    {/* Key benefits to highlight */}
                    <div className="flex items-start">
                      <TbCheck className="text-secondary-400 mr-1.5 mt-0.5 shrink-0" />
                      <p className="text-xs text-neutral-300">
                        Last Expense:{" "}
                        {formatCurrencyFn(plan.lastExpenseCover || 50000)}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <TbCheck className="text-secondary-400 mr-1.5 mt-0.5 shrink-0" />
                      <p className="text-xs text-neutral-300">
                        {plan.bedLimit
                          ? `Bed Limit: ${plan.bedLimit}`
                          : "Pre-existing Conditions Cover"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <TbCoins className="mr-1 text-secondary-400" />
                        <div className="w-16 h-2 bg-white/20 rounded-full mr-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600"
                            style={{
                              width: `${Math.min(
                                (planResult.score || 0.8) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs md:text-sm text-white font-medium">
                          {Math.round((planResult.score || 0.8) * 100)}% Match
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlan(planResult);
                      }}
                      className="inline-flex items-center justify-center px-3 py-1 bg-secondary-500/80 hover:bg-secondary-400 text-white text-xs font-medium rounded-full transition-colors"
                    >
                      View Details <FiArrowRight className="ml-1" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

PlanList.propTypes = {
  plans: PropTypes.array.isRequired,
  onSelectPlan: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func,
  activePlanId: PropTypes.string,
};

export default PlanList;
