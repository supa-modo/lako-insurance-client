import { apiClient, TOKEN_KEY, USER_KEY, safeApiCall } from "./apiConfig";

/**
 * Authentication service for the Kola application
 */
const authService = {
  /**
   * Login an admin user
   * @param {Object} credentials - Admin credentials
   * @returns {Promise<Object>} User data or 2FA requirement indicator
   */
  loginAdmin: async (credentials) => {
    try {
      const { email, password, twoFactorCode } = credentials;

      const loginData = { email, password };
      if (twoFactorCode) {
        loginData.twoFactorCode = twoFactorCode;
      }

      const response = await apiClient.post("/auth/login", loginData);

      // Check if 2FA is required
      if (response.data.requires2FA) {
        return { requires2FA: true };
      }

      // Extract data from the successful login response
      const { token, user } = response.data;

      // Validate that we have the required data
      if (!token || !user) {
        throw new Error("Invalid login response: missing token or user data");
      }

      // Store token and user data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  /**
   * Logout the current admin user
   */
  logoutAdmin: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get the current admin user
   * @returns {Object|null} User data or null if not logged in
   */
  getCurrentAdmin: () => {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  /**
   * Get admin profile data
   * @returns {Promise<Object>} User profile data
   */
  getAdminProfile: async () => {
    try {
      const response = await apiClient.get("/auth/profile");

      // Backend returns { success: true, user: {...} }
      return response.data.user || response.data;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      throw error;
    }
  },

  /**
   * Update admin profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user data
   */
  updateAdminProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/admin/profile", profileData);

      // Update stored user data
      if (response.data) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error("Error updating admin profile:", error);
      throw error;
    }
  },

  /**
   * Change admin password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} Response data
   */
  changeAdminPassword: async (passwordData) => {
    try {
      const response = await apiClient.put(
        "/admin/change-password",
        passwordData
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },

  /**
   * Request password reset
   * @param {string} email - Email address
   * @returns {Promise<Object>} Response data
   */
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param {Object} resetData - Reset data containing token and new password
   * @returns {Promise<Object>} Response data
   */
  resetPassword: async (resetData) => {
    try {
      const response = await apiClient.post("/auth/reset-password", resetData);
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },

  /**
   * Wrapper for API calls to handle common error scenarios
   * @param {Function} apiCall - The API call function to execute
   * @param {any} defaultValue - Default value to return on error
   * @returns {Promise<any>} - Response data or default value
   */
  safeApiCall: async (apiCall, defaultValue = null) => {
    try {
      const response = await apiCall();
      return response.data?.data || defaultValue;
    } catch (error) {
      console.error("API call failed:", error);
      return defaultValue;
    }
  },
};

export default authService;
