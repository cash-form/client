import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSurveyDetail,
  submitSurveyResponse,
} from "services/api/surveyApi";

export const useSurveyDetail = (id: string) => {
  return useQuery({
    queryKey: ["survey-detail", id],
    queryFn: () => fetchSurveyDetail(id),
    enabled: !!id,
  });
};

export const useSurveySubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitSurveyResponse,
    onSuccess: (data, variables) => {
      // 제출 성공 시 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["survey-detail", variables.surveyId.toString()],
      });
    },
  });
};
