import { configureStore } from "@reduxjs/toolkit";
import categoriesReduser from './slices/categoriesSlice'
import artiklesReduser from './slices/artiklesSlice'

export const store = configureStore({
    reducer: {
        categories: categoriesReduser,
        artikles: artiklesReduser
    }
})

