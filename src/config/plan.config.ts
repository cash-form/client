import { Product } from "src/types/survey";

export interface PlanConfig {
  name: string;
  price: number; // VAT 포함 가격
  maxQuestions: number; // 최대 문항 수
  maxImages: number; // 최대 이미지 개수
  maxAnswers: number; // 최대 답변 수
  participantReward: number; // 참여자 보상 크레딧
  freeAnswerLimit: number; // 무료 답변 수
  additionalAnswerCost: number; // 추가 답변당 비용
  shortfallCompensation: number; // 미달 보상 크레딧
  shortfallThreshold: number; // 미달 보상 기준 답변 수
  features: string[]; // 요금제 특징
}

export const PLAN_CONFIGS: Record<Product, PlanConfig> = {
  1: {
    name: "BASIC",
    price: 20000,
    maxQuestions: 20,
    maxImages: 0,
    maxAnswers: 50,
    participantReward: 200,
    freeAnswerLimit: 30,
    additionalAnswerCost: 120,
    shortfallCompensation: 0,
    shortfallThreshold: 0,
    features: [
      "문항 수 최대 20개",
      "설문대상 자유선택",
      "답변 30개까지 무료",
      "31개부터 120원/명",
      "최대 답변 수 50개",
      "이미지 삽입 불가",
      "참여자보상 200크레딧",
    ],
  },
  2: {
    name: "DELUXE",
    price: 50000,
    maxQuestions: 40,
    maxImages: 2,
    maxAnswers: 150,
    participantReward: 250,
    freeAnswerLimit: 100,
    additionalAnswerCost: 240,
    shortfallCompensation: 30000,
    shortfallThreshold: 70,
    features: [
      "문항 수 최대 40개",
      "설문대상 자유선택",
      "미달시 3만크레딧 페이백",
      "답변 100개까지 무료",
      "101개부터 240원/명",
      "최대 답변 수 150개",
      "이미지 최대 2개",
      "참여자보상 250크레딧",
    ],
  },
  3: {
    name: "PREMIUM",
    price: 100000,
    maxQuestions: 0,
    maxImages: 3,
    maxAnswers: 0,
    participantReward: 400,
    freeAnswerLimit: 0,
    additionalAnswerCost: 0,
    shortfallCompensation: 70000,
    shortfallThreshold: 150,
    features: [
      "문항 수 무제한",
      "설문대상 자유선택",
      "미달시 7만크레딧 페이백",
      "추가요금 없음",
      "최대 답변 수 없음",
      "이미지 최대 3개",
      "참여자보상 400크레딧",
    ],
  },
  4: {
    name: "PROFESSIONAL",
    price: 300000,
    maxQuestions: 0,
    maxImages: 5,
    maxAnswers: 0,
    participantReward: 800,
    freeAnswerLimit: 0,
    additionalAnswerCost: 0,
    shortfallCompensation: 220000,
    shortfallThreshold: 150,
    features: [
      "문항 수 무제한",
      "설문대상 자유선택",
      "미달시 22만크레딧 페이백",
      "추가요금 없음",
      "최대 답변 수 없음",
      "이미지 최대 5개",
      "참여자보상 800크레딧",
    ],
  },
};
