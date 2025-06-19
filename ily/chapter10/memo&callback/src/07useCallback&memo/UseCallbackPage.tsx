import { useCallback, useMemo, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";
export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
      //빈 배열은 함수가 처음 호출될 때만 실행됨.
      //함수 내부에서 count 값은 useState의 초기값은 0이므로 두 번쨰 함수가 되더라도 0+10=10임.
    },
    [count],
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div>
      <h1>같이 배우는 react useCallback</h1>

      <h2>Count : {count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <div className="flex flex-col">
        <h2>Text</h2>
        <span>{text}</span>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
}
