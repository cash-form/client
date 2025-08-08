
// 토큰 정보 타입
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

// 로그인 폼 데이터
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터
export interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  marketingConsent: boolean;
  newsletterConsent: boolean;
}

// 에러 응답 타입
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
