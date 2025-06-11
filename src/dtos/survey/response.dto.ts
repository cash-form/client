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
