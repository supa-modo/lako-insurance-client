import { apiClient } from "./apiConfig";

const contactService = {
  // Create a new contact message
  createContactMessage: async (messageData) => {
    try {
      const response = await apiClient.post("/contact-messages", messageData);
      return response.data;
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  },

  // Create a callback request
  createCallbackRequest: async (callbackData) => {
    try {
      const requestData = {
        ...callbackData,
        type: "callback",
        priority: "high", // Callbacks have high priority
      };
      const response = await apiClient.post("/contact-messages", requestData);
      return response.data;
    } catch (error) {
      console.error("Error creating callback request:", error);
      throw error;
    }
  },

  // Send email notification (this would typically be handled by the backend)
  sendEmailNotification: async (emailData) => {
    try {
      // This endpoint would be implemented to send emails
      const response = await apiClient.post(
        "/contact-messages/send-email",
        emailData
      );
      return response.data;
    } catch (error) {
      console.error("Error sending email notification:", error);
      throw error;
    }
  },

  // Get all contact messages (admin only)
  getAllContactMessages: async (params = {}) => {
    try {
      const response = await apiClient.get("/contact-messages", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      throw error;
    }
  },

  // Get contact message by ID
  getContactMessageById: async (id) => {
    try {
      const response = await apiClient.get(`/contact-messages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contact message:", error);
      throw error;
    }
  },

  // Update contact message
  updateContactMessage: async (id, updateData) => {
    try {
      const response = await apiClient.put(`/contact-messages/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating contact message:", error);
      throw error;
    }
  },

  // Mark message as processed
  markAsProcessed: async (id, processedBy, notes = "") => {
    try {
      const response = await apiClient.patch(`/contact-messages/${id}/process`, {
        processedBy,
        notes,
      });
      return response.data;
    } catch (error) {
      console.error("Error marking message as processed:", error);
      throw error;
    }
  },

  // Delete contact message
  deleteContactMessage: async (id) => {
    try {
      const response = await apiClient.delete(`/contact-messages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting contact message:", error);
      throw error;
    }
  },

  // Get contact message statistics
  getContactMessageStats: async () => {
    try {
      const response = await apiClient.get("/contact-messages/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching contact message stats:", error);
      throw error;
    }
  },
};

export default contactService;
