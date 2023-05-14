import { configureStore } from "@reduxjs/toolkit";

// import counterReducer from "./counter";
import darkThemeReducer from "./darkTheme";
import authReducer from "./Auth";

const store = configureStore({
    reducer: {
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
    },
});

export default store;
