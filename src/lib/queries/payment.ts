import { useMutation } from "@tanstack/react-query";
import { 
  PaymentResponseDto,
  NaverPayResult
} from "src/dtos/payment/payment.dto";
import { fetchWithAuth } from "src/lib/api/commonFetch.utility";
import { PaymentFormData } from "src/types/payment";
import { openNaverPay, validateNaverPayConfig } from "src/lib/utils/naverpay";
import { useMe } from "./user";
import Swal from "sweetalert2";

// 결제 상태 확인 API
export const checkPaymentStatus = async (
  paymentId: string
): Promise<PaymentResponseDto> => {
  const response = await fetchWithAuth(
    `/v1/payments/${paymentId}/status`,
    {
      method: "GET",
    },
    true
  );
  return response as PaymentResponseDto;
};

// 네이버페이 결제 훅 (클라이언트 사이드 SDK 사용)
export const useNaverPay = () => {
  const { data: user } = useMe();

  return useMutation<NaverPayResult, Error, { paymentData: PaymentFormData; returnUrl: string }>({
    mutationFn: async ({ paymentData, returnUrl }) => {
      // 설정 검증
      const configValidation = await validateNaverPayConfig();
      if (!configValidation.isValid) {
        throw new Error(`네이버페이 설정 오류: ${configValidation.errors.join(", ")}`);
      }

      // 사용자 정보 확인
      if (!user?.id) {
        throw new Error("로그인이 필요합니다.");
      }

      // 네이버페이 결제창 열기
      return openNaverPay(paymentData, user.id.toString(), returnUrl);
    },
    onError: (error: any) => {
      console.error("네이버페이 결제 실패:", error);
      Swal.fire({
        title: "결제 실패",
        text: error?.message || "네이버페이 결제 중 오류가 발생했습니다.",
        icon: "error",
      });
    },
  });
};


// 결제 상태 확인 훅
export const usePaymentStatus = () => {
  return useMutation({
    mutationFn: checkPaymentStatus,
    onError: (error: any) => {
      console.error("결제 상태 확인 실패:", error);
    },
  });
};