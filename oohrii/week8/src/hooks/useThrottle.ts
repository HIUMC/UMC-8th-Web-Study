//useThrottle: 주어잔 값이 자주 변경될떄
//최소 간격으로만 업데이트해서 성능을 개선

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value:T,delay=500):T{

  const[throttledValue, setThrottledValue]=useState<T>(value);
  const lastExecuted =useRef<number>(Date.now());

  useEffect(()=>{
    if(Date.now()>=lastExecuted.current+delay){
      lastExecuted.current=Date.now();
      setThrottledValue(value);
    }else{
      const timerId=setTimeout(()=>{
        lastExecuted.current=Date.now();
        setThrottledValue(value);
      },delay);

      return()=>clearTimeout(timerId);
    }
  },[value,delay])
  return throttledValue;
}
export default useThrottle;