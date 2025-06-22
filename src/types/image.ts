export enum ImageType {
  SURVEY = 1,
  PROFILE = 2,
  PRODUCT = 3,
  GENERAL = 4,
}

export interface ImageUploadResponse {
  id: number;
  type: number;
  url: string;
  originalName: string;
  size: number;
  mimeType: string;
  createdAt: string;
}
