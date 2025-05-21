import TokenDto from "src/dtos/user/token.dto";

// 서버 응답 에러 타입 정의
export interface ApiErrorResponse {
  message: string;
  status?: number;
  details?: Record<string, string>;
  response?: ServerErrorResponse;
}

// 서버 응답 에러 타입 정의
export interface ServerErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

// 토큰 저장 함수
export const saveTokens = ({ accessToken, refreshToken }: TokenDto) => {
  document.cookie = `accessToken=${accessToken}; Path=/; Max-Age=86400; Secure; SameSite=Strict`;
  document.cookie = `refreshToken=${refreshToken}; Path=/; Max-Age=604800; Secure; SameSite=Strict`;
};

export const getAccessToken = () => {
  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match ? match[1] : null;
};

export const getRefreshToken = () => {
  const match = document.cookie.match(/refreshToken=([^;]+)/);
  return match ? match[1] : null;
};
