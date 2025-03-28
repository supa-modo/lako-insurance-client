import api from "./api";
import mockUsers from "../data/mockUsers.json";

// Flag to determine if we should use mock data or real API
const USE_MOCK = true;

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
      const response = await api.get("/admin/me");
      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  }
};

/**
 * Logout admin by removing token
 */
export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Check if admin is authenticated
 */
export const isAuthenticated = () => {
  if (USE_MOCK) {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      // Decode token
      const decoded = JSON.parse(atob(token));

      // Check if token is expired
      if (decoded.exp < new Date().getTime()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  } else {
    return !!localStorage.getItem("token");
  }
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
