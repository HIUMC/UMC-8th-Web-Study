interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    id?: string;
}

export const Input = ({
    value, 
    onChange, 
    placeholder = "검색어를 입력하세요.", 
    className,
    id
}: InputProps) : React.ReactElement => {
    return (
        <input 
            id={id}
            className='w-full rounded-mg border-gray-300 shadow-sm
             focus:border-blue-500 focus:ring-blue-500 ${className}'
            placeholder={placeholder}
            value={value}
            onChange={(e) : void => onChange(e.target.value)}
        />
    )
};
