import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/types/UserType";
import { HYDRATE } from "next-redux-wrapper";

export type UserSliceType = {
    data : UserType | null,
    token: string
}

const initialState : UserSliceType = {
    data: null,
    token: ""
}

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setLogin(state, action) {
            state.token = action.payload.token
            state.data = action.payload.user
        },
        setUser(state, action) {
            state.data = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setLogout(state) {
            state.data = initialState.data
            state.token = initialState.token
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.user
            }
        }
    }
})

export const { setLogin, setUser, setToken, setLogout } = userSlice.actions

export default userSlice.reducer;