import { Product } from "src/types/survey";
import { SurveyAuthor } from "src/types/user";
import { PaginationRequest, PaginationResponse, SortRequest, SearchRequest } from "src/types/common";

// 설문 목록 아이템
export interface SurveyItemDto {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
  author: SurveyAuthor;
  participantCount: number;
  status: number;
  authorId: number;
  isDeleted: boolean;
}

// 설문 목록 응답
export type SurveyListResponseDto = PaginationResponse<SurveyItemDto>;

// 설문 목록 요청
export type SurveyListRequestDto = PaginationRequest & SortRequest & SearchRequest;
