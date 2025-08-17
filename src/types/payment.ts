import { PaymentType } from "src/dtos/payment/payment.dto";

export interface PaymentState {
  isLoading: boolean;
  isProcessing: boolean;
  error?: string;
  success: boolean;
}

export interface PaymentFormData {
  target: number;
  amount: number;
  type: PaymentType;
  product: string;
  method: "naver_pay"; // 네이버페이 전용
}

export interface PaymentProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  type: PaymentType;
  features: string[];
}

// 크레딧 상품 정의
export interface CreditProduct extends PaymentProduct {
  type: PaymentType.CREDIT;
  creditAmount: number; // 구매할 크레딧 양
}

// 설문조사 결제 상품 정의  
export interface SurveyProduct extends PaymentProduct {
  type: PaymentType.SURVEY;
  surveyId: number;
  participantCount: number; // 목표 참여자 수
}

// 네이버페이 SDK 전역 객체 타입 정의
declare global {
  interface Window {
    Naver: {
      Pay: {
        create: (config: import("src/dtos/payment/payment.dto").NaverPayConfig) => NaverPayInstance;
      };
    };
  }
}

export interface NaverPayInstance {
  open: (params: import("src/dtos/payment/payment.dto").NaverPayOpenParams) => void;
}