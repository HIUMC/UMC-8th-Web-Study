export const useLocalStorage = (key: string) => {
  const setitem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
    }
  }

  const getitem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const removeitem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
  
  return { setitem, getitem, removeitem };
};