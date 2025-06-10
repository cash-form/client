import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { surveyPlanData } from "src/config/plan.config";
import SurveyCard from "./SurveyCard";

export default function PricePlan() {
  return (
    <section>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
            <FontAwesomeIcon
              icon={faFileLines}
              className="w-5 h-5 text-white"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            설문 업로드 가격
          </h2>
        </div>
        <p className="text-foreground">목적에 맞는 플랜을 선택하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(surveyPlanData).map(([type, data]) => (
          <SurveyCard
            key={type}
            type={type as keyof typeof surveyPlanData}
            data={data}
          />
        ))}
      </div>
    </section>
  );
}
