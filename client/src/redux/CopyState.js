import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toCopy: false,
};

const CopySlice = createSlice({
    name: "Copy",
    initialState,
    reducers: {
        setIsToCopy(state) {
            state.toCopy = !state.toCopy;
        },
        setToCopy(state) {
            state.toCopy = true;
        },
        setToNotCopy(state) {
            state.toCopy = false;
        },
    },
});


export const CopyActions = CopySlice.actions;

export default CopySlice.reducer;
