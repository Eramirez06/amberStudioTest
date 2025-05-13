import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setCryptoData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
