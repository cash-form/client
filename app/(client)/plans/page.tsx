"use client";

import CreditPolicyGuide from "components/client/plan/CreditPolicyGuide";
import PlanFooter from "components/client/plan/PlanFooter";
import PlanHeader from "components/client/plan/PlanHeader";
import PricePlan from "components/client/plan/pricePlan";

export default function CreditPolicy() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-10">
        <PlanHeader />
        <PricePlan />
        <CreditPolicyGuide />
        <PlanFooter />
      </div>
    </div>
  );
}
