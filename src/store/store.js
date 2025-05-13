import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './crypto';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
