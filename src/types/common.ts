// 기본 엔티티 타입
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationRequest {
  page?: number;
  size?: number;
}

export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

export interface SortRequest {
  sort?: string;
  order?: "ASC" | "DESC";
}

export interface SearchRequest {
  keyword?: string;
}

// 공통 API 응답
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}