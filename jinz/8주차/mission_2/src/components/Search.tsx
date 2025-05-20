import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSearch } from '../context/SearchContext';

function SearchModal() {
    const [query, setQuery] = useState('');
    const debounceQuery = useDebounce(query);
    const { setSearchQuery } = useSearch();

    useEffect(() => {
        if (debounceQuery) {
            console.log('디바운싱 된 검색어', debounceQuery);
            setSearchQuery(debounceQuery);
        } else {
            setSearchQuery('');
        }
    }, [debounceQuery, setSearchQuery]);

    return (
        <div className="flex">
            <div className="text-lg p-2">🔎</div>
            <input
                type='search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-100 p-2 border rounded-lg"
                placeholder="검색어를 입력하세요"
            />
        </div>
    );
}

export default SearchModal;