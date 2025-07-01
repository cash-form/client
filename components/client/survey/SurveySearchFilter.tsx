"use client";

import { memo, useCallback, useState, useMemo, useEffect, useRef } from "react";
import useDebounce from "hooks/useDebounce";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Label } from "src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "src/components/ui/select";

interface SurveySearchFilterProps {
  onSearch: (keyword: string) => void;
  onSortChange: (sort: string, order: "ASC" | "DESC") => void;
  isSearching?: boolean;
}

interface SortOption {
  value: string;
  label: string;
  order: "ASC" | "DESC";
}

export default function SurveySearchFilter({
  onSearch,
  onSortChange,
  isSearching = false,
}: SurveySearchFilterProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedSort, setSelectedSort] = useState("createdAt-DESC");

  // 검색어 디바운싱 (500ms 지연)
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  // 이전 검색어를 추적하기 위한 ref
  const prevSearchKeywordRef = useRef<string>("");

  // 정렬 옵션들
  const sortOptions = useMemo<SortOption[]>(
    () => [
      { value: "createdAt-DESC", label: "최신순", order: "DESC" },
      { value: "createdAt-ASC", label: "오래된순", order: "ASC" },
      { value: "title-ASC", label: "제목 A-Z", order: "ASC" },
      { value: "title-DESC", label: "제목 Z-A", order: "DESC" },
      { value: "participantCount-DESC", label: "참여자 많은순", order: "DESC" },
      { value: "participantCount-ASC", label: "참여자 적은순", order: "ASC" },
    ],
    []
  );

  useEffect(() => {
    if (prevSearchKeywordRef.current !== debouncedSearchKeyword) {
      prevSearchKeywordRef.current = debouncedSearchKeyword;
      onSearch(debouncedSearchKeyword);
    }
  }, [debouncedSearchKeyword, onSearch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setSelectedSort(value);
      const [sort, order] = value.split("-");
      onSortChange(sort, order as "ASC" | "DESC");
    },
    [onSortChange]
  );

  const handleClearSearch = useCallback(() => {
    setSearchKeyword("");
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-foreground/20 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* 검색 필드 */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <Input
              type="text"
              placeholder="설문조사 제목으로 검색..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-12 py-3 border border-foreground/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {searchKeyword && (
              <Button
                variant="noneBorder"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                &times;
              </Button>
            )}
            {isSearching && (
              <div className="absolute inset-y-0 right-8 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex items-center gap-3">
          <Label className="text-sm font-medium text-foreground/70 whitespace-nowrap">
            정렬:
          </Label>
          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="min-w-[140px]">
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-forground/50 shadow-lg">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 검색 결과 요약 */}
      {debouncedSearchKeyword && (
        <div className="mt-4 text-sm text-foreground/50">
          <span className="font-medium">
            &ldquo;{debouncedSearchKeyword}&rdquo;
          </span>
          에 대한 검색 결과
        </div>
      )}
    </div>
  );
}
