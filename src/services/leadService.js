import { apiClient, safeApiCall, ENABLE_MOCK_DATA } from "./apiConfig";
import { initialLeads } from "../data/leads";

/**
 * Get all leads with optional filtering
 * @param {Object} filters - Optional filters for leads
 * @returns {Promise<Object>} Response with leads data grouped by status
 */
export const getLeads = async (filters = {}) => {
  // If mock data is enabled, return mock data
  if (ENABLE_MOCK_DATA) {
    // Group leads by status
    const leadsByStatus = initialLeads.reduce((acc, lead) => {
      const status = lead.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(lead);
      return acc;
    }, {});

    return {
      success: true,
      data: leadsByStatus,
      meta: {
        total: initialLeads.length,
        page: 1,
        pageSize: 100,
        totalPages: 1,
      },
    };
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach(item => queryParams.append(key, item));
      } else {
        queryParams.append(key, value);
      }
    }
  });

  // Make API call
  return safeApiCall(() => 
    apiClient.get(`/leads?${queryParams.toString()}`)
      .then(response => response.data)
  );
};

/**
 * Get a lead by ID
 * @param {string} id - Lead ID
 * @returns {Promise<Object>} Response with lead data
 */
export const getLeadById = async (id) => {
  // If mock data is enabled, return mock data
  if (ENABLE_MOCK_DATA) {
    const lead = initialLeads.find(lead => lead.id === id);
    
    if (!lead) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    return {
      success: true,
      data: lead,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.get(`/leads/${id}`)
      .then(response => response.data)
  );
};

/**
 * Create a new lead
 * @param {Object} leadData - Lead data
 * @returns {Promise<Object>} Response with created lead
 */
export const createLead = async (leadData) => {
  // If mock data is enabled, simulate creating a lead
  if (ENABLE_MOCK_DATA) {
    // In mock mode, we'll use the assignedTo as both the ID and display name
    // In real mode, assignedTo would be a UUID referencing a user
    const newLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      assignedToName: leadData.assignedTo, // In real app, this would be set by the server
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: "Lead created successfully",
      data: newLead,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.post("/leads", leadData)
      .then(response => response.data)
  );
};

/**
 * Update an existing lead
 * @param {string} id - Lead ID
 * @param {Object} leadData - Updated lead data
 * @returns {Promise<Object>} Response with updated lead
 */
export const updateLead = async (id, leadData) => {
  // If mock data is enabled, simulate updating a lead
  if (ENABLE_MOCK_DATA) {
    const leadIndex = initialLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    // In mock mode, if assignedTo is updated, also update assignedToName
    // In real mode, the server would handle this
    let updatedData = { ...leadData };
    if (leadData.assignedTo && leadData.assignedTo !== initialLeads[leadIndex].assignedTo) {
      updatedData.assignedToName = leadData.assignedTo;
    }
    
    const updatedLead = {
      ...initialLeads[leadIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.put(`/leads/${id}`, leadData)
      .then(response => response.data)
  );
};

/**
 * Update lead status (for drag and drop)
 * @param {string} id - Lead ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Response with updated lead
 */
export const updateLeadStatus = async (id, status) => {
  // If mock data is enabled, simulate updating lead status
  if (ENABLE_MOCK_DATA) {
    const leadIndex = initialLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    const updatedLead = {
      ...initialLeads[leadIndex],
      status,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: "Lead status updated successfully",
      data: updatedLead,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.patch(`/leads/${id}/status`, { status })
      .then(response => response.data)
  );
};

/**
 * Toggle lead star status
 * @param {string} id - Lead ID
 * @returns {Promise<Object>} Response with updated lead
 */
export const toggleLeadStar = async (id) => {
  // If mock data is enabled, simulate toggling star
  if (ENABLE_MOCK_DATA) {
    const leadIndex = initialLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    const updatedLead = {
      ...initialLeads[leadIndex],
      starred: !initialLeads[leadIndex].starred,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: `Lead ${updatedLead.starred ? "starred" : "unstarred"} successfully`,
      data: updatedLead,
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.patch(`/leads/${id}/toggle-star`)
      .then(response => response.data)
  );
};

/**
 * Delete a lead
 * @param {string} id - Lead ID
 * @returns {Promise<Object>} Response with success status
 */
export const deleteLead = async (id) => {
  // If mock data is enabled, simulate deleting a lead
  if (ENABLE_MOCK_DATA) {
    const leadIndex = initialLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    return {
      success: true,
      message: "Lead deleted successfully",
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.delete(`/leads/${id}`)
      .then(response => response.data)
  );
};

/**
 * Add activity to a lead
 * @param {string} id - Lead ID
 * @param {Object} activityData - Activity data
 * @returns {Promise<Object>} Response with created activity
 */
export const addLeadActivity = async (id, activityData) => {
  // If mock data is enabled, simulate adding activity
  if (ENABLE_MOCK_DATA) {
    const leadIndex = initialLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    const newActivity = {
      id: `activity-${Date.now()}`,
      leadId: id,
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
    apiClient.post(`/leads/${id}/activities`, activityData)
      .then(response => response.data)
  );
};

/**
 * Get lead activities
 * @param {string} id - Lead ID
 * @returns {Promise<Object>} Response with activities
 */
export const getLeadActivities = async (id) => {
  // If mock data is enabled, return mock activities
  if (ENABLE_MOCK_DATA) {
    const lead = initialLeads.find(lead => lead.id === id);
    
    if (!lead) {
      return {
        success: false,
        message: "Lead not found",
      };
    }
    
    // Mock activities
    const activities = [
      {
        id: "activity-1",
        leadId: id,
        type: "note",
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        user: lead.assignedTo,
        content: "Initial contact made with client. They're interested in our senior plans.",
      },
      {
        id: "activity-2",
        leadId: id,
        type: "call",
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        user: lead.assignedTo,
        content: "Follow-up call to discuss specific needs and budget constraints.",
      },
      {
        id: "activity-3",
        leadId: id,
        type: "email",
        date: new Date().toISOString(), // Today
        user: lead.assignedTo,
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
    apiClient.get(`/leads/${id}/activities`)
      .then(response => response.data)
  );
};

/**
 * Get lead statistics
 * @returns {Promise<Object>} Response with lead statistics
 */
export const getLeadStats = async () => {
  // If mock data is enabled, generate mock stats
  if (ENABLE_MOCK_DATA) {
    // Count leads by status
    const byStatus = initialLeads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
    
    // Count leads by priority
    const byPriority = initialLeads.reduce((acc, lead) => {
      acc[lead.priority] = (acc[lead.priority] || 0) + 1;
      return acc;
    }, {});
    
    // Count leads by assignedTo
    const byAssignedTo = initialLeads.reduce((acc, lead) => {
      acc[lead.assignedTo] = (acc[lead.assignedTo] || 0) + 1;
      return acc;
    }, {});
    
    // Count total and starred leads
    const totalLeads = initialLeads.length;
    const starredLeads = initialLeads.filter(lead => lead.starred).length;
    
    return {
      success: true,
      data: {
        totalLeads,
        starredLeads,
        byStatus,
        byPriority,
        byAssignedTo,
      },
    };
  }

  // Make API call
  return safeApiCall(() => 
    apiClient.get("/leads/stats")
      .then(response => response.data)
  );
};

// Export all functions
export default {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  toggleLeadStar,
  deleteLead,
  addLeadActivity,
  getLeadActivities,
  getLeadStats,
};
