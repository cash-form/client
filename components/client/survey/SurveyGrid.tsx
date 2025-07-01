"use client";

import { useEffect, useState } from "react";
import { SurveyItemDto } from "src/dtos/survey/survey-list.dto";
import { SurveyResponseDto } from "src/dtos/survey/response.dto";
import SurveyCard from "./SurveyCard";
import { useVirtualizedInfiniteScroll } from "hooks/useVirtualizedInfiniteScroll";

interface SurveyGridProps {
  surveys: SurveyItemDto[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  onSurveyClick?: (surveyId: number) => void;
  containerHeight?: number;
}

export default function SurveyGrid({
  surveys,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  onSurveyClick,
  containerHeight = 600,
}: SurveyGridProps) {
  const [itemHeight, setItemHeight] = useState(300);
  const [itemsPerRow, setItemsPerRow] = useState(3);

  // 화면 크기별 설정
  useEffect(() => {
    function updateLayout() {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerRow(1);
        setItemHeight(350);
      } else if (width < 1024) {
        setItemsPerRow(2);
        setItemHeight(320);
      } else {
        setItemsPerRow(3);
        setItemHeight(300);
      }
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleSurveyClick = (surveyId: number) => {
    if (onSurveyClick) {
      onSurveyClick(surveyId);
    }
  };

  // 그리드 행으로 나누기
  const gridRows: SurveyItemDto[][] = [];
  for (let i = 0; i < surveys.length; i += itemsPerRow) {
    const row = surveys.slice(i, i + itemsPerRow);
    gridRows.push(row);
  }

  const { scrollElementRef, totalHeight, virtualItems, handleScroll } =
    useVirtualizedInfiniteScroll({
      itemHeight: itemHeight,
      containerHeight: containerHeight,
      items: gridRows,
      hasNextPage: hasNextPage,
      fetchNextPage: fetchNextPage,
      isFetchingNextPage: isFetchingNextPage,
    });

  return (
    <div className="w-full">
      <div
        ref={scrollElementRef}
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {virtualItems.map((virtualRow) => {
            const row = gridRows[virtualRow.index];
            if (!row) return null;

            return (
              <div
                key={virtualRow.index}
                className="absolute w-full"
                style={{
                  top: virtualRow.start,
                  height: virtualRow.size,
                }}
              >
                <div
                  className="grid gap-4 p-4"
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
                  }}
                >
                  {row.map((survey) => (
                    <SurveyCard
                      key={survey.id}
                      survey={survey}
                      onClick={handleSurveyClick}
                    />
                  ))}

                  {/* 빈 공간 채우기 */}
                  {row.length < itemsPerRow &&
                    Array.from({ length: itemsPerRow - row.length }).map(
                      (_, index) => (
                        <div key={`empty-${virtualRow.index}-${index}`} />
                      )
                    )}
                </div>
              </div>
            );
          })}

          {isFetchingNextPage && (
            <div className="absolute bottom-0 w-full flex justify-center py-8">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-foreground/30">
                  더 많은 설문조사를 불러오는 중...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
