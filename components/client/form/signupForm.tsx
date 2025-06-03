"use client";
import CommonButton from "components/common/button/CommonButton";
import { useState, useEffect } from "react";
import AgreementCheckboxGroup from "components/common/checkbox/AgreementCheckboxGroup";
import useSignupForm from "hooks/useSignupForm";
import { useRegister } from "src/lib/queries/user";
import Title from "components/common/title/title";
import AuthInputFields from "components/common/authInputFields/authInputFields";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useLoginModalStore } from "src/stores/useLoginModalStore";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const {
    formData,
    agreements,
    isLoading,
    setIsLoading,
    handleChange,
    handleAgreementCheckbox,
    error,
    setError,
    validate,
    isFormValid,
    validateNickname,
    validateEmail,
  } = useSignupForm();
  const { openModal } = useLoginModalStore();
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const register = useRegister(() => {
    Swal.fire({
      title: "회원가입 완료!",
      text: "회원가입이 완료되었습니다.",
      icon: "success",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        router.push("/?login=1");
      }
    });
  });

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    register.mutate(
      {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        marketingConsent: agreements.marketing ?? false,
        newsletterConsent: agreements.newsletter ?? false,
      },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };
  const openLoginModal = () => {
    openModal();
  };

  return (
    <div className="flex w-100 ">
      <div className="w-full">
        <div>
          <Title>회원가입</Title>
        </div>
        <div className="mt-8 space-y-6">
          <AuthInputFields
            type="signup"
            formData={formData}
            handleChange={handleChange}
            error={error}
            onNicknameValidChange={setIsNicknameValid}
            onEmailValidChange={setIsEmailValid}
            validateNickname={validateNickname}
            validateEmail={validateEmail}
          />

          <AgreementCheckboxGroup
            agreements={agreements}
            onCheckbox={handleAgreementCheckbox}
          />

          <div className="flex gap-2 flex-col">
            <CommonButton
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading || !isNicknameValid}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-m font-bold rounded-md  text-white bg-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              회원가입
            </CommonButton>
            <CommonButton
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-m font-bold rounded-md  text-white bg-secondary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-0"
              onClick={openLoginModal}
            >
              로그인하러 가기
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
