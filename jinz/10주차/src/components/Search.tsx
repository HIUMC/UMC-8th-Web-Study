import { useSearch } from "../context/SearchContext";

function Search () {

    const {
        searchTitle, 
        setSearchTitle, 
        adultContent, 
        setAdultContent, 
        language, 
        setLanguage
    } = useSearch();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
        console.log(searchTitle);
    };
    const handleAdultContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdultContent(e.target.checked);
        console.log(adultContent);
    };
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        console.log(language);
    };

    return(
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-xl shadow-lg p-4">
            <div className="flex flex-col items-center justify-center w-lg rounded-lg shadow-md p-4">
                <div className="flex flex-low items-center justify-center w-full p-4">
                    <div className='flex flex-col items-center w-full'>
                        <h1 className='font-bold'>🎥영화 제목</h1>
                        <input
                            className="w-full border-gray-300 rounded-lg p-2"
                            value={searchTitle} 
                            onChange={handleTitleChange}
                            placeholder="영화 제목을 입력하세요"/>
                    </div>
                    <div className='flex flex-col items-center w-full'>
                        <h1 className='font-bold'>⚙️옵션</h1>
                        <div className="flex flex-row border-solid border-gray-300 rounded-lg p-2">
                            <input
                                className='border-solid border-gray-300 rounded-lg p-2'
                                type="checkbox"
                                checked={adultContent}
                                onChange={handleAdultContentChange}/>
                            <label className="w-full">성인 컨텐츠 표시</label>
                        </div>
                    </div>
                </div>
                <h1 className='font-bold'>🌐언어</h1>
                    <select className="w-full border-gray-300 rounded-lg p-2"
                        value={language}
                        onChange={handleLanguageChange}>
                        <option value="ko-KR">한국어</option>
                        <option value="en-US">영어</option>
                        <option value="ja-JP">일본어</option>
                    </select>
            </div>
        </div>
    )
}

export default Search;