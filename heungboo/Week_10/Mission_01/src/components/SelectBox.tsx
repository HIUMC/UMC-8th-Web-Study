import { ReactElement } from "react";

interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export const SelectBox = ({
  checked,
  onChange,
  label,
  id = "checkbox",
  className,
}: SelectBoxProps): ReactElement => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="cursor-pointer size-4 rounded border-gray-300 bg-gray-200 text-blue-600 focus:ring-blue-500"
      />

      <label htmlFor={id} className="cursor-pointer ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default SelectBox;
