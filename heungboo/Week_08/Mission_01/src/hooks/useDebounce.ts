import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// 외부에서 사용법 (ex) HomePage.tsx)
// const debounceValue = useDebounce(search, 300)
// const {
//     data: lps,
//     isError,
//     ... (여러개 들어옴)
//   } = useGetInfiniteLpList(5, debounceValue, order);

// 이 때 const > delay.ts 의 SEARCH_DEBOUNCE_DELAY 를 사용하여도 됨
// ex) const debounceValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY)
