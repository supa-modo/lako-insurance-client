// Feature flags based on environment
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// Define which insurance types are available in each environment
const AVAILABLE_INSURANCE_TYPES = {
  development: {
    health: false,
    "personal-accident": false,
    property: false,
    motor: false,
  },
  production: {
    health: true,
    "personal-accident": false, // Disable in production
    property: false,
    motor: false,
  },
};

// Get available insurance types for current environment
export const getAvailableInsuranceTypes = () => {
  const environment = isProduction ? "production" : "development";
  return AVAILABLE_INSURANCE_TYPES[environment];
};

// Check if a specific insurance type is available
export const isInsuranceTypeAvailable = (insuranceType) => {
  const availableTypes = getAvailableInsuranceTypes();
  return availableTypes[insuranceType] || false;
};

// Check if we're in development mode
export const isDevelopmentMode = () => isDevelopment;

// Check if we're in production mode
export const isProductionMode = () => isProduction;

// Get environment name
export const getEnvironment = () => process.env.NODE_ENV || "development";

// Feature flags for specific features
export const FEATURES = {
  // Insurance types
  HEALTH_INSURANCE: true, // Always available
  PERSONAL_ACCIDENT: isDevelopment, // Only in development
  PROPERTY_INSURANCE: isDevelopment, // Only in development
  MOTOR_INSURANCE: isDevelopment, // Only in development

  // Other features
  ADVANCED_COMPARISON: isDevelopment,
  PREMIUM_FEATURES: isDevelopment,
};

export default {
  getAvailableInsuranceTypes,
  isInsuranceTypeAvailable,
  isDevelopmentMode,
  isProductionMode,
  getEnvironment,
  FEATURES,
};
