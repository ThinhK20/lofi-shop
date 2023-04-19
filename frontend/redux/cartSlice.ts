import { ProductType } from "@/types/ProductType";
import { createSlice } from "@reduxjs/toolkit";

type CartSliceType = {
    products: ProductType[]
}


const initialStateValue : CartSliceType = {
    products: []
}

const cartSlice = createSlice({
    initialState: initialStateValue,
    name: "cart",
    reducers: {
        addProductToCart(state, action) {
            state.products = [...state.products, action.payload]
        },
        removeProductFromCart(state, action) {
            state.products = state.products.filter((product : ProductType) => {
                return product.id !== action.payload
            })
        },
    }
})

const { actions } = cartSlice

export const { addProductToCart, removeProductFromCart } = actions
export default cartSlice.reducer