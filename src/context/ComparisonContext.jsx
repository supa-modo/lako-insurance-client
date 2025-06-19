import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const ComparisonContext = createContext();

// Custom hook for using the comparison context
export const useComparison = () => useContext(ComparisonContext);

// Provider component
export const ComparisonProvider = ({ children }) => {
  const [userQuery, setUserQuery] = useState({
    insuranceType: "",
    // Age parameters
    age: "",
    ageMin: undefined,
    ageMax: undefined,
    dateOfBirth: "",
    // Budget parameters
    budget: "",
    budgetMin: undefined,
    budgetMax: undefined,
    budgetValue: undefined,
    // Coverage limit parameters
    coverageLimit: "",
    coverageLimitMin: undefined,
    coverageLimitMax: undefined,
    // Filter type
    healthFilterType: "budget", // "budget" or "coverage"
    // Additional filters
    optionalCovers: [],
    coverageType: "",
    familySize: 1,
    preExistingConditions: false,
    maternityRequired: false,
    accidentType: "",
    coverageAmount: undefined,
  });

  const [comparisonResults, setComparisonResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update specific field in the user query
  const updateUserQuery = (field, value) => {
    setUserQuery((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update multiple fields at once
  const updateUserQueryBatch = (updates) => {
    setUserQuery((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Reset the user query to initial state
  const resetUserQuery = () => {
    setUserQuery({
      insuranceType: "",
      age: "",
      ageMin: undefined,
      ageMax: undefined,
      dateOfBirth: "",
      budget: "",
      budgetMin: undefined,
      budgetMax: undefined,
      budgetValue: undefined,
      coverageLimit: "",
      coverageLimitMin: undefined,
      coverageLimitMax: undefined,
      healthFilterType: "budget",
      optionalCovers: [],
      coverageType: "",
      familySize: 1,
      preExistingConditions: false,
      maternityRequired: false,
      accidentType: "",
      coverageAmount: undefined,
    });
  };

  // Reset the comparison results
  const resetResults = () => {
    setComparisonResults([]);
    setError(null);
  };

  // Helper function to prepare query for submission
  const prepareQueryForSubmission = () => {
    const query = { ...userQuery };

    // Ensure numeric values are properly typed
    if (query.ageMin !== undefined) query.ageMin = Number(query.ageMin);
    if (query.ageMax !== undefined) query.ageMax = Number(query.ageMax);
    if (query.budgetMin !== undefined)
      query.budgetMin = Number(query.budgetMin);
    if (query.budgetMax !== undefined)
      query.budgetMax = Number(query.budgetMax);
    if (query.budgetValue !== undefined)
      query.budgetValue = Number(query.budgetValue);
    if (query.coverageLimitMin !== undefined)
      query.coverageLimitMin = Number(query.coverageLimitMin);
    if (query.coverageLimitMax !== undefined)
      query.coverageLimitMax = Number(query.coverageLimitMax);
    if (query.coverageAmount !== undefined)
      query.coverageAmount = Number(query.coverageAmount);
    if (query.familySize !== undefined)
      query.familySize = Number(query.familySize);

    return query;
  };

  // Value object to be provided to consumers
  const value = {
    userQuery,
    setUserQuery,
    updateUserQuery,
    updateUserQueryBatch,
    resetUserQuery,
    comparisonResults,
    setComparisonResults,
    loading,
    setLoading,
    error,
    setError,
    resetResults,
    prepareQueryForSubmission,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export default ComparisonContext;
