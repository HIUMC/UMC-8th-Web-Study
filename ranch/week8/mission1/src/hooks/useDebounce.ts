import { useEffect, useState } from "react";

function useDebounce<T>(value:T, delay:number){
    const [debouncedValue, setDebouncedValue] = useState<T>(value); 
    
    // update the debounced value after the delay
    useEffect(()=>{
        // executes after delay (ms)
        // after the dealy, set the value to the debounced value

        const handler:number = setTimeout(()=>
            setDebouncedValue(value)
        , delay);

        // cleanup function to clear the timeout
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
