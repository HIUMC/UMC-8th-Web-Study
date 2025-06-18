interface LanguageOption {
  value: string;
  label: string;
}

import type { MovieLanguage } from '../types/movie';

interface LanguageSelectorProps {
  value: MovieLanguage;
  onChange: (value: MovieLanguage) => void;
  options: LanguageOption[];
  className?: string;
}

const LanguageSelector = ({ 
  value, 
  onChange, 
  options, 
  className="", 
}: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
      className={`w-full rounded-md border p-2 border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;