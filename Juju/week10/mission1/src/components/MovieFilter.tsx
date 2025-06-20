import { memo, useState } from "react";
import { MovieFilters, MovieLanguage } from "../types/movie";
import { Input } from "./Input";
import { LanguageSelector } from "./LanguageSelector";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({onChange}:MovieFilterProps) => {
    const [query, setQuery] = useState<string>("");
    const [includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [language, setLanguage] = useState<MovieLanguage>("en-US");

    const handleSubmit = () : void => {
      const filtrs: MovieFilters = {
        query,
        include_adult: includeAdult,
        language,
      };
      onChange(filtrs);
    };

    return (
      <div className="transform rounded-md bg-white p-6 border-gray-300 shadow-xl transition-all hover:shadow-2xl">
        <div className="flex flex-wrap gap-6">
          <div className="min-w-[450px] flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              영화 제목
            </label>
            <Input value = {query} onChange={setQuery} className="w-full" />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-semibold text-gray-800">옵션</label>
            <SelectBox
              checked={includeAdult}
              onChange={setIncludeAdult}
              label="성인 영화 포함"
              id="include-adult"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-semibold text-gray-800">언어</label>
          <LanguageSelector
            value={language}
            onChange={(value: string) => setLanguage(value as MovieLanguage)}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <h2 className="text-lg font-semibold mb-4">영화 검색</h2>
        <button onClick={handleSubmit}>검색</button>
      </div>
    );
}


export default memo(MovieFilter);