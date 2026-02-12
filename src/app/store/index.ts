import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "@/entities/SidebarCartSlice/model/sidebarCartSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
})
