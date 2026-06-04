import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrArtikles: [],
    artikle: null,
    isUpdateArtikle: false
}

const artiklesSlice = createSlice({
    name: 'artikles',
    initialState,
    reducers: {
        setArtikle(state, action) {
            state.artikle = action.payload
        },
        setArtikles: (state, action) => {
            state.arrArtikles = Array.isArray(action.payload)
                ? action.payload
                : []
        },
        addArtikle(state, action) {
            const newArtikle = {
                id: Date.now(),
                categorySlug: action.payload.categorySlug,
                title: action.payload.title,
                image: '',
                content: action.payload.content
            }

            state.arrArtikles.push(newArtikle)
        },

        deleteArtikle(state, action) {
            state.arrArtikles = state.arrArtikles.filter(cat => cat.id !== action.payload)
        },

        openUpdateArtikle(state, action) {
            state.isUpdate = action.payload;
        },

        updateArtikle(state, action) {
            state.arrArtikles = state.arrArtikles.map(cat => {
                return cat.id === action.payload.id
                    ? { ...cat, name: action.payload.name }
                    : cat
            })
        },
    }
})

export default artiklesSlice.reducer;
export const { setArtikle, setArtikles, addArtikle, deleteArtikle, openUpdateArtikle, updateArtikle } = artiklesSlice.actions;