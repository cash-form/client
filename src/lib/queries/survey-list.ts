import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "src/lib/api/commonFetch.utility";
import {
  SurveyListResponseDto,
  SurveyListRequestDto,
} from "src/dtos/survey/survey-list.dto";
import { ApiUrlConfig } from "src/config/api.config";

export const fetchSurveyList = async (
  params: SurveyListRequestDto
): Promise<SurveyListResponseDto> => {
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page.toString());
  if (params.size) query.append("size", params.size.toString());
  if (params.sort) query.append("sort", params.sort);
  if (params.order) query.append("order", params.order);
  if (params.keyword) query.append("keyword", params.keyword);

  const response = await fetchWithAuth(
    `${ApiUrlConfig.SURVEYS_LIST}?${query}`,
    { method: "GET" },
    false
  );

  return response as SurveyListResponseDto;
};

/**
 * 무한 스크롤을 지원하는 설문조사 목록 조회 훅
 */
export const useInfiniteSurveyList = (
  params: Omit<SurveyListRequestDto, "page"> = {}
) => {
  return useInfiniteQuery({
    queryKey: ["surveyList", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchSurveyList({ ...params, page: pageParam, size: params.size || 10 }),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.size);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
