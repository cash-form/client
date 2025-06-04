"use client";

export default function SurveyFooter() {
  return (
    <div className=" rounded-lg border p-4">
      <label className="block text-sm font-medium mb-2">마지막 안내문</label>
      <textarea
        onChange={(e) => console.log(e.target.value)}
        className="w-full p-3 border rounded-lg h-24 "
        placeholder="설문조사 완료 후 안내사항을 입력하세요 (최대 1000자)"
        maxLength={1000}
      />
      <div className="text-sm text-gray-500 mt-1"></div>

      <div className="mt-3">
        <label className="block text-sm font-medium mb-2">
          이미지 (최대 2장)
        </label>
        <div className="space-y-2">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files);
              }}
              className="hidden"
              id="footer-image-upload"
            />
            <label
              htmlFor="footer-image-upload"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer"
            >
              <span className="text-xl">📷</span>
              <span className="text-sm font-medium">이미지 추가</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
