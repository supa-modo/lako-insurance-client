// Senior Insurance Data based on AAR, Jubilee, and CIC documentation
export const insuranceCompanies = [
  {
    id: "1",
    name: "Jubilee Insurance",
    contactEmail: "info@jubilee.co.ke",
    contactPhone: "+254 20 328 1000",
    headquarters: "Nairobi, Kenya",
    logo: "/jubilee.png",
    description:
      "Jubilee Health Insurance Ltd is a leading Medical Insurer in East Africa, providing tailored first-class health insurance products to suit individual and corporate needs.",
  },
  {
    id: "2",
    name: "AAR Insurance",
    contactEmail: "info@aar.co.ke",
    contactPhone: "+254 20 286 2000",
    headquarters: "Nairobi, Kenya",
    logo: "/aar.png",
    description:
      "AAR Insurance provides comprehensive healthcare solutions for seniors with a variety of plans designed to meet the needs of the elderly population.",
  },
  {
    id: "3",
    name: "CIC Insurance",
    contactEmail: "info@cic.co.ke",
    contactPhone: "+254 20 282 3000",
    headquarters: "Nairobi, Kenya",
    logo: "/cic.png",
    description:
      "CIC Insurance offers tiered plans specifically designed for senior citizens, providing comprehensive coverage options for various healthcare needs.",
  },
];

// Plans organized by company with real world data
export const insurancePlans = [
  // Jubilee Insurance Plans (5 tiers)
  {
    id: "1",
    companyId: "1",
    name: "Jubilee Copper",
    tier: "Copper",
    planType: "Basic",
    eligibilityAge: "65-79",
    inpatientCoverageLimit: 500000,
    outpatientCoverageLimit: 100000,
    lastExpenseCover: 50000,
    premium: {
      "65-69": 57952,
      "70-74": 68819,
      "75-79": 72441,
    },
    bedLimit: "General Ward",
    roomRate: "General Ward",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
  },
  {
    id: "2",
    companyId: "1",
    name: "Jubilee Bronze",
    tier: "Bronze",
    planType: "Standard",
    eligibilityAge: "65-79",
    inpatientCoverageLimit: 1000000,
    outpatientCoverageLimit: 100000,
    lastExpenseCover: 50000,
    premium: {
      "65-69": 81063,
      "70-74": 96264,
      "75-79": 101330,
    },
    bedLimit: "General Ward",
    roomRate: "General Ward",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
  },
  {
    id: "3",
    companyId: "1",
    name: "Jubilee Silver",
    tier: "Silver",
    planType: "Enhanced",
    eligibilityAge: "65-79",
    inpatientCoverageLimit: 3000000,
    outpatientCoverageLimit: 150000,
    lastExpenseCover: 75000,
    premium: {
      "65-69": 121067,
      "70-74": 143766,
      "75-79": 151333,
    },
    bedLimit: "Standard Private Room up to 12,500",
    roomRate: "Standard Private Room",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
  },
  {
    id: "4",
    companyId: "1",
    name: "Jubilee Gold",
    tier: "Gold",
    planType: "Premium",
    eligibilityAge: "65-79",
    inpatientCoverageLimit: 5000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: {
      "65-69": 139806,
      "70-74": 166019,
      "75-79": 174757,
    },
    bedLimit: "Standard Private Room up to 24,000",
    roomRate: "Deluxe",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
  },
  {
    id: "5",
    companyId: "1",
    name: "Jubilee Diamond",
    tier: "Diamond",
    planType: "Executive",
    eligibilityAge: "65-79",
    inpatientCoverageLimit: 10000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: {
      "65-69": 182754,
      "70-74": 217020,
      "75-79": 228443,
    },
    bedLimit: "Standard Private Room up to 32,000",
    roomRate: "Executive",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
  },

  // AAR Insurance Plans (6 tiers)
  {
    id: "6",
    companyId: "2",
    name: "AAR Copper",
    tier: "Copper",
    planType: "Basic",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 500000,
    outpatientCoverageLimit: 50000,
    lastExpenseCover: 75000,
    premium: {
      "65-70": 55714,
      "71-85": 74100,
    },
    bedLimit: "General Ward - Max 10,000",
    roomRate: "General Ward",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
  },
  {
    id: "7",
    companyId: "2",
    name: "AAR Bronze",
    tier: "Bronze",
    planType: "Standard",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 1000000,
    outpatientCoverageLimit: 75000,
    lastExpenseCover: 100000,
    premium: {
      "65-70": 76329,
      "71-85": 101517,
    },
    bedLimit: "General Ward - Max 10,000",
    roomRate: "General Ward",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
  },
  {
    id: "8",
    companyId: "2",
    name: "AAR Silver",
    tier: "Silver",
    planType: "Enhanced",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 2000000,
    outpatientCoverageLimit: 100000,
    lastExpenseCover: 100000,
    premium: {
      "65-70": 99227,
      "71-85": 131972,
    },
    bedLimit: "Private Room - 12,000",
    roomRate: "Private Room",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
  },
  {
    id: "9",
    companyId: "2",
    name: "AAR Gold",
    tier: "Gold",
    planType: "Premium",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 3000000,
    outpatientCoverageLimit: 150000,
    lastExpenseCover: 100000,
    premium: {
      "65-70": 114493,
      "71-85": 152276,
    },
    bedLimit: "Private Room - 16,000",
    roomRate: "Private Room",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
  },
  {
    id: "10",
    companyId: "2",
    name: "AAR Diamond",
    tier: "Diamond",
    planType: "Executive",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 5000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 150000,
    premium: {
      "65-70": 143879,
      "71-85": 191360,
    },
    bedLimit: "Private Room - Max 20,000",
    roomRate: "Deluxe Private Room",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
  },
  {
    id: "11",
    companyId: "2",
    name: "AAR Platinum",
    tier: "Platinum",
    planType: "Royal",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 10000000,
    outpatientCoverageLimit: 250000,
    lastExpenseCover: 200000,
    premium: {
      "65-70": 175533,
      "71-85": 233459,
    },
    bedLimit: "Ensuite - Max 30,000",
    roomRate: "Ensuite",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
  },

  // CIC Insurance Plans (6 tiers)
  {
    id: "12",
    companyId: "3",
    name: "CIC Plan I",
    tier: "Plan I",
    planType: "Basic",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 300000,
    outpatientCoverageLimit: 50000,
    lastExpenseCover: 50000,
    premium: 48000, // Using approximate figure based on comparable plans
    bedLimit: "General Ward Bed",
    roomRate: "General Ward",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
  },
  {
    id: "13",
    companyId: "3",
    name: "CIC Plan II",
    tier: "Plan II",
    planType: "Standard",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 500000,
    outpatientCoverageLimit: 75000,
    lastExpenseCover: 60000,
    premium: 56000, // Using approximate figure based on comparable plans
    bedLimit: "General Ward Bed",
    roomRate: "General Ward",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
  },
  {
    id: "14",
    companyId: "3",
    name: "CIC Plan III",
    tier: "Plan III",
    planType: "Enhanced",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 1000000,
    outpatientCoverageLimit: 100000,
    lastExpenseCover: 70000,
    premium: 68000, // Using approximate figure based on comparable plans
    bedLimit: "General Ward Bed",
    roomRate: "General Ward",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
  },
  {
    id: "15",
    companyId: "3",
    name: "CIC Plan IV",
    tier: "Plan IV",
    planType: "Premium",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 2000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: 85000, // Using approximate figure based on comparable plans
    bedLimit: "Standard Private Room up to 15,000",
    roomRate: "Private Room",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
  },
  {
    id: "16",
    companyId: "3",
    name: "CIC Plan V",
    tier: "Plan V",
    planType: "Executive",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 3000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: 120000, // Using approximate figure based on comparable plans
    bedLimit: "Standard Private Room up to 16,000",
    roomRate: "Private Room",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
  },
  {
    id: "17",
    companyId: "3",
    name: "CIC Plan VI",
    tier: "Plan VI",
    planType: "Royal",
    eligibilityAge: "65-85",
    inpatientCoverageLimit: 5000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: 150000, // Using approximate figure based on comparable plans
    bedLimit: "Standard Private Room up to 20,000",
    roomRate: "Deluxe Private Room",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
  },
];

// Define comprehensive benefits for each plan
export const planBenefits = [
  // Jubilee Copper Benefits
  {
    planId: "1",
    category: "Inpatient",
    description: "Overall annual limit",
    coverageLimit: 500000,
    waitingPeriod: "30 days",
  },
  {
    planId: "1",
    category: "Pre-existing Conditions",
    description: "Pre-existing & chronic conditions",
    coverageLimit: 200000,
    waitingPeriod: "1 year",
  },
  {
    planId: "1",
    category: "Cancer Treatment",
    description: "Cancer treatment and care",
    coverageLimit: 200000,
    waitingPeriod: "2 years",
  },
  {
    planId: "1",
    category: "Organ Transplant",
    description: "Organ transplant for the insured",
    coverageLimit: 200000,
    waitingPeriod: "1 year",
  },
  {
    planId: "1",
    category: "Covid-19",
    description: "Covid-19 hospitalization benefit",
    coverageLimit: 500000,
    waitingPeriod: "None",
  },
  {
    planId: "1",
    category: "Outpatient",
    description: "Optional outpatient cover",
    coverageLimit: 100000,
    waitingPeriod: "None",
  },
  {
    planId: "1",
    category: "Dental",
    description: "Optional dental cover",
    coverageLimit: 30000,
    waitingPeriod: "None",
  },
  {
    planId: "1",
    category: "Optical",
    description: "Optional optical cover",
    coverageLimit: 30000,
    waitingPeriod: "None",
  },

  // Jubilee Bronze Benefits
  {
    planId: "2",
    category: "Inpatient",
    description: "Overall annual limit",
    coverageLimit: 1000000,
    waitingPeriod: "30 days",
  },
  {
    planId: "2",
    category: "Pre-existing Conditions",
    description: "Pre-existing & chronic conditions",
    coverageLimit: 300000,
    waitingPeriod: "1 year",
  },
  {
    planId: "2",
    category: "Cancer Treatment",
    description: "Cancer treatment and care",
    coverageLimit: 300000,
    waitingPeriod: "2 years",
  },
  {
    planId: "2",
    category: "Organ Transplant",
    description: "Organ transplant for the insured",
    coverageLimit: 300000,
    waitingPeriod: "1 year",
  },
  {
    planId: "2",
    category: "Covid-19",
    description: "Covid-19 hospitalization benefit",
    coverageLimit: 500000,
    waitingPeriod: "None",
  },
  {
    planId: "2",
    category: "Outpatient",
    description: "Optional outpatient cover",
    coverageLimit: 100000,
    waitingPeriod: "None",
  },
  {
    planId: "2",
    category: "Dental",
    description: "Optional dental cover",
    coverageLimit: 30000,
    waitingPeriod: "None",
  },
  {
    planId: "2",
    category: "Optical",
    description: "Optional optical cover",
    coverageLimit: 30000,
    waitingPeriod: "None",
  },

  // AAR Copper Benefits
  {
    planId: "6",
    category: "Inpatient",
    description: "Overall annual limit",
    coverageLimit: 500000,
    waitingPeriod: "28 days",
  },
  {
    planId: "6",
    category: "Pre-existing Conditions",
    description: "Pre-existing & chronic conditions",
    coverageLimit: 250000,
    waitingPeriod: "1 year",
  },
  {
    planId: "6",
    category: "Last Expense",
    description: "Last expense cover",
    coverageLimit: 75000,
    waitingPeriod: "None",
  },
  {
    planId: "6",
    category: "Annual Checkup",
    description: "Annual health checkup",
    coverageLimit: 10000,
    waitingPeriod: "None",
  },
  {
    planId: "6",
    category: "Room Limit",
    description: "General ward accommodation",
    coverageLimit: 10000,
    waitingPeriod: "None",
  },
  {
    planId: "6",
    category: "Newly Diagnosed Chronic",
    description: "Newly diagnosed chronic conditions",
    coverageLimit: 350000,
    waitingPeriod: "60 days",
  },
  {
    planId: "6",
    category: "Covid-19",
    description: "Covid-19 coverage",
    coverageLimit: 250000,
    waitingPeriod: "None",
  },
  {
    planId: "6",
    category: "Outpatient",
    description: "Optional outpatient cover",
    coverageLimit: 50000,
    waitingPeriod: "None",
  },
  {
    planId: "6",
    category: "Dental",
    description: "Optional dental cover",
    coverageLimit: 15000,
    waitingPeriod: "None",
  },
  {
    planId: "6",
    category: "Optical",
    description: "Optional optical cover",
    coverageLimit: 15000,
    waitingPeriod: "None",
  },

  // CIC Plan I Benefits
  {
    planId: "12",
    category: "Inpatient",
    description: "Overall annual maximum",
    coverageLimit: 300000,
    waitingPeriod: "28 days",
  },
  {
    planId: "12",
    category: "Hospital Cash",
    description: "Hospital cash benefit per night",
    coverageLimit: 500,
    waitingPeriod: "None",
  },
  {
    planId: "12",
    category: "Pre-existing Conditions",
    description: "Pre-existing & chronic conditions",
    coverageLimit: 150000,
    waitingPeriod: "1 year",
  },
  {
    planId: "12",
    category: "Psychiatric",
    description: "Psychiatric illness treatment",
    coverageLimit: 150000,
    waitingPeriod: "1 year",
  },
  {
    planId: "12",
    category: "Last Expense",
    description: "Last expense cover",
    coverageLimit: 50000,
    waitingPeriod: "None",
  },
  {
    planId: "12",
    category: "Covid-19",
    description: "Covid-19 cover",
    coverageLimit: 150000,
    waitingPeriod: "None",
  },
  {
    planId: "12",
    category: "Outpatient",
    description: "Optional outpatient cover",
    coverageLimit: 50000,
    waitingPeriod: "None",
  },
  {
    planId: "12",
    category: "Dental",
    description: "Optional dental cover",
    coverageLimit: 15000,
    waitingPeriod: "None",
  },
  {
    planId: "12",
    category: "Optical",
    description: "Optional optical cover",
    coverageLimit: 15000,
    waitingPeriod: "None",
  },
  {
    planId: "12",
    category: "Health Checkup",
    description: "Annual health checkup",
    coverageLimit: 10000,
    waitingPeriod: "2 years",
  },
];

// Common exclusions across plans
export const commonExclusions = [
  "Cosmetic or beauty treatment and/or surgery unless necessitated by an accident",
  "Massage treatments (except where medically prescribed)",
  "Naval, military and air force operations",
  "Expenses recoverable under any other insurance (e.g., NHIF, GPA)",
  "Self-inflicted injuries, suicide attempts, or treatment of alcoholism",
  "Experimental treatments or unproven medical treatments",
  "Weight management treatments and drugs",
  "Participation in professional or hazardous sports",
  "Participation in riots, strikes, and civil commotion",
  "Nutritional supplements unless prescribed as part of medical treatment",
  "Elective cosmetic procedures",
  "Alternative treatments such as herbal medicine, acupuncture, etc.",
];

// Waiting periods information
export const waitingPeriods = {
  generalIllness: "30 days",
  surgicalClaims: "60 days",
  preExistingConditions: "1 year",
  chronicConditions: "1 year",
  cancerTreatment: "2 years",
  psychiatricConditions: "1 year",
  organTransplant: "1-3 years depending on provider",
  jointsReplacement: "1-2 years depending on provider",
  gynaecologicalConditions: "1 year",
};

// Helper functions for data access
export const getPlansByCompany = (companyId) => {
  return insurancePlans.filter((plan) => plan.companyId === companyId);
};

export const getPlansByTier = (tier) => {
  return insurancePlans.filter(
    (plan) => plan.tier.toLowerCase() === tier.toLowerCase()
  );
};

export const getPlansByBudget = (maxBudget) => {
  return insurancePlans.filter((plan) => {
    // For plans with age-based premiums, check the lowest premium tier
    if (typeof plan.premium === "object") {
      const minPremium = Math.min(...Object.values(plan.premium));
      return minPremium <= maxBudget;
    }
    return plan.premium <= maxBudget;
  });
};

export const getPlanById = (planId) => {
  return insurancePlans.find((plan) => plan.id === planId);
};

export const getBenefitsForPlan = (planId) => {
  return planBenefits.filter((benefit) => benefit.planId === planId);
};

export const getCompanyById = (companyId) => {
  return insuranceCompanies.find((company) => company.id === companyId);
};

export const getPremiumByAge = (plan, ageRange) => {
  if (typeof plan.premium === "object") {
    // Find the applicable age range
    for (const range in plan.premium) {
      const [min, max] = range.split("-").map(Number);
      if (ageRange >= min && (ageRange <= max || !max)) {
        return plan.premium[range];
      }
    }
    // Default to highest premium if no match found
    return Math.max(...Object.values(plan.premium));
  }
  // Return flat premium
  return plan.premium;
};
