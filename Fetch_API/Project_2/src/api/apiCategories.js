import axios from 'axios';

export async function fetchGetCategories() {
    const { data } = await axios.get('https://server-blog.blasars.ru/api/categories')
    return data

    // const response = await fetch('https://server-blog.blasars.ru/api/categories')
    // if (response.status >= 400) {
    //     throw new Error('Ошибка клиента: проверьте параметры запроса');
    // }
    // else if (response.status >= 500) {
    //     throw new Error('Внутренняя ошибка сервера');
    // }
    // const data = await response.json()
    // return data
}

export async function fetchGetCategoryId(id) {
    const { data } = await axios.get(`https://server-blog.blasars.ru/api/get-category/${id}`)
    return data
    // const response = await fetch('https://server-blog.blasars.ru/api/get-category/' + id)
    // const data = await response.json()
    // return data
}

export async function fetchCreateCategory(inpName) {
    const { data } = await axios.post('https://server-blog.blasars.ru/api/category', {
        name: inpName
    })
    return data
    // const response = await fetch('https://server-blog.blasars.ru/api/category', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: inpName,
    //     }),
    // })
    // const data = await response.json()
    // return data
}

export async function fetchUpdateCategory(idСategory, inpName) {
    const { data } = await axios.patch(`https://server-blog.blasars.ru/api/category/${idСategory}`, {
        name: inpName
    })
    return data
    // const response = await fetch('https://server-blog.blasars.ru/api/category/' + idСategory, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: inpName,
    //     }),
    // })
    // const data = await response.json()
    // return data
}



export async function fetchDeleteCategory(idCategory) {
    const { data } = await axios.delete(`https://server-blog.blasars.ru/api/category/${idCategory}`)
    return data
    // const response = await fetch('https://server-blog.blasars.ru/api/category/' + idСategory, {
    //     method: 'DELETE',
    // })

    // if (response.status >= 400) {
    //     throw new Error('Ошибка клиента: проверьте параметры запроса');
    // }
    // else if (response.status >= 500) {
    //     throw new Error('Внутренняя ошибка сервера');
    // }


    // const data = await response.json()
    // return data
}