import { configureStore } from '@reduxjs/toolkit';

// Tạm thời để reducer rỗng để chạy được app
export const store = configureStore({
  reducer: {},
});