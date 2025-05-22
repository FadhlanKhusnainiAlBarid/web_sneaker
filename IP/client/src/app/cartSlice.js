import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    status: null,
  },
  reducers: {
    setCarts: (state, actions) => {
      state.carts = actions.payload;
    },
    setTotalItems: (state, actions) => {
      state.totalItems = actions.payload;
    },
    setTotalPrice: (state, actions) => {
      state.totalPrice = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setStatus: (state, actions) => {
      state.status = actions.payload;
    },
  },
});

export const { setCarts, setTotalItems, setTotalPrice, setLoading, setStatus } =
  cartSlice.actions;

export default cartSlice.reducer;
