import React from "react";
import {
  TbCalendarStar,
  TbCoins,
  TbShieldHalfFilled,
  TbBuildingHospital,
  TbBox,
  TbUser,
  TbPhone,
} from "react-icons/tb";
import { PiUserDuotone } from "react-icons/pi";

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

  // Map coverage values to human-readable labels
  const coverageLabels = {
    basic: "Basic Coverage",
    standard: "Standard Coverage",
    enhanced: "Enhanced Coverage",
    premium: "Premium Coverage",
    executive: "Executive Coverage",
    royal: "Royal Coverage",
  };

  // Map room types to human-readable labels
  const roomTypeLabels = {
    general: "General Ward",
    private: "Standard Private Room",
    deluxe: "Deluxe Private Room",
    ensuite: "Ensuite / Executive Room",
  };

  // Create an array of selected optional covers
  const selectedCovers = Array.isArray(queryData.optionalCovers)
    ? queryData.optionalCovers.map((cover) => {
        const labelMap = {
          outpatient: "Outpatient Cover",
          dental: "Dental Cover",
          optical: "Optical Cover",
          maternity: "Maternity Cover",
          covid: "Enhanced Covid-19 Cover",
          lastExpense: "Last Expense Cover",
        };
        return labelMap[cover] || cover;
      })
    : [];

  const formatPhoneNumber = (phone) => {
    // Add +254 prefix if not already included
    if (!phone) return "";
    if (phone.startsWith("+")) return phone;
    if (phone.length === 9) return `+254 ${phone}`;
    return phone;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg divide-y divide-white/10 font-outfit">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              Your Query Details
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Your preferences used for plan recommendations
            </p>
          </div>
          {(queryData.fullName ||
            queryData.name ||
            queryData.phoneNumber ||
            queryData.phone) && (
            <div className="mt-2 sm:mt-0 px-3 py-2 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <PiUserDuotone className="h-8 w-8 text-secondary-400" />
                <div className="flex flex-col">
                  {(queryData.fullName || queryData.name) && (
                    <span className="text-white text-sm sm:text-base font-medium">
                      {queryData.fullName || queryData.name}
                    </span>
                  )}
                  {(queryData.phoneNumber || queryData.phone) && (
                    <span className="text-white text-[0.7rem] md:text-[0.8rem]">
                      {formatPhoneNumber(
                        queryData.phoneNumber || queryData.phone
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 space-y-2 sm:space-y-3">
        {/* Age Range */}
        <div className="flex justify-between items-center">
          <span className="text-neutral-300 text-[0.8rem] sm:text-sm md:text-base flex items-center">
            <TbCalendarStar className="mr-2 h-4 w-4 text-secondary-400" />
            Age Range:
          </span>
          <span className="font-medium text-[0.8rem] sm:text-sm md:text-base text-white bg-white/5 px-3 py-1 rounded-md">
            {queryData.ageRange || "Not specified"}
          </span>
        </div>

        {/* Desired Coverage */}
        <div className="flex justify-between items-center">
          <span className="text-neutral-300 text-[0.8rem] sm:text-sm md:text-base flex items-center">
            <TbShieldHalfFilled className="mr-2 h-4 w-4 text-secondary-400" />
            Coverage Level:
          </span>
          <span className="font-medium text-[0.8rem] sm:text-sm md:text-base text-white bg-white/5 px-3 py-1 rounded-md">
            {queryData.desiredCoverage
              ? coverageLabels[queryData.desiredCoverage] ||
                queryData.desiredCoverage.charAt(0).toUpperCase() +
                  queryData.desiredCoverage.slice(1)
              : "Not specified"}
          </span>
        </div>

        {/* Budget */}
        <div className="flex justify-between items-center">
          <span className="text-neutral-300 text-[0.8rem] sm:text-sm md:text-base flex items-center">
            <TbCoins className="mr-2 h-4 w-4 text-secondary-400" />
            Budget Range:
          </span>
          <span className="font-medium text-[0.8rem] sm:text-sm md:text-base text-white bg-white/5 px-3 py-1 rounded-md">
            {queryData.budget
              ? formatCurrencyFn(queryData.budget)
              : "Not specified"}
          </span>
        </div>

      

        {/* Optional Covers */}
        {selectedCovers.length > 0 && (
          <div className="pt-2 flex items-center justify-between  ">
            <div className="flex items-center">
              <TbBox className="mr-2 h-4 w-4 text-secondary-400" />
              <span className="text-neutral-300 text-[0.8rem] sm:text-sm md:text-base">
                Optional Covers:
              </span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {selectedCovers.map((cover, index) => (
                <span
                  key={index}
                  className="text-xs font-medium bg-secondary-500/30 text-white px-2 py-1 rounded-md"
                >
                  {cover}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryDetails;
