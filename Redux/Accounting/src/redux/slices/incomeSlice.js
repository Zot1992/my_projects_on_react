import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    arrayIncome: [],
    sumPrice: 0
}

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        addItem(state, action) {
            const item = {
                id: Date.now(),
                name: action.payload.name,
                price: action.payload.price
            }

            state.arrayIncome.push(item)
        },

        deleteItem(state, action) {
            state.arrayIncome = state.arrayIncome.filter(item => item.id !== action.payload);
        },

        calculationSum(state, action) {
            state.sumPrice = state.arrayIncome.reduce((sum, curr) => sum + Number(curr.price), 0)
        }
    }
});

export default incomeSlice.reducer;
export const { addItem, deleteItem, calculationSum } = incomeSlice.actions;