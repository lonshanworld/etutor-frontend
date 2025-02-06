import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const Store = configureStore({
    reducer : {
        user : userReducer,
    }
});

export default Store;