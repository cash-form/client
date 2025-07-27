"use client";

import { useState, useEffect, useMemo } from "react";
import { FormState } from "src/types/survey";
import { PlanConfig } from "src/config/plan.config";
import { ImageType } from "src/types/image";
import ImageUploader from "./ImageUploader";
import Swal from "sweetalert2";

interface BasicSettingsProps {
  formData: FormState;
  onChange: (data: Partial<FormState>) => void;
  planConfig: PlanConfig;
  totalUsedImages: number;
}

export default function BasicSettings({
  formData,
  onChange,
  planConfig,
  totalUsedImages,
}: BasicSettingsProps) {
  const [title, setTitle] = useState(formData.title);
  const [startDate, setStartDate] = useState(formData.startDate);
  const [endDate, setEndDate] = useState(formData.endDate);
  const [headerText, setHeaderText] = useState(formData.header.text);
  const [headerImages, setHeaderImages] = useState<string[]>(
    formData.header.images
  );

  const maxTextLength = planConfig.maxQuestions <= 20 ? 500 : 2000;

  const minDateTime = useMemo(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }, []);

  const handleStartDateChange = (value: string) => {
    const selectedDate = new Date(value);
    const now = new Date();

    if (selectedDate < now) {
      Swal.fire({
        title: "날짜 선택 오류",
        text: "시작일은 현재 시간보다 이전으로 설정할 수 없습니다.",
        icon: "warning",
      });
      return;
    }

    if (endDate && new Date(endDate) <= selectedDate) {
      setEndDate("");
      Swal.fire({
        title: "종료일 초기화",
        text: "시작일이 변경되어 종료일을 다시 선택해주세요.",
        icon: "info",
      });
    }

    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    if (!startDate) {
      Swal.fire({
        title: "시작일 선택 필요",
        text: "종료일을 선택하기 전에 시작일을 먼저 선택해주세요.",
        icon: "warning",
      });
      return;
    }

    const selectedEndDate = new Date(value);
    const selectedStartDate = new Date(startDate);

    if (selectedEndDate <= selectedStartDate) {
      Swal.fire({
        title: "날짜 선택 오류",
        text: "종료일은 시작일보다 이후로 설정해야 합니다.",
        icon: "warning",
      });
      return;
    }

    setEndDate(value);
  };

  useEffect(() => {
    onChange({
      title,
      startDate,
      endDate,
      header: {
        text: headerText,
        images: headerImages,
      },
    });
  }, [title, startDate, endDate, headerText, headerImages, onChange]);

  return (
    <div
      className="rounded-xl border p-8"
      style={{
        backgroundColor: "var(--color-white)",
        borderColor: "color-mix(in srgb, var(--color-gray) 20%, transparent)",
      }}
    >
      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: "var(--color-gray)" }}
        >
          기본 설정
        </h3>
        <p
          style={{
            color: "color-mix(in srgb, var(--color-gray) 60%, transparent)",
          }}
        >
          설문조사의 기본 정보를 입력해주세요
        </p>
      </div>

      <div className="space-y-6">
        {/* 설문조사 제목 */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{
              color: "color-mix(in srgb, var(--color-gray) 70%, transparent)",
            }}
          >
            설문조사 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="설문조사 제목을 입력하세요"
            maxLength={100}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
            style={
              {
                borderColor:
                  "color-mix(in srgb, var(--color-gray) 30%, transparent)",
                "--tw-ring-color": "var(--color-blue)",
              } as React.CSSProperties
            }
          />
          <div
            className="text-xs mt-1"
            style={{
              color: "color-mix(in srgb, var(--color-gray) 50%, transparent)",
            }}
          >
            {title.length}/100자
          </div>
        </div>

        {/* 설문 기간 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{
                color: "color-mix(in srgb, var(--color-gray) 70%, transparent)",
              }}
            >
              시작일
            </label>
            <input
              type="datetime-local"
              value={startDate}
              min={minDateTime}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={
                {
                  borderColor:
                    "color-mix(in srgb, var(--color-gray) 30%, transparent)",
                  "--tw-ring-color": "var(--color-blue)",
                } as React.CSSProperties
              }
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{
                color: "color-mix(in srgb, var(--color-gray) 70%, transparent)",
              }}
            >
              종료일
            </label>
            <input
              type="datetime-local"
              value={endDate}
              min={startDate || minDateTime}
              onChange={(e) => handleEndDateChange(e.target.value)}
              disabled={!startDate}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={
                {
                  borderColor:
                    "color-mix(in srgb, var(--color-gray) 30%, transparent)",
                  backgroundColor: !startDate
                    ? "color-mix(in srgb, var(--color-gray) 10%, transparent)"
                    : "transparent",
                  cursor: !startDate ? "not-allowed" : "text",
                  "--tw-ring-color": "var(--color-blue)",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* 헤더 텍스트 */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{
              color: "color-mix(in srgb, var(--color-gray) 70%, transparent)",
            }}
          >
            질문 전 안내사항, 요구사항, 주의사항을 서술해주세요
          </label>
          <textarea
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            placeholder="설문조사 상단에 표시될 설명을 입력하세요"
            maxLength={maxTextLength}
            rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none"
            style={
              {
                borderColor:
                  "color-mix(in srgb, var(--color-gray) 30%, transparent)",
                "--tw-ring-color": "var(--color-blue)",
              } as React.CSSProperties
            }
          />
          <div
            className="text-xs mt-1"
            style={{
              color: "color-mix(in srgb, var(--color-gray) 50%, transparent)",
            }}
          >
            {headerText.length}/{maxTextLength}자
          </div>
        </div>

        {/* 헤더 이미지 */}
        {planConfig.maxImages > 0 ? (
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{
                color: "color-mix(in srgb, var(--color-gray) 70%, transparent)",
              }}
            >
              설문조사 요구사항에 보일 이미지를 선택해주세요.
            </label>
            <ImageUploader
              images={headerImages}
              onChange={setHeaderImages}
              imageType={ImageType.SURVEY}
              id="header-image-upload"
              totalUsedImages={totalUsedImages}
              maxTotalImages={planConfig.maxImages}
            />
            <div
              className="text-xs mt-1"
              style={{
                color: "color-mix(in srgb, var(--color-gray) 50%, transparent)",
              }}
            >
              전체 설문조사에서 최대 {planConfig.maxImages}개까지 업로드 가능
            </div>
          </div>
        ) : (
          <div
            className="p-4 border rounded-lg"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-amber) 5%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--color-amber) 20%, transparent)",
            }}
          >
            <p
              className="text-sm"
              style={{
                color:
                  "color-mix(in srgb, var(--color-amber) 70%, var(--color-gray) 30%)",
              }}
            >
              💡 현재 요금제에서는 이미지를 사용할 수 없습니다.
              <br />
              이미지 기능을 사용하려면 DELUXE 이상의 요금제를 선택해주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
