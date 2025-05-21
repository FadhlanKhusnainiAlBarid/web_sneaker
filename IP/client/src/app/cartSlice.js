import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    loading: false,
    status: null,
  },
  reducers: {
    setCarts: (state, actions) => {
      state.carts = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setStatus: (state, actions) => {
      state.status = actions.payload;
    },
  },
});

export const { setCarts, setLoading, setStatus } = cartSlice.actions;

export default cartSlice.reducer;
