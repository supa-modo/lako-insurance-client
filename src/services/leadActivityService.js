import { apiClient, safeApiCall, ENABLE_MOCK_DATA } from "./apiConfig";

/**
 * Get activities for a lead
 * @param {string} leadId - Lead ID
 * @returns {Promise<Object>} Response with activities data
 */
export const getLeadActivities = async (leadId) => {
  // If mock data is enabled, return mock data
  if (ENABLE_MOCK_DATA) {
    // Mock activities
    const activities = [
      {
        id: "activity-1",
        leadId,
        type: "note",
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        user: "System",
        content: "Lead created",
      },
      {
        id: "activity-2",
        leadId,
        type: "call",
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        user: "Mary W.",
        content: "Initial contact made with client. They're interested in our senior plans.",
      },
      {
        id: "activity-3",
        leadId,
        type: "email",
        date: new Date().toISOString(), // Today
        user: "James O.",
        content: "Sent detailed information about our premium plans that match their requirements.",
      },
    ];
    
    return {
      success: true,
      data: activities,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.get(`/leads/${leadId}/activities`)
      .then(response => response.data)
  );
};

/**
 * Add activity to a lead
 * @param {string} leadId - Lead ID
 * @param {Object} activityData - Activity data
 * @returns {Promise<Object>} Response with created activity
 */
export const addLeadActivity = async (leadId, activityData) => {
  // If mock data is enabled, simulate adding activity
  if (ENABLE_MOCK_DATA) {
    const newActivity = {
      id: `activity-${Date.now()}`,
      leadId,
      ...activityData,
      date: activityData.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: "Activity added successfully",
      data: newActivity,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.post(`/leads/${leadId}/activities`, activityData)
      .then(response => response.data)
  );
};

// Export all functions
export default {
  getLeadActivities,
  addLeadActivity,
};
