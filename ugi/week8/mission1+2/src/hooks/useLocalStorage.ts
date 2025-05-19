export const useLocalStorage = (key: string) => {
  const setItem = (value: string) => {
    try {
      window.localStorage.setItem(key, value);  //  그냥 문자열 저장
    } catch (error) {
      console.error("로컬스토리지 저장 오류", error);
    }
  };

  const getItem = () => {
    try {
      return window.localStorage.getItem(key);  //  그냥 문자열로 반환
    } catch (e) {
      console.error("로컬스토리지 읽기 오류", e);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("로컬스토리지 삭제 오류", error);
    }
  };

  return { setItem, getItem, removeItem };
};

