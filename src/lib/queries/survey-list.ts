import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../api/commonFetch.utility";
import {
  SurveyListResponseDto,
  SurveyListRequestDto,
} from "../../dtos/survey/survey-list.dto";
import { ApiUrlConfig } from "../../config/api.config";

/**
 * 설문조사 목록을 조회합니다.
 *
 * @param params - 조회 파라미터
 * @param params.page - 조회할 페이지 번호 (1부터 시작)
 * @param params.size - 페이지당 조회할 항목 수
 * @param params.sort - 정렬 대상 (기본값: createdAt)
 * @param params.order - 정렬 방향 (ASC/DESC, 기본값: DESC)
 * @param params.keyword - 검색어 (선택)
 * @returns 설문조사 목록 및 페이지네이션 정보
 *
 * 응답 형식:
 * - list: 설문조사 객체 배열
 * - total: 전체 설문조사 수
 * - page: 현재 페이지 번호
 * - size: 페이지당 항목 수
 */
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
    { method: "GET" }
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
