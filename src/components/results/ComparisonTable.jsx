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
          icon: <TbShieldHalfFilled className="text-secondary-600 h-5 w-5" />,
        },
        {
          name: "Outpatient Limit",
          accessor: (plan) => ({
            value: plan.outpatientCoverageLimit || 100000,
            display: formatCurrencyFn(plan.outpatientCoverageLimit || 100000),
            isAmount: true,
          }),
          icon: <TbStethoscope className="text-secondary-600 h-5 w-5" />,
        },
        {
          name: "Room Type",
          accessor: (plan) => ({
            value: plan.roomRate || plan.bedLimit || "Standard",
            display: plan.roomRate || plan.bedLimit || "Standard",
            isAmount: false,
          }),
          icon: <TbBuildingHospital className="text-secondary-600 h-5 w-5" />,
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
          icon: <PiTooth className="text-secondary-600 h-5 w-5" />,
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
          icon: <TbEyeglass2 className="text-secondary-600 h-5 w-5" />,
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
          icon: <TbBabyCarriage className="text-secondary-600 h-5 w-5" />,
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
          icon: <TbCoffin className="text-secondary-600 h-5 w-5" />,
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
          icon: <TbHeartRateMonitor className="text-secondary-600 h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-xl shadow-xl bord overflow-hidden relative"
    >
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium text-lg flex items-center font-lexend">
            <TbShieldHalfFilled className="mr-2" /> Insurance Plan Comparison
          </h3>
          <div className="flex items-center space-x-1.5">
            <div className="h-2 w-2 rounded-full bg-white/20"></div>
            <div className="h-2 w-2 rounded-full bg-white/20"></div>
            <div className="h-2 w-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative z-10">
        <table className="w-full min-w-[650px]">
          {/* Table Header - Company and Plan Names */}
          <thead>
            <tr className="bg-gradient-to-r from-primary-50 to-primary-100/50">
              <th className="px-5 py-4 text-left text-sm font-medium text-primary-700 w-[180px] border-b border-primary-200 font-lexend">
                <div className="flex items-center">
                  <TbInfoCircle size={22} className="mr-2 text-primary-500" />
                  Details
                </div>
              </th>

              {normalizedPlans.map((plan, index) => (
                <th
                  key={plan.id || index}
                  className="px-4 py-4 text-left min-w-[150px] border-b border-primary-200"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-[3.1rem] bg-white rounded-lg mb-3 flex items-center justify-center shadow-md border border-gray-100 hover:border-secondary-200 transition-all duration-300 group">
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
                      <div className="font-semibold text-primary-800 text-sm font-lexend">
                        {plan.name || "Insurance Plan"}
                      </div>
                      <div className="text-xs font-normal text-primary-600 font-lexend">
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
                    className="px-5 py-3 font-medium text-sm text-primary-700 border-b border-primary-100/50 font-lexend"
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
                    <td className="px-5 py-3.5 text-sm text-gray-700 flex items-center font-outfit">
                      <span className="mr-2.5 text-primary-600 group-hover:text-secondary-500 transition-colors">
                        {row.icon}
                      </span>
                      {row.name}
                    </td>

                    {normalizedPlans.map((plan, planIndex) => {
                      const cellData = row.accessor(plan);
                      return (
                        <td
                          key={`cell-${sectionIndex}-${rowIndex}-${planIndex}`}
                          className="px-4 py-3.5 text-center"
                        >
                          {cellData.isIncluded !== undefined ? (
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                                  cellData.isIncluded
                                    ? "bg-green-200 text-green-600 group-hover:bg-green-300 group-hover:scale-105"
                                    : "bg-red-200 text-red-600 group-hover:bg-red-300 group-hover:scale-105"
                                }`}
                              >
                                {cellData.isIncluded ? (
                                  <TbCheck size={18} />
                                ) : (
                                  <TbX size={18} />
                                )}
                              </div>
                              <span
                                className={`text-xs mt-1.5 font-outfit ${
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
                              className={`font-medium  ${
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
        <div className="p-5 bg-gradient-to-br from-primary-50/50 to-white border-t border-gray-200 flex justify-center relative z-10">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDownload}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 group font-lexend"
          >
            <TbDownload className="mr-2" />
            Download Comparison Table
            <TbChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default ComparisonTable;
