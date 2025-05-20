import { useEffect, useRef, useState } from "react";

export default function useThrottle(value: boolean, delay: number = 500) {
    const [throttle, setThrottle] = useState(false);
    const lastTriggered = useRef(0);
    
    useEffect(()=>{
        const now = Date.now();

        if (value && now - lastTriggered.current >= delay) {
            lastTriggered.current = now;
            console.log("[useThrottle] 🚀 THROTTLED");

            setThrottle(true);

            const timeout = setTimeout(()=>{
                setThrottle(false);
            }, 50);

            return () => clearTimeout(timeout);
        }
    }, [value, delay]);

    return throttle;
}