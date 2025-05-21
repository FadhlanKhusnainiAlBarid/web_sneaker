import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favourites: [],
    loading: false,
  },
  reducers: {
    setFavourites: (state, actions) => {
      state.favourites = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

export const { setFavourites, setLoading } = favouriteSlice.actions;

export default favouriteSlice.reducer;
