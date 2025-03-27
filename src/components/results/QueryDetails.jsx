import React from "react";
import { FiUser, FiCalendar, FiDollarSign, FiShield } from "react-icons/fi";

const QueryDetails = ({ report, userQuery, formatCurrency }) => {
  // Allow passing either report.userQuery or direct userQuery
  const queryData = userQuery || report?.userQuery;

  if (!queryData) return null;

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 divide-y divide-neutral-100">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-neutral-800 mb-1 font-outfit">
          Your Query Details
        </h3>
        <p className="text-sm text-neutral-500 font-outfit">
          Information you provided
        </p>
      </div>

      <div className="pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-neutral-600 flex items-center font-outfit">
            <FiUser className="mr-2 h-4 w-4 text-secondary-400" />
            Name:
          </span>
          <span className="font-medium text-neutral-800 font-outfit">
            {queryData.name || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-600 flex items-center font-outfit">
            <FiCalendar className="mr-2 h-4 w-4 text-secondary-400" />
            Age:
          </span>
          <span className="font-medium text-neutral-800 font-outfit">
            {queryData.age || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-600 flex items-center font-outfit">
            <FiDollarSign className="mr-2 h-4 w-4 text-secondary-400" />
            Budget:
          </span>
          <span className="font-medium text-neutral-800 font-outfit">
            {queryData.budget
              ? formatCurrencyFn(queryData.budget)
              : "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-600 flex items-center font-outfit">
            <FiShield className="mr-2 h-4 w-4 text-secondary-400" />
            Coverage:
          </span>
          <span className="font-medium text-neutral-800 font-outfit">
            {queryData.desiredCoverage
              ? queryData.desiredCoverage.charAt(0).toUpperCase() +
                queryData.desiredCoverage.slice(1)
              : "Not specified"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueryDetails;
