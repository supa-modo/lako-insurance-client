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
      const response = await apiClient.get(`/users/search?query=${encodeURIComponent(query)}&limit=${limit}`);
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
      params.append('page', page);
      params.append('limit', limit);
      
      if (role) params.append('role', role);
      if (isActive !== undefined) params.append('isActive', isActive);
      if (search) params.append('search', search);
      
      const response = await apiClient.get(`/users?${params.toString()}`);
      return response.data;
    });
  }
};

export default userService;
