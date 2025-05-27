"use client";
import Link from "next/link";
import CommonInput from "components/common/input/CommonInput";
import CommonButton from "components/common/button/CommonButton";
import AgreementCheckboxGroup from "components/common/checkbox/AgreementCheckboxGroup";
import useSignupForm from "hooks/useSignupForm";
import { useRouter } from "next/navigation";
import { useRegister } from "src/lib/queries/user";

export default function SignupForm() {
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
  } = useSignupForm();
  const router = useRouter();
  const register = useRegister(() => {
    alert("회원가입 성공!");
    router.push("/?login=1");
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
        onError: (error: any) => {
          alert("회원가입 실패: " + (error?.message || "알 수 없는 오류"));
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex w-100 ">
      <div className="w-full">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <CommonInput
              label="닉네임"
              id="nickname"
              name="nickname"
              type="text"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleChange}
            />
            {error.nickname && (
              <div className="text-caution text-xs mt-1">{error.nickname}</div>
            )}
            <CommonInput
              label="이메일"
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="email@cashform.com"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && (
              <div className="text-caution text-xs mt-1">{error.email}</div>
            )}
            <CommonInput
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && (
              <div className="text-caution text-xs mt-1">{error.password}</div>
            )}
            <CommonInput
              label="비밀번호 확인"
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
            {error.passwordConfirm && (
              <div className="text-caution text-xs mt-1">
                {error.passwordConfirm}
              </div>
            )}
          </div>

          <AgreementCheckboxGroup
            agreements={agreements}
            onCheckbox={handleAgreementCheckbox}
          />

          <div className="flex gap-2 flex-col">
            <CommonButton
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-m font-bold rounded-md  text-white bg-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              회원가입
            </CommonButton>
            <CommonButton
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-m font-bold rounded-md  text-white bg-secondary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-0"
              onClick={() => router.push("/?login=1")}
            >
              로그인하러 가기
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
