import { memo, ReactElement, useState } from "react";
import { MovieLanguage, MovieFilters } from "../types/movie";
import Input from "./Input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/Language";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}
console.log("MovieFilter 컴포넌트가 렌더링 되었습니다.");

const MovieFilter = ({
  onChange = () => {},
}: MovieFilterProps): ReactElement => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = (): void => {
    const filters: MovieFilters = {
      query: query,
      include_adult: includeAdult,
      language: language,
    };
    console.log("필터링된 값:", filters);
    onChange(filters);
  };

  return (
    <div className="transform space-y-4 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl ">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-lg font-semibold text-gray-800">
            🎬 영화 제목
          </label>
          <Input
            value={query}
            onChange={setQuery}
            placeholder="검색어를 입력해주세요."
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-base"
          />
        </div>
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-lg font-semibold text-gray-800">
            🖥️ 옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className=" flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
          />
        </div>
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-lg font-semibold text-gray-800">
            🌐 언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
            options={LANGUAGE_OPTIONS}
          />
        </div>
        <div className="pt-6 text-center">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            영화 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
