"use client";

import { useMemo, useState } from "react";
import { useInfiniteSurveyList } from "../../../src/lib/queries/survey-list";
import SurveyGrid from "./SurveyGrid";
import SurveySearchFilter from "./SurveySearchFilter";
import { useRouter } from "next/navigation";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SurveyListContainerProps {
  containerHeight?: number;
  onSurveyClick?: (surveyId: number) => void;
}

export default function SurveyListContainer({
  containerHeight = 600,
  onSurveyClick,
}: SurveyListContainerProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const router = useRouter();

  const handleSurveyClick = (surveyId: number) => {
    router.push(`/surveys/${surveyId}`);
  };

  // React Query를 사용한 무한 스크롤 데이터 페칭
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteSurveyList({
    keyword: searchKeyword,
    sort: sortField,
    order: sortOrder,
    size: 10,
  });

  // 모든 페이지의 설문조사들을 하나의 배열로 합치기
  let allSurveys: any[] = [];
  if (data && data.pages) {
    for (let i = 0; i < data.pages.length; i++) {
      const page = data.pages[i];
      if (page && page.list) {
        allSurveys = allSurveys.concat(page.list);
      }
    }
  }

  // 총 설문조사 개수 구하기
  let totalCount = 0;
  if (data && data.pages && data.pages[0]) {
    totalCount = data.pages[0].total || 0;
  }

  // 검색 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sort: string, order: "ASC" | "DESC") => {
    setSortField(sort);
    setSortOrder(order);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-foreground/20 mb-6">
          <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="h-12 bg-foreground/20 rounded-lg"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-12 bg-foreground/20 rounded"></div>
                <div className="h-10 w-32 bg-foreground/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="h-16 bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse"></div>
                <div className="p-4 space-y-4">
                  <div className="h-6 bg-foreground/20 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-foreground/20 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-foreground/20 rounded animate-pulse w-1/2"></div>
                    <div className="h-4 bg-foreground/20 rounded animate-pulse w-2/3"></div>
                  </div>
                  <div className="pt-2 border-t border-foreground/10">
                    <div className="h-4 bg-foreground/20 rounded animate-pulse w-1/3 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <FontAwesomeIcon icon={faFile} />
          <h3 className="mt-4 text-lg font-medium text-foreground/90">
            설문조사를 불러올 수 없습니다
          </h3>
          <p className="mt-2 text-sm text-foreground/50">
            {error?.message || "알 수 없는 오류가 발생했습니다."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (allSurveys.length === 0) {
    return (
      <div className="w-full">
        <SurveySearchFilter
          onSearch={handleSearch}
          onSortChange={handleSortChange}
        />

        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <FontAwesomeIcon icon={faFile} />
            <h3 className="mt-4 text-lg font-medium text-foreground/90">
              {searchKeyword
                ? "검색 결과가 없습니다"
                : "등록된 설문조사가 없습니다"}
            </h3>
            <p className="mt-2 text-sm text-foreground/50">
              {searchKeyword
                ? "다른 키워드로 검색해보세요."
                : "첫 번째 설문조사를 만들어보세요!"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 검색 및 필터 */}
      <SurveySearchFilter
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        isSearching={isLoading}
      />

      <div className="mb-4 text-sm text-foreground/50">
        총 <span className="font-medium">{totalCount.toLocaleString()}</span>
        개의 설문조사
        {searchKeyword && <span> (검색: &ldquo;{searchKeyword}&rdquo;)</span>}
      </div>

      <SurveyGrid
        surveys={allSurveys}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onSurveyClick={handleSurveyClick}
        containerHeight={containerHeight}
      />
    </div>
  );
}
