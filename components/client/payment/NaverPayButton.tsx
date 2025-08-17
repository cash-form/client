"use client";

import { Button } from "src/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { PaymentFormData } from "src/types/payment";
import { useNaverPay } from "src/lib/queries/payment";

interface NaverPayButtonProps {
  paymentData: PaymentFormData;
  returnUrl: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function NaverPayButton({
  paymentData,
  returnUrl,
  disabled = false,
  children,
}: NaverPayButtonProps) {
  const naverPay = useNaverPay();

  const handlePayment = async () => {
    try {
      await naverPay.mutateAsync({ paymentData, returnUrl });
    } catch (error) {
      console.error("네이버페이 결제 실패:", error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || naverPay.isPending}
      size="lg"
      className="w-full bg-green-500 hover:bg-green-600 text-white"
    >
      {naverPay.isPending ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          결제 처리중...
        </>
      ) : (
        children || (
          <>
            <FontAwesomeIcon icon={faCreditCard} className="w-5 h-5 mr-2" />
            네이버페이로 결제하기
          </>
        )
      )}
    </Button>
  );
}
