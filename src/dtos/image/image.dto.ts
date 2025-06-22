import { ImageType, ImageUploadResponse } from "src/types/image";

export interface ImageUploadRequestDto {
  file: File;
  type?: ImageType;
}

export type ImageUploadResponseDto = ImageUploadResponse;
