// 사용자 정보 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  marketingConsent: boolean;
  newsletterConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

// 토큰 정보 타입
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

// 로그인 폼 데이터 타입
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터 타입
export interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  marketingConsent: boolean;
  newsletterConsent: boolean;
}

// API 에러 타입
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
