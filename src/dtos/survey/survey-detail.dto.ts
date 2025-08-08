import { ProductId } from "src/types/survey";
import { SurveyAuthor } from "src/types/user";

// 설문 상세 조회 응답
export interface SurveyDetailResponseDto {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  product: ProductId;
  credit?: number;
  createdAt: string;
  updatedAt: string;
  author: SurveyAuthor & { credit: string }; // 상세페이지에서는 credit 추가
  participantCount: number;
  headers: {
    id: number;
    type: number;
    text: string;
    images: string[];
  };
  footers: {
    id: number;
    type: number;
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

// 설문 응답 제출 관련
export interface SurveyAnswerDto {
  questionId: number;
  selectedOptions?: string[];
  textAnswer?: string;
  pointValue?: number;
}

export interface SurveySubmissionDto {
  surveyId: number;
  answers: SurveyAnswerDto[];
}

export interface SurveySubmissionResponseDto {
  success: boolean;
  message: string;
}