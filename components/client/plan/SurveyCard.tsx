import { PLAN_CONFIGS } from "src/config/plan.config";
import FeatureItem from "./FeatureItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SurveyCardProps = {
  type: "basic" | "deluxe" | "premium" | "professional";
  data: any;
};

export default function SurveyCard({ type, data }: SurveyCardProps) {
  const config: any = Object.keys(PLAN_CONFIGS).find(
    (key: any): PLAN_CONFIGS | null => {
      const plan = PLAN_CONFIGS[key as keyof typeof PLAN_CONFIGS];
      return plan.name.toLowerCase() === type ? plan : null;
    }
  );

  return (
    <div
      className={`relative rounded-2xl shadow-lg hover:-translate-y-1 border overflow-hidden  
        bg-white border-border`}
    >
      <div className={`bg-gradient-to-r ${config?.color} p-6 text-white`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <FontAwesomeIcon icon={config?.icon} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold uppercase">{type}</h3>
        </div>
        <div className="text-3xl font-bold">{data.price}</div>
        <div className="text-sm opacity-90">VAT 포함</div>
      </div>
      {/* 내용 */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <FeatureItem icon="📝" label="문항 수" value={data.questionLimit} />
          <FeatureItem
            icon="📊"
            label="최대 답변 수"
            value={data.answerLimit}
          />
          <FeatureItem
            icon="🎯"
            label="기본 포함 답변"
            value={data.baseAnswers}
          />
          <FeatureItem
            icon="💰"
            label="추가 요금"
            value={data.extraAnswerCost}
          />
          {/* 보상 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-primary">
            <span className="text-lg flex-shrink-0 mt-0.5">🎁</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-caution">
                참여자 보상
              </div>
              <div className="text-xl font-bold text-caution">
                {data.compensation}
              </div>
            </div>
          </div>

          <FeatureItem
            icon={data.imageInsertable === "가능" ? "✅" : "❌"}
            label="이미지 삽입"
            value={data.imageInsertable}
          />
          <FeatureItem
            icon={data.shortagePayback === "없음" ? "❌" : "💸"}
            label="미달 보상"
            value={data.shortagePayback}
          />
        </div>
      </div>
    </div>
  );
}
