// Feature flags based on environment
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// Define which insurance types are available in each environment
const INSURANCE_AVAILABILITY = {
  development: {
    comparison: {
      health: true,
      "personal-accident": true,
      travel: true,
      property: false,
      motor: false,
    },
    buyOnline: {
      health: true,
      "personal-accident": true,
      travel: true,
      property: false,
      motor: false,
    },
  },
  production: {
    comparison: {
      health: true,
      "personal-accident": true,
      travel: false,
      property: false,
      motor: false,
    },
    buyOnline: {
      health: true,
      "personal-accident": true,
      travel: false,
      property: false,
      motor: false,
    },
  },
};

// Get available insurance types for comparison
export const getAvailableInsuranceTypesForComparison = () => {
  const environment = isProduction ? "production" : "development";
  return INSURANCE_AVAILABILITY[environment].comparison;
};

// Get available insurance types for buyOnline
export const getAvailableInsuranceTypesForBuyOnline = () => {
  const environment = isProduction ? "production" : "development";
  return INSURANCE_AVAILABILITY[environment].buyOnline;
};

// Check if a specific insurance type is available for comparison
export const isComparisonInsuranceTypeAvailable = (insuranceType) => {
  const availableTypes = getAvailableInsuranceTypesForComparison();
  return availableTypes[insuranceType] || false;
};

// Check if a specific insurance type is available for buyOnline
export const isBuyOnlineInsuranceTypeAvailable = (insuranceType) => {
  const availableTypes = getAvailableInsuranceTypesForBuyOnline();
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
  HEALTH_INSURANCE: true, // Always available - comprehensive health insurance
  PERSONAL_ACCIDENT: true, // Available in all environments
  TRAVEL_INSURANCE: true, // Available in all environments
  PROPERTY_INSURANCE: isDevelopment, // Only in development
  MOTOR_INSURANCE: isDevelopment, // Only in development

  // Other features
  ADVANCED_COMPARISON: true, // Enable advanced comparison features
  PREMIUM_FEATURES: isDevelopment,
};

// Keep original generic helpers for backward compatibility (default to buyOnline behaviour)
export const getAvailableInsuranceTypes =
  getAvailableInsuranceTypesForBuyOnline;
export const isInsuranceTypeAvailable = isBuyOnlineInsuranceTypeAvailable;

export default {
  getAvailableInsuranceTypesForComparison,
  getAvailableInsuranceTypesForBuyOnline,
  isComparisonInsuranceTypeAvailable,
  isBuyOnlineInsuranceTypeAvailable,
  isDevelopmentMode,
  isProductionMode,
  getEnvironment,
  FEATURES,
  getAvailableInsuranceTypes,
  isInsuranceTypeAvailable,
};
