import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGetCategories, fetchGetCategoryId, fetchCreateCategory, fetchUpdateCategory, fetchDeleteCategory } from "../services/categories";

export function useGetCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: ({ sinal }) => fetchGetCategories(sinal),
        refetchOnReconnect: true
    })
}

export function useGetCategoryId(id) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: ({ signal }) => fetchGetCategoryId(id, signal),
        refetchOnReconnect: true,
        enabled: !!id
    })
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body) => fetchCreateCategory(body),
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
        async onSettled() {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true
            })
        }
    })
}

export function useUpdateCategory(id) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body) => fetchUpdateCategory(id, body),
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
        enabled: !!id,
    })
}

export function useDeleteCategory(id) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => fetchDeleteCategory(id),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['categories'] })
                queryClient.invalidateQueries({ queryKey: ['articles'] });
            }
        },
        enabled: !!id,
    })
}