import { Product } from "src/types/survey";

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

export interface SurveyFormDto {
  product: Product;
  title: string;
  startDate: string;
  endDate: string;
  header: HeaderFooterDto;
  questions: QuestionDto[];
  footer: HeaderFooterDto;
}
