interface Option {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  className?: string;
}

const LanguageSelector = ({ value, onChange, options, className = '' }: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
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