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
    }
  },

  /**
   * Get plan benefits
   * @param {string} planId - ID of the plan
   * @returns {Promise<Object>} Response with plan benefits data
   */
  getPlanBenefits: async (planId) => {
    try {
      const response = await apiClient.get(
        `/admin/insurance/plans/${planId}/benefits`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching benefits for plan ${planId}:`, error);
    }
  },

  /**
   * Get plan exclusions
   * @param {string} planId - ID of the plan
   * @returns {Promise<Object>} Response with plan exclusions data
   */
  getPlanExclusions: async (planId) => {
    try {
      const response = await apiClient.get(
        `/admin/insurance/plans/${planId}/exclusions`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching exclusions for plan ${planId}:`, error);
    }
  },

  /**
   * Get plan waiting periods
   * @param {string} planId - ID of the plan
   * @returns {Promise<Object>} Response with plan waiting periods data
   */
  getPlanWaitingPeriods: async (planId) => {
    try {
      const response = await apiClient.get(
        `/admin/insurance/plans/${planId}/waiting-periods`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching waiting periods for plan ${planId}:`,
        error
      );
    }
  },

  /**
   * Get plan premiums
   * @param {string} planId - ID of the plan
   * @returns {Promise<Object>} Response with plan premiums data
   */
  getPlanPremiums: async (planId) => {
    try {
      const response = await apiClient.get(
        `/admin/insurance/plans/${planId}/premiums`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching premiums for plan ${planId}:`, error);
    }
  },

  /**
   * Compare insurance plans based on user criteria
   * @param {Object} criteria - Comparison criteria (age, budget, etc.)
   * @returns {Promise<Object>} Response with matching plans
   */
  comparePlans: async (criteria) => {
    try {
      // Ensure criteria has the correct format
      const formattedCriteria = {
        ...criteria,
        insuranceType: criteria.insuranceType || "seniors",
      };

      // Process age parameter - always use the higher age for filtering
      if (criteria.age) {
        // If age is provided as a range string, extract the max age
        if (typeof criteria.age === 'string') {
          if (criteria.age.includes('-')) {
            // For age range (e.g., "65-70"), use the higher number
            const parts = criteria.age.split('-');
            if (parts.length === 2) {
              const max = parseInt(parts[1].trim(), 10);
              if (!isNaN(max)) {
                formattedCriteria.ageMax = max;
              }
            }
          } else if (criteria.age.includes('+')) {
            // For age with plus (e.g., "70+"), use the base number
            const base = parseInt(criteria.age.replace('+', '').trim(), 10);
            if (!isNaN(base)) {
              formattedCriteria.ageMax = base;
            }
          } else {
            // For single age as string
            const parsedAge = parseInt(criteria.age, 10);
            if (!isNaN(parsedAge)) {
              formattedCriteria.ageMax = parsedAge;
            }
          }
        } else if (typeof criteria.age === 'number') {
          // If age is a number, use it directly
          formattedCriteria.ageMax = criteria.age;
        }
      } else {
        // Default age range for seniors if not specified
        formattedCriteria.ageMax = 70;
      }

      // Process budget parameter - extract both min and max values
      if (criteria.budget) {
        if (typeof criteria.budget === 'string' && criteria.budget.includes('-')) {
          // For budget range (e.g., "5000-10000"), extract both min and max
          const parts = criteria.budget.split('-');
          if (parts.length === 2) {
            const min = parseInt(parts[0].trim(), 10);
            const max = parseInt(parts[1].trim(), 10);
            
            if (!isNaN(min) && !formattedCriteria.budgetMin) {
              formattedCriteria.budgetMin = min;
            }
            
            if (!isNaN(max) && !formattedCriteria.budgetMax) {
              formattedCriteria.budgetMax = max;
            }
          }
        } else {
          // For single budget value, use as budgetMax
          const budgetValue = typeof criteria.budget === 'string' 
            ? parseInt(criteria.budget, 10) 
            : criteria.budget;
            
          if (!isNaN(budgetValue) && !formattedCriteria.budgetMax) {
            formattedCriteria.budgetMax = budgetValue;
          }
        }
      }

      // Use mock data if enabled or in development mode
      if (ENABLE_MOCK_DATA) {
        console.log("Using mock data for comparison");
        return {
          id: 'mock-' + Date.now(),
          createdAt: new Date(),
          userQuery: formattedCriteria,
          comparisonResults: mockInsuranceData.generateMockComparisonResults(formattedCriteria)
        };
      }

      // Call the backend API
      const response = await apiClient.post("/insurance/compare", formattedCriteria);

      if (response.data && response.data.success && 
          response.data.data.comparisonResults && 
          response.data.data.comparisonResults.length > 0) {
        return response.data.data;
      } else {
        // If no plans found, return empty results structure
        console.warn("No plans found from API");
        return {
          id: 'empty-' + Date.now(),
          createdAt: new Date(),
          userQuery: formattedCriteria,
          comparisonResults: []
        };
      }
    } catch (error) {
      console.error("Error comparing insurance plans:", error);
      
      // Fallback to mock data in case of API failure
      if (import.meta.env.DEV || ENABLE_MOCK_DATA) {
        console.warn("API failed, falling back to mock data");
        return {
          id: 'fallback-' + Date.now(),
          createdAt: new Date(),
          userQuery: criteria,
          comparisonResults: mockInsuranceData.generateMockComparisonResults(criteria)
        };
      }
      
      // In production with no mock data, return empty results
      return {
        id: 'error-' + Date.now(),
        createdAt: new Date(),
        userQuery: criteria,
        error: error.message || "Unknown error occurred",
        comparisonResults: []
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
        const response = await apiClient.get(`/insurance/plans/${planId}/details`);
        if (response.data && response.data.success) {
          return response.data.data;
        }
      } catch (apiError) {
        console.warn(`New details endpoint failed, trying fallback endpoint for plan ${planId}:`, apiError);
      }
      
      // Fallback to the old endpoint
      const fallbackResponse = await apiClient.get(`/insurance/plans/${planId}`);
      if (fallbackResponse.data && fallbackResponse.data.success) {
        return fallbackResponse.data.data;
      } else {
        throw new Error(fallbackResponse.data?.message || "Failed to get plan details");
      }
    } catch (error) {
      console.error(`Error fetching details for plan ${planId}:`, error);
      throw error;
    }
  },
};

// This mock data helper has been removed to ensure we only use the backend API

export default insuranceService;
