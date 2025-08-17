import { PaymentFormData } from "src/types/payment";
import { NaverPayConfig, NaverPayOpenParams, NaverPayResult } from "src/dtos/payment/payment.dto";

// 네이버페이 SDK 로드 확인
export const isNaverPaySDKLoaded = (): boolean => {
  return typeof window !== "undefined" && !!window.Naver?.Pay;
};

// 네이버페이 SDK 로드 대기
export const waitForNaverPaySDK = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isNaverPaySDKLoaded()) {
      resolve(true);
      return;
    }

    let attempts = 0;
    const maxAttempts = 50; // 5초 대기 (100ms * 50)
    
    const checkSDK = () => {
      attempts++;
      if (isNaverPaySDKLoaded()) {
        resolve(true);
      } else if (attempts >= maxAttempts) {
        resolve(false);
      } else {
        setTimeout(checkSDK, 100);
      }
    };

    checkSDK();
  });
};

// 네이버페이 설정 검증 (SDK 로드 대기 포함)
export const validateNaverPayConfig = async (): Promise<{ isValid: boolean; errors: string[] }> => {
  const errors: string[] = [];

  const clientId = process.env.NEXT_PUBLIC_NAVER_PAY_CLIENT_ID;
  const chainId = process.env.NEXT_PUBLIC_NAVER_PAY_CHAIN_ID;

  if (!clientId) {
    errors.push("NEXT_PUBLIC_NAVER_PAY_CLIENT_ID가 설정되지 않았습니다.");
  }

  if (!chainId) {
    errors.push("NEXT_PUBLIC_NAVER_PAY_CHAIN_ID가 설정되지 않았습니다.");
  }

  // SDK 로드 대기
  const sdkLoaded = await waitForNaverPaySDK();
  if (!sdkLoaded) {
    errors.push("네이버페이 SDK가 로드되지 않았습니다.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 네이버페이 결제창 열기
export const openNaverPay = async (
  paymentData: PaymentFormData,
  merchantUserKey: string,
  returnUrl: string
): Promise<NaverPayResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const validation = await validateNaverPayConfig();
      if (!validation.isValid) {
        reject(new Error(validation.errors.join(", ")));
        return;
      }

      const clientId = process.env.NEXT_PUBLIC_NAVER_PAY_CLIENT_ID!;
      const chainId = process.env.NEXT_PUBLIC_NAVER_PAY_CHAIN_ID!;

      const config: NaverPayConfig = {
        mode: process.env.NODE_ENV === "production" ? "production" : "development",
        clientId,
        chainId,
      };

      const naverPay = window.Naver.Pay.create(config);

      const merchantPayKey = `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const params: NaverPayOpenParams = {
        merchantPayKey,
        productName: paymentData.product,
        totalPayAmount: paymentData.amount,
        taxScopeAmount: paymentData.amount,
        taxExScopeAmount: 0,
        returnUrl,
        merchantUserKey,
        productCount: 1,
        productItems: [
          {
            categoryType: "ETC",
            categoryId: "ETC",
            uid: paymentData.target.toString(),
            name: paymentData.product,
            count: 1,
          },
        ],
      };

      // 전역 콜백 함수 설정
      (window as any).naverPayCallback = (result: NaverPayResult) => {
        if (result.code === "Success") {
          resolve(result);
        } else {
          reject(new Error(result.message || "네이버페이 결제에 실패했습니다."));
        }
        // 콜백 함수 정리
        delete (window as any).naverPayCallback;
      };

      naverPay.open(params);
    } catch (error) {
      reject(error);
    }
  });
};