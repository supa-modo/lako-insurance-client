import { apiClient, safeApiCall, ENABLE_MOCK_DATA } from "./apiConfig";
import mockInsuranceData from "../data/mockInsuranceData";

/**
 * Service for handling insurance-related API calls
 */
const insuranceService = {
  /**
   * Get all insurance plans
   * @returns {Promise<Object>} Response with insurance plans data
   */
  getAllPlans: async () => {
    try {
      const response = await apiClient.get("/admin/insurance/plans");
      return response.data;
    } catch (error) {
      console.error("Error fetching insurance plans:", error);
      throw error;
    }
  },

  /**
   * Get a specific insurance plan by ID
   * @param {string} planId - ID of the plan to retrieve
   * @returns {Promise<Object>} Response with plan data
   */
  getPlanById: async (planId) => {
    try {
      const response = await apiClient.get(`/admin/insurance/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching plan ${planId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new insurance plan
   * @param {Object} planData - Data for the new plan
   * @returns {Promise<Object>} Response with created plan data
   */
  createPlan: async (planData) => {
    try {
      const response = await apiClient.post("/admin/insurance/plans", planData);
      return response.data;
    } catch (error) {
      console.error("Error creating insurance plan:", error);
      throw error;
    }
  },

  /**
   * Update an existing insurance plan
   * @param {string} planId - ID of the plan to update
   * @param {Object} planData - Updated plan data
   * @returns {Promise<Object>} Response with updated plan data
   */
  updatePlan: async (planId, planData) => {
    try {
      const response = await apiClient.put(
        `/admin/insurance/plans/${planId}`,
        planData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating plan ${planId}:`, error);
      throw error;
    }
  },

  /**
   * Delete an insurance plan
   * @param {string} planId - ID of the plan to delete
   * @returns {Promise<Object>} Response with success message
   */
  deletePlan: async (planId) => {
    try {
      const response = await apiClient.delete(
        `/admin/insurance/plans/${planId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting plan ${planId}:`, error);
      throw error;
    }
  },

  /**
   * Get all insurance companies
   * @returns {Promise<Object>} Response with insurance companies data
   */
  getAllCompanies: async () => {
    try {
      const response = await apiClient.get("/admin/insurance/companies");
      return response.data;
    } catch (error) {
      console.error("Error fetching insurance companies:", error);
      throw error;
    }
  },

  /**
   * Get a specific insurance company by ID
   * @param {string} companyId - ID of the company to retrieve
   * @returns {Promise<Object>} Response with company data
   */
  getCompanyById: async (companyId) => {
    try {
      const response = await apiClient.get(
        `/admin/insurance/companies/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching company ${companyId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new insurance company
   * @param {Object} companyData - Data for the new company
   * @returns {Promise<Object>} Response with created company data
   */
  createCompany: async (companyData) => {
    try {
      const response = await apiClient.post(
        "/admin/insurance/companies",
        companyData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating insurance company:", error);
      throw error;
    }
  },

  /**
   * Update an existing insurance company
   * @param {string} companyId - ID of the company to update
   * @param {Object} companyData - Updated company data
   * @returns {Promise<Object>} Response with updated company data
   */
  updateCompany: async (companyId, companyData) => {
    try {
      const response = await apiClient.put(
        `/admin/insurance/companies/${companyId}`,
        companyData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating company ${companyId}:`, error);
      throw error;
    }
  },

  /**
   * Delete an insurance company
   * @param {string} companyId - ID of the company to delete
   * @returns {Promise<Object>} Response with success message
   */
  deleteCompany: async (companyId) => {
    try {
      const response = await apiClient.delete(
        `/admin/insurance/companies/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting company ${companyId}:`, error);
      throw error;
    }
  },

  /**
   * Get insurance company statistics
   * @returns {Promise<Object>} Response with company statistics
   */
  getCompanyStatistics: async () => {
    try {
      const response = await apiClient.get(
        "/admin/insurance/companies/statistics"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company statistics:", error);
      throw error;
    }
  },

  /**
   * Get plan statistics
   * @returns {Promise<Object>} Response with plan statistics
   */
  getPlanStatistics: async () => {
    try {
      const response = await apiClient.get("/admin/insurance/plans/statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching plan statistics:", error);
      throw error;
    }
  },

  /**
   * Compare insurance plans based on user criteria
   * @param {Object} criteria - Comparison criteria (age, budget, etc.)
   * @returns {Promise<Object>} Response with matching plans
   */
  comparePlans: async (criteria) => {
    try {
      console.log(
        "Original criteria received:",
        JSON.stringify(criteria, null, 2)
      );

      // Create a deep copy to avoid mutating the original object
      const formattedCriteria = {
        ...criteria,
        insuranceType: criteria.insuranceType || "seniors",
      };

      // STEP 1: Process age parameters
      // If we already have ageMin and ageMax, use them directly
      if (criteria.ageMin !== undefined && criteria.ageMax !== undefined) {
        formattedCriteria.ageMin = Number(criteria.ageMin);
        formattedCriteria.ageMax = Number(criteria.ageMax);
        console.log(
          `Using provided age range: ${formattedCriteria.ageMin}-${formattedCriteria.ageMax}`
        );
      }
      // If we have only ageMin, use it for both min and max
      else if (criteria.ageMin !== undefined) {
        formattedCriteria.ageMin = Number(criteria.ageMin);
        formattedCriteria.ageMax = Number(criteria.ageMin);
        console.log(`Using ageMin for both: ${formattedCriteria.ageMin}`);
      }
      // If we have only ageMax, use it for both min and max
      else if (criteria.ageMax !== undefined) {
        formattedCriteria.ageMin = Number(criteria.ageMax);
        formattedCriteria.ageMax = Number(criteria.ageMax);
        console.log(`Using ageMax for both: ${formattedCriteria.ageMax}`);
      }
      // If we have age string or number, parse it
      else if (criteria.age !== undefined) {
        // Handle age as a string
        if (typeof criteria.age === "string") {
          // Check for range format (e.g., "65-70")
          if (criteria.age.includes("-")) {
            const parts = criteria.age.split("-");
            if (parts.length === 2) {
              const min = parseInt(parts[0].trim(), 10);
              const max = parseInt(parts[1].trim(), 10);
              if (!isNaN(min) && !isNaN(max)) {
                formattedCriteria.ageMin = min;
                formattedCriteria.ageMax = max;
                console.log(
                  `Parsed age range ${criteria.age} as min: ${min}, max: ${max}`
                );
              }
            }
          }
          // Check for plus format (e.g., "70+")
          else if (criteria.age.includes("+")) {
            const base = parseInt(criteria.age.replace("+", "").trim(), 10);
            if (!isNaN(base)) {
              formattedCriteria.ageMin = base;
              formattedCriteria.ageMax = 120; // Use a high upper limit
              console.log(
                `Parsed age with plus sign ${criteria.age} as min: ${base}, max: 120`
              );
            }
          }
          // Handle simple string number
          else {
            const singleAge = parseInt(criteria.age, 10);
            if (!isNaN(singleAge)) {
              formattedCriteria.ageMin = singleAge;
              formattedCriteria.ageMax = singleAge;
              console.log(`Parsed single age ${criteria.age} as: ${singleAge}`);
            }
          }
        }
        // Handle age as a number
        else if (typeof criteria.age === "number") {
          formattedCriteria.ageMin = criteria.age;
          formattedCriteria.ageMax = criteria.age;
          console.log(`Using numeric age ${criteria.age}`);
        }
      }

      // Default age range for seniors if still not specified
      if (
        formattedCriteria.ageMin === undefined ||
        formattedCriteria.ageMax === undefined
      ) {
        formattedCriteria.ageMin = 65;
        formattedCriteria.ageMax = 70;
        console.log(`Using default age range: 65-70`);
      }

      // STEP 2: Process budget parameters
      // If we already have budgetMin and budgetMax, use them directly
      if (
        criteria.budgetMin !== undefined &&
        criteria.budgetMax !== undefined
      ) {
        formattedCriteria.budgetMin = Number(criteria.budgetMin);
        formattedCriteria.budgetMax = Number(criteria.budgetMax);
        console.log(
          `Using provided budget range: ${formattedCriteria.budgetMin}-${formattedCriteria.budgetMax}`
        );
      }
      // If we have only budgetMin, use it with a high upper limit
      else if (criteria.budgetMin !== undefined) {
        formattedCriteria.budgetMin = Number(criteria.budgetMin);
        formattedCriteria.budgetMax = 1000000; // High upper limit
        console.log(
          `Using budgetMin with high upper limit: ${formattedCriteria.budgetMin}+`
        );
      }
      // If we have only budgetMax, use it with no lower limit
      else if (criteria.budgetMax !== undefined) {
        formattedCriteria.budgetMax = Number(criteria.budgetMax);
        console.log(`Using budgetMax: ${formattedCriteria.budgetMax}`);
      }
      // If we have budgetValue, use it as budgetMax
      else if (criteria.budgetValue !== undefined) {
        formattedCriteria.budgetMax = Number(criteria.budgetValue);
        console.log(`Using budgetValue as max: ${formattedCriteria.budgetMax}`);
      }
      // If we have budget string or number, parse it
      else if (criteria.budget !== undefined) {
        // Handle budget as a string
        if (typeof criteria.budget === "string") {
          // Check for range format (e.g., "5000-10000")
          if (criteria.budget.includes("-")) {
            const parts = criteria.budget.split("-");
            if (parts.length === 2) {
              const min = parseInt(parts[0].trim(), 10);
              const max = parseInt(parts[1].trim(), 10);
              if (!isNaN(min) && !isNaN(max)) {
                formattedCriteria.budgetMin = min;
                formattedCriteria.budgetMax = max;
                console.log(
                  `Parsed budget range ${criteria.budget} as min: ${min}, max: ${max}`
                );
              }
            }
          }
          // Check for plus format (e.g., "5000+")
          else if (criteria.budget.includes("+")) {
            const min = parseInt(criteria.budget.replace("+", "").trim(), 10);
            if (!isNaN(min)) {
              formattedCriteria.budgetMin = min;
              formattedCriteria.budgetMax = 1000000; // High upper limit
              console.log(
                `Parsed budget with plus sign ${criteria.budget} as min: ${min}`
              );
            }
          }
          // Handle simple string number
          else {
            const singleBudget = parseInt(criteria.budget, 10);
            if (!isNaN(singleBudget)) {
              formattedCriteria.budgetMax = singleBudget;
              console.log(
                `Parsed single budget ${criteria.budget} as max: ${singleBudget}`
              );
            }
          }
        }
        // Handle budget as a number
        else if (typeof criteria.budget === "number") {
          formattedCriteria.budgetMax = criteria.budget;
          console.log(`Using numeric budget ${criteria.budget} as max`);
        }
      }

      // STEP 3: Clean up the criteria object to only include necessary fields
      const apiQuery = {
        insuranceType: formattedCriteria.insuranceType,
        ageMin: formattedCriteria.ageMin,
        ageMax: formattedCriteria.ageMax,
        budgetMin: formattedCriteria.budgetMin,
        budgetMax: formattedCriteria.budgetMax,
        optionalCovers: formattedCriteria.optionalCovers,
      };

      console.log(
        "Final formatted criteria for API:",
        JSON.stringify(apiQuery, null, 2)
      );

      // STEP 4: Use mock data if enabled
      if (ENABLE_MOCK_DATA) {
        console.log("Using mock data for comparison");
        return {
          id: "mock-" + Date.now(),
          createdAt: new Date(),
          userQuery: apiQuery,
          comparisonResults:
            mockInsuranceData.generateMockComparisonResults(apiQuery),
        };
      }

      // STEP 5: Call the backend API
      const response = await apiClient.post("/insurance/compare", apiQuery);

      if (
        response.data &&
        response.data.success &&
        response.data.data.comparisonResults &&
        response.data.data.comparisonResults.length > 0
      ) {
        console.log(
          `API returned ${response.data.data.comparisonResults.length} plans`
        );
        return response.data.data;
      } else {
        // If no plans found, return empty results structure
        console.warn("No plans found from API");

        // Try fallback to mock data if in development
        if (import.meta.env.DEV || ENABLE_MOCK_DATA) {
          console.warn("No API results, falling back to mock data");
          return {
            id: "fallback-" + Date.now(),
            createdAt: new Date(),
            userQuery: apiQuery,
            comparisonResults:
              mockInsuranceData.generateMockComparisonResults(apiQuery),
          };
        }

        return {
          id: "empty-" + Date.now(),
          createdAt: new Date(),
          userQuery: apiQuery,
          comparisonResults: [],
        };
      }
    } catch (error) {
      console.error("Error comparing insurance plans:", error);

      // Fallback to mock data in case of API failure
      if (import.meta.env.DEV || ENABLE_MOCK_DATA) {
        console.warn("API failed, falling back to mock data");
        return {
          id: "fallback-" + Date.now(),
          createdAt: new Date(),
          userQuery: criteria,
          comparisonResults:
            mockInsuranceData.generateMockComparisonResults(criteria),
        };
      }

      // In production with no mock data, return empty results
      return {
        id: "error-" + Date.now(),
        createdAt: new Date(),
        userQuery: criteria,
        error: error.message || "Unknown error occurred",
        comparisonResults: [],
      };
    }
  },

  /**
   * Get detailed information for a specific plan
   * @param {string} planId - ID of the plan
   * @returns {Promise<Object>} Plan details
   */
  getPlanDetails: async (planId) => {
    try {
      // Try the new endpoint first
      try {
        const response = await apiClient.get(
          `/insurance/plans/${planId}/details`
        );
        if (response.data && response.data.success) {
          return response.data.data;
        }
      } catch (apiError) {
        console.warn(
          `New details endpoint failed, trying fallback endpoint for plan ${planId}:`,
          apiError
        );
      }

      // Fallback to the old endpoint
      const fallbackResponse = await apiClient.get(
        `/insurance/plans/${planId}`
      );
      if (fallbackResponse.data && fallbackResponse.data.success) {
        return fallbackResponse.data.data;
      } else {
        throw new Error(
          fallbackResponse.data?.message || "Failed to get plan details"
        );
      }
    } catch (error) {
      console.error(`Error fetching details for plan ${planId}:`, error);
      throw error;
    }
  },
};

// This mock data helper has been removed to ensure we only use the backend API

export default insuranceService;
