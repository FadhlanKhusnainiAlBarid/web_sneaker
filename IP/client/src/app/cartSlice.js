import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    loading: false,
  },
  reducers: {
    setCarts: (state, actions) => {
      state.carts = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

export const { setCarts, setLoading } = cartSlice.actions;

export default cartSlice.reducer;
