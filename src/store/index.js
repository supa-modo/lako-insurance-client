import { configureStore } from "@reduxjs/toolkit";
import comparisonReducer from "./slices/comparisonSlice";

const store = configureStore({
  reducer: {
    comparison: comparisonReducer,
  },
});

export default store;
