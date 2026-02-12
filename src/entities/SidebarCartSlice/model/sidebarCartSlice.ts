import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/app/store/types.ts";
import type {ICartItem} from "../types/sideBarCartTypes";

interface CartState {
    value: ICartItem[]
}

const initialState: CartState = {
    value: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const existingProduct = state.value.find((item) => item.product.id === action.payload.product.id)
            if (existingProduct) {
                existingProduct.amount += 1
            } else {
                state.value.push(action.payload)
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((item) => item.product.id !== action.payload)
        },
        increaseAmountInCart: (state, action: PayloadAction<number>) => {
            const existingProduct = state.value.find((item) => item.product.id === action.payload)
            if (existingProduct) existingProduct.amount += 1
        },
        decreaseAmountInCart: (state, action: PayloadAction<number>) => {
            const existingProduct = state.value.find((item) => item.product.id === action.payload)
            if (existingProduct) existingProduct.amount -= 1
        }
    }
})

export const { addToCart, removeFromCart, increaseAmountInCart, decreaseAmountInCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.value

export default cartSlice.reducer