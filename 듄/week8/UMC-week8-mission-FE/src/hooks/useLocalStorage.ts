export const useLocalStorage = (key: string) => {
  const setItem = (value: string) => {
    try {
      // Remove any existing quotes from the token
      const cleanValue = value.replace(/^"|"$/g, '');
      window.localStorage.setItem(key, cleanValue);
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      // Remove any existing quotes from the token
      return item ? item.replace(/^"|"$/g, '') : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { setItem, getItem, removeItem };
};





