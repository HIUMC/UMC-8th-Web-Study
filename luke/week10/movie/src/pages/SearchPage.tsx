import { useState,useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchDetail from './SearchDetail';


export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 쿼리스트링에서 초기값 가져오기
  const query = searchParams.get('query') || '';
  const adult = searchParams.get('include_adult') === 'true';
  const lang = searchParams.get('language') || 'ko';
  const page = Number(searchParams.get('page')) || 1;
  
  // 상태 관리
  const [title, setTitle] = useState(query);
  const [includeAdult, setIncludeAdult] = useState(adult);
  const [language, setLanguage] = useState(lang);
  
  useEffect(() => {
    setTitle(query);
    setIncludeAdult(adult);
    setLanguage(lang);
  }, [query, adult, lang]);

   // useCallback으로 메모이즈
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) {
        alert('영화 제목을 입력해주세요.');
        return;
      }
      navigate(
        `/search?query=${encodeURIComponent(title)}&include_adult=${includeAdult}&language=${language}&page=1`
      );
    },
    [title, includeAdult, language, navigate]
  );
   
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl flex flex-col gap-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 flex items-center gap-1">
              영화 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="영화 제목을 입력하세요"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 flex items-center gap-1">
              옵션
            </label>
            <div className="flex items-center h-full">
              <input
                type="checkbox"
                id="adult"
                checked={includeAdult}
                onChange={e => setIncludeAdult(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="adult" className="text-gray-700">성인 콘텐츠 표시</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1">
            언어
          </label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="ko">한국어</option>
            <option value="en">영어</option>
            <option value="ja">일본어</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-lg flex items-center justify-center gap-2"
        >
          검색하기
        </button>
      </form>
      {query && (
        <div className="w-full max-w-6xl">
          <SearchDetail
            query={query}
            includeAdult={adult}
            language={lang}
            page={page}
          />
        </div>
      )}
    </div>
  );
}