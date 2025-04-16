import React from "react";
import { motion } from "framer-motion";
import {
  TbCheck,
  TbX,
  TbShieldHalfFilled,
  TbStethoscope,
  TbDental,
  TbEye,
  TbBabyCarriage,
  TbCurrencyDollar,
  TbBuildingHospital,
  TbHeartRateMonitor,
  TbDownload,
  TbArrowRight,
  TbChevronRight,
  TbInfoCircle,
  TbCoins,
  TbEyeglass2,
  TbCoffin,
} from "react-icons/tb";
import { PiTooth } from "react-icons/pi";

const ComparisonTable = ({ plans, formatCurrency, onDownload }) => {
  // Ensure plans are properly formatted
  if (!plans || !plans.length) return null;

  // Extract actual plan objects if needed
  const normalizedPlans = plans.map((planItem) => planItem.plan || planItem);

  // Format currency function with fallback
  const formatCurrencyFn =
    formatCurrency ||
    ((amount) => {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }).format(amount);
    });

  // Define rows for comparison
  const comparisonRows = [
    {
      category: "Insurance Premiums",
      items: [
        {
          name: "Annual Premium",
          accessor: (plan) => {
            const premium =
              typeof plan.premium === "object"
                ? plan.premium[Object.keys(plan.premium)[0]]
                : plan.premium;
            return {
              value: premium || 50000,
              display: formatCurrencyFn(premium || 50000),
              isAmount: true,
            };
          },
          icon: <TbCoins className="text-secondary-600 h-5 w-5" />,
        },
        // {
        //   name: "Inpatient Premium",
        //   accessor: (plan) => {
        //     const premium =
        //       typeof plan.inpatientPremium === "object"
        //         ? plan.inpatientPremium[Object.keys(plan.inpatientPremium)[0]]
        //         : plan.inpatientPremium;
        //     return {
        //       value: premium || 0,
        //       display: formatCurrencyFn(premium || 0),
        //       isAmount: true,
        //     };
        //   },
        //   icon: <TbCoins className="text-secondary-600 h-5 w-5" />,
        // },
        // {
        //   name: "Outpatient Premium",
        //   accessor: (plan) => {
        //     const premium =
        //       typeof plan.outpatientPremium === "object"
        //         ? plan.outpatientPremium[Object.keys(plan.outpatientPremium)[0]]
        //         : plan.outpatientPremium;
        //     return {
        //       value: premium || 0,
        //       display: formatCurrencyFn(premium || 0),
        //       isAmount: true,
        //     };
        //   },
        //   icon: <TbCoins className="text-secondary-600 h-5 w-5" />,
        // },
      ],
    },
    {
      category: "Coverage Limits",
      items: [
        {
          name: "Inpatient Limit",
          accessor: (plan) => ({
            value: plan.inpatientCoverageLimit || 1000000,
            display: formatCurrencyFn(plan.inpatientCoverageLimit || 1000000),
            isAmount: true,
          }),
          icon: (
            <TbShieldHalfFilled className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
        {
          name: "Outpatient Limit",
          accessor: (plan) => ({
            value: plan.outpatientCoverageLimit || 100000,
            display: formatCurrencyFn(plan.outpatientCoverageLimit || 100000),
            isAmount: true,
          }),
          icon: (
            <TbStethoscope className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
        {
          name: "Room Type",
          accessor: (plan) => ({
            value: plan.roomRate || plan.bedLimit || "Standard",
            display: plan.roomRate || plan.bedLimit || "Standard",
            isAmount: false,
          }),
          icon: (
            <TbBuildingHospital className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
      ],
    },
    {
      category: "Optional Covers",
      items: [
        {
          name: "Dental Cover",
          accessor: (plan) => {
            const hasDental =
              plan.dentalCover || plan.optionalCovers?.includes("dental");
            const value = hasDental ? plan.dentalLimit || 30000 : 0;
            return {
              value,
              display: value ? formatCurrencyFn(value) : "Not Covered",
              isAmount: true,
              isIncluded: Boolean(value),
            };
          },
          icon: (
            <PiTooth className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
        {
          name: "Optical Cover",
          accessor: (plan) => {
            const hasOptical =
              plan.opticalCover || plan.optionalCovers?.includes("optical");
            const value = hasOptical ? plan.opticalLimit || 30000 : 0;
            return {
              value,
              display: value ? formatCurrencyFn(value) : "Not Covered",
              isAmount: true,
              isIncluded: Boolean(value),
            };
          },
          icon: (
            <TbEyeglass2 className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
        {
          name: "Maternity Cover",
          accessor: (plan) => {
            const hasMaternity =
              plan.maternityCover || plan.optionalCovers?.includes("maternity");
            const value = hasMaternity ? plan.maternityLimit || 0 : 0;
            return {
              value,
              display: value ? formatCurrencyFn(value) : "Not Covered",
              isAmount: true,
              isIncluded: Boolean(value),
            };
          },
          icon: (
            <TbBabyCarriage className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
      ],
    },
    {
      category: "Additional Benefits",
      items: [
        {
          name: "Last Expense",
          accessor: (plan) => ({
            value: plan.lastExpenseCover || 50000,
            display: formatCurrencyFn(plan.lastExpenseCover || 50000),
            isAmount: true,
          }),
          icon: (
            <TbCoffin className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
        {
          name: "Pre-existing Conditions",
          accessor: (plan) => {
            const covered = plan.preExistingConditions !== false;
            return {
              value: covered ? plan.inpatientCoverageLimit * 0.25 || 250000 : 0,
              display: covered ? "Covered (25% of limit)" : "Not Covered",
              isAmount: false,
              isIncluded: covered,
            };
          },
          icon: (
            <TbHeartRateMonitor className="text-secondary-600 h-5 w-5 sm:h-5 sm:w-5" />
          ),
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden relative mx-1.5">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-3 sm:px-6 py-3 sm:py-4 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium text-sm sm:text-lg flex items-center font-lexend">
            {/* <TbShieldHalfFilled className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />{" "} */}
            Insurance Plan Comparison
          </h3>
          <div className="flex items-center space-x-1.5">
            <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-white/20"></div>
            <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-white/20"></div>
            <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative z-10">
        <table className="w-full min-w-[550px]">
          {/* Table Header - Company and Plan Names */}
          <thead>
            <tr className="bg-gradient-to-r from-primary-50 to-primary-100/50">
              <th className="px-2 sm:px-5 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-primary-700 w-[110px] sm:w-[180px] border-b border-primary-200 font-lexend">
                <div className="flex items-center">
                  <TbInfoCircle
                    size={18}
                    className="mr-1 sm:mr-2 text-primary-500"
                  />
                  Details
                </div>
              </th>

              {normalizedPlans.map((plan, index) => (
                <th
                  key={plan.id || index}
                  className="px-2 sm:px-4 py-3 sm:py-4 text-left min-w-[110px] sm:min-w-[150px] border-b border-primary-200"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 sm:w-20 h-[2.5rem] sm:h-[3.1rem] bg-white rounded-lg mb-2 sm:mb-3 flex items-center justify-center shadow-md border border-gray-100 hover:border-secondary-200 transition-all duration-300 group">
                      <img
                        src={plan.companyLogo || "/insurance-placeholder.png"}
                        alt={plan.companyName || "Insurance"}
                        className="max-w-[80%] max-h-[80%] object-contain"
                        onError={(e) => {
                          e.target.src = "/insurance-placeholder.png";
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-primary-800 text-xs sm:text-sm font-lexend">
                        {plan.name || "Insurance Plan"}
                      </div>
                      <div className="text-[10px] sm:text-xs font-normal text-primary-600 font-lexend">
                        {plan.companyName || "Insurance Company"}
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {comparisonRows.map((section, sectionIndex) => (
              <React.Fragment key={`section-${sectionIndex}`}>
                {/* Category Header */}
                <tr className="bg-gradient-to-r from-neutral-300/80 to-neutral-50/70">
                  <td
                    colSpan={normalizedPlans.length + 1}
                    className="px-2 sm:px-5 py-2 sm:py-3 font-medium text-xs sm:text-sm text-primary-700 border-b border-primary-100/50 font-lexend"
                  >
                    {section.category}
                  </td>
                </tr>

                {/* Rows for this section */}
                {section.items.map((row, rowIndex) => (
                  <tr
                    key={`row-${sectionIndex}-${rowIndex}`}
                    className="border-t border-gray-100 hover:bg-gray-50/80 transition-all duration-300 group"
                  >
                    <td className="px-2 sm:px-5 py-2 sm:py-3.5 text-xs sm:text-sm text-gray-700 flex items-center font-outfit">
                      <span className="mr-1.5 sm:mr-2.5 text-primary-600 group-hover:text-secondary-500 transition-colors">
                        {row.icon}
                      </span>
                      {row.name}
                    </td>

                    {normalizedPlans.map((plan, planIndex) => {
                      const cellData = row.accessor(plan);
                      return (
                        <td
                          key={`cell-${sectionIndex}-${rowIndex}-${planIndex}`}
                          className="px-2 sm:px-4 py-2 sm:py-3.5 text-center"
                        >
                          {cellData.isIncluded !== undefined ? (
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                                  cellData.isIncluded
                                    ? "bg-green-200 text-green-600 group-hover:bg-green-300 group-hover:scale-105"
                                    : "bg-red-200 text-red-600 group-hover:bg-red-300 group-hover:scale-105"
                                }`}
                              >
                                {cellData.isIncluded ? (
                                  <TbCheck size={15} className="sm:text-lg" />
                                ) : (
                                  <TbX size={15} className="sm:text-lg" />
                                )}
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs mt-1 sm:mt-1.5 font-outfit ${
                                  cellData.isIncluded
                                    ? "text-gray-700"
                                    : "text-gray-500"
                                }`}
                              >
                                {cellData.display}
                              </span>
                            </div>
                          ) : (
                            <span
                              className={`font-medium text-xs sm:text-base ${
                                cellData.isAmount
                                  ? "text-secondary-700 group-hover:text-secondary-600 font-lexend"
                                  : "text-gray-700 font-outfit"
                              } transition-colors`}
                            >
                              {cellData.display}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {onDownload && (
        <div className="p-3 sm:p-5 bg-gradient-to-br from-primary-50/50 to-white border-t border-gray-200 flex justify-center relative z-10">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDownload}
            className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-lg text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 group font-lexend"
          >
            <TbDownload className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-5 sm:w-5" />
            Download Comparison
            <TbChevronRight className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;
