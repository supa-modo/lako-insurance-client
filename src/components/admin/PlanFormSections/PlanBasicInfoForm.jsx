import React from "react";
import { TbInfoCircle } from "react-icons/tb";

const PlanBasicInfoForm = ({ formData, handleChange, companies, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Plan Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.name
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              } focus:outline-none focus:ring-1`}
              placeholder="Enter plan name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Insurance Company */}
          <div>
            <label
              htmlFor="companyId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Insurance Company
            </label>
            <select
              id="companyId"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.companyId
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              } focus:outline-none focus:ring-1`}
            >
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="mt-1 text-sm text-red-500">{errors.companyId}</p>
            )}
          </div>

          {/* Plan Type */}
          <div>
            <label
              htmlFor="planType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Plan Type
            </label>
            <select
              id="planType"
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.planType
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              } focus:outline-none focus:ring-1`}
            >
              <option value="">Select plan type</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Diamond">Diamond</option>
            </select>
            {errors.planType && (
              <p className="mt-1 text-sm text-red-500">{errors.planType}</p>
            )}
          </div>

          {/* Premium Amount */}
          <div>
            <label
              htmlFor="premiumAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Annual Premium Amount (KES)
            </label>
            <input
              type="number"
              id="premiumAmount"
              name="premiumAmount"
              value={formData.premiumAmount}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.premiumAmount
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              } focus:outline-none focus:ring-1`}
              placeholder="Enter annual premium amount"
            />
            {errors.premiumAmount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.premiumAmount}
              </p>
            )}
          </div>

          {/* Minimum Age */}
          <div>
            <label
              htmlFor="eligibilityAgeMin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Minimum Eligible Age
            </label>
            <input
              type="number"
              id="eligibilityAgeMin"
              name="eligibilityAgeMin"
              value={formData.eligibilityAgeMin}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.eligibilityAgeMin
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              } focus:outline-none focus:ring-1`}
              min="0"
              max="120"
            />
            {errors.eligibilityAgeMin && (
              <p className="mt-1 text-sm text-red-500">
                {errors.eligibilityAgeMin}
              </p>
            )}
          </div>

          {/* Maximum Age */}
          <div>
            <label
              htmlFor="eligibilityAgeMax"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Maximum Eligible Age
            </label>
            <input
              type="number"
              id="eligibilityAgeMax"
              name="eligibilityAgeMax"
              value={formData.eligibilityAgeMax}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.eligibilityAgeMax
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              } focus:outline-none focus:ring-1`}
              min="0"
              max="120"
            />
            {errors.eligibilityAgeMax && (
              <p className="mt-1 text-sm text-red-500">
                {errors.eligibilityAgeMax}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <TbInfoCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              About Basic Information
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                This section captures the fundamental details of the insurance
                plan. Make sure to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Choose a clear, descriptive name for the plan</li>
                <li>Select the correct insurance company</li>
                <li>Set appropriate age limits for eligibility</li>
                <li>Specify the annual premium amount</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanBasicInfoForm;
