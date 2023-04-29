import { CartProductType } from "@/types/CartProductType";
import { createSlice } from "@reduxjs/toolkit";

export type CartSliceType = {
    products: CartProductType[],
    refresh: boolean
}


const initialStateValue : CartSliceType = {
    products: [],
    refresh: false
}

const cartSlice = createSlice({
    initialState: initialStateValue,
    name: "cart",
    reducers: {
        setProductToCart(state, action) {
            state.products = [...action.payload]
        },
        refreshCart(state) {
            state.refresh = !state.refresh
        }
    }
})

const { actions } = cartSlice

export const { setProductToCart, refreshCart } = actions
export default cartSlice.reducer