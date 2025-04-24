import React from "react";
import { TbInfoCircle, TbCurrencyDollar, TbCheck } from "react-icons/tb";
import { PiCaretDownDuotone } from "react-icons/pi";

const PlanCoverageForm = ({
  formData,
  handleChange,
  handleNumericChange,
  errors,
}) => {
  // Format currency for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Bed limit options
  const bedLimitOptions = [
    { value: "", label: "Select Bed Limit" },
    { value: "Standard Ward", label: "Standard Ward" },
    { value: "Semi-Private Room", label: "Semi-Private Room" },
    { value: "Private Room", label: "Private Room" },
    { value: "VIP Suite", label: "VIP Suite" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary-700 mb-3 flex items-center">
        <TbCurrencyDollar className="mr-2" /> Coverage Details
      </h3>

      {/* Inpatient Coverage */}
      <div>
        <label
          htmlFor="inpatientCoverageLimit"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Inpatient Coverage Limit <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">KES</span>
          </div>
          <input
            type="text"
            id="inpatientCoverageLimit"
            name="inpatientCoverageLimit"
            value={formData.inpatientCoverageLimit.toLocaleString()}
            onChange={handleNumericChange}
            className={`w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border ${
              errors.inpatientCoverageLimit
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            } focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors`}
            placeholder="0"
          />
        </div>
        {errors.inpatientCoverageLimit && (
          <p className="mt-1 text-red-500 text-xs flex items-center">
            <TbInfoCircle className="mr-1" />
            {errors.inpatientCoverageLimit}
          </p>
        )}
      </div>

      {/* Outpatient Coverage */}
      <div>
        <label
          htmlFor="outpatientCoverageLimit"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Outpatient Coverage Limit
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">KES</span>
          </div>
          <input
            type="text"
            id="outpatientCoverageLimit"
            name="outpatientCoverageLimit"
            value={formData.outpatientCoverageLimit.toLocaleString()}
            onChange={handleNumericChange}
            className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="0"
          />
        </div>
      </div>

      {/* Bed Limit */}
      <div>
        <label
          htmlFor="bedLimit"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hospital Bed Limit
        </label>
        <div className="relative">
          <select
            id="bedLimit"
            name="bedLimit"
            value={formData.bedLimit}
            onChange={handleChange}
            className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 px-4 py-2 rounded-lg border border-gray-300 appearance-none focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            {bedLimitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <PiCaretDownDuotone className="absolute right-4 top-0 bottom-0 my-auto h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Last Expense Cover */}
      <div>
        <label
          htmlFor="lastExpenseCover"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last Expense Cover
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">KES</span>
          </div>
          <input
            type="text"
            id="lastExpenseCover"
            name="lastExpenseCover"
            value={formData.lastExpenseCover?.toLocaleString()}
            onChange={handleNumericChange}
            className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="0"
          />
        </div>
      </div>

      {/* Optional Coverage Types */}
      <div className="space-y-4 bg-neutral-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-md font-medium text-primary-700">
          Optional Coverage Types
        </h4>

        {/* Dental Coverage */}
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="hasDental"
                name="hasDental"
                checked={formData.hasDental}
                onChange={handleChange}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-md transition-colors cursor-pointer opacity-0 absolute"
              />
              <div
                className={`h-5 w-5 rounded border flex items-center justify-center ${
                  formData.hasDental
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {formData.hasDental && (
                  <TbCheck className="text-white w-4 h-4" />
                )}
              </div>
            </div>
            <label
              htmlFor="hasDental"
              className="ml-3 block text-sm text-gray-700 cursor-pointer font-medium"
            >
              Dental Coverage
            </label>
          </div>

          {formData.hasDental && (
            <div className="ml-6">
              <label
                htmlFor="dentalCoverageLimit"
                className="block text-sm text-gray-600 mb-1"
              >
                Dental Coverage Limit
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">KES</span>
                </div>
                <input
                  type="text"
                  id="dentalCoverageLimit"
                  name="dentalCoverageLimit"
                  value={formData.dentalCoverageLimit?.toLocaleString()}
                  onChange={handleNumericChange}
                  className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Optical Coverage */}
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="hasOptical"
                name="hasOptical"
                checked={formData.hasOptical}
                onChange={handleChange}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-md transition-colors cursor-pointer opacity-0 absolute"
              />
              <div
                className={`h-5 w-5 rounded border flex items-center justify-center ${
                  formData.hasOptical
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {formData.hasOptical && (
                  <TbCheck className="text-white w-4 h-4" />
                )}
              </div>
            </div>
            <label
              htmlFor="hasOptical"
              className="ml-3 block text-sm text-gray-700 cursor-pointer font-medium"
            >
              Optical Coverage
            </label>
          </div>

          {formData.hasOptical && (
            <div className="ml-6">
              <label
                htmlFor="opticalCoverageLimit"
                className="block text-sm text-gray-600 mb-1"
              >
                Optical Coverage Limit
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">KES</span>
                </div>
                <input
                  type="text"
                  id="opticalCoverageLimit"
                  name="opticalCoverageLimit"
                  value={formData.opticalCoverageLimit?.toLocaleString()}
                  onChange={handleNumericChange}
                  className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Maternity Coverage */}
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="hasMaternity"
                name="hasMaternity"
                checked={formData.hasMaternity}
                onChange={handleChange}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-md transition-colors cursor-pointer opacity-0 absolute"
              />
              <div
                className={`h-5 w-5 rounded border flex items-center justify-center ${
                  formData.hasMaternity
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {formData.hasMaternity && (
                  <TbCheck className="text-white w-4 h-4" />
                )}
              </div>
            </div>
            <label
              htmlFor="hasMaternity"
              className="ml-3 block text-sm text-gray-700 cursor-pointer font-medium"
            >
              Maternity Coverage
            </label>
          </div>

          {formData.hasMaternity && (
            <div className="ml-6">
              <label
                htmlFor="maternityCoverageLimit"
                className="block text-sm text-gray-600 mb-1"
              >
                Maternity Coverage Limit
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">KES</span>
                </div>
                <input
                  type="text"
                  id="maternityCoverageLimit"
                  name="maternityCoverageLimit"
                  value={formData.maternityCoverageLimit?.toLocaleString()}
                  onChange={handleNumericChange}
                  className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>

        {/* COVID-19 Coverage */}
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="hasCovidCoverage"
                name="hasCovidCoverage"
                checked={formData.hasCovidCoverage}
                onChange={handleChange}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-md transition-colors cursor-pointer opacity-0 absolute"
              />
              <div
                className={`h-5 w-5 rounded border flex items-center justify-center ${
                  formData.hasCovidCoverage
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {formData.hasCovidCoverage && (
                  <TbCheck className="text-white w-4 h-4" />
                )}
              </div>
            </div>
            <label
              htmlFor="hasCovidCoverage"
              className="ml-3 block text-sm text-gray-700 cursor-pointer font-medium"
            >
              COVID-19 Coverage
            </label>
          </div>

          {formData.hasCovidCoverage && (
            <div className="ml-6">
              <label
                htmlFor="covidCoverageLimit"
                className="block text-sm text-gray-600 mb-1"
              >
                COVID-19 Coverage Limit
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">KES</span>
                </div>
                <input
                  type="text"
                  id="covidCoverageLimit"
                  name="covidCoverageLimit"
                  value={formData.covidCoverageLimit?.toLocaleString()}
                  onChange={handleNumericChange}
                  className="w-full font-medium text-[0.95rem] bg-neutral-100 text-neutral-800 pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCoverageForm;
