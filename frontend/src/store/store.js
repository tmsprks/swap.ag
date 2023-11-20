import { configureStore } from '@reduxjs/toolkit';
import provider from './reducers/provider';
import bestRateReducer from './reducers/bestRateSlice';

export const store = configureStore({
  reducer: {
    provider,
    bestRateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
