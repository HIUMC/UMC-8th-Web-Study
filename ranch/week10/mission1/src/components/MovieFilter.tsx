import { memo, useState } from "react";
import type { MovieFilters, MovieLanguage } from "../types/movie";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import { LanguageSelector } from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
    onChange: (filter:MovieFilters)=>void; 
}

const MovieFilter = ({onChange}:MovieFilterProps) =>{
    const [query, setQuery] = useState<string>("");
    const [includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [language, setLanguage] = useState("ko-KR");
    
    const handleSubmit = () =>{
        const filters: MovieFilters = {
            query, 
            include_adult: includeAdult,
            language,
        };
        onChange(filters);
    };

return (
<div className="w-full flex justify-center mt-8">
  <div className="w-full max-w-6xl rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 🎬 영화 제목 */}
        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-semibold text-gray-800">🎬 영화 제목</label>
          <Input value={query} onChange={setQuery} className="w-full" />
        </div>

        {/* ⚙️ 성인 영화 포함 여부 */}
        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-semibold text-gray-800">⚙️ 옵션</label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 영화 포함"
            id="include-adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 🌏 언어 선택 */}
        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-semibold text-gray-800">🌏 언어</label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* 🔍 검색 버튼: 아래 가운데 정렬 */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          🔍 검색하기
        </button>
      </div>
    </div>
  </div>
);


}

export default memo(MovieFilter);