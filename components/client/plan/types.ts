import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Product } from "src/types/survey";

export interface PlanUIConfig {
  color: string;
  icon: IconDefinition;
}

export interface PlanDisplayData {
  price: string;
  questionLimit: string;
  answerLimit: string;
  baseAnswers: string;
  extraAnswerCost: string;
  compensation: string;
  imageInsertable: string;
  shortagePayback: string;
}

export interface FeatureItemProps {
  icon: string;
  label: string;
  value: string;
}

export interface SurveyCardProps {
  planId: Product;
}

export type PlanName = "BASIC" | "DELUXE" | "PREMIUM" | "PROFESSIONAL";
