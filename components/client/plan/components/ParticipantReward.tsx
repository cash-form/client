import { PLAN_FEATURE_ICONS } from "components/client/plan/constants/planConstants";

interface ParticipantRewardProps {
  compensation: string;
}

export default function ParticipantReward({
  compensation,
}: ParticipantRewardProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-primary">
      <span className="text-lg flex-shrink-0 mt-0.5">
        {PLAN_FEATURE_ICONS.GIFT}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-caution">참여자 보상</div>
        <div className="text-xl font-bold text-caution">{compensation}</div>
      </div>
    </div>
  );
}
