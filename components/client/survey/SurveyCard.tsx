"use client";

import { memo } from "react";
import dayjs from "dayjs";
import { SurveyItemDto } from "../../../src/dtos/survey/survey-list.dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

interface SurveyCardProps {
  survey: SurveyItemDto;
  onClick?: (surveyId: number) => void;
}

export default function SurveyCard({ survey, onClick }: SurveyCardProps) {
  const handleClick = () => {
    onClick?.(survey.id);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("YYYY.MM.DD");
  };

  const getSurveyStatus = () => {
    const now = dayjs();
    const startDate = dayjs(survey.startDate);
    const endDate = dayjs(survey.endDate);

    if (now.isBefore(startDate)) {
      return { text: "시작 예정", color: "text-secondary" };
    } else if (now.isAfter(endDate)) {
      return { text: "종료됨", color: "text-caution" };
    } else {
      return { text: "진행 중", color: "text-banner-dark" };
    }
  };

  const status = getSurveyStatus();

  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-foreground/10 hover:border-foreground/20 transform hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative bg-gradient-to-br from-primary to-primary/50 px-3 py-3 mobile:px-4 mobile:py-4 tablet:px-5 tablet:py-5">
        <div className="relative flex justify-end">
          <span
            className={`inline-flex items-center px-2 py-1 mobile:px-3 mobile:py-1.5 rounded-full text-xs font-semibold ${status.color} bg-white shadow-sm`}
          >
            {status.text}
          </span>
        </div>
      </div>

      <div className="p-3 mobile:p-4 tablet:p-5 space-y-3 mobile:space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-sm mobile:text-base tablet:text-lg desktop:text-xl text-foreground/90 line-clamp-2  min-h-[2.25rem] mobile:min-h-[2.5rem] tablet:min-h-[3rem]">
            {survey.title}
          </h3>
        </div>

        <div className="space-y-2.5 mobile:space-y-3">
          <div className="flex items-center gap-2.5 mobile:gap-3">
            <div className="flex-shrink-0 w-7 h-7 mobile:w-8 mobile:h-8 bg-foreground/5 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="w-3 h-3 mobile:w-3.5 mobile:h-3.5 text-foreground/60"
              />
            </div>
            <span className="text-xs mobile:text-sm tablet:text-base text-foreground/90 font-medium truncate">
              {survey.author.nickname}
            </span>
          </div>

          <div className="flex items-center gap-2.5 mobile:gap-3">
            <div className="flex-shrink-0 w-7 h-7 mobile:w-8 mobile:h-8 bg-foreground/5 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-3 h-3 mobile:w-3.5 mobile:h-3.5 text-foreground/60"
              />
            </div>
            <span className="text-xs mobile:text-sm tablet:text-base text-foreground/60 truncate">
              {formatDate(survey.startDate)} ~ {formatDate(survey.endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2.5 mobile:gap-3">
            <div className="flex-shrink-0 w-7 h-7 mobile:w-8 mobile:h-8 bg-foreground/5 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUserGroup}
                className="w-3 h-3 mobile:w-3.5 mobile:h-3.5 text-foreground/60"
              />
            </div>
            <span className="text-xs mobile:text-sm tablet:text-base text-foreground/60">
              참여자{" "}
              <span className="font-semibold text-foreground/90">
                {survey.participantCount}
              </span>
              명
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-foreground/10">
          <div className="flex items-center justify-center text-xs mobile:text-sm text-foreground/40 group-hover:text-foreground/60 transition-colors duration-200">
            <span className="hidden mobile:inline">클릭하여 자세히 보기</span>
            <span className="mobile:hidden">자세히 보기</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
