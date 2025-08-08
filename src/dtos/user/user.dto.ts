import { User } from "src/types/user";

// 사용자 정보 DTO
export interface UserDto {
  id: number;
  email: string;
  nickname: string;
  status: number;
  userType: number;
  credit: number;
}

// User 타입으로 변환
export const toUserType = (dto: UserDto): User => dto;
