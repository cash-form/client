"use client";

import { useState, useCallback, useMemo } from "react";
import BasicSettings from "./BasicSettings";
import SelectType from "./SelectType";
import SurveyFooter from "./SurveyFooter";
import PlanSelector from "./PlanSelector";
import { useSurveyMutation } from "../../../src/lib/queries/survey";
import { SurveyFormDto } from "../../../src/dtos/survey/request.dto";
import {
  FormState,
  convertQuestionType,
  Product,
} from "../../../src/types/survey";
import { PLAN_CONFIGS, formatPrice } from "../../../src/config/plan.config";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../src/components/ui/button";

export default function SurveyFormWrapper() {
  const [currentStep, setCurrentStep] = useState<"plan" | "form">("plan");
  const [formData, setFormData] = useState<FormState>({
    title: "",
    startDate: "",
    endDate: "",
    header: {
      text: "",
      images: [],
    },
    questions: [],
    footer: {
      text: "",
      images: [],
    },
    product: 1, // 기본값은 BASIC
  });

  const { mutate: registerSurvey } = useSurveyMutation();

  // 선택된 요금제의 제한사항
  const currentPlanConfig = useMemo(() => {
    return PLAN_CONFIGS[formData.product];
  }, [formData.product]);

  const handlePlanSelect = useCallback(
    (plan: Product) => {
      if (currentStep === "form" && formData.questions.length > 0) {
        Swal.fire({
          title: "요금제를 변경하시겠습니까?",
          text: "요금제 변경 시 작성된 모든 문항이 삭제됩니다.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "변경하기",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            setFormData((prev) => ({
              ...prev,
              product: plan,
              questions: [],
            }));

            setCurrentStep("plan");
          }
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          product: plan,
          questions: [], // 요금제 변경 시 기존 문항들 초기화
        }));
      }
    },
    [currentStep, formData.questions.length]
  );

  const handlePlanConfirm = useCallback(() => {
    setCurrentStep("form");
  }, []);

  const handleBasicSettingsChange = useCallback((data: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleQuestionAdd = useCallback(
    (questions: any[]) => {
      if (
        currentPlanConfig.maxQuestions > 0 &&
        questions.length > currentPlanConfig.maxQuestions
      ) {
        Swal.fire({
          title: "문항 수 제한",
          text: `${currentPlanConfig.maxQuestions}개까지만 추가할 수 있습니다. 더 많은 문항을 추가하려면 요금제를 업그레이드하세요.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "요금제 변경",
          cancelButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            setCurrentStep("plan");
          }
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        questions: questions,
      }));
    },
    [currentPlanConfig.maxQuestions]
  );

  const handleFooterChange = useCallback(
    (data: Partial<Pick<FormState, "footer">>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      // 요금제별 제한 체크
      if (
        currentPlanConfig.maxQuestions > 0 &&
        formData.questions.length > currentPlanConfig.maxQuestions
      ) {
        Swal.fire({
          title: "문항 수 초과",
          text: `선택한 요금제에서는 최대 ${currentPlanConfig.maxQuestions}개의 문항만 가능합니다.`,
          icon: "error",
        });
        return;
      }

      // 이미지 사용 제한 체크
      if (currentPlanConfig.maxImages === 0) {
        const hasImages =
          formData.header.images.length > 0 ||
          formData.footer.images.length > 0 ||
          formData.questions.some((q) => q.images.length > 0);

        if (hasImages) {
          Swal.fire({
            title: "이미지 사용 불가",
            text: "선택한 요금제에서는 이미지를 사용할 수 없습니다.",
            icon: "error",
          });
          return;
        }
      }

      const processedQuestions = formData.questions.map((question) => {
        const { id, ...questionWithoutId } = question;
        return {
          ...questionWithoutId,
          type: convertQuestionType(question.type),
          images: question.images,
        };
      });

      const formatDate = (date: string) => {
        return new Date(date).toISOString();
      };

      const requestData: SurveyFormDto = {
        product: formData.product,
        title: formData.title,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
        header: {
          text: formData.header.text,
          images: formData.header.images,
        },
        questions: processedQuestions,
        footer: {
          text: formData.footer.text,
          images: formData.footer.images,
        },
      };

      console.log("requestData:", requestData);
      registerSurvey(requestData);
    } catch (error) {
      console.error("설문 등록 중 오류 발생:", error);
    }
  }, [formData, registerSurvey, currentPlanConfig]);

  const isFormValid = useCallback(() => {
    if (!formData.title || !formData.startDate || !formData.endDate) {
      return false;
    }

    if (formData.questions.length === 0) {
      return false;
    }

    for (const question of formData.questions) {
      if (!question.text) {
        return false;
      }
      if (question.type === "multiple") {
        if (
          question.options.length < 2 ||
          question.options.some((opt: string) => !opt)
        ) {
          return false;
        }
      }
    }

    return true;
  }, [formData]);

  // 요금제 선택 단계
  if (currentStep === "plan") {
    return (
      <div className="min-h-screen bg-gray-50">
        <PlanSelector
          selectedPlan={formData.product}
          onPlanSelect={handlePlanSelect}
        />
        <div className="max-w-5xl mx-auto px-6 pb-8">
          <div className="text-center">
            <Button onClick={handlePlanConfirm} size="lg">
              선택한 요금제로 계속하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 설문조사 작성 단계
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep("plan")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentPlanConfig.name} 요금제
                </h2>
                <p className="text-gray-600">
                  {formatPrice(currentPlanConfig.price)} · 문항{" "}
                  {formData.questions.length}/
                  {currentPlanConfig.maxQuestions === 0
                    ? "∞"
                    : currentPlanConfig.maxQuestions}{" "}
                  · 이미지{" "}
                  {currentPlanConfig.maxImages > 0
                    ? `최대 ${currentPlanConfig.maxImages}개`
                    : "불가"}
                </p>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
              선택됨
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <BasicSettings
            formData={formData}
            onChange={handleBasicSettingsChange}
            planConfig={currentPlanConfig}
          />

          <SelectType
            questions={formData.questions}
            onQuestionAdd={handleQuestionAdd}
            planConfig={currentPlanConfig}
            currentQuestionCount={formData.questions.length}
          />

          <SurveyFooter
            formData={{ footer: formData.footer }}
            onChange={handleFooterChange}
            planConfig={currentPlanConfig}
          />
        </div>

        <div className="mt-12">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            size="lg"
            className="w-full"
          >
            {isFormValid() ? (
              <>
                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 mr-2" />
                설문 등록하기
              </>
            ) : (
              "모든 필수 항목을 입력해주세요"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
