import { useState, useCallback } from 'react';
import type { MovieDetail } from '../types/Movie';
import axiosClient from '../api/axiosClient';

interface UseMovieDetailState {
  movie: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
}

const useMovieDetail = () => {
  const [state, setState] = useState<UseMovieDetailState>({
    movie: null,
    isLoading: false,
    error: null,
  });

  const fetchMovieDetail = useCallback(async (movieId: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axiosClient.get<MovieDetail>(`/movie/${movieId}`, {
        params: {
          language: 'ko-KR',
        },
      });
      
      setState(prev => ({
        ...prev,
        movie: response.data,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '영화 정보를 불러올 수 없습니다.',
        isLoading: false,
      }));
    }
  }, []);

  const resetState = useCallback(() => {
    setState({
      movie: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    fetchMovieDetail,
    resetState,
  };
};

export default useMovieDetail; 