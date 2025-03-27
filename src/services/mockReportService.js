import {
  insuranceCompanies,
  insurancePlans,
  benefits,
  exclusions,
  premiums,
  getPremiumForAge,
  getBenefitsForPlan,
  getExclusionsForPlan,
} from "../mockData/insuranceData";

// Generate a mock report based on ID and using our mock data
export const getMockReportById = (id) => {
  // For demo purposes, generate fixed mock comparison results
  // In a real application, this would be handled by the backend
  // and the data would be fetched from an API

  const mockUserQuery = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+254 712 345678",
    age: 65,
    desiredCoverage: "comprehensive",
    budget: 70000,
  };

  // Create comparison results with plans
  const comparisonResults = insurancePlans.slice(0, 4).map((plan, index) => {
    const company = insuranceCompanies.find((c) => c.id === plan.companyId) || {
      name: "Insurance Company",
      contactEmail: "info@example.com",
      contactPhone: "+254 700 000000",
      headquarters: "Nairobi, Kenya",
      logo: "/insurance-placeholder.png",
    };

    const planBenefits = getBenefitsForPlan(plan.id);
    const planExclusions = getExclusionsForPlan(plan.id);
    const planPremiums = premiums.filter((p) => p.planId === plan.id) || [];
    const premium = getPremiumForAge(plan.id, mockUserQuery.age);

    // Calculate a mock score based on the plan index
    const score = (95 - index * 5) / 100; // Converting to decimal for consistent UI
    const rank = index + 1;

    // Enhanced plan object with relations and all required properties
    const enhancedPlan = {
      ...plan,
      company: company,
      companyName: company.name,
      companyLogo: company.logo || "/insurance-placeholder.png",
      planName: plan.name,
      premium: premium || plan.premium || 50000,
      benefits: planBenefits,
      exclusions: planExclusions,
      premiums: planPremiums,
      inpatientCoverage: plan.inpatientCoverageLimit,
      outpatientCoverage: plan.outpatientCoverageLimit,
    };

    return {
      plan: enhancedPlan,
      score: score,
      rank: rank,
    };
  });

  return {
    id: id || "mock-report-1",
    userQuery: mockUserQuery,
    comparisonResults: comparisonResults,
    createdAt: new Date().toISOString(),
  };
};

// Mock function to simulate downloading a report
export const mockDownloadReportPdf = (id) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      console.log(`Downloading report with ID: ${id}`);

      // 95% success rate to simulate occasional failures
      if (Math.random() > 0.05) {
        resolve({ success: true, message: "Report downloaded successfully!" });
      } else {
        reject(new Error("Network error, please try again."));
      }
    }, 1500);
  });
};
