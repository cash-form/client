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
  title: string;
  startDate: string;
  endDate: string;
  header: HeaderFooterDto;
  questions: QuestionDto[];
  footer: HeaderFooterDto;
  product: number;
}
