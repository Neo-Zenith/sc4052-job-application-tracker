import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Initial state
const initialState = {
    accessToken: "",
    username: "",
    userId: -1,
};

// Reducer function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACCESS_TOKEN":
            return { ...state, accessToken: action.payload };
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_USER_ID":
            return { ...state, userId: action.payload };
        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the Redux store
const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

export { store, persistor };
