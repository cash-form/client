export type QuestionType =
  | "multiple"
  | "subjective"
  | "descriptive"
  | "ox"
  | "point";

export const questionTypeToNumber = {
  multiple: 1,
  subjective: 2,
  descriptive: 3,
  ox: 4,
  point: 5,
} as const;

export const convertQuestionType = (type: QuestionType): number => {
  return questionTypeToNumber[type];
};

export type Product = 1 | 2 | 3 | 4;

export const productToString = {
  1: "basic",
  2: "deluxe",
  3: "premium",
  4: "professional",
} as const;

export interface ContentSection {
  text: string;
  images: File[];
}

interface BaseQuestion {
  type: QuestionType;
  title: string;
  text: string;
  images: File[];
  options: string[];
  multipleCount: number;
  maxLength: number;
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

export interface FormState {
  title: string;
  startDate: string;
  endDate: string;
  header: ContentSection;
  questions: Question[];
  footer: ContentSection;
  product: Product;
}

export interface QuestionTypeInfo {
  type: QuestionType;
  name: string;
  icon: string;
}
