import { configureStore } from "@reduxjs/toolkit";
import categoriesReduser from './slices/categoriesSlice'

export const store = configureStore({
    reducer: {
        categories: categoriesReduser
    }
})