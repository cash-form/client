"use client";

import Swal from "sweetalert2";
import { FormState } from "../../../src/types/survey";

interface SurveyFooterProps {
  formData: Pick<FormState, "footer">;
  onChange: (data: Partial<Pick<FormState, "footer">>) => void;
}

export default function SurveyFooter({
  formData,
  onChange,
}: SurveyFooterProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...formData.footer.images, ...newFiles];

      if (totalFiles.length > 2) {
        alert("이미지는 최대 2장까지만 첨부 가능합니다.");
        e.target.value = "";
        return;
      }

      onChange({
        footer: {
          ...formData.footer,
          images: totalFiles,
        },
      });
    }
    e.target.value = "";
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...formData.footer.images];
    newImages.splice(index, 1);
    onChange({
      footer: {
        ...formData.footer,
        images: newImages,
      },
    });
  };

  return (
    <div className="rounded-lg border p-4">
      <label className="block text-sm font-medium mb-2">마지막 안내문</label>
      <textarea
        onChange={(e) =>
          onChange({
            footer: {
              ...formData.footer,
              text: e.target.value,
            },
          })
        }
        className="w-full p-3 border rounded-lg h-24"
        placeholder="설문조사 완료 후 안내사항을 입력하세요 (최대 1000자)"
        maxLength={1000}
        value={formData.footer.text}
      />

      <div className="mt-3">
        <label className="block text-sm font-medium mb-2">
          이미지 (최대 2장)
        </label>
        <div className="space-y-2">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="footer-image-upload"
              multiple
            />
            <label
              htmlFor="footer-image-upload"
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer ${
                formData.footer.images.length >= 2
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span className="text-xl">📷</span>
              <span className="text-sm font-medium">
                {formData.footer.images.length >= 2
                  ? "이미지 최대 개수 도달"
                  : "이미지 추가"}
              </span>
            </label>
          </div>
          <div className="mt-2 space-y-2">
            {formData.footer.images.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm text-foreground/50 bg-gray-50 p-2 rounded"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => handleImageDelete(index)}
                  className="text-warning hover:text-warning/80"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
