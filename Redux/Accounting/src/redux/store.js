import { configureStore } from "@reduxjs/toolkit"
import incomeReducer from "../redux/slices/incomeSlice"
import consumptionReducer from "../redux/slices/consumptionSlice"
import remainderReducer from '../redux/slices/remainderSlice'

const store = configureStore({
    reducer: {
        income: incomeReducer,
        consumption: consumptionReducer,
        remainder: remainderReducer
    }
})

export default store