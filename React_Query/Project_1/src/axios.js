import axios from "axios";

const instance = axios.create({
    baseURL: 'https://server-blog.blasars.ru/api',
})

export default instance