import { apiClient, safeApiCall } from "./apiConfig";

/**
 * Service for handling insurance application API calls
 */
const applicationService = {
  /**
   * Create a new insurance application
   * @param {Object} applicationData - Application data
   * @returns {Promise<Object>} Response with created application
   */
  createApplication: async (applicationData) => {
    try {
      // Ensure selectedAge is included if it exists
      const dataToSend = { ...applicationData };
      if (dataToSend.selectedAge) {
        dataToSend.selectedAge = parseInt(dataToSend.selectedAge, 10);
      }

      const response = await apiClient.post("/applications", dataToSend);
      return response.data;
    } catch (error) {
      console.error("Error creating application:", error);

      // Enhance error information for better frontend handling
      if (error.response && error.response.data) {
        const enhancedError = new Error(
          error.response.data.message || "Failed to create application"
        );
        enhancedError.response = error.response;
        throw enhancedError;
      }

      throw error;
    }
  },

  /**
   * Get a specific application by ID
   * @param {string} applicationId - ID of the application
   * @returns {Promise<Object>} Response with application data
   */
  getApplicationById: async (applicationId) => {
    try {
      const response = await apiClient.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching application ${applicationId}:`, error);
      throw error;
    }
  },

  /**
   * Update an application
   * @param {string} applicationId - ID of the application
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Response with updated application
   */
  updateApplication: async (applicationId, updateData) => {
    try {
      const response = await apiClient.put(
        `/applications/${applicationId}`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating application ${applicationId}:`, error);
      throw error;
    }
  },

  /**
   * Upload documents for an application
   * @param {string} applicationId - ID of the application
   * @param {FormData} formData - FormData containing files
   * @returns {Promise<Object>} Response with uploaded documents
   */
  uploadDocuments: async (applicationId, formData) => {
    try {
      const response = await apiClient.post(
        `/applications/${applicationId}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error uploading documents for application ${applicationId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Get documents for an application
   * @param {string} applicationId - ID of the application
   * @returns {Promise<Object>} Response with application documents
   */
  getApplicationDocuments: async (applicationId) => {
    try {
      const response = await apiClient.get(
        `/applications/${applicationId}/documents`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching documents for application ${applicationId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Get insurance plans filtered for personal accident
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Object>} Response with filtered plans
   */
  getPersonalAccidentPlans: async (filters = {}) => {
    try {
      const params = new URLSearchParams({
        insuranceType: "personal-accident",
        limit: 20, // Get more plans for selection
        ...filters,
      });

      const response = await apiClient.get(`/applications/plans?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching personal accident plans:", error);
      throw error;
    }
  },

  /**
   * Get insurance plans filtered for health insurance
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Object>} Response with filtered plans
   */
  getHealthPlans: async (filters = {}) => {
    try {
      const params = new URLSearchParams({
        insuranceType: "health",
        limit: 50, // Get more health plans for selection
        ...filters,
      });

      const response = await apiClient.get(`/applications/plans?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching health insurance plans:", error);
      throw error;
    }
  },

  /**
   * Get all applications (Admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response with applications list
   */
  getAllApplications: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params);
      const response = await apiClient.get(`/applications?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },

  /**
   * Update application status (Admin only)
   * @param {string} applicationId - ID of the application
   * @param {Object} statusData - Status update data
   * @returns {Promise<Object>} Response with updated application
   */
  updateApplicationStatus: async (applicationId, statusData) => {
    try {
      const response = await apiClient.put(
        `/applications/${applicationId}/status`,
        statusData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating application status ${applicationId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Delete an application (Admin only)
   * @param {string} applicationId - ID of the application
   * @returns {Promise<Object>} Response with success message
   */
  deleteApplication: async (applicationId) => {
    try {
      const response = await apiClient.delete(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting application ${applicationId}:`, error);
      throw error;
    }
  },

  /**
   * Get application statistics (Admin only)
   * @returns {Promise<Object>} Response with statistics
   */
  getApplicationStats: async () => {
    try {
      const response = await apiClient.get("/applications/stats/overview");
      return response.data;
    } catch (error) {
      console.error("Error fetching application statistics:", error);
      throw error;
    }
  },

  /**
   * Download a document (Admin only)
   * @param {string} documentId - ID of the document
   * @returns {Promise<Blob>} Document file
   */
  downloadDocument: async (documentId) => {
    try {
      const response = await apiClient.get(
        `/applications/documents/${documentId}/download`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error downloading document ${documentId}:`, error);
      throw error;
    }
  },
};

export default applicationService;
