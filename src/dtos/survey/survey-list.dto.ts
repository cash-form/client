export interface SurveyAuthorDto {
  id: number;
  nickname: string;
  userType: number;
}

export interface SurveyItemDto {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  product: number | null;
  createdAt: string;
  updatedAt: string;
  author: SurveyAuthorDto;
  participantCount: number;
  status: number;
  authorId: number;
  isDeleted: boolean;
}

export interface SurveyListResponseDto {
  list: SurveyItemDto[];
  total: number;
  page: number;
  size: number;
}

export interface SurveyListRequestDto {
  page?: number;
  size?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  keyword?: string;
}
