"use client";

import { useEffect, useState } from "react";
import {
  useSurveyDetail,
  useSurveySubmission,
} from "src/lib/queries/survey-detail";
import {
  SurveyDetailResponse,
  SurveyAnswer,
  SurveySubmission,
} from "src/types/survey-detail";
import SurveyDetailHeader from "components/client/survey/SurveyDetailHeader";
import SurveyQuestion from "components/client/survey/SurveyQuestion";
import SurveyDetailFooter from "components/client/survey/SurveyDetailFooter";
import { Button } from "src/components/ui/button";
import LoadingSpinner from "components/common/loading/LoadingSpinner";

interface SurveyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SurveyDetailPage({ params }: SurveyDetailPageProps) {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const { data: survey, isLoading: loading, error } = useSurveyDetail(id);

  const surveySubmissionMutation = useSurveySubmission();

  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);

  const processedSurvey = survey
    ? {
        ...survey,
        questions: (() => {
          if (survey.questions && !Array.isArray(survey.questions)) {
            const singleQuestion = survey.questions as Partial<
              SurveyDetailResponse["questions"][0]
            >;
            return [
              {
                id: singleQuestion.id || 1,
                type: singleQuestion.type || 0,
                title: singleQuestion.title || "",
                text: singleQuestion.text || "",
                images: singleQuestion.images || [],
                options: singleQuestion.options || [],
                multipleCount: singleQuestion.multipleCount || 0,
                maxLength: singleQuestion.maxLength || 0,
              },
            ];
          }

          // 질문 배열에 ID가 없는 경우 추가
          if (Array.isArray(survey.questions)) {
            return survey.questions.map((q, index) => ({
              ...q,
              id: q.id || index + 1,
            }));
          }

          return survey.questions;
        })(),
      }
    : null;

  const handleAnswerChange = (answer: SurveyAnswer) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === answer.questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === answer.questionId ? answer : a
        );
      } else {
        return [...prev, answer];
      }
    });
  };

  const handleSubmit = () => {
    if (!processedSurvey) return;

    const submission: SurveySubmission = {
      surveyId: processedSurvey.id,
      answers,
    };

    surveySubmissionMutation.mutate(submission, {
      onError: () => {
        alert("설문 제출에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const isValidAnswer = () => {
    if (
      !processedSurvey ||
      !processedSurvey.questions ||
      processedSurvey.questions.length === 0
    )
      return false;
    // Check if all questions have been answered
    return processedSurvey.questions.every((question) =>
      answers.some((answer) => answer.questionId === question.id)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !processedSurvey) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">오류</h1>
          <p className="text-gray-600">
            {error?.message || "설문조사를 찾을 수 없습니다."}
          </p>
        </div>
      </div>
    );
  }

  if (surveySubmissionMutation.isSuccess) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              제출 완료
            </h1>
            <p className="text-green-700 mb-6">
              설문조사 응답이 성공적으로 제출되었습니다.
            </p>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-green-800 font-semibold">
                💰 리워드 {processedSurvey.credit || 0}원이 지급됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const now = new Date();
  const startDate = new Date(processedSurvey.startDate);
  const endDate = new Date(processedSurvey.endDate);
  const isActive = now >= startDate && now <= endDate;

  if (!isActive) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <SurveyDetailHeader
            title={processedSurvey.title}
            credit={processedSurvey.credit || 0}
            participantCount={processedSurvey.participantCount}
            startDate={processedSurvey.startDate}
            endDate={processedSurvey.endDate}
            header={processedSurvey.headers}
          />
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-yellow-800 mb-2">
              {now < startDate ? "설문조사 시작 전" : "설문조사 종료"}
            </h2>
            <p className="text-yellow-700">
              {now < startDate
                ? `${new Date(processedSurvey.startDate).toLocaleDateString(
                    "ko-KR"
                  )}부터 참여 가능합니다.`
                : "이 설문조사는 종료되었습니다."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <SurveyDetailHeader
          title={processedSurvey.title}
          credit={processedSurvey.credit || 0}
          participantCount={processedSurvey.participantCount}
          startDate={processedSurvey.startDate}
          endDate={processedSurvey.endDate}
          header={processedSurvey.headers}
        />

        {processedSurvey.questions && processedSurvey.questions.length > 0 ? (
          processedSurvey.questions.map((question, index) => (
            <SurveyQuestion
              key={question.id}
              question={question}
              questionIndex={index}
              onAnswerChange={handleAnswerChange}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
            <p className="text-gray-500">설문 질문이 없습니다.</p>
          </div>
        )}

        <SurveyDetailFooter footer={processedSurvey.footers} />

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>
                💰 설문 완료 시{" "}
                <span className="font-bold text-blue-600">
                  {processedSurvey.credit || 0}원
                </span>{" "}
                리워드 지급
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!isValidAnswer() || surveySubmissionMutation.isPending}
              size="lg"
              className="min-w-32"
            >
              {surveySubmissionMutation.isPending
                ? "제출 중..."
                : "설문 제출하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
