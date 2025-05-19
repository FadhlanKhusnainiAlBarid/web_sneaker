import { createSlice } from "@reduxjs/toolkit";

export const sneakerSlice = createSlice({
  name: "sneaker",
  initialState: {
    snkrs: [],
    snkrsFilter: [],
    snkr: null,
    loading: false,
  },
  reducers: {
    setSnkrs: (state, actions) => {
      state.snkrs = actions.payload;
    },
    setSnkrsFilter: (state, actions) => {
      state.snkrsFilter = actions.payload;
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
export const { setSnkrs, setSnkrsFilter, setSnkr, setLoading } =
  sneakerSlice.actions;

export default sneakerSlice.reducer;
