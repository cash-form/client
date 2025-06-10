"use client";

import Swal from "sweetalert2";

interface SurveyFormData {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  headerImages: File[];
}

interface BasicSettingsProps {
  formData: SurveyFormData;
  onChange: (data: Partial<SurveyFormData>) => void;
}

export default function BasicSettings({
  formData,
  onChange,
}: BasicSettingsProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...formData.headerImages, ...newFiles];

      if (totalFiles.length > 2) {
        Swal.fire({
          title: "이미지는 최대 2장까지만 첨부 가능합니다.",
          icon: "error",
        });
        e.target.value = "";
        return;
      }

      onChange({ headerImages: totalFiles });
    }
    e.target.value = "";
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...formData.headerImages];
    newImages.splice(index, 1);
    onChange({ headerImages: newImages });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium mb-1">설문조사 제목</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg"
          placeholder="설문조사 제목을 입력하세요"
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">설문 시작일</label>
          <input
            type="datetime-local"
            className="w-full p-3 border rounded-lg [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter-[brightness(0)_saturate(100%)_invert(var(--foreground-invert))]"
            value={formData.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">설문 종료일</label>
          <input
            type="datetime-local"
            className="w-full p-3 border rounded-lg [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter-[brightness(0)_saturate(100%)_invert(var(--foreground-invert))]"
            value={formData.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label>설문조사 전 안내 사항</label>
        <textarea
          rows={4}
          className="w-full p-3 border rounded-lg"
          placeholder="설문조사 전 안내 사항을 입력하세요. (최대 1000자)"
          maxLength={1000}
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>
      <div>
        <label>첨부 이미지(최대 2장)</label>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            multiple
          />
          <label
            htmlFor="image-upload"
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer ${
              formData.headerImages.length >= 2
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="text-xl">📷</span>
            <span className="text-sm font-medium">
              {formData.headerImages.length >= 2
                ? "이미지 최대 개수 도달"
                : "이미지 추가"}
            </span>
          </label>
          <div className="mt-2 space-y-2">
            {formData.headerImages.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm text-foreground bg-background p-2 rounded"
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
