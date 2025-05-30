import React from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbInfoCircle,
  TbCheck,
  TbBuilding,
  TbCalendar,
  TbMapPin,
  TbEye,
} from "react-icons/tb";

const PlanDetailModal = ({ plan, onClose }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-green-50 px-6 py-4 border-b border-green-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TbEye className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h2 className="text-xl font-bold text-green-900">
                  {plan?.name}
                </h2>
                <p className="text-sm text-green-700">Insurance Plan Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
            >
              <TbX className="h-5 w-5 text-green-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbInfoCircle className="mr-2 h-5 w-5 text-green-600" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Company
                  </label>
                  <div className="flex items-center">
                    <TbBuilding className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {plan?.InsuranceCompany?.name || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Type
                  </label>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      plan?.planType === "Diamond"
                        ? "bg-purple-100 text-purple-800"
                        : plan?.planType === "Platinum"
                        ? "bg-gray-100 text-gray-800"
                        : plan?.planType === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : plan?.planType === "Silver"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {plan?.planType || "N/A"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Type
                  </label>
                  <span className="text-gray-900 capitalize">
                    {plan?.insuranceType || "N/A"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Created Date
                  </label>
                  <div className="flex items-center">
                    <TbCalendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {plan?.createdAt
                        ? new Date(plan.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Age Eligibility */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbUsers className="mr-2 h-5 w-5 text-green-600" />
                Age Eligibility
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Age
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.eligibilityAgeMin || "N/A"} years
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Age
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.eligibilityAgeMax || "N/A"} years
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Renewal Age Limit
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.renewalAgeLimit
                      ? `${plan.renewalAgeLimit} years`
                      : "No limit"}
                  </span>
                </div>
              </div>
            </div>

            {/* Coverage Limits */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbShieldCheck className="mr-2 h-5 w-5 text-green-600" />
                Coverage Limits
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inpatient Coverage
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.inpatientCoverageLimit
                      ? formatCurrency(plan.inpatientCoverageLimit)
                      : "N/A"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outpatient Coverage
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.outpatientCoverageLimit
                      ? formatCurrency(plan.outpatientCoverageLimit)
                      : "N/A"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Expense Cover
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.lastExpenseCover
                      ? formatCurrency(plan.lastExpenseCover)
                      : "N/A"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Limit
                  </label>
                  <span className="text-gray-900 text-lg font-semibold">
                    {plan?.bedLimit || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Additional Benefits
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Dental Coverage */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TbCheck
                      className={`h-4 w-4 mr-2 ${
                        plan?.hasDental ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Dental Coverage
                    </label>
                  </div>
                  {plan?.hasDental ? (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        Limit:{" "}
                        {plan?.dentalCoverageLimit
                          ? formatCurrency(plan.dentalCoverageLimit)
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Premium:{" "}
                        {plan?.dentalPremium
                          ? formatCurrency(plan.dentalPremium)
                          : "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {plan?.dentalCoveredInBase
                          ? "Covered in base premium"
                          : "Additional premium required"}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not available</span>
                  )}
                </div>

                {/* Optical Coverage */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TbCheck
                      className={`h-4 w-4 mr-2 ${
                        plan?.hasOptical ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Optical Coverage
                    </label>
                  </div>
                  {plan?.hasOptical ? (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        Limit:{" "}
                        {plan?.opticalCoverageLimit
                          ? formatCurrency(plan.opticalCoverageLimit)
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Premium:{" "}
                        {plan?.opticalPremium
                          ? formatCurrency(plan.opticalPremium)
                          : "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {plan?.opticalCoveredInBase
                          ? "Covered in base premium"
                          : "Additional premium required"}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not available</span>
                  )}
                </div>

                {/* Maternity Coverage */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TbCheck
                      className={`h-4 w-4 mr-2 ${
                        plan?.hasMaternity ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Maternity Coverage
                    </label>
                  </div>
                  {plan?.hasMaternity ? (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        Limit:{" "}
                        {plan?.maternityCoverageLimit
                          ? formatCurrency(plan.maternityCoverageLimit)
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Premium:{" "}
                        {plan?.maternityPremium
                          ? formatCurrency(plan.maternityPremium)
                          : "N/A"}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not available</span>
                  )}
                </div>
              </div>

              {/* COVID Coverage */}
              <div className="mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TbCheck
                      className={`h-4 w-4 mr-2 ${
                        plan?.hasCovidCoverage
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <label className="text-sm font-medium text-gray-700">
                      COVID-19 Coverage
                    </label>
                  </div>
                  {plan?.hasCovidCoverage ? (
                    <div className="text-sm text-gray-600">
                      Limit:{" "}
                      {plan?.covidCoverageLimit
                        ? formatCurrency(plan.covidCoverageLimit)
                        : "N/A"}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not available</span>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbCurrencyDollar className="mr-2 h-5 w-5 text-green-600" />
                Premium Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium Structure
                  </label>
                  <span className="text-gray-900 text-lg font-semibold capitalize">
                    {plan?.premiumStructure || "N/A"}
                  </span>
                </div>

                {plan?.premiumStructure === "fixed" ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Premium
                    </label>
                    <span className="text-gray-900 text-lg font-semibold">
                      {plan?.annualPremium
                        ? formatCurrency(plan.annualPremium)
                        : "N/A"}
                    </span>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age-Based Premiums
                    </label>
                    <div className="text-sm text-gray-600">
                      {plan?.premiumsByAgeRange ? (
                        <pre className="whitespace-pre-wrap font-mono text-xs">
                          {JSON.stringify(
                            JSON.parse(plan.premiumsByAgeRange),
                            null,
                            2
                          )}
                        </pre>
                      ) : (
                        "Not specified"
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other Settings */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Other Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Geographical Coverage
                  </label>
                  <div className="flex items-center">
                    <TbMapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {plan?.geographicalCoverage || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NHIF Benefits
                  </label>
                  <div className="flex items-center">
                    <TbCheck
                      className={`h-4 w-4 mr-2 ${
                        plan?.isNhifApplicable
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="text-gray-900">
                      {plan?.isNhifApplicable ? "Applicable" : "Not applicable"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlanDetailModal;
