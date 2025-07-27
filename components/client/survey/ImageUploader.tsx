"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useImageUploadMutation } from "src/lib/queries/image";
import { ImageType } from "src/types/image";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  imageType: ImageType;
  className?: string;
  id?: string;
  // 전체 설문조사 이미지 제한
  totalUsedImages?: number; // 전체 설문조사에서 현재 사용된 이미지 수
  maxTotalImages?: number; // 전체 설문조사에서 허용되는 최대 이미지 수
}

export default function ImageUploader({
  images,
  onChange,
  imageType,
  className = "",
  id,
  totalUsedImages = 0,
  maxTotalImages = Infinity,
}: ImageUploaderProps) {
  const imageUploadMutation = useImageUploadMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // 전체 설문조사 이미지 제한 체크
      if (totalUsedImages + newFiles.length > maxTotalImages) {
        const remaining = maxTotalImages - totalUsedImages;
        Swal.fire({
          title: `전체 설문조사에서 이미지 제한을 초과했습니다.`,
          text: `현재 ${totalUsedImages}장 사용 중, 최대 ${maxTotalImages}장까지 가능합니다. ${remaining}장만 더 추가할 수 있습니다.`,
          icon: "error",
        });
        e.target.value = "";
        return;
      }

      // 각 파일을 순차적으로 업로드
      const uploadedUrls: string[] = [];

      for (const file of newFiles) {
        try {
          const response = await imageUploadMutation.mutateAsync({
            file,
            type: imageType,
          });

          // 업로드된 이미지 URL을 임시 배열에 추가
          uploadedUrls.push(response.url);
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          Swal.fire({
            title: "이미지 업로드 실패",
            text: "이미지를 업로드하는 중 오류가 발생했습니다.",
            icon: "error",
          });
          break; // 실패 시 중단
        }
      }

      // 모든 업로드가 완료된 후 한 번에 상태 업데이트
      if (uploadedUrls.length > 0) {
        const newImages = [...images, ...uploadedUrls];

        onChange(newImages);
      }
    }
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const uploaderId = id || `image-uploader-${imageType}`;

  // 업로드 가능 여부 계산
  const isUploadDisabled =
    imageUploadMutation.isPending || totalUsedImages >= maxTotalImages;

  const getUploadText = () => {
    if (imageUploadMutation.isPending) return "업로드 중...";
    if (totalUsedImages >= maxTotalImages) return "이미지 제한 달성";
    return "이미지 첨부하기";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id={uploaderId}
          multiple
          disabled={isUploadDisabled}
        />
        <label
          htmlFor={uploaderId}
          className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
            isUploadDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FontAwesomeIcon icon={faImage} className="text-lg" />
          <span className="text-sm font-medium">{getUploadText()}</span>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          전체: {totalUsedImages}/{maxTotalImages}장
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`이미지 ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
                disabled={imageUploadMutation.isPending}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
