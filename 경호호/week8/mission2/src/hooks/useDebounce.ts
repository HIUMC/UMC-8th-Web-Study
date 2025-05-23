import { useState, useEffect } from 'react';

/**
 * 입력값에 Debounce를 적용하는 커스텀 훅
 * @param value 디바운스할 값
 * @param delay 지연 시간(ms)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // value 값이 변경되면 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 다음 value 변경 시 이전 타이머 제거
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
} 