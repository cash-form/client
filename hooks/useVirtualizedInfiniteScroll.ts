import { useCallback, useRef, useState } from "react";

interface UseVirtualizedInfiniteScrollProps {
  itemHeight: number;
  containerHeight: number;
  items: any[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

interface VirtualItem {
  index: number;
  start: number;
  size: number;
}

export function useVirtualizedInfiniteScroll({
  itemHeight,
  containerHeight,
  items,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: UseVirtualizedInfiniteScrollProps) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // 전체 높이 계산
  const totalHeight = items.length * itemHeight;

  // 보여질 아이템들 계산
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 5, items.length - 1);

  // 가상화된 항목들 만들기
  const virtualItems: VirtualItem[] = [];
  for (let i = Math.max(0, startIndex - 2); i <= endIndex; i++) {
    virtualItems.push({
      index: i,
      start: i * itemHeight,
      size: itemHeight,
    });
  }

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      setScrollTop(scrollTop);

      // 무한 스크롤 체크
      const scrollHeight = e.currentTarget.scrollHeight;
      const clientHeight = e.currentTarget.clientHeight;
      const scrollBottom = scrollTop + clientHeight;

      // 끝에서 200px 전에 도달하면 다음 페이지 로드
      if (
        scrollHeight - scrollBottom < 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage]
  );

  // 특정 인덱스로 스크롤하는 함수
  const scrollToIndex = (index: number) => {
    if (scrollElementRef.current) {
      const scrollTop = index * itemHeight;
      scrollElementRef.current.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  };

  return {
    scrollElementRef,
    totalHeight,
    virtualItems,
    handleScroll,
    scrollToIndex,
    visibleRange: { start: startIndex, end: endIndex },
  };
}
