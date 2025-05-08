export function useCheckLogin() {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;

  // 예시: 유저 이름도 localStorage에 저장했다고 가정
  const name = localStorage.getItem('name') || '사용자';

  return { name,isAuthenticated};
}