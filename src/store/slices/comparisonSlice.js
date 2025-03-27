import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userQuery: null,
  results: [],
  loading: false,
  error: null,
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    setUserQuery: (state, action) => {
      state.userQuery = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearComparison: (state) => {
      state.userQuery = null;
      state.results = [];
      state.error = null;
    },
  },
});

export const {
  setUserQuery,
  setResults,
  setLoading,
  setError,
  clearComparison,
} = comparisonSlice.actions;

export default comparisonSlice.reducer; 