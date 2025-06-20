import { memo } from 'react';

interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  className?: string;
}

const SelectBox = ({ checked, onChange, label, id, className = '' }: SelectBoxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <label
          htmlFor={id}
          className="flex items-center cursor-pointer"
        >
          <div className={`
            w-5 h-5 rounded-md border-2 border-slate-300 mr-3 flex items-center justify-center transition-all duration-200
            ${checked 
              ? 'bg-gradient-to-br from-slate-600 to-slate-700 border-slate-600' 
              : 'bg-white/80 hover:bg-white/90 hover:border-slate-400'
            }
          `}>
            {checked && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-slate-700 font-medium select-none">
            {label}
          </span>
        </label>
      </div>
    </div>
  );
};

export default memo(SelectBox); 