import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBussiness: false,
};

const BussinessSlice = createSlice({
    name: "Bussiness",
    initialState,
    reducers: {
        changeIsBussiness(state) {
            state.isBussiness = !state.isBussiness;
        },
        setToBussiness(state) {
            state.isBussiness = true;
        },
    },
});


export const BizActions = BussinessSlice.actions;

export default BussinessSlice.reducer;
