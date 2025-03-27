import api from "./api";

/**
 * Login as admin
 */
export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post("/admin/login", credentials);

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Register a new admin
 */
export const registerAdmin = async (data) => {
  try {
    const response = await api.post("/admin/register", data);

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Get current admin profile
 */
export const getAdminProfile = async () => {
  try {
    const response = await api.get("/admin/me");
    return response.data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

/**
 * Logout admin by removing token
 */
export const logoutAdmin = () => {
  localStorage.removeItem("token");
};

/**
 * Check if admin is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
