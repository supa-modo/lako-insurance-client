/**
 * Service for handling website-related API calls
 */

/**
 * Send a contact form submission
 * @param {Object} formData - The form data
 * @param {string} formData.name - The name of the sender
 * @param {string} formData.email - The email of the sender
 * @param {string} formData.subject - The subject of the message
 * @param {string} formData.message - The message content
 * @returns {Promise} A promise that resolves with the response
 */
export const submitContactForm = async (formData) => {
  try {
    // In a real implementation, this would be an API call to your backend
    // For now, we'll simulate a successful API response

    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulating a successful response
    return {
      success: true,
      message:
        "Your message has been sent successfully. We will get back to you soon!",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

/**
 * Submit a newsletter subscription
 * @param {string} email - The email to subscribe
 * @returns {Promise} A promise that resolves with the response
 */
export const subscribeToNewsletter = async (email) => {
  try {
    // In a real implementation, this would be an API call to your backend
    // For now, we'll simulate a successful API response

    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulating a successful response
    return {
      success: true,
      message: "You have been successfully subscribed to our newsletter!",
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};

/**
 * Request a callback from an insurance agent
 * @param {Object} requestData - The callback request data
 * @param {string} requestData.name - The name of the requester
 * @param {string} requestData.phone - The phone number for callback
 * @param {string} requestData.preferredTime - The preferred time for callback
 * @param {string} requestData.insuranceType - The type of insurance interested in
 * @returns {Promise} A promise that resolves with the response
 */
export const requestCallback = async (requestData) => {
  try {
    // In a real implementation, this would be an API call to your backend
    // For now, we'll simulate a successful API response

    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simulating a successful response
    return {
      success: true,
      message:
        "Your callback request has been submitted. An agent will call you shortly!",
    };
  } catch (error) {
    console.error("Error requesting callback:", error);
    throw error;
  }
};
