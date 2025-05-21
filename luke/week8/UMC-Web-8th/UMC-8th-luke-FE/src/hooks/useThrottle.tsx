import { useRef, useCallback } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  const lastCall = useRef(0);
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      fn(...args);
    }
  }, [fn, delay]);
}