import { ReactElement } from "react";
import { MovieLanguage } from "../types/movie";

interface LanguageOptions {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: MovieLanguage) => void;
  className?: string;
  options: LanguageOptions[];
}

const LanguageSelector = ({
  value,
  onChange,
  className,
  options,
}: LanguageSelectorProps): ReactElement => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
      className={`w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
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
