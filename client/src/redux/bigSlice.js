import { configureStore } from "@reduxjs/toolkit";

// import counterReducer from "./counter";
import darkThemeReducer from "./darkTheme";
import authReducer from "./Auth";
import BussinessReducer from "./BussinessUser"

const store = configureStore({
    reducer: {
        // counterSlice: counterReducer,
        BussinessSlice: BussinessReducer,
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
    },
});

export default store;
