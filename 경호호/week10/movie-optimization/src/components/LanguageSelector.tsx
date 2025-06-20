import { memo } from 'react';

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
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-3 bg-white/80 border border-slate-300/50 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500 transition-all duration-200 backdrop-blur-sm hover:bg-white/90 appearance-none cursor-pointer ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default memo(LanguageSelector); 