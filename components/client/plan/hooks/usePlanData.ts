import { useMemo } from "react";
import { PLAN_CONFIGS } from "src/config/plan.config";
import { Product } from "src/types/survey";
import { PlanDisplayData } from "components/client/plan/types";
import {
  transformPlanToDisplayData,
  getPlanUIConfig,
} from "components/client/plan/utils/planHelpers";

export const usePlanData = (planId: Product) => {
  const planData = useMemo(() => {
    const planConfig = PLAN_CONFIGS[planId];
    const uiConfig = getPlanUIConfig(planConfig.name);
    const displayData = transformPlanToDisplayData(planConfig);

    return {
      planConfig,
      uiConfig,
      displayData,
    };
  }, [planId]);

  return planData;
};

export const useAllPlans = () => {
  const planIds = useMemo(
    () => Object.keys(PLAN_CONFIGS).map((id) => Number(id) as Product),
    []
  );

  return planIds;
};
