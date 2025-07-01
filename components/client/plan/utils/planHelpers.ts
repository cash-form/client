import { PlanConfig } from "src/config/plan.config";
import { PlanUIConfig, PlanDisplayData, PlanName } from "components/client/plan/types";
import { PLAN_UI_CONFIGS } from "components/client/plan/constants/planConstants";
import {
  formatPrice,
  formatCredit,
  formatQuestionLimit,
  formatAnswerLimit,
  formatBaseAnswers,
  formatExtraAnswerCost,
  formatImageInsertable,
} from "./formatters";

//   플랜명에 따른 잉;컨

export const getPlanUIConfig = (planName: string): PlanUIConfig => {
  return PLAN_UI_CONFIGS[planName as PlanName] || PLAN_UI_CONFIGS.BASIC;
};

//   플랜 설정을 표시용 데이터

export const transformPlanToDisplayData = (
  planConfig: PlanConfig
): PlanDisplayData => {
  return {
    price: formatPrice(planConfig.price),
    questionLimit: formatQuestionLimit(planConfig.maxQuestions),
    answerLimit: formatAnswerLimit(planConfig.maxAnswers),
    baseAnswers: formatBaseAnswers(planConfig.freeAnswerLimit),
    extraAnswerCost: formatExtraAnswerCost(
      planConfig.freeAnswerLimit,
      planConfig.additionalAnswerCost
    ),
    compensation: formatCredit(planConfig.participantReward),
    imageInsertable: formatImageInsertable(planConfig.maxImages),
    shortagePayback:
      planConfig.shortfallCompensation === 0
        ? "없음"
        : formatCredit(planConfig.shortfallCompensation),
  };
};
