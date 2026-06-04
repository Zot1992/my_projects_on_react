import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchGetArtikles, fetchGetArtikleId, fetchGetArticlesAll, fetchGetArtiklesAllLimit_4, fetchCreateArticle, fetchUpdateArticle, fetchDeleteArticle } from '../services/artikles'

export function useGetArticlesAll() {
    return useQuery({
        queryKey: ['articlesAll'],
        queryFn: ({ signal }) => fetchGetArticlesAll(signal),
        refetchOnReconnect: true
    });
}

export function useGetArticlesAllLimit_4() {
    return useQuery({
        queryKey: ['articlesAllLimit_4'],
        queryFn: ({ signal }) => fetchGetArtiklesAllLimit_4(signal),
        refetchOnReconnect: true
    });
}

export function useGetArticles(slag) {
    return useQuery({
        queryKey: ['articles', slag],
        queryFn: ({ signal }) => fetchGetArtikles(slag, signal),
        refetchOnReconnect: true,
        enabled: !!slag
    });
}


export function useGetArticleId(id) {
    return useQuery({
        queryKey: ['article', id],
        queryFn: ({ signal }) => fetchGetArtikleId(id, signal),
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        enabled: !!id,
        staleTime: 0,
        cacheTime: 0,
    });
}

export function useCreateArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body) => fetchCreateArticle(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articlesAll'] })
        }
    })
}

export function useUpdateArticle(articleId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body) => fetchUpdateArticle(articleId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['article', articleId] })
            queryClient.invalidateQueries({ queryKey: ['articlesAll'] })
        },
        enabled: !!articleId,
    })
}

export function useDeleteArticle(id) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => fetchDeleteArticle(id),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['article', id] });
                queryClient.invalidateQueries({ queryKey: ['articlesAll'] });
            }
        },
        enabled: !!id,
    })
}