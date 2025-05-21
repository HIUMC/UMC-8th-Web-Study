export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = localStorage.getItem(key);
      return item;
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};

//throttle 프론트와 백에서 모두 기능을 막도록 수행해야 함. throttling을 통한 좋아요 취소하기.  state로 스크롤 처리하기
