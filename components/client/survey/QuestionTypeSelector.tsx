"use client";

import { QuestionType, QuestionTypeInfo } from "../../../src/types/survey";

interface QuestionTypeSelectorProps {
  questionTypes: QuestionTypeInfo[];
  onQuestionAdd: (type: QuestionType) => void;
  disabled?: boolean;
}

export default function QuestionTypeSelector({
  questionTypes,
  onQuestionAdd,
  disabled = false,
}: QuestionTypeSelectorProps) {
  return (
    <div className="w-64 shrink-0">
      <div className="sticky top-4 space-y-2 p-4 border rounded-lg bg-background">
        <h3 className="font-semibold mb-4">질문 추가하기</h3>
        {questionTypes.map((type) => (
          <button
            key={type.type}
            className={`w-full flex items-center gap-3 p-3 border rounded-lg transition-colors ${
              disabled
                ? "opacity-50 cursor-not-allowed text-gray-400"
                : "hover:border-primary hover:text-primary"
            }`}
            type="button"
            onClick={() => !disabled && onQuestionAdd(type.type)}
            disabled={disabled}
          >
            <span className="text-lg">{type.icon}</span>
            <span className="text-sm font-medium">{type.name}</span>
            <span className="ml-auto text-gray-400">+</span>
          </button>
        ))}
      </div>
    </div>
  );
}
