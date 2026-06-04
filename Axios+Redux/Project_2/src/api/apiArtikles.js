import axios from 'axios';

export async function fetchGetArtiklesAll() {
    const { data } = await axios.get('https://server-blog.blasars.ru/api/articles/all')
    return data
}

export async function fetchGetArtiklesAllLimit_4() {
    const { data } = await axios.get('https://server-blog.blasars.ru/api/articles/all/?limit=4')
    return data
}

export async function fetchGetArtikles(slug) {
    const { data } = await axios.get(`https://server-blog.blasars.ru/api/articles/${slug}`)
    return data
}

export async function fetchGetArtikleId(id) {
    const { data } = await axios.get(`https://server-blog.blasars.ru/api/get-article/${id}`)
    return data
}

export async function fetchCreateArticle(category, inpName, inpContent) {
    const token = localStorage.getItem('token');

    const { data } = await axios.post('https://server-blog.blasars.ru/api/article', {
        categorySlug: category,
        title: inpName,
        image: '',
        content: inpContent
    },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    return data
}

export async function fetchUpdateArticle(category, idArticle, inpName, inpContent) {
    const token = localStorage.getItem('token');

    const { data } = await axios.patch(`https://server-blog.blasars.ru/api/article/${idArticle}`, {
        categorySlug: category,
        title: inpName,
        image: '',
        content: inpContent
    }, {
        headers: { 'Authorization': `Bearer ${token}` }
    })

    return data
}

export async function fetchDeleteArticle(idArticle) {
    const { data } = await axios.delete(`https://server-blog.blasars.ru/api/article/${idArticle}`)
    return data
}