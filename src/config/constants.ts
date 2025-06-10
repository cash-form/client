import { PageUrlConfig } from "./page.config";

// 설문 상태 타입 정의
export const SurveyStatusType = {
  BEFORE: 1,
  PROGRESS: 2,
  FINISH: 3,
  DELETED: 4,
} as const;
export type SurveyStatusType =
  (typeof SurveyStatusType)[keyof typeof SurveyStatusType];

// 모달 크기 설정
export const MODAL_SIZE_CLASSES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export const MENU_TREE = (userRole: "user" | "business") => {
  const baseMenu = [
    {
      key: "surveys",
      label: "설문",
      children: [
        {
          key: "list",
          label: "전체 설문 리스트",
          path: PageUrlConfig.SURVEYS,
          // children: [
          //   {
          //     key: "detail",
          //     label: "설문 상세 페이지",
          //     path: PageUrlConfig.SURVEYS,
          //   },
          // ],
        },
        {
          key: "completed",
          label: "참여 완료 리스트",
          path: PageUrlConfig.SURVEYS,
        },
      ],
    },
    {
      key: "register",
      label: "설문 등록",
      children: [
        { key: "guide", label: "등록 절차 안내", path: PageUrlConfig.SURVEYS },
        {
          key: "register",
          label: "설문등록 및 요금 안내",
          path: PageUrlConfig.REGISTER,
        },
      ],
    },
    {
      key: "report",
      label: "통계 리포트",
      children: [
        {
          key: "report-list",
          label: "설문 리스트",
          path: PageUrlConfig.SURVEYS,
        },
      ],
    },
    {
      key: "mypage",
      label: "마이페이지",
      children: [
        {
          key: "history",
          label: "참여 내역",
          path: PageUrlConfig.SURVEYS,
        },
        {
          key: "points management",
          label: "포인트 관리",
          path: PageUrlConfig.SURVEYS,
        },
        { key: "account", label: "계정 관리", path: PageUrlConfig.SURVEYS },
      ],
    },
    {
      key: "help",
      label: "고객센터",
      children: [
        { key: "faq", label: "자주 묻는 질문", path: PageUrlConfig.SURVEYS },
        { key: "inquiry", label: "1:1 문의", path: PageUrlConfig.SURVEYS },
      ],
    },
    {
      key: "policy",
      label: "이용약관",
      children: [
        {
          key: "privacy",
          label: "개인정보처리방침",
          path: PageUrlConfig.SURVEYS,
        },
        { key: "terms", label: "서비스약관", path: PageUrlConfig.SURVEYS },
      ],
    },
  ];

  return baseMenu;
};
