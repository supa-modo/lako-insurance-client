import React from "react";
import {
  FiX,
  FiArrowLeft,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { TbCheck, TbClockDollar, TbMailFilled, TbPhone, TbPhoneCall, TbShieldHalfFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";

const PlanDetails = ({ plan, formatCurrency, onRequestCallback, onBack }) => {
  if (!plan) return null;

  // Default formatCurrency if not provided
  const formatCurrencyFn =
    formatCurrency ||
    ((amount) => {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }).format(amount);
    });

  // Coverage Card Component
  const CoverageCard = ({ title, amount, icon, color }) => (
    <div className="bg-primary-500/95 border-primary-500/20 backdrop-blur-sm px-4 py-2 sm:p-5 rounded-lg border transition-all duration-300 hover:shadow-md">
      <div className="flex items-center">
        <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-neutral-400 flex items-center justify-center mr-3 flex-shrink-0">
          {icon}
        </div>
        <div className="">
          <p className="text-xl sm:text-2xl font-bold text-secondary-400">
            {formatCurrencyFn(amount || 0)}
          </p>
          <h4 className=" text-neutral-400 text-xs sm:text-[0.83rem]">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Back button for mobile */}
      <motion.button
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
        className="md:hidden flex items-center text-white/80 hover:text-white mb-4 transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back to plan list
      </motion.button>

      {/* Back button for desktop */}
      <div className="hidden md:block">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center text-neutral-400 hover:text-secondary-500 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to plan list
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-secondary-700 to-secondary-600 p-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-secondary-600 font-bold">
                {plan.rank || 1}
              </div>
              <span className="text-white font-medium">
                Ranked #{plan.rank || 1} Match
              </span>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium">
              {plan.score ? Math.round(plan.score * 100) : 95}% Match Score
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-28 h-16 sm:w-36 sm:h-20 rounded-lg bg-neutral-200/50 border border-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={
                    plan.plan?.companyLogo ||
                    plan.companyLogo ||
                    "/insurance-placeholder.png"
                  }
                  alt={
                    plan.plan?.companyName ||
                    plan.companyName ||
                    "Insurance Company"
                  }
                  className="w-28 h-12 sm:w-36 sm:h-16 object-contain"
                  onError={(e) => {
                    e.target.src = "/insurance-placeholder.png";
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-600">
                  {plan.plan?.name || plan.planName || "Insurance Plan"}
                </h2>
                <p className="text-neutral-700">
                  {plan.plan?.company?.name ||
                    plan.companyName ||
                    "Insurance Company"}{" "}
                  • {plan.plan?.planType || plan.planType || "Standard"}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-center bg-secondary-50 rounded-lg px-4 sm:px-6 py-3 border border-secondary-100">
              <div className="text-xl sm:text-3xl font-bold text-secondary-700">
                {formatCurrencyFn(plan.plan?.premium || plan.premium || 50000)}
              </div>
              <p className="text-primary-600 font-medium text-xs sm:text-sm">
                Annual Premium
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 mb-8">
            <CoverageCard
              title="Inpatient Cover"
              amount={
                plan.plan?.inpatientCoverage ||
                plan.inpatientCoverage ||
                2000000
              }
              formatCurrency={formatCurrencyFn}
              icon={<TbShieldHalfFilled className="text-primary-600" size={20}/>}
              color="primary"
            />
            <CoverageCard
              title="Outpatient Cover"
              amount={
                plan.plan?.outpatientCoverage ||
                plan.outpatientCoverage ||
                200000
              }
              formatCurrency={formatCurrencyFn}
              icon={<FaUserDoctor className="text-primary-500" size={20} />}
              color="secondary"
            />
            <CoverageCard
              title="Last Expense Cover"
              amount={
                plan.plan?.lastExpenseCover || plan.lastExpenseCover || 100000
              }
              formatCurrency={formatCurrencyFn}
              icon={<TbClockDollar className="text-primary-500" size={20}/>}
              color="primary"
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <TbCheck className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-primary-600">
                Key Benefits
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Handle cases where benefits might come from different parts of the plan object */}
              {(plan.plan?.benefits || plan.benefits || []).map(
                (benefit, idx) => (
                  <div
                    key={benefit.id || idx}
                    className="flex items-start p-3 sm:p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <TbCheck className="text-green-600 mt-1 mr-3 shrink-0" />
                    <div>
                      <span className="font-semibold text-neutral-800">
                        {benefit.category || "Benefit"}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-700 mt-1">
                        {benefit.description ||
                          "Coverage details not available"}
                      </p>
                      {benefit.coverageLimit && (
                        <div className="text-xs text-neutral-500 mt-2 flex items-center">
                          <span className="font-medium">Limit:</span>
                          <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded-full">
                            {formatCurrencyFn(benefit.coverageLimit)}
                          </span>
                        </div>
                      )}
                      {benefit.waitingPeriod &&
                        benefit.waitingPeriod !== "None" && (
                          <p className="text-xs text-neutral-500 mt-1 flex items-center">
                            <span className="font-medium">Waiting period:</span>
                            <span className="ml-1 font-semibold text-neutral-800">
                              {benefit.waitingPeriod}
                            </span>
                          </p>
                        )}
                    </div>
                  </div>
                )
              )}

              {/* If no benefits available, show default message */}
              {((!plan.plan?.benefits && !plan.benefits) ||
                (plan.plan?.benefits || plan.benefits || []).length === 0) && (
                <div className="flex items-start p-4 bg-neutral-50 rounded-lg border border-neutral-200 col-span-2">
                  <FiInfo className="text-blue-500 mt-1 mr-3 shrink-0" />
                  <p className="text-sm text-neutral-600">
                    Detailed benefits information will be provided upon request.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FiX className="h-4 w-4 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600">
                Exclusions
              </h3>
            </div>
            <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-3 sm:p-4">
              <ul className="space-y-3">
                {(plan.plan?.exclusions || plan.exclusions || []).map(
                  (exclusion, idx) => (
                    <li key={exclusion.id || idx} className="flex items-start">
                      <FiX className="text-red-500 mt-1 mr-3 shrink-0" />
                      <span className="text-sm text-neutral-700">
                        {exclusion.exclusionText ||
                          "Exclusion details not available"}
                      </span>
                    </li>
                  )
                )}

                {/* If no exclusions available, show default message */}
                {((!plan.plan?.exclusions && !plan.exclusions) ||
                  (plan.plan?.exclusions || plan.exclusions || []).length ===
                    0) && (
                  <li className="flex items-start">
                    <FiInfo className="text-blue-500 mt-1 mr-3 shrink-0" />
                    <span className="text-sm text-neutral-700">
                      Detailed exclusion information will be provided upon
                      request.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-50 border border-secondary-100 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 md:max-w-[50%]">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2">
                Need Help With This Plan?
              </h3>
              <p className="text-neutral-700 text-sm sm:text-base">
                Our insurance experts are ready to answer any questions and help
                you get enrolled.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:+254700000000`}
                className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-md transition-all text-sm sm:text-base"
              >
                <TbPhoneCall className="mr-2" size={20} /> Call Expert
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn inline-flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 font-medium rounded-lg transition-all text-sm sm:text-base"
                onClick={onRequestCallback}
              >
                <TbMailFilled className="mr-2" size={20} /> Request Callback
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
