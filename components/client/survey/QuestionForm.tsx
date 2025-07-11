"use client";

import { useState, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import QuestionNumber from "./QuestionNumber";
import { QUESTION_TYPE_LABELS } from "../../../src/config/survey.config";
import ImageUploader from "./ImageUploader";
import MultipleChoiceOptions from "./MultipleChoiceOptions";
import Swal from "sweetalert2";
import { Question, QuestionType, PlanLimit } from "../../../src/types/survey";
import { ImageType } from "../../../src/types/image";

interface QuestionFormProps {
  type: QuestionType;
  number: number;
  onDelete: () => void;
  onChange: (data: Question) => void;
  initialData: Question;
  "data-id"?: string;
  planLimits: PlanLimit;
}

export default function QuestionForm({
  type,
  number,
  onDelete,
  onChange,
  initialData,
  "data-id": dataId,
  planLimits,
}: QuestionFormProps) {
  // 드래그앤드롭
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: initialData.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [questionData, setQuestionData] = useState<Question>({
    id: initialData.id,
    type,
    title: initialData.title,
    text: initialData.text,
    images: initialData.images,
    options: initialData.options,
    multipleCount: initialData.multipleCount,
    maxLength: initialData.maxLength,
  } as Question);

  const handleChange = (updates: Partial<Question>) => {
    const newData = { ...questionData, ...updates } as Question;
    setQuestionData(newData);
    onChange(newData);
  };

  // 옵션 수정
  const handleOptionChange = (index: number, value: string) => {
    if (value.length > 8 && type === "multiple") {
      Swal.fire({
        title: "항목은 8자를 초과할 수 없습니다.",
        icon: "error",
      });
      return;
    }

    const newOptions = [...questionData.options];
    newOptions[index] = value;
    handleChange({ options: newOptions });
  };
  // 옵션 추가
  const addOption = () => {
    if (questionData.options.length >= planLimits.maxOptionsPerQuestion) {
      Swal.fire({
        title: `최대 ${planLimits.maxOptionsPerQuestion}개까지만 추가할 수 있습니다.`,
        icon: "error",
      });
      return;
    }
    handleChange({ options: [...questionData.options, ""] });
  };
  // 옵션 삭제
  const removeOption = (index: number) => {
    if (questionData.options.length <= 2) {
      Swal.fire({
        title: "최소 2개의 항목이 필요합니다.",
        icon: "error",
      });
      return;
    }
    const newOptions = questionData.options.filter((_, i) => i !== index);
    handleChange({ options: newOptions });
  };

  const handleTitleChange = (value: string) => {
    if (value.length > 50) {
      Swal.fire({
        title: "제목은 50자를 초과할 수 없습니다.",
        icon: "error",
      });
      return;
    }
    handleChange({ title: value });
  };

  const handleDescriptionChange = (value: string) => {
    if (value.length > 200) {
      Swal.fire({
        title: "설명은 200자를 초과할 수 없습니다.",
        icon: "error",
      });
      return;
    }
    handleChange({ text: value });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-id={dataId}
      className={`relative p-6 border rounded-lg bg-background ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div
            className="cursor-move flex items-center gap-2"
            {...attributes}
            {...listeners}
          >
            <FontAwesomeIcon
              icon={faGripVertical}
              className="text-gray-400 text-lg"
            />
            <QuestionNumber number={number} isDragging={isDragging} />
          </div>
          <h3 className="text-lg font-medium">{QUESTION_TYPE_LABELS[type]}</h3>
        </div>
        <button
          onClick={onDelete}
          className="text-foreground cursor-pointer p-2"
          type="button"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {type === "point" ? (
        <>
          <input
            type="text"
            value={questionData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="질문 제목을 입력하세요 (최대 50자)"
            className="w-full p-3 border rounded-lg mb-4"
            maxLength={50}
          />
          <textarea
            value={questionData.text}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="질문 내용을 입력하세요 (최대 200자)"
            className="w-full p-3 border rounded-lg mb-4"
            rows={3}
            maxLength={200}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            value={questionData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="질문 제목을 입력하세요 (최대 50자)"
            className="w-full p-3 border rounded-lg mb-4"
            maxLength={50}
          />
          <textarea
            value={questionData.text}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="질문 내용을 입력하세요 (최대 200자)"
            className="w-full p-3 border rounded-lg mb-4"
            rows={3}
            maxLength={200}
          />
        </>
      )}

      {type !== "point" && (
        <div className="mb-4">
          <ImageUploader
            images={questionData.images}
            onChange={(images) => handleChange({ images })}
            id={`question-image-${initialData.id}`}
            imageType={ImageType.SURVEY}
            maxImages={planLimits.maxImagesPerSection}
          />
        </div>
      )}

      {type === "multiple" && (
        <MultipleChoiceOptions
          options={questionData.options}
          multipleCount={questionData.multipleCount}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
