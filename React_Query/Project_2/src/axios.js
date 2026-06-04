import axios from "axios";

const instance = axios.create({
    baseURL: 'https://server.blasars.ru/api',
})

export default instance