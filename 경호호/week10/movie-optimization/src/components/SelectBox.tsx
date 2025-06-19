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
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default SelectBox; 