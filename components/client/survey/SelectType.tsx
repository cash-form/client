"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Question, QuestionType } from "src/types/survey";
import { PlanConfig } from "src/config/plan.config";
import { Button } from "src/components/ui/button";
import QuestionForm from "./QuestionForm";
import QuestionTypeSelector from "./QuestionTypeSelector";
import { questionTypes } from "src/config/survey.config";
import Swal from "sweetalert2";

interface SelectTypeProps {
  questions: Question[];
  onQuestionAdd: (questions: Question[]) => void;
  planConfig: PlanConfig;
  currentQuestionCount: number;
  totalUsedImages: number;
  maxTotalImages: number;
}

export default function SelectType({
  questions,
  onQuestionAdd,
  planConfig,
  currentQuestionCount,
  totalUsedImages,
  maxTotalImages,
}: SelectTypeProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const [previousQuestionCount, setPreviousQuestionCount] = useState(
    questions.length
  );

  // 질문이 추가될 때마다 마지막 질문으로 스크롤
  useEffect(() => {
    if (
      questions.length > previousQuestionCount &&
      questionsContainerRef.current
    ) {
      // 새 질문이 추가된 경우
      setTimeout(() => {
        const lastQuestionElement =
          questionsContainerRef.current?.lastElementChild;
        if (lastQuestionElement) {
          lastQuestionElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 100); // DOM 업데이트 후 스크롤
    }
    setPreviousQuestionCount(questions.length);
  }, [questions.length, previousQuestionCount]);

  // 질문 추가
  const handleQuestionAdd = useCallback(
    (type: QuestionType) => {
      if (
        planConfig.maxQuestions > 0 &&
        currentQuestionCount >= planConfig.maxQuestions
      ) {
        Swal.fire({
          title: "문항 수 제한",
          text: `현재 요금제에서는 최대 ${planConfig.maxQuestions}개의 문항만 추가할 수 있습니다.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "요금제 변경",
          cancelButtonText: "확인",
        });
        return;
      }

      const newId = Math.random().toString(36).substr(2, 9);

      let newQuestion: Question;

      switch (type) {
        case "multiple":
          newQuestion = {
            id: newId,
            type: "multiple",
            title: "",
            text: "",
            images: [],
            options: ["", ""],
            multipleCount: 1,
            maxLength: 0,
          };
          break;
        case "subjective":
          newQuestion = {
            id: newId,
            type: "subjective",
            title: "",
            text: "",
            images: [],
            options: [] as never[],
            multipleCount: 0,
            maxLength: 30,
          };
          break;
        case "descriptive":
          newQuestion = {
            id: newId,
            type: "descriptive",
            title: "",
            text: "",
            images: [],
            options: [] as never[],
            multipleCount: 0,
            maxLength: 1000,
          };
          break;
        case "ox":
          newQuestion = {
            id: newId,
            type: "ox",
            title: "",
            text: "",
            images: [],
            options: [] as never[],
            multipleCount: 0,
            maxLength: 0,
          };
          break;
        case "point":
          newQuestion = {
            id: newId,
            type: "point",
            title: "",
            text: "",
            images: [],
            options: ["1", "2", "3", "4", "5"],
            multipleCount: 0,
            maxLength: 0,
          };
          break;
        default:
          return;
      }

      const newQuestions = [...questions, newQuestion];
      onQuestionAdd(newQuestions);
    },
    [questions, onQuestionAdd, planConfig.maxQuestions, currentQuestionCount]
  );

  // 질문 수정
  const handleQuestionChange = useCallback(
    (index: number, updatedQuestion: Question) => {
      const newQuestions = [...questions];
      newQuestions[index] = updatedQuestion;
      onQuestionAdd(newQuestions);
    },
    [questions, onQuestionAdd]
  );

  // 질문 삭제
  const handleQuestionDelete = useCallback(
    (index: number) => {
      Swal.fire({
        title: "문항을 삭제하시겠습니까?",
        text: "삭제된 문항은 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          const newQuestions = questions.filter((_, i) => i !== index);
          onQuestionAdd(newQuestions);
        }
      });
    },
    [questions, onQuestionAdd]
  );

  // 드래그 앤 드롭 처리
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q) => q.id === over.id);

        const newQuestions = arrayMove(questions, oldIndex, newIndex);
        onQuestionAdd(newQuestions);
      }
    },
    [questions, onQuestionAdd]
  );

  // 요금제별 제한사항을 PlanLimit 형태로 변환
  const planLimits = {
    maxImagesPerSection: 999, // 섹션별 제한 없음
    maxOptionsPerQuestion: 6,
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              질문 설정
            </h3>
            <p className="text-gray-600">질문을 추가하고 순서를 조정하세요</p>
          </div>
          {planConfig.maxQuestions > 0 && (
            <div className="text-right">
              <span className="text-sm text-gray-500">문항 수</span>
              <div className="text-2xl font-semibold text-blue-600">
                {currentQuestionCount} / {planConfig.maxQuestions}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 md:gap-8">
        {/* 질문 유형 선택 */}
        <div className="w-fit md:w-64 shrink-0 sticky top-4 self-start">
          <QuestionTypeSelector
            questionTypes={questionTypes}
            onQuestionAdd={handleQuestionAdd}
            disabled={
              planConfig.maxQuestions > 0 &&
              currentQuestionCount >= planConfig.maxQuestions
            }
          />
        </div>

        {/* 질문 목록 */}
        <div className="flex-1">
          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <h4 className="text-lg font-medium mb-2">질문을 추가해주세요</h4>
              <p className="text-sm">
                왼쪽에서 원하는 질문 유형을 선택하여 설문을 만들어보세요
              </p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <div ref={questionsContainerRef} className="space-y-4">
                  {questions.map((question, index) => (
                    <QuestionForm
                      key={question.id}
                      type={question.type}
                      number={index + 1}
                      onDelete={() => handleQuestionDelete(index)}
                      onChange={(updatedQuestion) =>
                        handleQuestionChange(index, updatedQuestion)
                      }
                      initialData={question}
                      data-id={question.id}
                      planLimits={planLimits}
                      totalUsedImages={totalUsedImages}
                      maxTotalImages={maxTotalImages}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}
