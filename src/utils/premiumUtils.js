/**
 * Utility functions for handling insurance premium calculations
 */

/**
 * Calculate premium for a given plan and age
 * @param {Object} plan - The insurance plan object
 * @param {number} age - The age to calculate premium for
 * @returns {number|null} - The calculated premium or null if unable to calculate
 */
export const calculatePremiumForAge = (plan, age) => {
  if (!plan) return null;

  // Handle fixed premium structure
  if (plan.premiumStructure === "fixed" && plan.annualPremium !== null) {
    return parseFloat(plan.annualPremium) || 0;
  }

  // Handle age-based premium structure
  if (plan.premiumStructure === "age-based" && plan.premiumsByAgeRange) {
    try {
      const premiums = JSON.parse(plan.premiumsByAgeRange);

      // Find the matching age range
      for (const range in premiums) {
        if (isAgeInRange(age, range)) {
          return parseFloat(premiums[range]) || 0;
        }
      }
    } catch (error) {
      console.error("Error parsing premiums by age range:", error);
      return null;
    }
  }

  return null;
};

/**
 * Check if a given age falls within a specified age range
 * @param {number} age - The age to check
 * @param {string} range - The age range string (e.g., "65-69", "70+", "75")
 * @returns {boolean} - True if age is in range, false otherwise
 */
export const isAgeInRange = (age, range) => {
  if (range.includes("-")) {
    const [min, max] = range
      .split("-")
      .map((part) => parseInt(part.trim(), 10));
    return age >= min && age <= max;
  } else if (range.includes("+")) {
    const min = parseInt(range.replace("+", "").trim(), 10);
    return age >= min;
  } else {
    const exactAge = parseInt(range.trim(), 10);
    return age === exactAge;
  }
};

/**
 * Get premium display text for a plan
 * @param {Object} plan - The insurance plan object
 * @param {number} age - The age to calculate premium for
 * @returns {Object} - Object containing premium value and display text
 */
export const getPremiumDisplay = (plan, age) => {
  const premium = calculatePremiumForAge(plan, age);

  if (premium !== null) {
    return {
      value: premium,
      display: `KES ${premium.toLocaleString()}`,
      isValid: true,
    };
  }

  // Handle age-based plans without specific age
  if (plan.premiumStructure === "age-based") {
    return {
      value: null,
      display: "Age-based pricing",
      isValid: false,
    };
  }

  // Fallback for invalid plans
  return {
    value: null,
    display: "Contact for pricing",
    isValid: false,
  };
};

/**
 * Get all available age ranges for a plan
 * @param {Object} plan - The insurance plan object
 * @returns {Array} - Array of age range strings
 */
export const getAgeRangesForPlan = (plan) => {
  if (plan.premiumStructure === "age-based" && plan.premiumsByAgeRange) {
    try {
      const premiums = JSON.parse(plan.premiumsByAgeRange);
      return Object.keys(premiums);
    } catch (error) {
      console.error("Error parsing premiums by age range:", error);
      return [];
    }
  }
  return [];
};

/**
 * Get premium breakdown for age-based plans
 * @param {Object} plan - The insurance plan object
 * @returns {Array} - Array of objects with age range and premium
 */
export const getPremiumBreakdown = (plan) => {
  if (plan.premiumStructure === "age-based" && plan.premiumsByAgeRange) {
    try {
      const premiums = JSON.parse(plan.premiumsByAgeRange);
      return Object.entries(premiums).map(([range, premium]) => ({
        ageRange: range,
        premium: parseFloat(premium) || 0,
      }));
    } catch (error) {
      console.error("Error parsing premiums by age range:", error);
      return [];
    }
  }
  return [];
};
