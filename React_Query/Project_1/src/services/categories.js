import axios from "../axios"

export async function fetchGetCategories(signal) {
    try {
        const { data } = await axios('/categories', { signal })
        return data
    } catch (error) {
        console.error(error)
        return error.response.data
    }
}

export async function fetchGetCategoryId(id, signal) {
    try {
        const { data } = await axios(`/get-category/${id}`, { signal })
        return data
    } catch (error) {
        console.error(error)
        return error.response.data
    }
}

export async function fetchCreateCategory(body) {
    try {
        const { data } = await axios.post('/category', body)
        return data
    } catch (error) {
        console.error(error.response)
        return error.response.data
    }
}

export async function fetchUpdateCategory(id, body) {
    try {
        const { data } = await axios.patch(`/category/${id}`, body)
        return data
    } catch (error) {
        console.error(error.response)
        return error.response.data
    }
}



export async function fetchDeleteCategory(id) {
    try {
        const { data } = await axios.delete(`/category/${id}`)
        return data
    } catch (error) {
        console.error(error.response)
        return error.response.data
    }
}