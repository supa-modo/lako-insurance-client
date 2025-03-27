import api from "./api";

/**
 * Get all insurance plans with optional filtering
 */
export const getAllPlans = async (companyId, planType) => {
  try {
    const params = { companyId, planType };
    const response = await api.get("/plans", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

/**
 * Get a specific insurance plan
 */
export const getPlanById = async (id) => {
  try {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plan ${id}:`, error);
    throw error;
  }
};
