import {
  insurancePlans,
  getBenefitsForPlan,
  getCompanyById,
  getPremiumByAge,
} from "../mockData/seniorInsuranceData";

// Helper function to get a match score based on criteria
const getMatchScore = (plan, userQuery) => {
  let score = 0;

  // Match by coverage level
  const coverageTiers = {
    basic: ["Copper", "Plan I", "Plan II"],
    standard: ["Bronze", "Plan III"],
    enhanced: ["Silver", "Plan IV"],
    premium: ["Gold", "Plan V"],
    executive: ["Diamond", "Plan VI"],
    royal: ["Platinum"],
  };

  // If plan tier matches user's desired coverage
  if (coverageTiers[userQuery.desiredCoverage]?.includes(plan.tier)) {
    score += 0.4; // 40% weight for correct coverage level
  }

  // Match by budget
  const premiumForAge =
    typeof plan.premium === "object"
      ? plan.premium[userQuery.ageRange || Object.keys(plan.premium)[0]]
      : plan.premium;

  const budgetValues = {
    50000: 75000,
    100000: 125000,
    150000: 175000,
    200000: 225000,
    250000: 300000,
  };

  const maxBudget = budgetValues[userQuery.budget] || 100000;

  if (premiumForAge <= maxBudget) {
    // The further below budget, the less perfect match it is (we want to maximize value)
    const budgetRatio = premiumForAge / maxBudget;
    // Score higher if closer to budget but not over
    score += 0.3 * (budgetRatio > 0.7 ? budgetRatio : 0.7);
  }

  // Match by room type preference
  const roomTypeMap = {
    general: ["General Ward"],
    private: ["Private Room", "Standard Private Room"],
    deluxe: ["Deluxe Private Room"],
    ensuite: ["Ensuite"],
  };

  if (
    roomTypeMap[userQuery.roomType]?.some(
      (type) => plan.roomRate?.includes(type) || plan.bedLimit?.includes(type)
    )
  ) {
    score += 0.2; // 20% weight for room type
  }

  // Random factor (0-10%)
  score += Math.random() * 0.1;

  // Cap at 1.0
  return Math.min(score, 0.98);
};

// Mock service to get a report for a specific ID
export const getMockReportById = (id) => {
  // Let's assume a default user query if one wasn't provided
  const defaultUserQuery = {
    ageRange: "65-69",
    desiredCoverage: "premium",
    budget: 150000,
    roomType: "deluxe",
    optionalCovers: ["outpatient", "dental", "optical"],
  };

  // Generate comparison results
  const results = insurancePlans.map((plan) => {
    const score = getMatchScore(plan, defaultUserQuery);

    return {
      plan: {
        ...plan,
        benefits: getBenefitsForPlan(plan.id),
        company: getCompanyById(plan.companyId),
      },
      score: score,
      rank: 0, // Will be set after sorting
    };
  });

  // Sort by score and assign ranks
  results.sort((a, b) => b.score - a.score);
  results.forEach((result, index) => {
    result.rank = index + 1;
  });

  // Return the mock report
  return {
    id,
    createdAt: new Date().toISOString(),
    userQuery: defaultUserQuery,
    comparisonResults: results.slice(0, 8), // Limit to top 8 results
  };
};

// Mock service to download a report PDF
export const mockDownloadReportPdf = async (id) => {
  // Simulate an API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Downloading PDF for report ${id}...`);
      resolve({
        success: true,
        downloadUrl: `/mock-reports/${id}.pdf`,
      });
    }, 2000);
  });
};
