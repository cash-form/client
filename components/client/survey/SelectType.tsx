"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { questionTypes } from "src/config/survey.config";
import QuestionForm from "./QuestionForm";
import QuestionTypeSelector from "./QuestionTypeSelector";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Question, QuestionType } from "../../../src/types/survey";

interface SelectTypeProps {
  onQuestionAdd: (questions: Question[]) => void;
}

export default function SelectType({ onQuestionAdd }: SelectTypeProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // questions 추가되거나 삭제되면 부모에게 전달
  useEffect(() => {
    onQuestionAdd(questions);
  }, [questions, onQuestionAdd]);

  // 새로 추가된 질문이 있을때 마다 최신 질문에 스크롤
  useEffect(() => {
    if (lastAddedId && questionsRef.current) {
      const questionElement = questionsRef.current.querySelector(
        `[data-id="${lastAddedId}"]`
      );
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: "smooth", block: "center" });
        setLastAddedId(null);
      }
    }
  }, [lastAddedId]);

  // 고유 아이디 생성해서 유니크값
  const generateQuestionId = useCallback(() => {
    return `question-${Date.now()}-${nextIdRef.current++}`;
  }, []);

  // 질문 추가

  const handleQuestionAdd = useCallback(
    (type: QuestionType) => {
      const newId = generateQuestionId();
      const newQuestion = {
        id: newId,
        type,
        title: "",
        text: "",
        images: [],
        options: type === "multiple" ? ["", ""] : [],
        multipleCount: type === "multiple" ? 1 : 0,
        maxLength:
          type === "subjective" ? 30 : type === "descriptive" ? 1000 : 0,
      } as Question;

      setQuestions((prev) => [...prev, newQuestion]);
      setLastAddedId(newId);
    },
    [generateQuestionId]
  );
  // 질문 삭제
  const handleQuestionDelete = useCallback((index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }, []);
  // 질문 수정
  const handleQuestionChange = useCallback(
    (index: number, data: Partial<Question>) => {
      setQuestions((prev) => {
        const newQuestions = [...prev];
        const currentQuestion = newQuestions[index];
        newQuestions[index] = { ...currentQuestion, ...data } as Question;
        return newQuestions;
      });
    },
    []
  );
  // 질문 순서 변경
  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  return (
    <div className="flex gap-6">
      {/* 질문선택 */}
      <QuestionTypeSelector
        questionTypes={questionTypes}
        onQuestionAdd={handleQuestionAdd}
      />

      {/* 추가된 질문 리스트 */}
      <div className="flex-1">
        {questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            왼쪽에서 질문 유형을 선택하여 추가해주세요
          </div>
        ) : (
          // 드래그앤드롭
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4" ref={questionsRef}>
                {questions.map((question, index) => (
                  <QuestionForm
                    key={question.id}
                    type={question.type}
                    number={index + 1}
                    initialData={question}
                    onDelete={() => handleQuestionDelete(index)}
                    onChange={(data) => handleQuestionChange(index, data)}
                    data-id={question.id}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
