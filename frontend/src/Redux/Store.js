import { configureStore } from '@reduxjs/toolkit';
import userReducer from "@/Redux/Reducers/Index.js";

export default configureStore({
    reducer: {
        user: userReducer,
    },
})