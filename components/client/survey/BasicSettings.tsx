"use client";
export default function BasicSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium mb-1">설문조사 제목</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg "
          placeholder="설문조사 제목을 입력하세요"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">설문 시작일</label>
          <input
            type="datetime-local"
            className="w-full p-3 border rounded-lg "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">설문 종료일</label>
          <input
            type="datetime-local"
            className="w-full p-3 border rounded-lg "
          />
        </div>
      </div>
      <div>
        <label>설문조사 전 안내 사항</label>
        <textarea
          rows={4}
          className="w-full p-3 border rounded-lg "
          placeholder="설문조사 전 안내 사항을 입력하세요. (최대 1000자)"
          maxLength={1000}
        />
      </div>
      <div>
        <label>첨부 이미지(최대 2장)</label>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files);
            }}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer "
          >
            <span className="text-xl">📷</span>
            <span className="text-sm font-medium">이미지 추가</span>
          </label>
        </div>
      </div>
    </div>
  );
}
