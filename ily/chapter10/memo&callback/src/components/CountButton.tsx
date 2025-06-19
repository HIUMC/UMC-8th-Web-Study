import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton rendered");
  return (
    <button className="border p-2 rounded-lg" onClick={(): void => onClick(10)}>
      increase Count
    </button>
  );
};

export default memo(CountButton);
