/**
 * Mock insurance data for development and fallback scenarios
 */

// Sample insurance companies
const insuranceCompanies = [
  {
    id: "comp-1",
    name: "HealthGuard Senior Care",
    logoUrl: "/companies/healthguard.png"
  },
  {
    id: "comp-2",
    name: "SilverLife Insurance",
    logoUrl: "/companies/silverlife.png"
  },
  {
    id: "comp-3",
    name: "GoldenYears Health",
    logoUrl: "/companies/goldenyears.png"
  },
  {
    id: "comp-4",
    name: "SeniorShield Insurance",
    logoUrl: "/companies/seniorshield.png"
  }
];

// Generate a random number between min and max
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate a random plan name
const generatePlanName = (company, level) => {
  const tiers = ["Basic", "Standard", "Premium", "Elite", "Comprehensive"];
  const types = ["Care", "Shield", "Guard", "Protect", "Cover"];
  
  const tier = level ? tiers[level % tiers.length] : tiers[randomBetween(0, tiers.length - 1)];
  const type = types[randomBetween(0, types.length - 1)];
  
  return `${tier} ${type}`;
};

// Generate a mock insurance plan based on criteria
const generateMockPlan = (criteria, index) => {
  // Determine company
  const company = insuranceCompanies[index % insuranceCompanies.length];
  
  // Calculate premium based on age and coverage
  const baseAge = criteria.ageMax || 65;
  const baseCoverage = criteria.coverageLimit || 500000;
  const budgetMax = criteria.budgetMax || 15000;
  
  // Basic plan parameters
  const coverageLimit = baseCoverage * (0.8 + (index * 0.15));
  const annualPremium = Math.min(
    budgetMax,
    baseAge * (20 + (index * 5)) + (coverageLimit * 0.01)
  );
  
  // Determine if optional covers are included
  const hasDental = index > 0;
  const hasOptical = index > 1;
  const hasMaternity = index > 2;
  
  // Create the plan object
  return {
    id: `plan-mock-${index}`,
    name: generatePlanName(company.name, index),
    company: company,
    coverageLimit: coverageLimit.toFixed(0),
    annualPremium: annualPremium.toFixed(0),
    premiumStructure: "fixed",
    inpatientCoverage: "Full",
    outpatientCoverage: index > 0 ? "Full" : "Limited",
    preExistingConditions: index > 1 ? "Covered after 2 years" : "Not covered",
    waitingPeriod: `${3 - Math.min(index, 2)} months`,
    hasDental: hasDental,
    hasOptical: hasOptical,
    hasMaternity: hasMaternity,
    dentalCoverageLimit: hasDental ? (20000 + (index * 5000)).toFixed(0) : "0",
    opticalCoverageLimit: hasOptical ? (15000 + (index * 3000)).toFixed(0) : "0",
    maternityCoverageLimit: hasMaternity ? (50000 + (index * 10000)).toFixed(0) : "0",
    bedLimit: index > 2 ? "Private" : "Semi-private",
    lastExpenseCover: (100000 + (index * 25000)).toFixed(0),
    userQuery: criteria
  };
};

/**
 * Generate mock comparison results based on user criteria
 * @param {Object} criteria - User search criteria
 * @returns {Array} Array of mock insurance plans
 */
const generateMockComparisonResults = (criteria) => {
  // Generate 3-5 mock plans
  const numPlans = randomBetween(3, 5);
  const plans = [];
  
  for (let i = 0; i < numPlans; i++) {
    plans.push({
      score: 100 - (i * 10),
      plan: generateMockPlan(criteria, i)
    });
  }
  
  return plans;
};

export default {
  generateMockComparisonResults,
  insuranceCompanies
};
