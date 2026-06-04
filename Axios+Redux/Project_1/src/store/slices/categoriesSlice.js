import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrCategories: [],
    category: null,
    isUpdate: false
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload ? (
                state.arrCategories.find(item => {
                    if (item.id == action.payload) {
                        return item;
                    }
                })
            ) : null
        },
        setCategories: (state, action) => {
            state.arrCategories = Array.isArray(action.payload)
                ? action.payload
                : []
        },
        addCategory(state, action) {
            const newCategory = {
                id: Date.now(),
                name: action.payload,
                slug: null,
                description: null,
                image: null,
                createdAt: null,
                updatedAt: null
            }

            state.arrCategories.push(newCategory)
        },

        deleteCategory(state, action) {
            state.arrCategories = state.arrCategories.filter(cat => cat.id !== action.payload)
        },

        openUpdateCategory(state, action) {
            state.isUpdate = action.payload;
        },

        updateCategory(state, action) {
            state.arrCategories = state.arrCategories.map(cat => {
                return cat.id === action.payload.id
                    ? { ...cat, name: action.payload.name }
                    : cat
            })
        }
    }
})

export default categoriesSlice.reducer;
export const { setCategory, setCategories, addCategory, deleteCategory, openUpdateCategory, updateCategory } = categoriesSlice.actions;