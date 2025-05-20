import { configureStore } from "@reduxjs/toolkit";
import snkrsReducer from "./sneakerSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    snkrs: snkrsReducer,
    cart: cartReducer,
  },
});
