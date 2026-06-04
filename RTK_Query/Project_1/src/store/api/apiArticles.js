import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const apiArticles = createApi({
    reducerPath: 'articles',
    baseQuery,
    endpoints: (build) => {
        return ({
            getArticlesAll: build.query({
                query: () => 'articles/all',
                providesTags: [{ type: 'Articles', id: 'LIST_ARTICLE' }]
            }),
            getArticlesAllLimit_4: build.query({
                query: () => 'articles/all/?limit=4',
                providesTags: [{ type: 'Articles', id: 'LIST_ARTICLE_Limit_4' }]
            }),
            getArticles: build.query({
                query: (categorySlag) => `articles/${categorySlag}`,
                providesTags: (result, error, categorySlag) => [{ type: 'Articles', id: categorySlag }]
            }),
            getArticle: build.query({
                query: (id) => `/get-article/${id}`,
                providesTags: (result, error, id) => [{ type: 'Article', id }]
            }),
            createArticle: build.mutation({
                query: (body) => {
                    return ({
                        url: '/article',
                        method: 'POST',
                        body
                    })
                },
                invalidatesTags: (result, error, body) => {
                    return ([
                        { type: 'Articles', id: 'LIST_ARTICLE' },
                        { type: 'Articles', id: body.categorySlug }
                    ])
                }
            }),
            updateArticle: build.mutation({
                query: ({ id, ...body }) => {
                    return ({
                        url: `/article/${id}`,
                        method: 'PATCH',
                        body
                    })
                },
                invalidatesTags: (result, error, body) => {
                    return ([
                        { type: 'Article', id: body.id },
                        { type: 'Articles', id: 'LIST_ARTICLE' }
                    ])
                }
            }),
            deleteArticle: build.mutation({
                query: (id) => {
                    return ({
                        url: `/article/${id}`,
                        method: 'DELETE'
                    })
                },
                invalidatesTags: (result, error, id) => {
                    return ([
                        { type: 'Article', id },
                        { type: 'Articles', id: 'LIST_ARTICLE' }
                    ])
                }
            })
        })
    }
})

export const {
    useGetArticlesAllQuery,
    useGetArticlesAllLimit_4Query,
    useGetArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation
} = apiArticles