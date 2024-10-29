/**
 * @description - This file contains the userSlice, which is a slice of the Redux store that manages the user state.
 * The userSlice contains actions for signing in, updating user information, and signing out.
 * The userSlice also contains reducers to handle these actions and update the user state accordingly.
 * The userSlice is used in the user reducer to manage the user state in the Redux store.
 * The userSlice is exported and used in the Redux store configuration to create the Redux store.
 * The userSlice is also used in the user actions to dispatch actions to update the user state.
 * The userSlice is used in the user component to access the user state and dispatch actions to update the user state.
 * The userSlice is used in the user component to handle user authentication and update the user state accordingly.
 * The userSlice is used in the user component to handle user sign-in, sign-out, and user information updates.
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};
// Create a userSlice with initial state, reducers, and actions
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, clearError , updateUserFailure, updateUserStart, updateUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } = userSlice.actions;

export default userSlice.reducer;