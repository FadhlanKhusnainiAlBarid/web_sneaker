import { configureStore } from '@reduxjs/toolkit'
import snkrsReducer from "./sneakerSlice"

export const store = configureStore({
    reducer: {
        snkrs: snkrsReducer
    },
})