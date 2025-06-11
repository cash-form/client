"use client";

import { useState, useCallback } from "react";
import BasicSettings from "./BasicSettings";
import SelectType from "./SelectType";
import SurveyFooter from "./SurveyFooter";
import { useSurveyMutation } from "../../../src/lib/queries/survey";
import { SurveyFormDto } from "../../../src/dtos/survey/request.dto";
import { FormState, convertQuestionType } from "../../../src/types/survey";

export default function SurveyFormWrapper() {
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
    product: 1,
  });

  const { mutate: registerSurvey } = useSurveyMutation();

  const handleBasicSettingsChange = useCallback((data: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleQuestionAdd = useCallback((questions: any[]) => {
    setFormData((prev) => ({
      ...prev,
      questions: questions,
    }));
  }, []);

  const handleFooterChange = useCallback(
    (data: Partial<Pick<FormState, "footer">>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const convertImageToBase64 = useCallback(
    async (file: File): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result as string);
          } else {
            reject(new Error("Failed to convert image to base64"));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const processedHeaderImages = await Promise.all(
        formData.header.images.map(async (image: File) => {
          return await convertImageToBase64(image);
        })
      );

      const processedQuestionImages = await Promise.all(
        formData.questions.map(async (question) => {
          const { id, ...questionWithoutId } = question;
          return {
            ...questionWithoutId,
            type: convertQuestionType(question.type),
            images: await Promise.all(
              question.images.map(
                async (image: File) => await convertImageToBase64(image)
              )
            ),
          };
        })
      );

      const processedFooterImages = await Promise.all(
        formData.footer.images.map(async (image: File) => {
          return await convertImageToBase64(image);
        })
      );

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
          images: processedHeaderImages,
        },
        questions: processedQuestionImages,
        footer: {
          text: formData.footer.text,
          images: processedFooterImages,
        },
      };

      console.log("requestData:", requestData);
      registerSurvey(requestData);
    } catch (error) {
      console.error("설문 등록 중 오류 발생:", error);
    }
  }, [formData, convertImageToBase64, registerSurvey]);

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

  return (
    <div className="space-y-8">
      {/* 설문조사 기본 내용 */}
      <BasicSettings formData={formData} onChange={handleBasicSettingsChange} />
      {/* 질문 추가 */}
      <SelectType onQuestionAdd={handleQuestionAdd} />
      {/* 설문조사 하단 내용 */}
      <SurveyFooter
        formData={{ footer: formData.footer }}
        onChange={handleFooterChange}
      />
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`w-full py-3 rounded-lg transition-colors ${
            isFormValid()
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          설문 등록하기
        </button>
      </div>
    </div>
  );
}
