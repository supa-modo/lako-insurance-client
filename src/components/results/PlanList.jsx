import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiArrowRight, FiCheck, FiShield } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
const PlanList = ({ plans, onSelectPlan, formatCurrency }) => {
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
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 font-outfit flex items-center">
        <FaRegThumbsUp className="mr-3 text-secondary-400" />
        Recommended Plans for You
      </h2>

      <div className="space-y-4">
        {sortedPlans.map((planResult, index) => {
          const plan = planResult.plan;
          const isTopPlan = index === 0;

          return (
            <div
              key={plan.id || index}
              className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group hover:shadow-xl hover:border-secondary-400/40 ${
                isTopPlan ? "ring-2 ring-secondary-400" : ""
              }`}
            >
              {isTopPlan && (
                <div className="absolute top-0 right-0">
                  <div className="bg-secondary-500 text-white text-[0.7rem] font-semibold px-3 py-1 tracking-wide uppercase rounded-bl-lg font-outfit flex items-center">
                    <FiAward className="mr-1" size={16}/> Best Match
                  </div>
                </div>
              )}

              <div className="p-4 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center mb-3 md:mb-0 w-full md:w-auto">
                    <div className="w-14 h-12 flex items-center justify-center rounded-lg bg-white overflow-hidden mr-3 md:mr-4 flex-shrink-0">
                      <img
                        src={plan.company?.logo || "/insurance-placeholder.png"}
                        alt={plan.company?.name || "Insurance Company"}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.target.src = "/insurance-placeholder.png";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-base sm:text-lg leading-tight font-outfit group-hover:text-secondary-300 transition-colors truncate">
                        {plan.name || "Insurance Plan"}
                      </h3>
                      <p className="text-neutral-300 text-sm truncate">
                        {plan.company?.name || "Insurance Company"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center  w-auto justify-end">
                    <div className="text-right mr-4">
                      <div className="text-lg sm:text-xl font-semibold text-primary-200 font-outfit">
                        {formatCurrencyFn(plan.premium || 50000)}
                      </div>
                      <div className="text-neutral-400 text-xs">per year</div>
                    </div>
                    <button
                      onClick={() => onSelectPlan(planResult)}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary-500/80 hover:bg-secondary-400 text-white transition-colors flex-shrink-0"
                    >
                      <FiArrowRight />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-1 md:gap-4">
                    <div className="col-span-1">
                      <p className="text-xs text-neutral-400 mb-1">
                        Coverage Type
                      </p>
                      <p className="text-sm text-white font-medium">
                        {plan.planType || "Standard"}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-neutral-400 mb-1">
                        Inpatient Cover
                      </p>
                      <p className="text-sm text-white font-medium">
                        {formatCurrencyFn(
                          plan.inpatientCoverageLimit || 2000000
                        )}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-neutral-400 mb-1">
                        Match Score
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-2 bg-white/20 rounded-full mr-2">
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
                        <span className="text-sm text-white font-medium">
                          {Math.round((planResult.score || 0.8) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {plan.benefits && plan.benefits.length > 0
                      ? plan.benefits.slice(0, 2).map((benefit, idx) => (
                          <div
                            key={benefit.id || idx}
                            className="flex items-start"
                          >
                            <FiCheck className="text-secondary-400 mr-1.5 mt-0.5 shrink-0" />
                            <p className="text-xs text-neutral-300">
                              {benefit.category ||
                                benefit.description ||
                                "Benefit"}
                            </p>
                          </div>
                        ))
                      : [1, 2].map((idx) => (
                          <div key={idx} className="flex items-start">
                            <FiCheck className="text-secondary-400 mr-1.5 mt-0.5 shrink-0" />
                            <p className="text-xs text-neutral-300">
                              {idx === 1
                                ? "Inpatient Coverage"
                                : "Outpatient Coverage"}
                            </p>
                          </div>
                        ))}
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

export default PlanList;
