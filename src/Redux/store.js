// store.js

import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './Reducer/HabitSlice';

const store = configureStore({
  reducer: {
    habits: habitReducer,
    // Add other reducers here if needed
  },
});

export default store;
