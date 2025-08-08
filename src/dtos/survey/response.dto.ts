import { Product } from "src/types/survey";
import { SurveyAuthor } from "src/types/user";
import { PaginationResponse } from "src/types/common";

// 설문 상세 조회 응답
export interface SurveyResponseDto {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  product: Product;
  credit: number;
  author: SurveyAuthor;
  participantCount: number;
  header: {
    text: string;
    images: string[];
  };
  footer: {
    text: string;
    images: string[];
  };
  questions: {
    id: number;
    type: number;
    title: string;
    text: string;
    images: string[];
    options: string[];
    multipleCount: number;
    maxLength: number;
  }[];
}

// 설문 목록 아이템
interface GetSurveyResponseRawData {
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

type SurveyListResponseRawData = PaginationResponse<GetSurveyResponseRawData>;

export class GetSurveyResponseDto {
  public readonly id: number;
  public readonly title: string;
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly product: Product;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly author: SurveyAuthor;
  public readonly participantCount: number;
  public readonly status: number;
  public readonly authorId: number;
  public readonly isDeleted: boolean;

  constructor(data: GetSurveyResponseRawData) {
    this.id = data.id;
    this.title = data.title;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.product = data.product;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.author = data.author;
    this.participantCount = data.participantCount;
    this.status = data.status;
    this.authorId = data.authorId;
    this.isDeleted = data.isDeleted;
  }
}

export class SurveyListResponseDto {
  public readonly list: GetSurveyResponseDto[];
  public readonly total: number;
  public readonly page: number;
  public readonly size: number;

  constructor(data: SurveyListResponseRawData) {
    this.list = data.list.map((item: GetSurveyResponseRawData) => new GetSurveyResponseDto(item));
    this.total = data.total;
    this.page = data.page;
    this.size = data.size;
  }
}
