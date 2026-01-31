import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    app: (state = {}) => state,
    _dummy: (state = {}) => state,
  },
});
