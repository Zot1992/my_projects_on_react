import axios from "../axios";

export async function getCategories(signal) {
    try {
        const { data } = await axios('/categories', { signal })
        return data
    } catch (err) {
        console.error(err)
        return error.response.data
    }
}

export async function getCategory(CategoryId, signal) {
    try {
        const { data } = await axios(`/get-category/${CategoryId}`, { signal })
        return data
    } catch (err) {
        console.error(err)
        return err.response.data
    }
}

export async function createCategory(body) {
    try {
        const { data } = await axios.post('/category', body)
        return data
    } catch (err) {
        console.error(err.response)
        return err.response.data
    }
}

export async function updateCategory(CategoryId, body) {
    try {
        const { data } = await axios.patch(`/category/${CategoryId}`, body)
        return data
    } catch (err) {
        console.error(err)
        return err.response.data
    }
}

export async function deleteCategory(CategoryId) {
    try {
        const { data } = await axios.delete(`/category/${CategoryId}`)
        return data
    } catch (err) {
        console.error(err)
        return err.response.data
    }
}