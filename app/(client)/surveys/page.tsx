import SurveyListContainer from "../../../components/client/survey/SurveyListContainer";

export default function SurveysPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground/90 mb-2">
          설문조사 목록
        </h1>
        <p className="text-foreground/50">
          다양한 주제의 설문조사에 참여하고 의견을 공유해보세요.
        </p>
      </div>

      <SurveyListContainer containerHeight={800} />
    </div>
  );
}
