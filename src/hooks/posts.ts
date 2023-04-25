import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
    title: string,
    meta: string,
    slug: string    
}

export const getPosts = async (): Promise<Post[]> => {
    const { data } = await axios.get('/api/posts');
    return data;
}

export const usePosts = (): UseQueryResult<Post[], Error> => {
    return useQuery<Post[], Error>({queryKey: ['posts'], queryFn: getPosts, staleTime: 1000})
}