import React from "react";
import {
  TbCoins,
  TbShieldHalfFilled,
  TbStethoscope,
  TbEyeglass2,
  TbBabyCarriage,
} from "react-icons/tb";
import { PiTooth } from "react-icons/pi";
import { formatCurrency } from "../../utils/formatCurrency";
import { calculatePremiumForAge } from "../../utils/premiumUtils";
import { useComparison } from "../../context/ComparisonContext";

/**
 * Generates a printable HTML version of the comparison table
 * @param {Array} plans - The insurance plans to compare
 * @returns {String} - HTML string for the printable table
 */
const PrintableComparisonTable = ({ plans, userQuery }) => {
  if (!plans || !plans.length) return "";

  // Extract actual plan objects
  const normalizedPlans = plans.map((planItem) => planItem.plan);

  // Define rows for comparison - same structure as ComparisonTable
  const comparisonRows = [
    {
      category: "Insurance Premiums",
      items: [
        {
          name: "Annual Premium",
          accessor: (plan) => {
            // For comparison table, we'll use a default age of 65 for age-based plans
            // This provides a reasonable baseline for comparison
            const defaultAge = 65;
            const premium = calculatePremiumForAge(plan, defaultAge);

            if (premium !== null) {
              return {
                value: premium,
                display: formatCurrency(premium),
                isAmount: true,
              };
            }

            // Fallback for plans without valid premium data
            return {
              value: 0,
              display:
                plan.premiumStructure === "age-based"
                  ? "Age-based"
                  : "Contact for pricing",
              isAmount: false,
            };
          },
        },
        {
          name: "Dental Premium",
          accessor: (plan) => {
            // Check if dental is covered in the base plan
            if (plan.dentalCoveredInBase) {
              return {
                value: 0,
                display: "Already covered",
                isAmount: false,
                highlight: true,
              };
            }
            // Otherwise show the premium amount
            const value = parseFloat(plan.dentalPremium || "0");
            return {
              value,
              display: formatCurrency(value),
              isAmount: true,
            };
          },
        },
        {
          name: "Optical Premium",
          accessor: (plan) => {
            // Check if optical is covered in the base plan
            if (plan.opticalCoveredInBase) {
              return {
                value: 0,
                display: "Already covered",
                isAmount: false,
                highlight: true,
              };
            }
            // Otherwise show the premium amount
            const value = parseFloat(plan.opticalPremium || "0");
            return {
              value,
              display: formatCurrency(value),
              isAmount: true,
            };
          },
        },
      ],
    },
    {
      category: "Coverage Limits",
      items: [
        {
          name: "Inpatient Limit",
          accessor: (plan) => {
            const value = parseFloat(plan.inpatientCoverageLimit || "0");
            return {
              value,
              display: formatCurrency(value),
              isAmount: true,
            };
          },
        },
        {
          name: "Outpatient Limit",
          accessor: (plan) => {
            const value = parseFloat(plan.outpatientCoverageLimit || "0");
            return {
              value,
              display: formatCurrency(value),
              isAmount: true,
            };
          },
        },
        {
          name: "Dental Limit",
          accessor: (plan) => {
            const hasDental = plan.hasDental || false;
            const value = hasDental
              ? parseFloat(plan.dentalCoverageLimit || "0")
              : 0;

            let display = "Not Covered";
            if (value > 0) {
              display = formatCurrency(value);
            }

            return {
              value,
              display,
              isAmount: true,
              isIncluded: value > 0,
            };
          },
        },
        {
          name: "Optical Limit",
          accessor: (plan) => {
            const hasOptical = plan.hasOptical || false;
            const value = hasOptical
              ? parseFloat(plan.opticalCoverageLimit || "0")
              : 0;

            let display = "Not Covered";
            if (value > 0) {
              display = formatCurrency(value);
            }

            return {
              value,
              display,
              isAmount: true,
              isIncluded: value > 0,
            };
          },
        },
        {
          name: "Maternity Limit",
          accessor: (plan) => {
            const hasMaternity = plan.hasMaternity || false;
            const value = hasMaternity
              ? parseFloat(plan.maternityCoverageLimit || "0")
              : 0;
            return {
              value,
              display: value > 0 ? formatCurrency(value) : "Not Covered",
              isAmount: true,
              isIncluded: value > 0,
            };
          },
        },
      ],
    },
    {
      category: "Additional Benefits",
      items: [
        {
          name: "Last Expense",
          accessor: (plan) => {
            const value = parseFloat(plan.lastExpenseCover || "0");
            return {
              value,
              display: formatCurrency(value),
              isAmount: true,
            };
          },
        },
        {
          name: "Room Type",
          accessor: (plan) => ({
            value: plan.bedLimit || "Standard",
            display: plan.bedLimit || "Standard",
            isAmount: false,
          }),
        },
      ],
    },
  ];

  // Generate HTML string for the printable table
  const generateHtmlTable = () => {
    const currentDate = new Date().toLocaleDateString();

    // Format user query data for display
    const formattedAge = userQuery?.age || "";
    const formattedBudgetMin =
      userQuery?.budgetMin || userQuery?.budget?.split("-")[0] || "";
    const formattedBudgetMax =
      userQuery?.budgetMax || userQuery?.budget?.split("-")[1] || "";
    const formattedCoverageLimit = userQuery?.coverageLimit || "";
    const formattedOptionalCovers = userQuery?.optionalCovers || [];

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Insurance Plan Comparison - ${currentDate}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: landscape;
            margin: 10mm;
          }
          
          body {
            font-family: 'Lexend', sans-serif;
            margin: 0;
            padding: 15px;
            color: #333;
            font-size: 11px;
          }
          .report-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3b82f6;
            position: relative;
          }
          .header-left {
            text-align: left;
            flex: 1;
          }
          .header-center {
            text-align: center;
            flex: 2;
          }
          .header-right {
            text-align: right;
            flex: 1;
          }
          .logo {
            max-height: 60px;
          }
          .report-title {
            font-size: 20px;
            font-weight: 600;
            color: #b5640f;
            margin: 0;
            letter-spacing: -0.5px;
          }
          .user-query-details {
            margin-top: 8px;
            font-size: 10px;
            color: #6b7280;
            max-width: 600px;
            margin: 8px auto 0;
          }
          .query-item {
            display: inline-block;
            margin: 0 8px;
            padding: 2px 8px;
            background-color: #f3f4f6;
            border-radius: 4px;
            color: #4b5563;
          }
          .query-item strong {
            font-weight: 500;
            color: #1e40af;
          }
          .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            page-break-inside: auto;
          }
          .comparison-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          .comparison-table th, .comparison-table td {
            border: 1px solid #e5e7eb;
            padding: 6px 8px;
            text-align: center;
            font-size: 10px;
          }
          .comparison-table th {
            background-color: #f3f4f6;
            font-weight: 500;
          }
          .details-column {
            text-align: left;
            font-weight: 500;
            background-color: #f9fafb;
            min-width: 120px;
          }
          .category-row {
            background-color: #e5e7eb;
            font-weight: 600;
            font-size: 11px;
            color: #1f2937;
          }
          .company-logo {
            max-width: 60px;
            max-height: 30px;
            margin: 0 auto;
            display: block;
          }
          .company-name {
            font-size: 9px;
            color: #6b7280;
          }
          .plan-name {
            font-size: 11px;
            font-weight: 500;
            margin-top: auto;
            margin-bottom: 3px;
          }
          .included {
            color: #047857;
            font-weight: 500;
          }
          .not-included {
            color: #b91c1c;
          }
          .amount {
            font-weight: 500;
            color: #1e40af;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 9px;
            font-weight: 400;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            .report-header {
              margin-bottom: 15px;
            }
            .no-print {
              display: none;
            }
            /* Force background colors to print */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          <div class="header-left">
            <div class="date">${currentDate}</div>
          </div>
          <div class="header-center">
            <h1 class="report-title">Insurance Plan Comparison</h1>
            <div class="user-query-details">
              ${
                formattedAge
                  ? `<span class="query-item"><strong>Age:</strong> ${formattedAge}</span>`
                  : ""
              }
              ${
                formattedBudgetMin
                  ? `<span class="query-item"><strong>Budget Range:</strong> ${formatCurrency(
                      formattedBudgetMin
                    )} - ${formatCurrency(formattedBudgetMax || 0)}</span>`
                  : ""
              }
              ${
                formattedCoverageLimit
                  ? `<span class="query-item"><strong>Coverage Limit:</strong> ${formatCurrency(
                      formattedCoverageLimit
                    )}</span>`
                  : ""
              }
              ${
                formattedOptionalCovers?.length
                  ? `<span class="query-item"><strong>Optional Covers:</strong> ${formattedOptionalCovers.join(
                      ", "
                    )}</span>`
                  : ""
              }
            </div>
          </div>
          <div class="header-right">
            <img src="/lako-logo.png" alt="Lako Insurance" class="logo">
          </div>
        </div>
        
        <table class="comparison-table">
          <thead>
            <tr>
              <th class="details-column">Details</th>
              ${plans
                .map((planItem) => {
                  const plan = planItem.plan;
                  return `
                  <th>
                    <div>
                      <img src="${
                        plan.company?.logoUrl || "/insurance-placeholder.png"
                      }" alt="${
                    plan.company?.name || "Insurance"
                  }" class="company-logo">
                      <div class="plan-name">${
                        plan.name || "Insurance Plan"
                      }</div>
                    </div>
                  </th>
                `;
                })
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${comparisonRows
              .map(
                (section) => `
              <tr class="category-row">
                <td colspan="${plans.length + 1}">${section.category}</td>
              </tr>
              ${section.items
                .map(
                  (row) => `
                <tr>
                  <td class="details-column">${row.name}</td>
                  ${plans
                    .map((planItem) => {
                      const cellData = row.accessor(planItem.plan);
                      if (cellData.isIncluded !== undefined) {
                        return `<td class="${
                          cellData.isIncluded ? "included" : "not-included"
                        }">${cellData.display}</td>`;
                      } else {
                        return `<td class="${
                          cellData.isAmount ? "amount" : ""
                        }">${cellData.display}</td>`;
                      }
                    })
                    .join("")}
                </tr>
              `
                )
                .join("")}
            `
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="footer">
          <p>This comparison is based on the information provided and is for reference only. Please consult with an insurance expert for detailed advice.</p>
          <p>© ${new Date().getFullYear()} Lako Insurance. All rights reserved.</p>
        </div>
        
        <div class="no-print" style="text-align: center; margin-top: 20px;">
          <button onclick="window.print()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Print Report</button>
          <script>
            // Additional script to ensure proper printing without headers/footers
            window.onbeforeprint = function() {
              document.title = ''; // Remove title to prevent it from showing in header
            };
          </script>
        </div>
      </body>
      </html>
    `;
  };

  // Create a printable HTML string
  const htmlContent = generateHtmlTable();

  // Function to open the printable version in a new window
  const openPrintableVersion = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      // Automatically open print dialog after content loads
      printWindow.onload = function () {
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    } else {
      alert("Please allow pop-ups to view the printable version.");
    }
  };

  return { htmlContent, openPrintableVersion };
};

export default PrintableComparisonTable;
