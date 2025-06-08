export type QuestionType =
  | "multiple"
  | "subjective"
  | "descriptive"
  | "ox"
  | "point";

export type Product = "basic" | "deluxe" | "premium" | "professional";

interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  text: string;
  images: File[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple";
  options: string[];
  multipleCount: number;
  maxLength: 0;
}

export interface SubjectiveQuestion extends BaseQuestion {
  type: "subjective";
  options: never[];
  multipleCount: 0;
  maxLength: 30;
}

export interface DescriptiveQuestion extends BaseQuestion {
  type: "descriptive";
  options: never[];
  multipleCount: 0;
  maxLength: 1000;
}

export interface OXQuestion extends BaseQuestion {
  type: "ox";
  options: never[];
  multipleCount: 0;
  maxLength: 0;
}

export interface PointQuestion extends BaseQuestion {
  type: "point";
  options: string[];
  multipleCount: 0;
  maxLength: 0;
}

export type Question =
  | MultipleChoiceQuestion
  | SubjectiveQuestion
  | DescriptiveQuestion
  | OXQuestion
  | PointQuestion;

interface ContentSection {
  text: string;
  images: File[];
}

export interface SurveyFormData {
  product: Product;
  title: string;
  startDate: string;
  endDate: string;
  header: ContentSection;
  questions: Question[];
  footer: ContentSection;
}

export interface QuestionTypeInfo {
  type: QuestionType;
  name: string;
  icon: string;
}
