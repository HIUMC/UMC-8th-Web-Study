interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const Input = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요.",
  className,
}: InputProps) => {
  return (
    <input
      className=" w-full rounded-md border border-gray-600 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
