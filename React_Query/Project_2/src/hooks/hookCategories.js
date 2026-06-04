import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../servises/categories"

export function useGetCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: ({ signal }) => getCategories(signal),
        refetchOnReconnect: true,
        refetchOnWindowFocus: true
    })
}

export function useGetCategory(id) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: ({ signal }) => getCategory(id, signal),
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        enabled: !!id
    })
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body) => createCategory(body),
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true
            })
        },
        async onError() {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true
            })
        }
    })
}

export function useUpdateCategory(id) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body) => updateCategory(id, body),
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true
            })
        },
        async onError() {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true
            })
        },
        enabled: !!id
    })
}

export function useDeleteCategory(id) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCategory(id),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['categories'] })
            }
        },
        enabled: !!id
    })
}