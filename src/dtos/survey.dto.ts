import {
  Product,
  QuestionType,
  questionTypeToNumber,
  convertQuestionType,
} from "src/types/survey";

export interface HeaderFooterDto {
  text: string;
  images: string[];
}

export interface QuestionDto {
  type: number;
  title: string;
  text: string;
  images: string[];
  options: string[];
  multipleCount: number;
  maxLength: number;
}

// 요청 DTO
export interface SurveyFormDto {
  product: Product;
  title: string;
  startDate: string;
  endDate: string;
  header: HeaderFooterDto;
  questions: QuestionDto[];
  footer: HeaderFooterDto;
}

// 응답 DTO
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
  footer: HeaderFooterDto;
  questions: QuestionDto[];
}
