import React from 'react';
import type { Movie } from '../types/movie';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
    isOpen: boolean;
}

const MovieModal = ({ movie, onClose, isOpen }: MovieModalProps): React.ReactElement | null => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 오버레이 */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* 모달 컨텐츠 */}
            <div className="relative bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
                {/* 닫기 버튼 */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* 포스터 이미지 */}
                    <div className="md:w-1/3">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* 영화 정보 */}
                    <div className="p-6 md:w-2/3">
                        <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
                        <div className="mb-4 flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                            <span className="mx-2">|</span>
                            <span>{movie.release_date}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{movie.overview}</p>
                        <div className="space-y-2">
                            <p><span className="font-semibold">원제:</span> {movie.original_title}</p>
                            <p><span className="font-semibold">언어:</span> {movie.original_language.toUpperCase()}</p>
                            <p><span className="font-semibold">인기도:</span> {movie.popularity}</p>
                            <p><span className="font-semibold">투표수:</span> {movie.vote_count}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal; 