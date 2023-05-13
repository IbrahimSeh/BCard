import { configureStore } from "@reduxjs/toolkit";

// import counterReducer from "./counter";
import darkThemeReducer from "./darkTheme";
import authReducer from "./Auth";
import BussinessReducer from "./BussinessUser"
import AdminReducer from "./AdminUser"
import CopyReducer from "./CopyState"

const store = configureStore({
    reducer: {
        CopySlice: CopyReducer,
        AdminSlice: AdminReducer,
        BussinessSlice: BussinessReducer,
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
    },
});

export default store;
