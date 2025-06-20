interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const Input = ({
    value,
    onChange,
    placeholder = "검색어를 입력하세요",
    className, 
}: InputProps) => {
    return (
         <input
    className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition
    ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
    ); 
}
