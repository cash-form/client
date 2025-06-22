"use client";

import { useState } from "react";
import { Product } from "../../../src/types/survey";
import { PLAN_CONFIGS, formatPrice } from "../../../src/config/plan.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface PlanSelectorProps {
  selectedPlan: Product;
  onPlanSelect: (plan: Product) => void;
}

export default function PlanSelector({
  selectedPlan,
  onPlanSelect,
}: PlanSelectorProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-foreground/90 mb-3">
          요금제 선택
        </h2>
        <p className="text-gray-600">프로젝트에 맞는 요금제를 선택하세요</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {([1, 2, 3, 4] as Product[]).map((planKey) => {
          const planData = PLAN_CONFIGS[planKey];
          const isSelected = selectedPlan === planKey;
          const isPopular = planKey === 3;

          return (
            <div
              key={planKey}
              onClick={() => onPlanSelect(planKey)}
              className={`relative bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected
                  ? "border-primary shadow-lg"
                  : "border-foreground/30 cursor-pointer"
              }`}
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground/90 mb-2">
                    {planData.name}
                  </h3>
                  <div className="text-3xl font-bold text-foreground/90">
                    {formatPrice(planData.price)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">VAT 포함</div>
                </div>

                <div className="space-y-3">
                  {planData.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-secondary w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-foreground/70 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 선택 표시 */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white w-3 h-3"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 선택된 요금제 요약 */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-foreground/90 mb-4">
          선택된 요금제: {PLAN_CONFIGS[selectedPlan].name}
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">최대 문항</div>
            <div className="text-2xl font-semibold mb-1">
              {PLAN_CONFIGS[selectedPlan].maxQuestions === 0
                ? "무제한"
                : `${PLAN_CONFIGS[selectedPlan].maxQuestions}개`}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600">이미지</div>
            <div className="text-2xl font-semibold mb-1">
              {PLAN_CONFIGS[selectedPlan].maxImages > 0
                ? `최대 ${PLAN_CONFIGS[selectedPlan].maxImages}개`
                : "불가"}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600">최대 답변</div>
            <div className="text-2xl font-semibold mb-1">
              {PLAN_CONFIGS[selectedPlan].maxAnswers === 0
                ? "무제한"
                : `${PLAN_CONFIGS[selectedPlan].maxAnswers}개`}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600">참여 보상</div>
            <div className="text-2xl font-semibold mb-1">
              {PLAN_CONFIGS[selectedPlan].participantReward}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
