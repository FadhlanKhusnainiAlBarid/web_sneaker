import { createSlice } from "@reduxjs/toolkit";

export const snkrsSlice = createSlice({
  name: "counter",
  initialState: {
    snkrs: [],
    snkr: null,
    loading: false,
  },
  reducers: {
    setSnkrs: (state, actions) => {
      state.snkrs = actions.payload;
    },
    setSnkr: (state, actions) => {
      state.snkr = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnkrs, setSnkr, setLoading } = snkrsSlice.actions;

export default snkrsSlice.reducer;
