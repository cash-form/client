import { PlanDisplayData } from "components/client/plan/types";
import { PLAN_FEATURE_ICONS } from "components/client/plan/constants/planConstants";
import FeatureItem from "./FeatureItem";
import ParticipantReward from "./ParticipantReward";

interface PlanFeaturesProps {
  displayData: PlanDisplayData;
}

export default function PlanFeatures({ displayData }: PlanFeaturesProps) {
  const isImageAllowed = displayData.imageInsertable.includes("가능");
  const hasPayback = displayData.shortagePayback !== "없음";

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-3">
        <FeatureItem
          icon={PLAN_FEATURE_ICONS.QUESTION}
          label="문항 수"
          value={displayData.questionLimit}
        />
        <FeatureItem
          icon={PLAN_FEATURE_ICONS.ANSWER}
          label="최대 답변 수"
          value={displayData.answerLimit}
        />
        <FeatureItem
          icon={PLAN_FEATURE_ICONS.TARGET}
          label="기본 포함 답변"
          value={displayData.baseAnswers}
        />
        <FeatureItem
          icon={PLAN_FEATURE_ICONS.MONEY}
          label="추가 요금"
          value={displayData.extraAnswerCost}
        />

        <ParticipantReward compensation={displayData.compensation} />

        <FeatureItem
          icon={
            isImageAllowed
              ? PLAN_FEATURE_ICONS.IMAGE_ALLOWED
              : PLAN_FEATURE_ICONS.IMAGE_BLOCKED
          }
          label="이미지 삽입"
          value={displayData.imageInsertable}
        />
        <FeatureItem
          icon={
            hasPayback
              ? PLAN_FEATURE_ICONS.PAYBACK
              : PLAN_FEATURE_ICONS.IMAGE_BLOCKED
          }
          label="미달 보상"
          value={displayData.shortagePayback}
        />
      </div>
    </div>
  );
}
