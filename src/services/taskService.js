import { apiClient, safeApiCall } from "./apiConfig";

/**
 * Task Service
 * Handles all task-related API requests
 */
const taskService = {
  /**
   * Get all tasks with optional filters
   * @param {Object} filters - Optional filters (search, category, priority, status, sortBy, sortDir)
   * @returns {Promise<Object>} Response with tasks data
   */
  getAllTasks: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });
      
      const response = await apiClient.get(`/tasks?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  /**
   * Get task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with task data
   */
  getTaskById: async (id) => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Response with created task
   */
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post("/tasks", taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  /**
   * Update a task
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} Response with updated task
   */
  updateTask: async (id, taskData) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Toggle task completion status
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with updated task
   */
  toggleTaskCompletion: async (id) => {
    try {
      const response = await apiClient.patch(`/tasks/${id}/toggle-completion`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling task ${id} completion:`, error);
      throw error;
    }
  },

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with success message
   */
  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get task statistics
   * @returns {Promise<Object>} Response with task statistics
   */
  getTaskStats: async () => {
    try {
      const response = await apiClient.get("/tasks/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching task statistics:", error);
      throw error;
    }
  },

  /**
   * Safe wrapper for getAllTasks
   * @param {Object} filters - Optional filters
   * @returns {Promise<Object>} Response with tasks data or null on error
   */
  safeGetAllTasks: (filters) => {
    return safeApiCall(() => taskService.getAllTasks(filters));
  },

  /**
   * Safe wrapper for getTaskById
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with task data or null on error
   */
  safeGetTaskById: (id) => {
    return safeApiCall(() => taskService.getTaskById(id));
  },

  /**
   * Safe wrapper for createTask
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Response with created task or null on error
   */
  safeCreateTask: (taskData) => {
    return safeApiCall(() => taskService.createTask(taskData));
  },

  /**
   * Safe wrapper for updateTask
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} Response with updated task or null on error
   */
  safeUpdateTask: (id, taskData) => {
    return safeApiCall(() => taskService.updateTask(id, taskData));
  },

  /**
   * Safe wrapper for toggleTaskCompletion
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with updated task or null on error
   */
  safeToggleTaskCompletion: (id) => {
    return safeApiCall(() => taskService.toggleTaskCompletion(id));
  },

  /**
   * Safe wrapper for deleteTask
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Response with success message or null on error
   */
  safeDeleteTask: (id) => {
    return safeApiCall(() => taskService.deleteTask(id));
  },

  /**
   * Safe wrapper for getTaskStats
   * @returns {Promise<Object>} Response with task statistics or null on error
   */
  safeGetTaskStats: () => {
    return safeApiCall(() => taskService.getTaskStats());
  },
};

export default taskService;
