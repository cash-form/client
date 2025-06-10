"use client";

import { useState, useCallback } from "react";
import BasicSettings from "./BasicSettings";
import SelectType from "./SelectType";
import SurveyFooter from "./SurveyFooter";
import { useSurveyMutation } from "../../../src/lib/queries/survey";

interface SurveyFormData {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  headerImages: File[];
  questions: any[];
  footerText: string;
  footerImages: File[];
  product: "basic" | "deluxe" | "premium" | "professional";
}

export default function SurveyFormWrapper() {
  const [formData, setFormData] = useState<SurveyFormData>({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    headerImages: [],
    questions: [],
    footerText: "",
    footerImages: [],
    product: "basic",
  });

  const { mutate: registerSurvey } = useSurveyMutation();

  const handleBasicSettingsChange = useCallback(
    (data: Partial<SurveyFormData>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const handleQuestionAdd = useCallback((questions: any[]) => {
    setFormData((prev) => ({
      ...prev,
      questions: questions,
    }));
  }, []);

  const handleFooterChange = useCallback((data: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

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
      const processedImages = await Promise.all(
        formData.headerImages.map(async (image: File) => {
          return await convertImageToBase64(image);
        })
      );

      const processedQuestionImages = await Promise.all(
        formData.questions.map(async (question) => {
          const { id, ...questionWithoutId } = question;
          return {
            ...questionWithoutId,
            multipleCount:
              question.type === "multiple" ? question.multipleCount : 0,
            images: await Promise.all(
              question.images.map(
                async (image: File) => await convertImageToBase64(image)
              )
            ),
          };
        })
      );

      const processedFooterImages = await Promise.all(
        formData.footerImages.map(async (image: File) => {
          return await convertImageToBase64(image);
        })
      );

      const formatDate = (date: string) => {
        return new Date(date).toISOString();
      };

      const requestData = {
        product: formData.product,
        title: formData.title,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
        header: {
          text: formData.description,
          images: processedImages,
        },
        questions: processedQuestionImages,
        footer: {
          text: formData.footerText,
          images: processedFooterImages,
        },
      };

      console.log("전송할 데이터:", requestData);
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
      console.log(question);
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
      <SurveyFooter formData={formData} onChange={handleFooterChange} />
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
