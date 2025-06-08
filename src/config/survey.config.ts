import { QuestionTypeInfo } from "../types/survey";

export const questionTypes: QuestionTypeInfo[] = [
  {
    type: "multiple",
    name: "객관식",
    icon: "☑️",
  },
  {
    type: "subjective",
    name: "주관식",
    icon: "✏️",
  },
  {
    type: "descriptive",
    name: "서술형",
    icon: "📝",
  },
  {
    type: "ox",
    name: "O/X",
    icon: "⭕",
  },
  {
    type: "point",
    name: "포인트",
    icon: "⭐",
  },
];

export const QUESTION_TYPE_LABELS = {
  multiple: "객관식 질문",
  subjective: "주관식 질문",
  descriptive: "서술형 질문",
  ox: "O/X 질문",
  point: "포인트 질문",
} as const;
