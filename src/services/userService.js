import { apiClient, safeApiCall } from "./apiConfig";

/**
 * User Service
 * Handles all user-related API requests
 */
const userService = {
  /**
   * Search users by name or email
   * @param {string} query - Search query
   * @param {number} limit - Maximum number of results to return
   * @returns {Promise<Object>} Response with users data
   */
  searchUsers: async (query, limit = 10) => {
    return safeApiCall(async () => {
      const response = await apiClient.get(
        `/users/search?query=${encodeURIComponent(query)}&limit=${limit}`
      );
      return response.data;
    });
  },

  /**
   * Get all users with optional filters and pagination
   * @param {Object} options - Options for filtering and pagination
   * @returns {Promise<Object>} Response with users data and pagination info
   */
  getAllUsers: async (options = {}) => {
    return safeApiCall(async () => {
      const { page = 1, limit = 10, role, isActive, search } = options;

      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);

      if (role) params.append("role", role);
      if (isActive !== undefined) params.append("isActive", isActive);
      if (search) params.append("search", search);

      const response = await apiClient.get(`/users?${params.toString()}`);
      return response.data;
    });
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} Response with user profile data
   */
  getProfile: async () => {
    return safeApiCall(async () => {
      const response = await apiClient.get("/auth/profile");
      return response.data;
    });
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<Object>} Response with updated user data
   */
  updateProfile: async (profileData) => {
    return safeApiCall(async () => {
      const response = await apiClient.put("/auth/profile", profileData);
      return response.data;
    });
  },

  /**
   * Change user password
   * @param {Object} passwordData - Current and new password
   * @returns {Promise<Object>} Response with success message
   */
  changePassword: async (passwordData) => {
    return safeApiCall(async () => {
      const response = await apiClient.post(
        "/auth/change-password",
        passwordData
      );
      return response.data;
    });
  },

  // 2FA Management

  /**
   * Get 2FA status for current user
   * @returns {Promise<Object>} Response with 2FA status
   */
  get2FAStatus: async () => {
    return safeApiCall(async () => {
      const response = await apiClient.get("/auth/2fa/status");
      return response.data;
    });
  },

  /**
   * Setup 2FA (get QR code and secret)
   * @returns {Promise<Object>} Response with QR code and setup data
   */
  setup2FA: async () => {
    return safeApiCall(async () => {
      const response = await apiClient.post("/auth/2fa/setup");
      return response.data;
    });
  },

  /**
   * Enable 2FA with verification token
   * @param {string} token - 6-digit verification token from authenticator app
   * @returns {Promise<Object>} Response with backup codes
   */
  enable2FA: async (token) => {
    return safeApiCall(async () => {
      const response = await apiClient.post("/auth/2fa/enable", { token });
      return response.data;
    });
  },

  /**
   * Disable 2FA with verification token
   * @param {string} token - 6-digit verification token from authenticator app
   * @returns {Promise<Object>} Response with success message
   */
  disable2FA: async (token) => {
    return safeApiCall(async () => {
      const response = await apiClient.post("/auth/2fa/disable", { token });
      return response.data;
    });
  },
};

export default userService;
