// bestRateSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  bestRate: 0,
  bestExchange: null,
  bestPair: null,
};

// Slice definition
const bestRateSlice = createSlice({
  name: 'bestRate',
  initialState,
  reducers: {
    setBestRate: (state, action) => {
      state.bestRate = action.payload.bestRate;
      state.bestExchange = action.payload.bestExchange;
      state.bestPair = action.payload.bestPair;
    },
    resetBestRate: () => initialState,
  },
});

// Exporting actions and reducer
export const { setBestRate, resetBestRate } = bestRateSlice.actions;
export default bestRateSlice.reducer;
