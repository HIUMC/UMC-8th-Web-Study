//useMemo
import TextInput from "../components/TextInput";
import { useMemo, useState, useCallback } from "react";
import { findPrimeNumbers } from "../utils/math";

export default function UseMemoPage() {
  console.log("rerender");

  const [limit, setLimit] = useState(0);
  const [text, setText] = useState("");

  const handleChangeText = useCallback((text: string) => {
    setText(text);
  }, []);

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <div>
      UseMemoPage
      <h1>같이 배우는 react useMemo</h1>
      <div className="flex flex-col gap-10">
        <label>
          숫자 입력(소수 찾기) :
          <input
            type="number"
            value={limit}
            className="border p-4 rounded-lg"
            onChange={(e) => setLimit(Number(e.target.value))}
          ></input>
        </label>

        <h2> 소수 리스트 : </h2>
        <div className="flex flex-wrap gap-2">
          {primes.map((prime) => (
            <div key={prime}>{prime}</div>
          ))}
        </div>
        <label>
          {text}
          다른 입력 테스트 : <TextInput onChange={handleChangeText} />
        </label>
      </div>
    </div>
  );
}
