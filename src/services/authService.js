import axios from "axios";

// API base URL from environment variables or default
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Token storage keys
const TOKEN_KEY = "kola_auth_token";
const USER_KEY = "kola_auth_user";

// Create axios instance with auth interceptors
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem(TOKEN_KEY);

    // If we have a token, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug logging (remove in production)
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        `API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Debug logging (remove in production)
    if (process.env.NODE_ENV !== "production") {
      console.debug(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle errors gracefully
    console.error("API Response Error:", error);

    // For 401 errors, handle token issues
    if (error.response && error.response.status === 401) {
      console.warn("Authentication error detected");

      // Only clear token and redirect in specific cases
      const isLoginPage = window.location.pathname.includes("login");
      const isTokenExpired = error.response.data?.message?.includes("expired");
      const isTokenMissing = error.response.data?.message?.includes("missing");

      if (
        !isLoginPage &&
        (isTokenExpired || (!isTokenMissing && localStorage.getItem(TOKEN_KEY)))
      ) {
        console.warn("Session expired, redirecting to login");
        // Clear auth data
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        // Redirect admin paths to login
        if (
          window.location.pathname.startsWith("/admin") &&
          window.location.pathname !== "/admin" &&
          window.location.pathname !== "/admin/login"
        ) {
          window.location.href = "/admin/login";
        }
      }
    }

    // Let the calling code handle other errors
    return Promise.reject(error);
  }
);

/**
 * Authentication service for the Kola application
 */
const authService = {
  /**
   * Login an admin user
   * @param {Object} credentials - Admin credentials
   * @returns {Promise<Object>} User data
   */
  loginAdmin: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const { token, user } = response.data;

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
      return response.data;
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
