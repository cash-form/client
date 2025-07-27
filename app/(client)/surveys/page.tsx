import SurveyListContainer from "components/client/survey/SurveyListContainer";

export default function SurveysPage() {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">설문조사 목록</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          다양한 설문조사에 참여하고 리워드를 받으세요
        </p>
      </div>

      <SurveyListContainer containerHeight={800} />
    </div>
  );
}
