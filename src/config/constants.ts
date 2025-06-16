import { title } from "process";
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

export const SLOGAN = {
  TITLE: "쉽고 빠른 설문조사의 새로운 기준",
  SUBTITLE:
    "누구나 쉽게 설문조사를 만들고, 참여하여 소득도 창출하는 스마트한 플랫폼",
} as const;

export const FEATURE_LIST = {
  USER: {
    title: "사용자 혜택",
    desc: "부업을 찾는 분들께 최적화된 혜택",
    benefits: [
      {
        icon: "💰",
        title: "쉬운 부수입 창출",
        description:
          "복잡한 작업 없이 설문에 참여만 해도\n수익을 얻을 수 있는 가장 간단한 부업 방법입니다.",
      },
      {
        icon: "⏰",
        title: "언제 어디서나",
        description:
          "시간과 장소에 구애받지 않고\n스마트폰으로 언제든지 설문에 참여하여\n돈을 벌 수 있습니다.",
      },
    ],
  },
  BUSINESS: {
    title: "사업자 혜택",
    desc: "효율적인 설문조사를 위한 전문적인 도구",
    benefits: [
      {
        icon: "📋",
        title: "다양한 템플릿 제공",
        description:
          "업종별, 목적별로\n최적화된 다양한 설문 템플릿과 문항을 제공하여\n쉽게 설문을 제작할 수 있습니다.",
      },
      {
        icon: "👥",
        title: "대규모 데이터 수집",
        description:
          "수많은 활성 사용자들을 대상으로\n빠르고 정확한 데이터를\n손쉽게 수집할 수 있는 플랫폼입니다.",
      },
    ],
  },
} as const;
