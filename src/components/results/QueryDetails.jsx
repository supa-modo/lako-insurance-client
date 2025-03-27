import React from "react";
import { FiUser, FiCalendar, FiDollarSign, FiShield } from "react-icons/fi";
import { PiUserDuotone } from "react-icons/pi";
import { TbCalendarSmile, TbCoins, TbShieldHalfFilled } from "react-icons/tb";

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
    <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 divide-y divide-neutral-100 font-outfit">
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-bold text-primary-600 mb-1 ">
          Your Query Details
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 ">
          Contact Information you provided
        </p>
      </div>

      <div className="pt-2 sm:pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-neutral-700 text-sm sm:text-base flex items-center ">
            <PiUserDuotone className="mr-2 h-4 w-4 text-secondary-400" />
            Name:
          </span>
          <span className="font-medium text-sm sm:text-base text-neutral-800 ">
            {queryData.name || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-700 text-sm sm:text-base flex items-center ">
            <TbCalendarSmile className="mr-2 h-4 w-4 text-secondary-400" />
            Age:
          </span>
          <span className="font-medium text-sm sm:text-base text-neutral-800 ">
            {queryData.age || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-700 text-sm sm:text-base flex items-center ">
            <TbCoins className="mr-2 h-4 w-4 text-secondary-400" />
            Budget:
          </span>
          <span className="font-medium text-sm sm:text-base text-neutral-800 ">
            {queryData.budget
              ? formatCurrencyFn(queryData.budget)
              : "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-700 text-sm sm:text-base flex items-center ">
            <TbShieldHalfFilled className="mr-2 h-4 w-4 text-secondary-400" />
            Coverage:
          </span>
          <span className="font-medium text-sm sm:text-base text-neutral-800 ">
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
