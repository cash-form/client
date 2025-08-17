"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "src/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const handleGoToSurveys = () => {
    router.push("/surveys");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          설문이 성공적으로 등록되었습니다!
        </h1>
        {title && (
          <p className="text-gray-600 mb-6">
            "{title}" 설문이 등록되었습니다.
          </p>
        )}
        <Button onClick={handleGoToSurveys} size="lg" className="w-full">
          설문 목록으로 이동
        </Button>
      </div>
    </div>
  );
}