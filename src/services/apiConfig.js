import axios from "axios";

// API base URL from environment variables or default
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// Enable mock data based on environment variable
export const ENABLE_MOCK_DATA =
  import.meta.env.VITE_ENABLE_MOCK_DATA === "true";

// Enable debug logging based on environment variable
export const ENABLE_DEBUG_LOGGING =
  import.meta.env.VITE_ENABLE_DEBUG_LOGGING === "true";

// Token storage keys
export const TOKEN_KEY = "kola_auth_token";
export const USER_KEY = "kola_auth_user";

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

    // Debug logging
    if (ENABLE_DEBUG_LOGGING) {
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
    // Debug logging
    if (ENABLE_DEBUG_LOGGING) {
      console.debug(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (ENABLE_DEBUG_LOGGING) {
        console.error(
          `API Error ${error.response.status}: ${
            error.response.data?.message || JSON.stringify(error.response.data)
          }`
        );
      }

      // Handle 401 Unauthorized errors (token expired or invalid)
      if (error.response.status === 401) {
        // Clear auth data from localStorage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        // Redirect to login page if not already there
        if (!window.location.pathname.includes("/admin/login")) {
          window.location.href = "/admin/login";
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Wrapper for API calls to handle common error scenarios
 * @param {Function} apiCall - The API call function to execute
 * @param {any} defaultValue - Default value to return on error
 * @returns {Promise<any>} - Response data or default value
 */
export const safeApiCall = async (apiCall, defaultValue = null) => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.error("API call failed:", error);

    // If we have a response with validation errors, return them properly
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.message || "Operation failed",
        errors: error.response.data.errors || [],
      };
    }

    return defaultValue;
  }
};

export default {
  API_BASE_URL,
  apiClient,
  safeApiCall,
  ENABLE_MOCK_DATA,
  ENABLE_DEBUG_LOGGING,
};
