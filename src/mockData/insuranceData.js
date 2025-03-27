export const insuranceCompanies = [
  {
    id: "1",
    name: "Jubilee Insurance",
    contactEmail: "info@jubilee.co.ke",
    contactPhone: "+254 20 328 1000",
    headquarters: "Nairobi, Kenya",
  },
  {
    id: "2",
    name: "AAR Insurance",
    contactEmail: "info@aar.co.ke",
    contactPhone: "+254 20 286 2000",
    headquarters: "Nairobi, Kenya",
  },
  {
    id: "3",
    name: "CIC Insurance",
    contactEmail: "info@cic.co.ke",
    contactPhone: "+254 20 282 3000",
    headquarters: "Nairobi, Kenya",
  },
  {
    id: "4",
    name: "Madison Insurance",
    contactEmail: "info@madison.co.ke",
    contactPhone: "+254 20 272 7000",
    headquarters: "Nairobi, Kenya",
  },
  {
    id: "5",
    name: "Britam Insurance",
    contactEmail: "info@britam.com",
    contactPhone: "+254 20 271 0000",
    headquarters: "Nairobi, Kenya",
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
  },
];

export const benefits = [
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
  // Similar entries for other plans would follow
];

export const exclusions = [
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
  // Similar entries for other plans would follow
];

export const premiums = [
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
  // More premium entries would follow
];

// Helper functions
export const getPremiumForAge = (planId, age) => {
  const plan = premiums.filter((p) => p.planId === planId);
  if (age >= 60 && age <= 65) {
    return plan.find((p) => p.ageBracket === "60-65")?.annualPremium || 0;
  } else if (age >= 66 && age <= 70) {
    return plan.find((p) => p.ageBracket === "66-70")?.annualPremium || 0;
  } else if (age >= 71) {
    return plan.find((p) => p.ageBracket === "71-75")?.annualPremium || 0;
  }
  return 0;
};

export const getCompanyForPlan = (planId) => {
  const plan = insurancePlans.find((p) => p.id === planId);
  if (!plan) return "";

  const company = insuranceCompanies.find((c) => c.id === plan.companyId);
  return company ? company.name : "";
};

export const getBenefitsForPlan = (planId) => {
  return benefits.filter((b) => b.planId === planId);
};

export const getExclusionsForPlan = (planId) => {
  return exclusions.filter((e) => e.planId === planId);
};
