"use client";

import { QuestionType, QuestionTypeInfo } from "src/types/survey";

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
    <div className="w-fit md:w-64 shrink-0">
      <div className="space-y-2 p-4 border rounded-lg bg-background">
        <h3 className="font-semibold mb-4">질문 추가하기</h3>
        <div className="flex flex-col md:block space-y-1 md:space-y-2">
          {questionTypes.map((type) => (
            <button
              key={type.type}
              className={`w-full md:w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 border rounded-lg transition-colors text-sm md:text-base ${
                disabled
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "hover:border-primary hover:text-primary"
              }`}
              type="button"
              onClick={() => !disabled && onQuestionAdd(type.type)}
              disabled={disabled}
            >
              <span className="text-base md:text-lg">{type.icon}</span>
              <span className="text-xs md:text-sm font-medium">
                {type.name}
              </span>
              <span className="ml-auto text-gray-400 text-xs md:text-sm">
                +
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
