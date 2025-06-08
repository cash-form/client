import SurveyFormWrapper from "components/client/survey/SurveyFormWrapper";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">설문 등록</h1>
      <SurveyFormWrapper />
    </div>
  );
}
