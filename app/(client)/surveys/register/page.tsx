import BasicSettings from "components/client/survey/BasicSettings";
import SelectType from "components/client/survey/SelectType";
import SurveyFooter from "components/client/survey/SurveyFooter";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">설문 등록 </h1>
      <BasicSettings />
      <SelectType />
      <SurveyFooter />
    </div>
  );
}
