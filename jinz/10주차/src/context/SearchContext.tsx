import { createContext, useContext, useState } from "react";

interface SearchContextType {
    searchTitle: string;
    setSearchTitle: (title: string) => void;
    adultContent: boolean;
    setAdultContent: (value: boolean) => void;
    language: string;
    setLanguage: (lang: string) => void;
}

const SearchContext = createContext<SearchContextType|undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [adultContent, setAdultContent] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>("ko-KR");

    return (
        <SearchContext.Provider 
            value={{ searchTitle, setSearchTitle, adultContent, setAdultContent, language, setLanguage }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}