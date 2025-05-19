//useThrottle에 대해서,, value가 자주 변경될 때
//최소 interval(밀리초)간격으로만 업데이트해서 성능을 개선한다.
import { useState, useRef, useEffect } from "react";
function useThrottle<T>(value: T, delay = 500): T {
  // :T는 이 함수가 value와 동일한 타입의 값을 반환함을 명확히 표현하는 문법임.
  // 1. 상태 변수 설정 : throttledValue : 최종적으로 쓰로틀링 적용된 값 저장
  // 초기 값을 전달 받은 value
  const [throttledValue, setThrottledValue] = useState<T>(value);

  //2. Ref : lastExcuted :마지막으로 실행된 시간을 기록하는 변수
  //useRef를 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거 하지 않음.
  const lastExecuted = useRef<number>(Date.now());

  //여기서 useEffect: value,delay가 변경될 때마다 실행되도록 함.
  useEffect(() => {
    //현재 시각과 lastExecuted.current에 저장된 마지막 시각 + delay 을 비교함
    //충분한 시간이 지나면 바로 업데이트
    if (Date.now() >= lastExecuted.current + delay) {
      //현재 시간이 지난 경우, 현재 시각으로 ㅣastExecuted업데이트
      lastExecuted.current = Date.now();
      setThrottledValue(value); //throttledValue를 업데이트

      //최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
    } else {
      //충분한 시간이 지나지 않은 경우 delay시간 후에 업데이트 (최신 value)
      const timeId: number = setTimeout(() => {
        //타이머가 만료되면, 마지막 업데이트 시간을 현재 시각으로 갱신함.
        lastExecuted.current = Date.now();

        //최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
        setThrottledValue(value);
      }, delay);

      // cleanup function 이펙트가 재실행되기 전에 타이머가 실행되지 않는다면
      //기존 timer를 clearTiemout을 통해 취소하여 중복 업데이트를 방지함.
      return () => clearTimeout(timeId);
    }
  }, [value, delay]);
  //초기값은 0  use

  return throttledValue;
}

export default useThrottle;
