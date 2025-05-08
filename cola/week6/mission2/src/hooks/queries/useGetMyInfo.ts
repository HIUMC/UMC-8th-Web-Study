import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../apis/auth';
import { useAuth } from '../../context/AuthContext';

export default function useGetMyInfo() {
    const { accessToken } = useAuth();
    
    return useQuery({
        queryKey: ['myInfo'],
        queryFn: () => getMyInfo(),
        enabled: Boolean(accessToken),
        staleTime: 1000 * 60 * 5, // 5분 동안 기존 데이터를 그대로 활용해 네트워크 요청을 줄인다.
        gcTime: 1000 * 60 * 10, // 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 데이터를 받아오게 한다.
        select: (data)=>data.data,
    })
}