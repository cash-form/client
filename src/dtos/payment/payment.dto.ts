// 결제 타입 정의
export enum PaymentType {
  CREDIT = "CREDIT",
  SURVEY = "SURVEY",
}

// 결제 상태 정의
export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

// 결제 방법 정의
export enum PaymentMethod {
  NAVER_PAY = "naver_pay",
  CARD = "card",
  BANK_TRANSFER = "bank_transfer",
}

// 결제 요청 DTO
export interface PaymentRequestDto {
  target: number; // 결제 대상 ID
  amount: number; // 결제 금액
  type: PaymentType; // 결제 타입
  product: string; // 상품명
  method: PaymentMethod; // 결제 방법
  returnUrl: string; // 결제 완료 후 리턴 URL
  cancelUrl?: string; // 결제 취소 후 리턴 URL
}

// 결제 응답 DTO
export interface PaymentResponseDto {
  id: string; // 결제 ID
  status: PaymentStatus; // 결제 상태
  amount: number; // 결제 금액
  method: PaymentMethod; // 결제 방법
  createdAt: string; // 결제 생성일
  completedAt?: string; // 결제 완료일
  failureReason?: string; // 실패 사유
}

// 네이버페이 설정
export interface NaverPayConfig {
  mode: "development" | "production";
  clientId: string;
  chainId: string;
}

// 네이버페이 결제창 열기 파라미터
export interface NaverPayOpenParams {
  merchantPayKey: string;
  productName: string;
  totalPayAmount: number;
  taxScopeAmount: number;
  taxExScopeAmount: number;
  returnUrl: string;
  merchantUserKey: string;
  productCount?: number;
  productItems?: Array<{
    categoryType: string;
    categoryId: string;
    uid: string;
    name: string;
    payReferrer?: string;
    count: number;
  }>;
}

// 네이버페이 결제 결과
export interface NaverPayResult {
  code: string;
  message: string;
  paymentId?: string;
  resultCode?: string;
  resultMessage?: string;
}