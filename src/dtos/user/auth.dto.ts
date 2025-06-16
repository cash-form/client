// 로그인 Request DTO
export interface LoginRequestDto {
  email: string;
  password: string;
}

// 회원가입 Request DTO
export interface RegisterRequestDto {
  nickname: string;
  email: string;
  password: string;
  marketingConsent: boolean;
  newsletterConsent: boolean;
}

// 토큰 갱신 Request DTO
export interface RefreshTokenRequestDto {
  refreshToken: string;
}

// 인증 Response DTO (로그인, 회원가입, 토큰 갱신 공통)
export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

// 로그인 Response DTO
export type LoginResponseDto = AuthResponseDto;

// 회원가입 Response DTO
export type RegisterResponseDto = AuthResponseDto;

// 토큰 갱신 Response DTO
export type RefreshTokenResponseDto = AuthResponseDto;
