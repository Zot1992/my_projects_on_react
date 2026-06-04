import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    arrayTasks: [],
    isUpdate: false,
    taskUpdate: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            const newTask = {
                id: Date.now(),
                name: action.payload
            }

            state.arrayTasks.push(newTask);
        },

        deleteTask(state, action) {
            state.arrayTasks = state.arrayTasks.filter(task => task.id !== action.payload)
        },

        openUpdate(state, action) {
            state.isUpdate = true;
            state.taskUpdate = state.arrayTasks.find(task => task.id === action.payload) || null;;
        },

        closeUpdate(state, action) {
            state.isUpdate = false;
            state.taskUpdate = null;
        },

        updateTask(state, action) {
            state.arrayTasks = state.arrayTasks.map(task => {
                return task.id === action.payload.id
                    ? { ...task, name: action.payload.name }
                    : task
            })

            state.isUpdate = false;
            state.taskUpdate = null;
        }
    }
})

export default tasksSlice.reducer;
export const { addTask, deleteTask, openUpdate, closeUpdate, updateTask } = tasksSlice.actions;