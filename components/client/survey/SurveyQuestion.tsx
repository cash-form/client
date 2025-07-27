"use client";

import { useState } from "react";
import Image from "next/image";
import { SurveyAnswer } from "src/types/survey-detail";

interface SurveyQuestionProps {
  question: {
    id: number;
    type: number;
    title: string;
    text: string;
    images: string[];
    options: string[];
    multipleCount: number;
    maxLength: number;
  };
  questionIndex: number;
  onAnswerChange: (answer: SurveyAnswer) => void;
}

export default function SurveyQuestion({
  question,
  questionIndex,
  onAnswerChange,
}: SurveyQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [pointValue, setPointValue] = useState<number>(0);

  const handleOptionSelect = (option: string) => {
    let newSelected: string[];

    if (question.type === 1) {
      // Multiple choice
      if (question.multipleCount === 1) {
        // Single select
        newSelected = [option];
      } else {
        // Multiple select
        if (selectedOptions.includes(option)) {
          newSelected = selectedOptions.filter((item) => item !== option);
        } else if (selectedOptions.length < question.multipleCount) {
          newSelected = [...selectedOptions, option];
        } else {
          return; // Max selections reached
        }
      }
      setSelectedOptions(newSelected);
      onAnswerChange({
        questionId: question.id,
        selectedOptions: newSelected,
      });
    } else if (question.type === 4) {
      // OX Question
      newSelected = [option];
      setSelectedOptions(newSelected);
      onAnswerChange({
        questionId: question.id,
        selectedOptions: newSelected,
      });
    }
  };

  const handleTextChange = (value: string) => {
    if (value.length <= question.maxLength) {
      setTextAnswer(value);
      onAnswerChange({
        questionId: question.id,
        textAnswer: value,
      });
    }
  };

  const handlePointChange = (value: number) => {
    setPointValue(value);
    onAnswerChange({
      questionId: question.id,
      pointValue: value,
    });
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 1: // Multiple choice
        return (
          <div className="space-y-3">
            {question.options &&
              question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedOptions.includes(option)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type={question.multipleCount === 1 ? "radio" : "checkbox"}
                    name={`question-${questionIndex}`}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionSelect(option)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            {question.multipleCount > 1 && (
              <p className="text-sm text-gray-500">
                최대 {question.multipleCount}개까지 선택 가능
              </p>
            )}
          </div>
        );

      case 2: // Subjective (short text)
      case 3: // Descriptive (long text)
        return (
          <div>
            {question.type === 2 ? (
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="답변을 입력해주세요"
                maxLength={question.maxLength}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <textarea
                value={textAnswer}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="답변을 입력해주세요"
                maxLength={question.maxLength}
                rows={4}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              />
            )}
            <p className="text-sm text-gray-500 mt-1">
              {textAnswer.length}/{question.maxLength}자
            </p>
          </div>
        );

      case 4: // OX Question
        return (
          <div className="flex gap-4">
            {["O", "X"].map((option) => (
              <label
                key={option}
                className={`flex-1 p-4 border-2 rounded-lg cursor-pointer text-center font-bold text-2xl transition-colors ${
                  selectedOptions.includes(option)
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionSelect(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 5: // Point scale
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">1점 (매우 불만족)</span>
              <span className="text-sm text-gray-500">5점 (매우 만족)</span>
            </div>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((point) => (
                <label
                  key={point}
                  className={`w-12 h-12 border-2 rounded-full cursor-pointer flex items-center justify-center font-bold transition-colors ${
                    pointValue === point
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={pointValue === point}
                    onChange={() => handlePointChange(point)}
                    className="sr-only"
                  />
                  {point}
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-red-500">지원하지 않는 질문 형식입니다.</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Q{questionIndex + 1}. {question.title}
        </h3>
        {question.text && <p className="text-gray-700 mb-4">{question.text}</p>}
      </div>

      {question.images && question.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden bg-gray-100"
            >
              <Image
                src={imageUrl}
                alt={`Question image ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}

      {renderQuestionContent()}
    </div>
  );
}
