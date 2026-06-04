import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sumPrice: 0
}

const remainderSlice = createSlice({
    name: 'remainder',
    initialState,
    reducers: {
        calculationSum(state, action) {
            state.sumPrice = action.payload.income - action.payload.consumption;
        }
    }
})

export default remainderSlice.reducer;
export const { calculationSum } = remainderSlice.actions;