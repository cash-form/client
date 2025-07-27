import { useMutation } from "@tanstack/react-query";
import {
  ImageUploadRequestDto,
  ImageUploadResponseDto,
} from "src/dtos/image/image.dto";
import { uploadImageWithAuth } from "src/lib/api/commonFetch.utility";

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
