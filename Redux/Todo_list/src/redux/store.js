import { configureStore } from "@reduxjs/toolkit";
import tasksReduser from './slices/tasksSlice'


const store = configureStore({
    reducer: {
        tasks: tasksReduser
    }
})

export default store