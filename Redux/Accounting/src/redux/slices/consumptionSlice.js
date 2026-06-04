import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    arrayConsumption: [],
    sumPrice: 0
}

const consumptionSlice = createSlice({
    name: 'consumption',
    initialState,
    reducers: {
        addItem(state, action) {
            const item = {
                id: Date.now(),
                name: action.payload.name,
                price: action.payload.price
            }

            state.arrayConsumption.push(item)
        },

        deleteItem(state, action) {
            state.arrayConsumption = state.arrayConsumption.filter(item => item.id !== action.payload);
        },

        calculationSum(state, action) {
            state.sumPrice = state.arrayConsumption.reduce((sum, curr) => sum + Number(curr.price), 0)
        }
    }
});

export default consumptionSlice.reducer;
export const { addItem, deleteItem, calculationSum } = consumptionSlice.actions;