import { useState, useRef, useEffect } from "react";

function useThrottle<T>(value: T, delay = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const lastExecuted = useRef<number>(Date.now());
  // useState = 리렌더링 시 값이 변경
  // useRef = 리렌더링 되어도 값 유지, 변경되어도 리렌더링을 트리거 하지 않음.

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}
export default useThrottle;

// 사용법
//  const handleScroll = useThrottle(() => {
//      setScrollY(window.scrollY);
//       } , 2000);
