interface PageUrlConfigType {
  [key: string]: string;
}

export const PageUrlConfig: PageUrlConfigType = {
  HOME: "/",
  LOGIN: "/login",
  NOTICE: "/notice",
  SURVEYS: "/surveys",
  SURVEY_DETAIL: "/surveys/*", // 설문조사 상세 페이지 (user only)
  SUPPORT: "/support",
  SIGN_UP: "/signup",
  REGISTER: "/surveys/register",
  PLANS: "/plans",
  ADMIN: "/admin",
};

// 미들웨어에서 사용할 접근 권한 설정
export const AccessPaths = {
  guest: [
    PageUrlConfig.HOME,
    PageUrlConfig.LOGIN,
    PageUrlConfig.SIGN_UP,
    PageUrlConfig.SURVEYS, // 설문조사 목록만 (상세는 미들웨어에서 별도 처리)
    PageUrlConfig.PLANS,
    PageUrlConfig.NOTICE,
    PageUrlConfig.SUPPORT,
  ],
  user: [
    PageUrlConfig.HOME,
    PageUrlConfig.SURVEYS, // 설문조사 목록
    PageUrlConfig.SURVEY_DETAIL, // 설문조사 상세 (user만)
    PageUrlConfig.PLANS,
    PageUrlConfig.NOTICE,
    PageUrlConfig.SUPPORT,
    PageUrlConfig.REGISTER,
    PageUrlConfig.ADMIN,
  ],
} as const;
