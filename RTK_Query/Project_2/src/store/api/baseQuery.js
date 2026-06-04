import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl : ' https://server.blasars.ru/api'
})

export default baseQuery