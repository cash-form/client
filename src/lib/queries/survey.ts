import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SurveyFormData {
  product: "basic" | "deluxe" | "premium" | "professional";
  title: string;
  startDate: string;
  endDate: string;
  header: {
    text: string;
    images: string[];
  };
  questions: Array<{
    type: "multiple" | "subjective" | "descriptive" | "ox" | "point";
    title: string;
    text: string;
    images: string[];
    options: string[];
    multipleCount: number;
    maxLength: number;
  }>;
  footer: {
    text: string;
    images: string[];
  };
}

async function registerSurvey(data: SurveyFormData) {
  const response = await fetch("/api/surveys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("설문 등록에 실패했습니다.");
  }

  return response.json();
}

export function useSurveyMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerSurvey,
    onSuccess: () => {
      // 성공 시 결제페이지로 이동
      router.push("/surveys");
    },
  });
}
