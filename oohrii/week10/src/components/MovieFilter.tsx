import React, { memo, useState } from 'react';

import type { MovieFilters, MovieLanguage } from '../types/movie';
import { Input } from './Input';
import { SelectBox } from './SelectBox';
import { LANGUAGE_OPTIONS } from '../constants/languageOptions';
import LanguageSelector from '../components/LanguageSelector';

interface MovieFilterProps {
    onChange: (filters: MovieFilters) => void;
}   

const MovieFilter = ({onChange}: MovieFilterProps) : React.ReactElement => {
    const [query, setQuery] = useState<string>('');
    const [includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [language, setLanguage] = useState<MovieLanguage>('ko-KR');

    const handleSubmit = () : void => {
        const filters : MovieFilters = {
            query,
            include_adult: includeAdult,
            language,
        };
        onChange(filters);
    };

    return (
        <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white
        p-6 shadow-xl transition-all hover:shadow-2xl">
            <div className="flex flex-wrap gap-6">
                <div className="min-w-[450px] flex-1">
                    <label htmlFor="movie-title" className="mb-2 block text-sm font-medium text-gray-700">
                        영화 제목
                    </label>
                    <Input value={query} onChange={setQuery} id="movie-title"/>
                </div>

                <div className="min-w-[250px] flex-1">
                    <SelectBox
                        checked={includeAdult}
                        onChange={setIncludeAdult}
                        label="성인 컨텐츠 표시"
                        id="include-adult"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2
                        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="min-w-[250px] flex-1">
                <label htmlFor="language-select" className="mb-2 block text-sm font-medium text-gray-700">
                    언어
                </label>
                <LanguageSelector
                    value={language}
                    onChange={setLanguage}
                    options={LANGUAGE_OPTIONS}
                    id="language-select"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 border border-blue-500 rounded-lg font-semibold text-blue-600 bg-white transition-colors duration-200 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        영화 검색
                    </button>
                </div>
            </div>
        </div>
    )
};

export default memo(MovieFilter);
