import { useQuery } from '@tanstack/react-query';
import { AxiosClient } from '../modules/AxiosClient';

export const JsonPlaceholderService = {
    async getPost (postId:number) {
        return AxiosClient().get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
};

export const useGetPlaceholderPost = (postId:number) => {
    return useQuery(['placeholder-post', postId], {
        queryFn: () => JsonPlaceholderService.getPost(postId),
        // enabled: false, // To not load by default, load on refetch
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
};
