import axios from "../axios"

export async function fetchGetArticlesAll(signal) {

    try {
        const { data } = await axios('/articles/all', { signal })
        return data
    } catch (error) {
        console.error(error)
        return error.response.data
    }

}

export async function fetchGetArtiklesAllLimit_4(signal) {

    try {
        const { data } = await axios('/articles/all/?limit=4', { signal })
        return data
    } catch (error) {
        console.error(error)
        return error.response.data
    }
}



export async function fetchGetArtikles(slug, signal) {

    try {
        const { data } = await axios(`/articles/${slug}`, { signal })
        return data
    } catch (error) {
        console.error(error)
        return error.response.data
    }

}

export async function fetchGetArtikleId(id, signal) {

    try {
        const { data } = await axios(`/get-article/${id}`, { signal })
        return data
    } catch (error) {
        console.error(error)
        return error.response.data
    }

}

export async function fetchCreateArticle(body) {

    try {
        const { data } = await axios.post('/article', body)
        return data
    }
    catch (err) {
        console.log(err)
        return err.response.data
    }

}

export async function fetchUpdateArticle(id, body) {
    try {
        const { data } = await axios.patch(`/article/${id}`, body)
        return data
    }
    catch (err) {
        console.log(err)

    }
}

export async function fetchDeleteArticle(id) {
    try {
        const { data } = await axios.delete(`/article/${id}`)
        return data
    }
    catch (err) {
        console.log(err)
        return err.response.data
    }
}