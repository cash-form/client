"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useImageUploadMutation } from "../../../src/lib/queries/image";
import { ImageType } from "../../../src/types/image";

interface ImageUploaderProps {
  images: string[];
  maxImages: number;
  onChange: (images: string[]) => void;
  imageType: ImageType;
  className?: string;
}

export default function ImageUploader({
  images,
  maxImages,
  onChange,
  imageType,
  className = "",
}: ImageUploaderProps) {
  const imageUploadMutation = useImageUploadMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      if (images.length + newFiles.length > maxImages) {
        Swal.fire({
          title: `이미지는 최대 ${maxImages}장까지만 첨부 가능합니다.`,
          icon: "error",
        });
        e.target.value = "";
        return;
      }

      // 각 파일을 순차적으로 업로드
      for (const file of newFiles) {
        try {
          const response = await imageUploadMutation.mutateAsync({
            file,
            type: imageType,
          });

          // 업로드된 이미지 URL을 추가
          onChange([...images, response.url]);
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          Swal.fire({
            title: "이미지 업로드 실패",
            text: "이미지를 업로드하는 중 오류가 발생했습니다.",
            icon: "error",
          });
        }
      }
    }
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const id = `image-uploader-${imageType}`;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id={id}
          multiple
          disabled={imageUploadMutation.isPending}
        />
        <label
          htmlFor={id}
          className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
            images.length >= maxImages || imageUploadMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faImage} className="text-lg" />
          <span className="text-sm font-medium">
            {imageUploadMutation.isPending
              ? "업로드 중..."
              : images.length >= maxImages
              ? "이미지 제한 달성"
              : "이미지 첨부하기"}
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          최대 {maxImages}장까지 업로드 가능
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
