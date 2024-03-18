import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timeLeft: "00:00",
    timerStatus: "",
    isActive: false,
  },
  reducers: {
    startTimer: (state, action) => {
      state.timeLeft = action.payload;
    },
    stopTimer: (state, action) => {
      state.timerStatus = action.payload;
    },
    resetTimer: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;
