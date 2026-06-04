import axios from "axios";

export async function getCategories() {
    const { data } = await axios.get('https://server.blasars.ru/api/categories')
    return data
}

export async function createCategory(nameCategory) {
    const { data } = await axios.post('https://server.blasars.ru/api/category', {
        name: nameCategory
    })

    return data
}

export async function axiosUpdateCategory(id, nameCategory) {
    const { data } = await axios.patch(`https://server.blasars.ru/api/category/${id}`, {
        name: nameCategory
    })

    return data
}

export async function deleteCategory(id) {
    const { data } = await axios.delete(`https://server.blasars.ru/api/category/${id}`)
    return data
}