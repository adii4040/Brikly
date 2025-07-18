import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
            console.log("Current User Data:", action.payload);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
})

export const { getCurrentUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;