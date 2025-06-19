import { memo } from "react";
interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput rendered");

  return (
    <input
      className="border p-2 rounded-lg"
      type="text"
      onChange={(e): void => onChange(e.target.value)}
      placeholder="Type something..."
    />
  );
};

export default memo(TextInput);
