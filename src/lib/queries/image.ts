import { useMutation } from "@tanstack/react-query";
import {
  ImageUploadRequestDto,
  ImageUploadResponseDto,
} from "../../dtos/image/image.dto";
import { uploadImageWithAuth } from "../api/commonFetch.utility";

export const useImageUploadMutation = () => {
  return useMutation<ImageUploadResponseDto, Error, ImageUploadRequestDto>({
    mutationFn: async ({ file, type }: ImageUploadRequestDto) => {
      const formData = new FormData();
      formData.append("file", file);
      if (type !== undefined) {
        formData.append("type", type.toString());
      }

      return uploadImageWithAuth("/v1/images/upload", formData);
    },
  });
};
