import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      return state.filter(event => event.id !== action.payload);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
