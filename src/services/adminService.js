import axios from "axios";
import mockUsers from "../data/mockUsers.json";

const API_URL = "http://localhost:5000/api";

// Create axios instance with token included in headers
const authAxios = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to determine if we should use mock data or real API
const USE_MOCK = false;

/**
 * Login as admin - either using mock data or real API
 */
export const loginAdmin = async (credentials) => {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find user with matching credentials
    const user = mockUsers.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (user) {
      // Create a mock token
      const token = btoa(
        JSON.stringify({
          id: user.id,
          email: user.email,
          role: user.role,
          exp: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
        })
      );

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
        })
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } else {
      // Simulate error response
      throw {
        response: {
          data: {
            error: "Invalid email or password",
          },
          status: 401,
        },
      };
    }
  } else {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  }
};

/**
 * Register a new admin
 */
export const registerAdmin = async (data) => {
  if (USE_MOCK) {
    // This function isn't needed for mock data, but implemented for completeness
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if email is already taken
    if (mockUsers.some((user) => user.email === data.email)) {
      throw {
        response: {
          data: {
            error: "Email already in use",
          },
          status: 400,
        },
      };
    }

    // Create new user
    const newUser = {
      id: `admin-${Date.now()}`,
      email: data.email,
      password: data.password,
      name: data.name,
      role: "admin",
      permissions: ["all"],
      lastLogin: new Date().toISOString(),
    };

    // Would add to mockUsers if we could modify it at runtime

    // Create a mock token
    const token = btoa(
      JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        exp: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
      })
    );

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.permissions,
      })
    );

    return {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } else {
    try {
      const response = await axios.post(`${API_URL}/admin/register`, data);

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }
};

/**
 * Get current admin profile
 */
export const getAdminProfile = async () => {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    try {
      // Decode token
      const decoded = JSON.parse(atob(token));

      // Check if token is expired
      if (decoded.exp < new Date().getTime()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Token expired");
      }

      // Find user by id
      const user = mockUsers.find((user) => user.id === decoded.id);
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
        };
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error;
    }
  } else {
    try {
      const response = await authAxios.get(`${API_URL}/auth/profile`);
      return response.data;
    } catch (error) {
      // If the error is 401 Unauthorized, clear tokens
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
      throw error;
    }
  }
};

/**
 * Logout admin by removing token
 */
export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  // Call the logout endpoint
  return authAxios.post(`${API_URL}/auth/logout`);
};

/**
 * Check if admin is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};

/**
 * Get current user data from localStorage
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

export const changePassword = async (passwordData) => {
  const response = await authAxios.post(
    `${API_URL}/auth/change-password`,
    passwordData
  );
  return response.data;
};

export const getCurrentAdmin = () => {
  const adminUser = localStorage.getItem("adminUser");
  return adminUser ? JSON.parse(adminUser) : null;
};

export default {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  isAuthenticated,
  changePassword,
  getCurrentAdmin,
};
