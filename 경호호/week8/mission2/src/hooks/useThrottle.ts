import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 값 또는 함수에 Throttle을 적용하는 커스텀 훅
 * @param value 스로틀을 적용할 값 또는 함수
 * @param delay 지연 시간(ms)
 * @returns 스로틀이 적용된 값 또는 함수
 */

// 이 훅은 콜백 함수를 스로틀링하는 데 사용
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const lastCallTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      const invokeCallback = () => {
        lastCallTimeRef.current = Date.now();
        callback(...args);
      };

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (timeSinceLastCall >= delay) {
        invokeCallback();
      } else {
        timerRef.current = setTimeout(invokeCallback, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

// 값 자체를 스로틀링하기 위한 훅 (필요시 사용)
export function useThrottleValue<T>(value: T, delay: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdateTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current;

    const updateValue = () => {
      lastUpdateTimeRef.current = Date.now();
      setThrottledValue(value);
    };

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (timeSinceLastUpdate >= delay) {
      updateValue();
    } else {
      timerRef.current = setTimeout(updateValue, delay - timeSinceLastUpdate);
    }
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
} 