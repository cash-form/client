"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface ImageUploaderProps {
  images: File[];
  onChange: (images: File[]) => void;
  maxImages?: number;
  id: string;
}

export default function ImageUploader({
  images,
  onChange,
  maxImages = 2,
  id,
}: ImageUploaderProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...images, ...newFiles];

      if (totalFiles.length > maxImages) {
        Swal.fire({
          title: `이미지는 최대 ${maxImages}장까지만 첨부 가능합니다.`,
          icon: "error",
        });
        e.target.value = "";
        return;
      }

      onChange(totalFiles);
    }
    e.target.value = "";
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        이미지 (최대 {maxImages}장)
      </label>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id={id}
          multiple
        />
        <label
          htmlFor={id}
          className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
            images.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FontAwesomeIcon icon={faImage} className="text-lg" />
          <span className="text-sm font-medium">
            {images.length >= maxImages
              ? "이미지 최대 개수 도달"
              : "이미지 추가"}
          </span>
        </label>
        <div className="mt-2 space-y-2">
          {images.map((file: File, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm text-foreground/50 bg-gray-50 p-2 rounded"
            >
              <span>{file.name}</span>
              <button
                onClick={() => handleImageDelete(index)}
                className="text-warning hover:text-warning/80 p-1"
                type="button"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
