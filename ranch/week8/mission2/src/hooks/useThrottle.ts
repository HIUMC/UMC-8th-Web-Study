// useThrottle: when the value changes frequently
// set minimum time between calls for efficiency

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay = 200){
    // 1. throttledValue: will save the last value throttled
    const [throttledValue, setThrottledValue] = useState<T>(value);

    // 2. Ref lastExcecuted: saves the last time the function is run
    // when useRef is used, the value will not be reset when the component re-renders

    const lastExecuted = useRef<number>(Date.now());

    // 3. useEffect: when the value changes, check if the delay has passed
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