import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const apiCategories = createApi({
    reducerPath: 'categories',
    baseQuery,
    endpoints: (build) => {
        return ({
            getCategories: build.query({
                query: () => '/categories',
                providesTags: [{ type: 'Categories', id: 'LIST' }]
            }),
            getCategory: build.query({
                query: (id) => `/get-category/${id}`,
                providesTags: (result, error, id) => [{ type: 'Categories', id }]
            }),
            createCategory: build.mutation({
                query: (body) => {
                    return ({
                        url: '/category',
                        method: 'POST',
                        body,
                    })
                },
                invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
            }),
            updateCategory: build.mutation({
                query: ({ id, ...body }) => {
                    return ({
                        url: `/category/${id}`,
                        method: 'PATCH',
                        body
                    })
                },
                invalidatesTags: (result, error, id) => {
                    return ([
                        { type: 'Categories', id: 'LIST' },
                        { type: 'Categories', id }
                    ])
                }
            }),
            deleteCategory: build.mutation({
                query: (id) => {
                    return ({
                        url: `/category/${id}`,
                        method: 'DELETE'
                    })
                },
                invalidatesTags: (result, error, id) => {
                    return ([
                        { type: 'Categories', id },
                        { type: 'Categories', id: 'LIST' }
                    ])
                }
            }),
        })
    }
})

export const { useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = apiCategories