import { configureStore } from "@reduxjs/toolkit";

// import counterReducer from "./counter";
import darkThemeReducer from "./darkTheme";
import authReducer from "./Auth";
import BussinessReducer from "./BussinessUser"
import AdminReducer from "./AdminUser"

const store = configureStore({
    reducer: {
        // counterSlice: counterReducer,
        AdminSlice: AdminReducer,
        BussinessSlice: BussinessReducer,
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
    },
});

export default store;
