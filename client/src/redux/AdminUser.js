import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: false,
};

const AdminSlice = createSlice({
    name: "Admin",
    initialState,
    reducers: {
        changeIsAdmin(state) {
            state.isAdmin = !state.isAdmin;
        },
        setToAdmin(state) {
            state.isAdmin = true;
        },
        setToNotAdmin(state) {
            state.isAdmin = false;
        },
    },
});


export const AdminActions = AdminSlice.actions;

export default AdminSlice.reducer;
