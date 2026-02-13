import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/entities/CartSlice/model/cartSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
