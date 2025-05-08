export const useLocalStorage = (key: string) => {
  console.log("useLocalStorage 실행", key);
  const setItem = (value: unknown) => {
    try {
      console.log("useLoocalStorage setItem 실행", key, value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      console.log("useLoocalStorage getItem 실행", key);
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = () => {
    try {
      console.log("useLoocalStorage removeItem 실행", key);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
