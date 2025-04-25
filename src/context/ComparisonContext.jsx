import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const ComparisonContext = createContext();

// Custom hook for using the comparison context
export const useComparison = () => useContext(ComparisonContext);

// Provider component
export const ComparisonProvider = ({ children }) => {
  const [userQuery, setUserQuery] = useState({
    insuranceType: "",
    age: "",
    budget: "",
    coverageLimit: "",
    optionalCovers: [],
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

  // Reset the user query to initial state
  const resetUserQuery = () => {
    setUserQuery({
      insuranceType: "",
      age: "",
      budget: "",
      coverageLimit: "",
      optionalCovers: [],
    });
  };

  // Reset the comparison results
  const resetResults = () => {
    setComparisonResults([]);
    setError(null);
  };

  // Value object to be provided to consumers
  const value = {
    userQuery,
    setUserQuery,
    updateUserQuery,
    resetUserQuery,
    comparisonResults,
    setComparisonResults,
    loading,
    setLoading,
    error,
    setError,
    resetResults,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export default ComparisonContext;
