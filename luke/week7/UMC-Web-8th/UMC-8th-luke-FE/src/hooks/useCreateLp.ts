import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { CreateLpDto } from '../components/AddLpModal';
import type { LpItem } from '../apis/lpauth';

// 서버에 LP 생성 요청을 보내는 함수
async function createLp(dto: CreateLpDto): Promise<LpItem> {
  const token = localStorage.getItem('accessToken');
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/v1/lps`,
    dto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data.data as LpItem;  // 래퍼 벗기기
}


export function useCreateLp() {
  const qc = useQueryClient();
  
 return useMutation<LpItem, Error, CreateLpDto>({
    // v5
    mutationFn: createLp,
    onSuccess: () => {
      qc.invalidateQueries(['lpList']);
    },
    onError: (err) => {
      console.error('LP 생성 실패', err);
      alert('LP 생성에 실패했습니다.');
    },
  });
}