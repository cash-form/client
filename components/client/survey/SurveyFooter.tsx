"use client";

import { useState, useEffect } from "react";
import { ContentSection, FormState } from "src/types/survey";
import { PlanConfig } from "src/config/plan.config";
import { ImageType } from "src/types/image";
import ImageUploader from "./ImageUploader";

interface SurveyFooterProps {
  formData: { footer: ContentSection };
  onChange: (data: { footer: ContentSection }) => void;
  planConfig: PlanConfig;
  totalUsedImages: number;
}

export default function SurveyFooter({
  formData,
  onChange,
  planConfig,
  totalUsedImages,
}: SurveyFooterProps) {
  const [footerText, setFooterText] = useState(formData.footer.text);
  const [footerImages, setFooterImages] = useState<string[]>(
    formData.footer.images
  );

  // 텍스트 길이 제한 (BASIC은 짧게, 그 외는 충분히)
  const maxTextLength = planConfig.maxQuestions <= 20 ? 500 : 2000;

  useEffect(() => {
    onChange({
      footer: {
        text: footerText,
        images: footerImages,
      },
    });
  }, [footerText, footerImages, onChange]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">하단 설정</h3>
        <p className="text-gray-600">
          설문 후 안내사항 혹은 요구사항을 서술해주세요
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <textarea
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            placeholder="설문조사 하단에 표시될 안내사항을 입력하세요"
            maxLength={maxTextLength}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="text-xs text-gray-500 mt-1">
            {footerText.length}/{maxTextLength}자
          </div>
        </div>

        {planConfig.maxImages > 0 ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              푸터 이미지 (선택사항)
            </label>
            <ImageUploader
              images={formData.footer.images}
              onChange={(images) =>
                onChange({ footer: { ...formData.footer, images } })
              }
              id="footer-image-upload"
              imageType={ImageType.SURVEY}
              totalUsedImages={totalUsedImages}
              maxTotalImages={planConfig.maxImages}
            />
            <div className="text-xs text-gray-500 mt-1">
              전체 설문조사에서 최대 {planConfig.maxImages}개까지 업로드 가능
            </div>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              💡 현재 요금제에서는 이미지를 사용할 수 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
