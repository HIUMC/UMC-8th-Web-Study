import { useState, useEffect } from 'react';

// 로컬 스토리지 값을 가져오는 함수
function getStorageValue<T>(key: string, defaultValue: T): T {
  // 브라우저 환경에서만 실행
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        // 저장된 값이 JSON 형식이 아닐 경우를 대비하여 try-catch 사용
        return JSON.parse(saved);
      } catch (error) {
        console.error(`Error parsing localStorage key “${key}”:`, error);
        // 파싱 오류 시 기본값 반환
        return defaultValue;
      }
    }
  }
  // 서버 사이드 렌더링 또는 로컬 스토리지 접근 불가 시 기본값 반환
  return defaultValue;
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
}
