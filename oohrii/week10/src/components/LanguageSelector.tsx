import React from 'react';
import type { MovieLanguage } from '../types/movie';

interface languageOption {
    value: string;
    label: string;
}

interface LanguageSelectorProps {
    value: string;
    onChange: (value: MovieLanguage) => void;
    options: languageOption[];
    className?: string;
    id?: string;
}

const LanguageSelector = ({
    value, 
    onChange, 
    options, 
    className = "",
    id
}: LanguageSelectorProps) : React.ReactElement => {
    return (
        <select
            id={id}
            value={value}
            onChange={(e) : void=> onChange(e.target.value as MovieLanguage)}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        )
}

export default LanguageSelector;
