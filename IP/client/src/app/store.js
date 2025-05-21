import { configureStore } from "@reduxjs/toolkit";
import snkrsReducer from "./sneakerSlice";
import cartReducer from "./cartSlice";
import favouriteReducer from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    sneaker: snkrsReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});
