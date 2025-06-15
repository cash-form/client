import { Product } from "../../types/survey";
import { HeaderFooterDto, QuestionDto } from "./request.dto";

interface AuthorDto {
  marketingConsent: boolean;
  newsletterConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyResponseDto {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  product: Product;
  credit: number;
  createdAt: string;
  updatedAt: string;
  author: AuthorDto;
  participantCount: number;
  header: HeaderFooterDto;
  questions: QuestionDto[];
  footer: HeaderFooterDto;
}

export class GetSurveyResponseDto {
  public readonly id: number;
  public readonly title: string;
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly product: number | null;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly author: {
    id: number;
    nickname: string;
    userType: number;
  };
  public readonly participantCount: number;
  public readonly status: number;
  public readonly authorId: number;
  public readonly isDeleted: boolean;

  constructor(data: any) {
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

  constructor(data: any) {
    this.list = data.list.map((item: any) => new GetSurveyResponseDto(item));
    this.total = data.total;
    this.page = data.page;
    this.size = data.size;
  }
}
