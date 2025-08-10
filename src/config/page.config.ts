interface PageUrlConfigType {
  [key: string]: string;
}

export const PageUrlConfig: PageUrlConfigType = {
  HOME: "/",
  NOTICE: "/notice",
  SURVEYS: "/surveys",
  SUPPORT: "/support",
  SIGN_UP: "/signup",
  REGISTER: "/surveys/register",
  PLANS: "/plans",
  COMPONENTS: "/components",
  ADMIN: "/admin",
};

// 미들웨어에서 사용할 접근 권한 설정
export const AccessPaths = {
  guest: [
    PageUrlConfig.HOME,
    PageUrlConfig.SIGN_UP,
    PageUrlConfig.SURVEYS,
    PageUrlConfig.PLANS,
    PageUrlConfig.NOTICE,
    PageUrlConfig.SUPPORT,
  ],
  user: [
    PageUrlConfig.HOME,
    PageUrlConfig.SURVEYS,
    PageUrlConfig.PLANS,
    PageUrlConfig.NOTICE,
    PageUrlConfig.SUPPORT,
    PageUrlConfig.REGISTER,
    PageUrlConfig.COMPONENTS,
    PageUrlConfig.ADMIN,
  ],
} as const;
