interface FormImage {
  id: string;
  url: string;
}

interface Question {
  type: "multiple" | "subjective" | "descriptive" | "ox" | "point";
  title: string;
  text: string;
  images: FormImage[];
  options?: string[];
  multipleCount?: number;
  maxLength?: number;
}
interface QuestionType {
  type: Question["type"];
  name: string;
  icon: string;
}
export const questionTypes: QuestionType[] = [
  { type: "multiple", name: "객관식", icon: "✅" },
  { type: "subjective", name: "주관식", icon: "✍️" },
  { type: "descriptive", name: "서술형", icon: "📝" },
  { type: "ox", name: "O/X", icon: "🙆‍♀️" },
  { type: "point", name: "포인트", icon: "⭐️" },
];
