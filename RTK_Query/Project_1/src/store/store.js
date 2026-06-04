import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiCategories } from "./api/apiCategories";
import { apiArticles } from "./api/apiArticles";

const store = configureStore({
    reducer: {
        [apiCategories.reducerPath]: apiCategories.reducer,
        [apiArticles.reducerPath]: apiArticles.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware().concat(
                apiCategories.middleware,
                apiArticles.middleware
            )
        )
    }
})

setupListeners(store.dispatch)

export default store