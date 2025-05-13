import { apiClient } from "./apiConfig";

/**
 * Event Service
 * Handles all API requests related to events
 */
const eventService = {
  /**
   * Get all events with optional filters
   * @param {Object} filters - Optional filters (startDate, endDate, type, priority, status, search)
   * @returns {Promise} - Promise with events data
   */
  getAllEvents: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to params if they exist
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.type) params.append('type', filters.type);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.createdBy) params.append('createdBy', filters.createdBy);
      if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
      
      const response = await apiClient.get(`/events?${params.toString()}`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
  
  /**
   * Get event by ID
   * @param {string} id - Event ID
   * @returns {Promise} - Promise with event data
   */
  getEventById: async (id) => {
    try {
      const response = await apiClient.get(`/events/${id}`);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new event
   * @param {Object} eventData - Event data
   * @returns {Promise} - Promise with created event data
   */
  createEvent: async (eventData) => {
    try {
      const response = await apiClient.post(`/events`, eventData);
      
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  
  /**
   * Update an event
   * @param {string} id - Event ID
   * @param {Object} eventData - Updated event data
   * @returns {Promise} - Promise with updated event data
   */
  updateEvent: async (id, eventData) => {
    try {
      const response = await apiClient.put(`/events/${id}`, eventData);
      
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Update event time (for drag and drop)
   * @param {string} id - Event ID
   * @param {Date} start - New start time
   * @param {Date} end - New end time
   * @returns {Promise} - Promise with updated event data
   */
  updateEventTime: async (id, start, end) => {
    try {
      const response = await apiClient.patch(`/events/${id}/time`, { start, end });
      
      return response.data;
    } catch (error) {
      console.error(`Error updating event time ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Toggle event completion status
   * @param {string} id - Event ID
   * @returns {Promise} - Promise with updated event data
   */
  toggleEventCompletion: async (id) => {
    try {
      const response = await apiClient.patch(`/events/${id}/toggle-completion`);
      
      return response.data;
    } catch (error) {
      console.error(`Error toggling event completion ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete an event
   * @param {string} id - Event ID
   * @returns {Promise} - Promise with success message
   */
  deleteEvent: async (id) => {
    try {
      const response = await apiClient.delete(`/events/${id}`);
      
      return response.data;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create events from tasks
   * @returns {Promise} - Promise with created events data
   */
  createEventsFromTasks: async () => {
    try {
      const response = await apiClient.post(`/events/create-from-tasks`);
      
      return response.data;
    } catch (error) {
      console.error('Error creating events from tasks:', error);
      throw error;
    }
  },

  /**
   * Get tasks with due dates for calendar display
   * @param {Object} filters - Optional filters (startDate, endDate)
   * @returns {Promise} - Promise with tasks data formatted as events
   */
  getTasksForCalendar: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to params if they exist
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await apiClient.get(`/tasks/calendar?${params.toString()}`);
      
      // Transform tasks to event format
      if (response.data.success && response.data.data) {
        const transformedTasks = response.data.data.map(task => ({
          ...task,
          id: `task-${task.id}`, // Prefix with 'task-' to distinguish from regular events
          title: task.title,
          description: task.description,
          start: new Date(task.dueDate),
          end: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000), // 1 hour duration
          type: 'task',
          priority: task.priority || 'medium',
          isCompleted: task.completed,
          isTask: true, // Flag to identify this as a task
          relatedTaskId: task.id
        }));
        
        return {
          success: true,
          data: transformedTasks
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks for calendar:', error);
      return {
        success: false,
        message: 'Failed to fetch tasks for calendar',
        data: []
      };
    }
  }
};

export default eventService;
