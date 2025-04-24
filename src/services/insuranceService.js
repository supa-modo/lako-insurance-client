import { apiClient } from "./authService";


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
      const response = await apiClient.put(`/admin/insurance/plans/${planId}`, planData);
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
      const response = await apiClient.delete(`/admin/insurance/plans/${planId}`);
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
      const response = await apiClient.get(`/admin/insurance/plans/${planId}/benefits`);
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
      const response = await apiClient.get(`/admin/insurance/plans/${planId}/exclusions`);
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
      const response = await apiClient.get(`/admin/insurance/plans/${planId}/waiting-periods`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching waiting periods for plan ${planId}:`, error);
     
     
    }
  },

  /**
   * Get plan premiums
   * @param {string} planId - ID of the plan
   * @returns {Promise<Object>} Response with plan premiums data
   */
  getPlanPremiums: async (planId) => {
    try {
      const response = await apiClient.get(`/admin/insurance/plans/${planId}/premiums`);
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
      const response = await apiClient.post("/insurance/compare", criteria);
      return response.data;
    } catch (error) {
      console.error("Error comparing insurance plans:", error);
     
    }
  }
};

export default insuranceService;
