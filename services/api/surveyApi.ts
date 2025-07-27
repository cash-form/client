import { fetchWithAuth } from "src/lib/api/commonFetch.utility";
import {
  SurveyDetailResponse,
  SurveySubmission,
} from "src/types/survey-detail";

export const fetchSurveyDetail = async (
  id: string
): Promise<SurveyDetailResponse> => {
  return await fetchWithAuth(`/v1/surveys/${id}`, {
    method: "GET",
  });
};

export const submitSurveyResponse = async (
  submission: SurveySubmission
): Promise<{ success: boolean; message: string }> => {
  return await fetchWithAuth(`/v1/surveys/${submission.surveyId}/responses`, {
    method: "POST",
    body: JSON.stringify(submission),
  });
};
