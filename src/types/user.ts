// 사용자 정보 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  status: number;
  userType: number;
  credit: number;
}

// 설문 작성자 정보
export interface SurveyAuthor {
  id: number;
  email: string;
  nickname: string;
  status: number;
  userType: number;
  credit: number;
}

// 사용자 상태
export const UserStatus = {
  ACTIVE: 1,
  INACTIVE: 2,
  SUSPENDED: 3
} as const;

// 사용자 타입
export const UserType = {
  GENERAL: 1,
  PREMIUM: 2,
  ADMIN: 99
} as const;

export type UserStatusValue = typeof UserStatus[keyof typeof UserStatus];
export type UserTypeValue = typeof UserType[keyof typeof UserType];