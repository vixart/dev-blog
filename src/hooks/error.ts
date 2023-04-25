import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "@/utility/axios";

export const getError = async (): Promise<any> => {
    const { data } = await api.get('/error');
    return data;
}

export const useError = (): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['error'], 
        queryFn: getError, 
        refetchOnWindowFocus: false,
        retry: 0,
        enabled: false,
    })
}