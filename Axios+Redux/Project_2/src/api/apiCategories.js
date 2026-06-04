import axios from 'axios';

export async function fetchGetCategories() {
    const { data } = await axios.get('https://server-blog.blasars.ru/api/categories')
    return data
}

export async function fetchGetCategoryId(id) {
    const { data } = await axios.get(`https://server-blog.blasars.ru/api/get-category/${id}`)
    return data
}

export async function fetchCreateCategory(inpName) {
    const { data } = await axios.post('https://server-blog.blasars.ru/api/category', {
        name: inpName
    })
    return data
}

export async function fetchUpdateCategory(idСategory, inpName) {
    const { data } = await axios.patch(`https://server-blog.blasars.ru/api/category/${idСategory}`, {
        name: inpName
    })
    return data
}

export async function fetchDeleteCategory(idCategory) {
    const { data } = await axios.delete(`https://server-blog.blasars.ru/api/category/${idCategory}`)
    return data
}