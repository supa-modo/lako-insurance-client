/**
 * Security utility functions to prevent sensitive data exposure
 */

// List of sensitive field names that should never be logged or exposed
const SENSITIVE_FIELDS = [
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "resetPasswordToken",
  "twoFactorSecret",
  "secret",
  "key",
  "apiKey",
  "authToken",
  "sessionId",
  "resetPasswordExpires",
  "lockoutUntil",
  "failedLoginAttempts",
];

/**
 * Remove sensitive fields from an object for safe logging
 * @param {Object} obj - Object to sanitize
 * @param {Array} additionalSensitiveFields - Additional field names to redact
 * @returns {Object} Sanitized object with sensitive fields redacted
 */
export const sanitizeForLogging = (obj, additionalSensitiveFields = []) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const allSensitiveFields = [
    ...SENSITIVE_FIELDS,
    ...additionalSensitiveFields,
  ];
  const sanitized = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = allSensitiveFields.some((field) =>
      lowerKey.includes(field.toLowerCase())
    );

    if (isSensitive) {
      sanitized[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeForLogging(value, additionalSensitiveFields);
    } else if (Array.isArray(value)) {
      // Sanitize arrays
      sanitized[key] = value.map((item) =>
        typeof item === "object"
          ? sanitizeForLogging(item, additionalSensitiveFields)
          : item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};

/**
 * Safe console.log that automatically sanitizes sensitive data
 * @param {string} message - Log message
 * @param {any} data - Data to log (will be sanitized if object)
 * @param {Array} additionalSensitiveFields - Additional fields to redact
 */
export const safeConsoleLog = (
  message,
  data = null,
  additionalSensitiveFields = []
) => {
  if (process.env.NODE_ENV === "production") {
    // Don't log in production
    return;
  }

  if (data) {
    const sanitized = sanitizeForLogging(data, additionalSensitiveFields);
    console.log(message, sanitized);
  } else {
    console.log(message);
  }
};

/**
 * Extract only safe user fields for frontend use
 * @param {Object} user - User object
 * @returns {Object} Safe user data
 */
export const getSafeUserData = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    twoFactorEnabled: user.twoFactorEnabled,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Check if current environment allows sensitive data logging
 * @returns {boolean}
 */
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === "development";
};

export default {
  sanitizeForLogging,
  safeConsoleLog,
  getSafeUserData,
  isDevelopmentMode,
};
