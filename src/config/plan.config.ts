import {
  faStar,
  faCrown,
  faGem,
  faTrophy,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

export const planConfig = {
  basic: {
    icon: faStar,
    color: "from-blue-500 to-blue-600",
    borderColor: "border-blue-200",
  },
  deluxe: {
    icon: faCrown,
    color: "from-purple-500 to-purple-600",
    borderColor: "border-purple-200",
  },
  premium: {
    icon: faGem,
    color: "from-indigo-500 to-indigo-600",
    borderColor: "border-indigo-200",
  },
  professional: {
    icon: faTrophy,
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-200",
  },
};

export const surveyPlanData = {
  basic: {
    price: "20,000원",
    questionLimit: "최대 20개",
    answerLimit: "최대 50개",
    baseAnswers: "답변 30개까지 추가요금 없음",
    extraAnswerCost: "31개부터 1명당 120원",
    compensation: "200크레딧",
    imageInsertable: "불가능",
    shortagePayback: "없음",
  },
  deluxe: {
    price: "50,000원",
    questionLimit: "최대 40개",
    answerLimit: "최대 150개",
    baseAnswers: "답변 100개까지 추가요금 없음",
    extraAnswerCost: "101개부터 1명당 240원",
    compensation: "250크레딧",
    imageInsertable: "가능",
    shortagePayback: "70개 미만 시 3만크레딧 환급",
  },
  premium: {
    price: "100,000원",
    questionLimit: "무제한",
    answerLimit: "무제한",
    baseAnswers: "추가요금 없음",
    extraAnswerCost: "없음",
    compensation: "400크레딧",
    imageInsertable: "가능",
    shortagePayback: "150개 미만 시 7만크레딧 환급",
  },
  professional: {
    price: "300,000원",
    questionLimit: "무제한",
    answerLimit: "무제한",
    baseAnswers: "추가요금 없음",
    extraAnswerCost: "없음",
    compensation: "800크레딧",
    imageInsertable: "가능",
    shortagePayback: "150개 미만 시 22만크레딧 환급",
  },
};
