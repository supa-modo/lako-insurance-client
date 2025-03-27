export const insuranceCompanies = [
  {
    id: "1",
    name: "Jubilee Insurance",
    contactEmail: "info@jubilee.co.ke",
    contactPhone: "+254 20 328 1000",
    headquarters: "Nairobi, Kenya",
    logo: "/jubilee.png",
  },
  {
    id: "2",
    name: "AAR Insurance",
    contactEmail: "info@aar.co.ke",
    contactPhone: "+254 20 286 2000",
    headquarters: "Nairobi, Kenya",
    logo: "/aar.png",
  },
  {
    id: "3",
    name: "CIC Insurance",
    contactEmail: "info@cic.co.ke",
    contactPhone: "+254 20 282 3000",
    headquarters: "Nairobi, Kenya",
    logo: "/cic.png",
  },
  {
    id: "4",
    name: "Madison Insurance",
    contactEmail: "info@madison.co.ke",
    contactPhone: "+254 20 272 7000",
    headquarters: "Nairobi, Kenya",
    logo: "/madison.png",
  },
  {
    id: "5",
    name: "Britam Insurance",
    contactEmail: "info@britam.com",
    contactPhone: "+254 20 271 0000",
    headquarters: "Nairobi, Kenya",
    logo: "/britam.png",
  },
];

export const insurancePlans = [
  {
    id: "1",
    companyId: "1",
    name: "Jubilee Senior Care",
    planType: "Premium",
    eligibilityAgeRange: "60-75",
    renewalPolicy: "Guaranteed renewal up to age 85",
    inpatientCoverageLimit: 2000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: 58000,
    planName: "Jubilee Senior Care",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
    inpatientCoverage: 2000000,
    outpatientCoverage: 200000,
  },
  {
    id: "2",
    companyId: "1",
    name: "Jubilee Elderly Basic",
    planType: "Basic",
    eligibilityAgeRange: "60-80",
    renewalPolicy: "Guaranteed renewal up to age 85",
    inpatientCoverageLimit: 1000000,
    outpatientCoverageLimit: 100000,
    lastExpenseCover: 50000,
    premium: 38000,
    planName: "Jubilee Elderly Basic",
    companyName: "Jubilee Insurance",
    companyLogo: "/jubilee.png",
    inpatientCoverage: 1000000,
    outpatientCoverage: 100000,
  },
  {
    id: "3",
    companyId: "2",
    name: "AAR Senior Shield",
    planType: "Premium",
    eligibilityAgeRange: "60-75",
    renewalPolicy: "Guaranteed renewal up to age 80",
    inpatientCoverageLimit: 2500000,
    outpatientCoverageLimit: 250000,
    lastExpenseCover: 150000,
    premium: 62000,
    planName: "AAR Senior Shield",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
    inpatientCoverage: 2500000,
    outpatientCoverage: 250000,
  },
  {
    id: "4",
    companyId: "2",
    name: "AAR Senior Basic",
    planType: "Basic",
    eligibilityAgeRange: "60-80",
    renewalPolicy: "Guaranteed renewal up to age 85",
    inpatientCoverageLimit: 1500000,
    outpatientCoverageLimit: 150000,
    lastExpenseCover: 75000,
    premium: 42000,
    planName: "AAR Senior Basic",
    companyName: "AAR Insurance",
    companyLogo: "/aar.png",
    inpatientCoverage: 1500000,
    outpatientCoverage: 150000,
  },
  {
    id: "5",
    companyId: "3",
    name: "CIC Elder Care",
    planType: "Standard",
    eligibilityAgeRange: "60-80",
    renewalPolicy: "Guaranteed renewal up to age 90",
    inpatientCoverageLimit: 2000000,
    outpatientCoverageLimit: 200000,
    lastExpenseCover: 100000,
    premium: 50000,
    planName: "CIC Elder Care",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
    inpatientCoverage: 2000000,
    outpatientCoverage: 200000,
  },
  {
    id: "6",
    companyId: "3",
    name: "CIC Elder Comfort",
    planType: "Premium",
    eligibilityAgeRange: "60-75",
    renewalPolicy: "Guaranteed renewal up to age 85",
    inpatientCoverageLimit: 3000000,
    outpatientCoverageLimit: 300000,
    lastExpenseCover: 200000,
    premium: 70000,
    planName: "CIC Elder Comfort",
    companyName: "CIC Insurance",
    companyLogo: "/cic.png",
    inpatientCoverage: 3000000,
    outpatientCoverage: 300000,
  },
  {
    id: "7",
    companyId: "4",
    name: "Madison Senior Care",
    planType: "Standard",
    eligibilityAgeRange: "60-80",
    renewalPolicy: "Guaranteed renewal up to age 85",
    inpatientCoverageLimit: 1800000,
    outpatientCoverageLimit: 180000,
    lastExpenseCover: 90000,
    premium: 48000,
    planName: "Madison Senior Care",
    companyName: "Madison Insurance",
    companyLogo: "/madison.png",
    inpatientCoverage: 1800000,
    outpatientCoverage: 180000,
  },
  {
    id: "8",
    companyId: "5",
    name: "Britam Senior Plus",
    planType: "Premium",
    eligibilityAgeRange: "60-75",
    renewalPolicy: "Guaranteed renewal up to age 85",
    inpatientCoverageLimit: 3500000,
    outpatientCoverageLimit: 350000,
    lastExpenseCover: 200000,
    premium: 75000,
    planName: "Britam Senior Plus",
    companyName: "Britam Insurance",
    companyLogo: "/britam.png",
    inpatientCoverage: 3500000,
    outpatientCoverage: 350000,
  },
];

export const benefits = [
  // Plan 1 benefits
  {
    id: "1",
    planId: "1",
    category: "Inpatient",
    description: "Full coverage for hospital admission",
    coverageLimit: 2000000,
    waitingPeriod: "30 days",
  },
  {
    id: "2",
    planId: "1",
    category: "Outpatient",
    description: "Coverage for doctor visits, diagnostics, and prescriptions",
    coverageLimit: 200000,
    waitingPeriod: "None",
  },
  {
    id: "3",
    planId: "1",
    category: "Dental",
    description: "Basic dental care",
    coverageLimit: 50000,
    waitingPeriod: "60 days",
  },
  {
    id: "4",
    planId: "1",
    category: "Optical",
    description: "Eye examinations and glasses",
    coverageLimit: 30000,
    waitingPeriod: "60 days",
  },

  // Plan 2 benefits
  {
    id: "5",
    planId: "2",
    category: "Inpatient",
    description: "Coverage for hospital admission",
    coverageLimit: 1000000,
    waitingPeriod: "30 days",
  },
  {
    id: "6",
    planId: "2",
    category: "Outpatient",
    description: "Basic coverage for doctor visits",
    coverageLimit: 100000,
    waitingPeriod: "None",
  },
  {
    id: "7",
    planId: "2",
    category: "Dental",
    description: "Limited dental care",
    coverageLimit: 20000,
    waitingPeriod: "90 days",
  },

  // Plan 3 benefits
  {
    id: "8",
    planId: "3",
    category: "Inpatient",
    description: "Comprehensive hospital coverage",
    coverageLimit: 2500000,
    waitingPeriod: "30 days",
  },
  {
    id: "9",
    planId: "3",
    category: "Outpatient",
    description: "Extended outpatient care",
    coverageLimit: 250000,
    waitingPeriod: "None",
  },
  {
    id: "10",
    planId: "3",
    category: "Dental",
    description: "Full dental coverage",
    coverageLimit: 70000,
    waitingPeriod: "45 days",
  },
  {
    id: "11",
    planId: "3",
    category: "Optical",
    description: "Complete optical coverage",
    coverageLimit: 40000,
    waitingPeriod: "45 days",
  },

  // Plan 4 benefits
  {
    id: "12",
    planId: "4",
    category: "Inpatient",
    description: "Standard hospital coverage",
    coverageLimit: 1500000,
    waitingPeriod: "30 days",
  },
  {
    id: "13",
    planId: "4",
    category: "Outpatient",
    description: "Standard outpatient care",
    coverageLimit: 150000,
    waitingPeriod: "None",
  },
  {
    id: "14",
    planId: "4",
    category: "Dental",
    description: "Basic dental coverage",
    coverageLimit: 30000,
    waitingPeriod: "60 days",
  },

  // Plan 5 benefits
  {
    id: "15",
    planId: "5",
    category: "Inpatient",
    description: "Mid-tier hospital coverage",
    coverageLimit: 2000000,
    waitingPeriod: "30 days",
  },
  {
    id: "16",
    planId: "5",
    category: "Outpatient",
    description: "Comprehensive outpatient care",
    coverageLimit: 200000,
    waitingPeriod: "None",
  },
  {
    id: "17",
    planId: "5",
    category: "Dental",
    description: "Mid-range dental coverage",
    coverageLimit: 40000,
    waitingPeriod: "60 days",
  },
  {
    id: "18",
    planId: "5",
    category: "Optical",
    description: "Standard optical benefits",
    coverageLimit: 25000,
    waitingPeriod: "60 days",
  },

  // Plan 6 benefits
  {
    id: "19",
    planId: "6",
    category: "Inpatient",
    description: "Premium hospital coverage",
    coverageLimit: 3000000,
    waitingPeriod: "30 days",
  },
  {
    id: "20",
    planId: "6",
    category: "Outpatient",
    description: "Elite outpatient care",
    coverageLimit: 300000,
    waitingPeriod: "None",
  },
  {
    id: "21",
    planId: "6",
    category: "Dental",
    description: "Comprehensive dental coverage",
    coverageLimit: 80000,
    waitingPeriod: "45 days",
  },
  {
    id: "22",
    planId: "6",
    category: "Optical",
    description: "Premium optical coverage",
    coverageLimit: 50000,
    waitingPeriod: "45 days",
  },

  // Plan 7 benefits
  {
    id: "23",
    planId: "7",
    category: "Inpatient",
    description: "Standard hospital coverage",
    coverageLimit: 1800000,
    waitingPeriod: "30 days",
  },
  {
    id: "24",
    planId: "7",
    category: "Outpatient",
    description: "Mid-tier outpatient care",
    coverageLimit: 180000,
    waitingPeriod: "None",
  },
  {
    id: "25",
    planId: "7",
    category: "Dental",
    description: "Basic dental coverage",
    coverageLimit: 35000,
    waitingPeriod: "60 days",
  },

  // Plan 8 benefits
  {
    id: "26",
    planId: "8",
    category: "Inpatient",
    description: "Superior hospital coverage",
    coverageLimit: 3500000,
    waitingPeriod: "30 days",
  },
  {
    id: "27",
    planId: "8",
    category: "Outpatient",
    description: "Premium outpatient care",
    coverageLimit: 350000,
    waitingPeriod: "None",
  },
  {
    id: "28",
    planId: "8",
    category: "Dental",
    description: "Elite dental coverage",
    coverageLimit: 90000,
    waitingPeriod: "45 days",
  },
  {
    id: "29",
    planId: "8",
    category: "Optical",
    description: "Comprehensive optical coverage",
    coverageLimit: 60000,
    waitingPeriod: "45 days",
  },
];

export const exclusions = [
  // Plan 1 exclusions
  {
    id: "1",
    planId: "1",
    exclusionText: "Pre-existing conditions diagnosed within the last 2 years",
  },
  {
    id: "2",
    planId: "1",
    exclusionText: "Cosmetic surgery unless medically necessary",
  },
  {
    id: "3",
    planId: "1",
    exclusionText: "Experimental treatments",
  },

  // Plan 2 exclusions
  {
    id: "4",
    planId: "2",
    exclusionText: "Pre-existing conditions diagnosed within the last 3 years",
  },
  {
    id: "5",
    planId: "2",
    exclusionText: "Cosmetic surgery",
  },
  {
    id: "6",
    planId: "2",
    exclusionText: "Overseas treatment",
  },

  // Plan 3 exclusions
  {
    id: "7",
    planId: "3",
    exclusionText: "Pre-existing conditions diagnosed within the last 2 years",
  },
  {
    id: "8",
    planId: "3",
    exclusionText: "Elective cosmetic procedures",
  },
  {
    id: "9",
    planId: "3",
    exclusionText: "Self-inflicted injuries",
  },

  // Plan 4 exclusions
  {
    id: "10",
    planId: "4",
    exclusionText: "Pre-existing conditions diagnosed within the last 3 years",
  },
  {
    id: "11",
    planId: "4",
    exclusionText: "Cosmetic surgery",
  },
  {
    id: "12",
    planId: "4",
    exclusionText: "Alternative medicine treatments",
  },

  // Plan 5 exclusions
  {
    id: "13",
    planId: "5",
    exclusionText: "Pre-existing conditions diagnosed within the last 2 years",
  },
  {
    id: "14",
    planId: "5",
    exclusionText: "Elective cosmetic procedures",
  },
  {
    id: "15",
    planId: "5",
    exclusionText: "Experimental treatments",
  },

  // Plan 6 exclusions
  {
    id: "16",
    planId: "6",
    exclusionText: "Pre-existing conditions diagnosed within the last 1 year",
  },
  {
    id: "17",
    planId: "6",
    exclusionText: "Non-medically necessary cosmetic surgery",
  },
  {
    id: "18",
    planId: "6",
    exclusionText: "Self-inflicted injuries",
  },

  // Plan 7 exclusions
  {
    id: "19",
    planId: "7",
    exclusionText: "Pre-existing conditions diagnosed within the last 2 years",
  },
  {
    id: "20",
    planId: "7",
    exclusionText: "Cosmetic procedures",
  },
  {
    id: "21",
    planId: "7",
    exclusionText: "Alternative treatments not prescribed by a doctor",
  },

  // Plan 8 exclusions
  {
    id: "22",
    planId: "8",
    exclusionText: "Pre-existing conditions diagnosed within the last 1 year",
  },
  {
    id: "23",
    planId: "8",
    exclusionText: "Non-medically necessary procedures",
  },
  {
    id: "24",
    planId: "8",
    exclusionText: "Experimental or unproven treatments",
  },
];

export const premiums = [
  // Plan 1 premiums
  {
    id: "1",
    planId: "1",
    ageBracket: "60-65",
    annualPremium: 58000,
  },
  {
    id: "2",
    planId: "1",
    ageBracket: "66-70",
    annualPremium: 72000,
  },
  {
    id: "3",
    planId: "1",
    ageBracket: "71-75",
    annualPremium: 85000,
  },

  // Plan 2 premiums
  {
    id: "4",
    planId: "2",
    ageBracket: "60-65",
    annualPremium: 38000,
  },
  {
    id: "5",
    planId: "2",
    ageBracket: "66-70",
    annualPremium: 45000,
  },
  {
    id: "6",
    planId: "2",
    ageBracket: "71-75",
    annualPremium: 52000,
  },
  {
    id: "7",
    planId: "2",
    ageBracket: "76-80",
    annualPremium: 60000,
  },

  // Plan 3 premiums
  {
    id: "8",
    planId: "3",
    ageBracket: "60-65",
    annualPremium: 62000,
  },
  {
    id: "9",
    planId: "3",
    ageBracket: "66-70",
    annualPremium: 78000,
  },
  {
    id: "10",
    planId: "3",
    ageBracket: "71-75",
    annualPremium: 92000,
  },

  // Plan 4 premiums
  {
    id: "11",
    planId: "4",
    ageBracket: "60-65",
    annualPremium: 42000,
  },
  {
    id: "12",
    planId: "4",
    ageBracket: "66-70",
    annualPremium: 50000,
  },
  {
    id: "13",
    planId: "4",
    ageBracket: "71-75",
    annualPremium: 58000,
  },
  {
    id: "14",
    planId: "4",
    ageBracket: "76-80",
    annualPremium: 65000,
  },

  // Plan 5 premiums
  {
    id: "15",
    planId: "5",
    ageBracket: "60-65",
    annualPremium: 50000,
  },
  {
    id: "16",
    planId: "5",
    ageBracket: "66-70",
    annualPremium: 62000,
  },
  {
    id: "17",
    planId: "5",
    ageBracket: "71-75",
    annualPremium: 75000,
  },
  {
    id: "18",
    planId: "5",
    ageBracket: "76-80",
    annualPremium: 85000,
  },

  // Plan 6 premiums
  {
    id: "19",
    planId: "6",
    ageBracket: "60-65",
    annualPremium: 70000,
  },
  {
    id: "20",
    planId: "6",
    ageBracket: "66-70",
    annualPremium: 85000,
  },
  {
    id: "21",
    planId: "6",
    ageBracket: "71-75",
    annualPremium: 98000,
  },

  // Plan 7 premiums
  {
    id: "22",
    planId: "7",
    ageBracket: "60-65",
    annualPremium: 48000,
  },
  {
    id: "23",
    planId: "7",
    ageBracket: "66-70",
    annualPremium: 58000,
  },
  {
    id: "24",
    planId: "7",
    ageBracket: "71-75",
    annualPremium: 68000,
  },
  {
    id: "25",
    planId: "7",
    ageBracket: "76-80",
    annualPremium: 78000,
  },

  // Plan 8 premiums
  {
    id: "26",
    planId: "8",
    ageBracket: "60-65",
    annualPremium: 75000,
  },
  {
    id: "27",
    planId: "8",
    ageBracket: "66-70",
    annualPremium: 90000,
  },
  {
    id: "28",
    planId: "8",
    ageBracket: "71-75",
    annualPremium: 105000,
  },
];

// Helper functions
export const getPremiumForAge = (planId, age) => {
  const planPremiums = premiums.filter((p) => p.planId === planId);
  if (!planPremiums || planPremiums.length === 0) return 50000; // Default fallback

  if (age >= 60 && age <= 65) {
    return (
      planPremiums.find((p) => p.ageBracket === "60-65")?.annualPremium ||
      planPremiums[0].annualPremium
    );
  } else if (age >= 66 && age <= 70) {
    return (
      planPremiums.find((p) => p.ageBracket === "66-70")?.annualPremium ||
      planPremiums[0].annualPremium
    );
  } else if (age >= 71 && age <= 75) {
    return (
      planPremiums.find((p) => p.ageBracket === "71-75")?.annualPremium ||
      planPremiums[0].annualPremium
    );
  } else if (age >= 76) {
    return (
      planPremiums.find((p) => p.ageBracket === "76-80")?.annualPremium ||
      planPremiums[0].annualPremium
    );
  }
  return planPremiums[0].annualPremium; // Default to first premium if age is out of range
};

export const getCompanyForPlan = (planId) => {
  const plan = insurancePlans.find((p) => p.id === planId);
  if (!plan) return "Insurance Company";

  const company = insuranceCompanies.find((c) => c.id === plan.companyId);
  return company ? company.name : "Insurance Company";
};

export const getBenefitsForPlan = (planId) => {
  const planBenefits = benefits.filter((b) => b.planId === planId);
  return planBenefits.length > 0
    ? planBenefits
    : [
        {
          id: "default-1",
          planId: planId,
          category: "Inpatient",
          description: "Standard hospital coverage",
          coverageLimit: 2000000,
          waitingPeriod: "30 days",
        },
        {
          id: "default-2",
          planId: planId,
          category: "Outpatient",
          description: "Basic outpatient care",
          coverageLimit: 100000,
          waitingPeriod: "None",
        },
      ];
};

export const getExclusionsForPlan = (planId) => {
  const planExclusions = exclusions.filter((e) => e.planId === planId);
  return planExclusions.length > 0
    ? planExclusions
    : [
        {
          id: "default-1",
          planId: planId,
          exclusionText:
            "Pre-existing conditions diagnosed within the last 2 years",
        },
        {
          id: "default-2",
          planId: planId,
          exclusionText: "Cosmetic surgery unless medically necessary",
        },
      ];
};
