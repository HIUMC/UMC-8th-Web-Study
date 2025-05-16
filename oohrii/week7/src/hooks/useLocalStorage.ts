import { useCallback } from 'react';

export const useLocalStorage = (key: string) => {
    const getItem = useCallback(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }, [key]);
  
    const setItem = useCallback((value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key]);
  
    const removeItem = useCallback(() => {
        localStorage.removeItem(key);
    }, [key]);
  
    return { getItem, setItem, removeItem };
  };