// useThrottle: 주어진 값(상태)가 자주 변경될 때
// 최소 interval(ms) 간격으로만 업데이트해서 성능을 개선함

import { useEffect, useRef, useState, useCallback } from "react";

// 값에 대한 스로틀링
function useThrottleValue<T>(value: T, interval: number = 500) {
  // 1. 상태 변수 : ThrottledValue: 최종적으로 Throttle 적용된 값
  // 초기값을 전달받은 value
  const [throttledValue, setThrottledValue] = useState<T>(value);

  //2. Ref lastExcuted: 마지막으로 실행된 시간을 기록하는 변수
  // useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지 않음.
  const lastExecuted = useRef<number>(Date.now());

  //3. useEffect: value, interval가 변경될 때 아래 로직 실행
  useEffect(() => {
    // 현재 시각과 'lastExecuted.current에 저장된 마지막 시각 + interval'을 비교

    // 충분한 시각이 지나면 바로 업데이트
    if(Date.now() - lastExecuted.current >= interval) {

      // 현재 시간이 지난 경우
      // 현재 시각으로 lastExecuted.current 업데이트
      lastExecuted.current = Date.now();

      // 최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
      setThrottledValue(value);
  } else{
    // 충분한 시간이 지나지 않은 경우
    // setTimeout으로 interval 시간 후에 실행될 타이머를 만듦.잊잊
    const timerId = setTimeout(() => {

      // 타이머가 완료되면, 마지막 업데이트 시각을 현재 시각으로 갱신
      lastExecuted.current = Date.now();

      // 최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
      setThrottledValue(value);
    }, interval);

    // CleanUp Function 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면
    // 기존 타이머를 clearTimeout을 통해 취소하여 중복 업데이트를 방지
    return () => clearTimeout(timerId);
    /* 질문:
    이렇게 하면(이전 타이머 취소하고 새 타이머 시작하면) 100ms마다 주기적으로 업데이트가 일어나는 게 아니고,
    debounce처럼 100ms동안 스크롤 없을 때만 실행되는 거 아님? */
  }
}, [value, interval]);

// 4. 최종적으로 업데이트된 throttledValue를 반환
return throttledValue;
}

// 함수에 대한 스로틀링
function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number = 500
) {
  const lastExecuted = useRef<number>(0);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastExecuted.current >= interval) {
      lastExecuted.current = now;
      callback(...args);
    }
  }, [callback, interval]);
}

export { useThrottleValue, useThrottleCallback };
export default useThrottleValue;
