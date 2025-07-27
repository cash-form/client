import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SurveyCardProps } from "components/client/plan/types";
import { usePlanData } from "components/client/plan/hooks/usePlanData";
import PlanFeatures from "./PlanFeatures";

export default function PlanCard({ planId }: SurveyCardProps) {
  const { planConfig, uiConfig, displayData } = usePlanData(planId);

  return (
    <div className="relative rounded-2xl shadow-lg hover:-translate-y-1 border overflow-hidden bg-white border-border">
      <PlanHeader
        planName={planConfig.name}
        price={displayData.price}
        color={uiConfig.color}
        icon={uiConfig.icon}
      />
      <PlanFeatures displayData={displayData} />
    </div>
  );
}

interface PlanHeaderProps {
  planName: string;
  price: string;
  color: string;
  icon: any;
}

function PlanHeader({ planName, price, color, icon }: PlanHeaderProps) {
  return (
    <div className={`bg-gradient-to-r ${color} p-6 text-white`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-white/20 rounded-lg">
          <FontAwesomeIcon icon={icon} className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold uppercase">{planName}</h3>
      </div>
      <div className="text-3xl font-bold">{price}</div>
      <div className="text-sm opacity-90">VAT 포함</div>
    </div>
  );
}
