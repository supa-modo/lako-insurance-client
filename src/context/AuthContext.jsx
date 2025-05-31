import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/authService";

// Create context
const AuthContext = createContext(null);

/**
 * Auth Provider component to wrap the application
 * Provides authentication state and methods to all child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Changed from true to false
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state only when needed (lazy initialization)
  const initializeAuth = async () => {
    if (initialized) return; // Already initialized

    setLoading(true);
    setInitialized(true);

    try {
      if (authService.isAuthenticated()) {
        // Get user profile from token
        const userData = authService.getCurrentAdmin();
        setUser(userData);

        // Optionally fetch fresh data from API
        try {
          const freshUserData = await authService.getAdminProfile();
          if (freshUserData) {
            setUser(freshUserData);
          }
        } catch (profileError) {
          // Continue with stored user data
        }
      }
    } catch (err) {
      authService.logoutAdmin();
      setError("Authentication failed. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if we're on an admin route to decide whether to initialize
  useEffect(() => {
    // Only initialize if we're on an admin route or if there's a token
    const currentPath = window.location.pathname;
    const isAdminRoute = currentPath.startsWith("/admin");
    const hasToken = authService.isAuthenticated();

    if (isAdminRoute || hasToken) {
      initializeAuth();
    }
  }, []);

  /**
   * Login function
   * @param {Object} credentials - User credentials
   * @returns {Promise<Object>} User data
   */
  const login = async (credentials) => {
    setError(null);
    setLoading(true);

    try {
      const userData = await authService.loginAdmin(credentials);
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    authService.logoutAdmin();
    setUser(null);
  };

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user data
   */
  const updateProfile = async (profileData) => {
    setError(null);
    setLoading(true);

    try {
      const updatedUser = await authService.updateAdminProfile(profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Profile update failed.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create context value object
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    isAuthenticated: authService.isAuthenticated,
    initializeAuth, // Add this for manual initialization
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * @returns {Object} Auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
