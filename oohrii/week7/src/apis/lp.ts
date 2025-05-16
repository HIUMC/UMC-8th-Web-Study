import { axiosInstance } from './auth';
import { PaginationDto } from '../types/common';

interface Lp {
  id: number;
  title: string;
  artist: string;
  createdAt: string;
  imageUrl: string;
  description: string;
  tags: string[];
  likes: number;
}

interface LpListResponse {
  success: boolean;
  data: {
    data: Lp[];
    nextCursor: number | null;
    hasNext: boolean;
  };
  message?: string;
}

export const getLpList = async (params: PaginationDto): Promise<LpListResponse> => {
  const { data } = await axiosInstance.get('/v1/lps', { params });
  return data;
};

export const getLpDetail = async (id: number): Promise<Lp> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};

