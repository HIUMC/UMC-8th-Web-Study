import { memo, useState } from 'react';
import type { MovieFilterType } from '../types/Movie';
import { LANGUAGE_OPTIONS } from '../constants/Movie';
import Input from './Input';
import SelectBox from './SelectBox';
import LanguageSelector from './LanguageSelector';

interface MovieFilterProps {
  onChange: (filters: MovieFilterType) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [filters, setFilters] = useState<MovieFilterType>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(filters);
  };

  const handleQueryChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const handleAdultChange = (include_adult: boolean) => {
    setFilters(prev => ({ ...prev, include_adult }));
  };

  const handleLanguageChange = (language: string) => {
    setFilters(prev => ({ ...prev, language }));
  };

  console.log('MovieFilter 렌더링됨'); // 디버깅용

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-200/50 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-slate-600 to-slate-400 rounded-full mr-4"></div>
        <h2 className="text-2xl font-semibold text-slate-800">필터 설정</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* 영화 제목 검색 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              영화 제목
            </label>
            <Input
              value={filters.query}
              onChange={handleQueryChange}
              placeholder="검색할 영화 제목을 입력하세요"
              className="w-full"
            />
          </div>
          
          {/* 언어 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              언어 설정
            </label>
            <LanguageSelector
              value={filters.language}
              onChange={handleLanguageChange}
              options={LANGUAGE_OPTIONS}
              className="w-full"
            />
          </div>
          
          {/* 성인 콘텐츠 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              추가 옵션
            </label>
            <SelectBox
              checked={filters.include_adult}
              onChange={handleAdultChange}
              label="성인 콘텐츠 포함"
              id="include_adult"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-200/50">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white font-medium rounded-xl hover:from-slate-800 hover:to-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>영화 검색</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(MovieFilter); 