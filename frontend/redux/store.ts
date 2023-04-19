import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import { createWrapper } from "next-redux-wrapper";
const makeStore = () => configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
})

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>

export const wrapper = createWrapper<AppStore>(makeStore);