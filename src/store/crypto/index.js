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
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCryptoData(state, action) {
      state.data = action.payload;
    },
    updatePrice(state, action) {
      const { id, price } = action.payload;
      if (state.data[id]) {
        state.data[id].price = price;
      }
    },
  },
});

export const { setLoading, setError, setCryptoData, updatePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
