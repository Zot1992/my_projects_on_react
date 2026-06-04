import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiCategories } from "./api/apiCategories";

const store = configureStore({
    reducer: {
        [apiCategories.reducerPath]: apiCategories.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware().concat(apiCategories.middleware)
        )
    }
})

export default store