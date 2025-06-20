import { memo } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({ value, onChange, placeholder, className = '' }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`px-4 py-3 bg-white/80 border border-slate-300/50 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500 transition-all duration-200 backdrop-blur-sm hover:bg-white/90 ${className}`}
    />
  );
};

export default memo(Input); 