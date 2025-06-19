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
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">영화 검색</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            영화 제목
          </label>
          <Input
            value={filters.query}
            onChange={handleQueryChange}
            placeholder="검색할 영화 제목을 입력하세요"
            className="w-full"
          />
        </div>
        
        <div>
          <SelectBox
            checked={filters.include_adult}
            onChange={handleAdultChange}
            label="성인 콘텐츠 포함"
            id="include_adult"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            언어
          </label>
          <LanguageSelector
            value={filters.language}
            onChange={handleLanguageChange}
            options={LANGUAGE_OPTIONS}
            className="w-full"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          영화 검색
        </button>
      </form>
    </div>
  );
};

export default memo(MovieFilter); 