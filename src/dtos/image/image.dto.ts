import { ImageType } from "src/types/image";

export interface ImageUploadRequestDto {
  file: File;
  type?: ImageType;
}

export interface ImageUploadResponseDto {
  id: number;
  type: ImageType;
  url: string;
  originalName: string;
  size: number;
  mimeType: string;
  createdAt: string;
}
