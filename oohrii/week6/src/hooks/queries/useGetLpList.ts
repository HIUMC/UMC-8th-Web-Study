import {useQuery} from '@tanstack/react-query';

function useGetLpList({cursor, limit, search, order}: PaginationDto) {
    return useQuery( {
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => 
            getLpList(  {
                cursor, 
                limit, 
                search, 
                order,
            }),
    });
}

export default useGetLpList;