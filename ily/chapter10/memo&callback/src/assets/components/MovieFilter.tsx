import { memo, useState } from "react";
import { type MovieFilterType, type MovieLanguage } from "../types/movies";
import Input from "./Input";
import SelectBox from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilterType) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);

  const handleSubmit = () => {
    const filters: MovieFilterType = {
      query,
      include_adult: includeAdult,
      language,
    };
    console.log(filters);
    onChange(filters);
  };

  return (
    <div className="transform space-y-4 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6 items-center justify-center">
        <div className="min-w-[450px] flex-1 ">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery}></Input>
        </div>

        <div className="min-w-[250px] flex-1 items-center flex flex-col">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            option
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="display adult content"
            id="include-adult"
            className=" w-full rounded-lg border-gray-300 px-4 py-2
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></SelectBox>
        </div>

        <div className="min-w-[250px] flex-1 items-center flex flex-col">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            language
            <LanguageSelector
              value={language}
              onChange={setLanguage}
              options={LANGUAGE_OPTIONS}
            />
          </label>
        </div>

        <div className="pt-4">
          <button onClick={handleSubmit}>영화 검색</button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
