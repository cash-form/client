"use client";

import { useState } from "react";
import { PaymentFormData, PaymentProduct } from "src/types/payment";
import { PaymentType } from "src/dtos/payment/payment.dto";
import NaverPayButton from "./NaverPayButton";
import { Button } from "src/components/ui/button";

interface PaymentFormProps {
  products: PaymentProduct[];
  onPaymentSuccess?: (paymentData: PaymentFormData) => void;
  returnUrl: string;
}

export default function PaymentForm({
  products,
  onPaymentSuccess,
  returnUrl,
}: PaymentFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<PaymentProduct | null>(
    products[0] || null
  );

  if (!selectedProduct) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">사용 가능한 상품이 없습니다.</p>
      </div>
    );
  }

  const paymentData: PaymentFormData = {
    target: selectedProduct.id,
    amount: selectedProduct.price,
    type: selectedProduct.type,
    product: selectedProduct.name,
    method: "naver_pay",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedProduct.id === product.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {product.price.toLocaleString()}원
                </div>
                {product.type === PaymentType.CREDIT && (
                  <div className="text-sm text-gray-500">
                    크레딧 {(product as any).creditAmount}개
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">총 결제 금액</span>
          <span className="text-2xl font-bold text-blue-600">
            {selectedProduct.price.toLocaleString()}원
          </span>
        </div>

        <NaverPayButton
          paymentData={paymentData}
          returnUrl={returnUrl}
        />
      </div>
    </div>
  );
}