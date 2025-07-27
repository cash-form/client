import {
  faStar,
  faCrown,
  faGem,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { PlanName } from "components/client/plan/types";

export const PLAN_UI_CONFIGS = {
  BASIC: {
    color: "from-blue-500 to-blue-600",
    icon: faStar,
  },
  DELUXE: {
    color: "from-green-500 to-green-600",
    icon: faCrown,
  },
  PREMIUM: {
    color: "from-purple-500 to-purple-600",
    icon: faGem,
  },
  PROFESSIONAL: {
    color: "from-yellow-500 to-yellow-600",
    icon: faTrophy,
  },
} as const satisfies Record<PlanName, { color: string; icon: any }>;

export const PLAN_FEATURE_ICONS = {
  QUESTION: "📝",
  ANSWER: "📊",
  TARGET: "🎯",
  MONEY: "💰",
  GIFT: "🎁",
  IMAGE_ALLOWED: "✅",
  IMAGE_BLOCKED: "❌",
  PAYBACK: "💸",
} as const;
