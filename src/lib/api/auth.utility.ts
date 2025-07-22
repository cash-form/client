// 로그아웃 유틸리티 함수
export const logout = () => {
  // 쿠키 삭제
  document.cookie = "accessToken=; max-age=0; path=/; secure; samesite=strict";
  document.cookie = "refreshToken=; max-age=0; path=/; secure; samesite=strict";
  
  // 로컬 스토리지나 세션 스토리지도 정리 (필요한 경우)
  localStorage.clear();
  sessionStorage.clear();
  
  // 홈페이지로 리다이렉트
  window.location.href = "/";
};
