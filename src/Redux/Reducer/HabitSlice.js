import { createSlice } from '@reduxjs/toolkit';

let nextHabitId = 1;

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push({
        id: nextHabitId++,
        name: action.payload.name,
        status: action.payload.status,
      });
    },
    updateHabitStatus: (state, action) => {
      const { id, date, status } = action.payload;
      const habit = state.habits.find((habit) => habit.id === id);
      if (habit) {
        habit.status[date] = status;
      }
    },
    deleteHabit: (state, action) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
    },
  },
});

export const { addHabit, updateHabitStatus, deleteHabit } = habitSlice.actions;
export default habitSlice.reducer;
