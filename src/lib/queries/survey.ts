import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SurveyFormDto } from "../../dtos/survey/request.dto";
import { SurveyResponseDto } from "../../dtos/survey/response.dto";
import { fetchWithAuth } from "../api/commonFetch.utility";

export const useSurveyMutation = () => {
  const router = useRouter();

  return useMutation<SurveyResponseDto, Error, SurveyFormDto>({
    mutationFn: async (data: SurveyFormDto) => {
      return fetchWithAuth("/v1/surveys", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      router.push("/surveys");
    },
  });
};
