import { apiClient } from "../services/apiConfig";

// User Management API
export const userAPI = {
  // Get all users with pagination and filters
  getUsers: (params = {}) => {
    return apiClient.get("/superadmin/users", { params });
  },

  // Create new user
  createUser: (userData) => {
    return apiClient.post("/superadmin/users", userData);
  },

  // Update user
  updateUser: (userId, userData) => {
    return apiClient.put(`/superadmin/users/${userId}`, userData);
  },

  // Delete user
  deleteUser: (userId) => {
    return apiClient.delete(`/superadmin/users/${userId}`);
  },

  // Reset user password
  resetUserPassword: async (userId, newPassword) => {
    return await safeApiCall(() =>
      apiClient.post(`/superadmin/users/${userId}/reset-password`, {
        newPassword,
      })
    );
  },

  // Disable 2FA for a user (SuperAdmin only)
  disable2FAForUser: async (userId) => {
    return await safeApiCall(() =>
      apiClient.post(`/superadmin/users/${userId}/disable-2fa`)
    );
  },
};

// Analytics API
export const analyticsAPI = {
  // Get security analytics
  getSecurityAnalytics: async (days = 30) => {
    try {
      console.log("🔐 SuperAdmin API: Getting security analytics...");
      const response = await apiClient.get("/superadmin/analytics/security", {
        params: { days },
      });
      console.log(
        "✅ SuperAdmin API: Security analytics retrieved successfully"
      );
      return response;
    } catch (error) {
      console.error("❌ SuperAdmin API: Security analytics failed", error);
      throw error;
    }
  },

  // Get system statistics
  getSystemStatistics: async () => {
    try {
      console.log("🔐 SuperAdmin API: Getting system statistics...");
      const response = await apiClient.get("/superadmin/statistics");
      console.log(
        "✅ SuperAdmin API: System statistics retrieved successfully"
      );
      return response;
    } catch (error) {
      console.error("❌ SuperAdmin API: System statistics failed", error);
      throw error;
    }
  },
};

// Audit API
export const auditAPI = {
  // Get audit logs
  getAuditLogs: (params = {}) => {
    return apiClient.get("/superadmin/audit-logs", { params });
  },

  // Get user activities
  getUserActivities: (params = {}) => {
    return apiClient.get("/superadmin/user-activities", { params });
  },

  // Export audit logs
  exportAuditLogs: async (params = {}) => {
    const response = await apiClient.get("/superadmin/audit-logs/export", {
      params,
      responseType: "blob",
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  },
};

// Helper functions for backward compatibility
export const getUsers = (params) => userAPI.getUsers(params);
export const createUser = (userData) => userAPI.createUser(userData);
export const updateUser = (userId, userData) =>
  userAPI.updateUser(userId, userData);
export const deleteUser = (userId) => userAPI.deleteUser(userId);
export const resetUserPassword = (userId, newPassword) =>
  userAPI.resetUserPassword(userId, newPassword);
export const getSecurityAnalytics = (days) =>
  analyticsAPI.getSecurityAnalytics(days);
export const getSystemStatistics = () => analyticsAPI.getSystemStatistics();
export const getAuditLogs = (params) => auditAPI.getAuditLogs(params);
export const getUserActivities = (params) => auditAPI.getUserActivities(params);
export const exportAuditLogs = (params) => auditAPI.exportAuditLogs(params);

export default apiClient;
