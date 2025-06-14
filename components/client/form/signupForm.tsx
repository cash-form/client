"use client";
import { useState, useEffect } from "react";
import AgreementCheckboxGroup from "components/common/checkbox/AgreementCheckboxGroup";
import useSignupForm from "hooks/useSignupForm";
import { useRegister, useEmail, useNickname } from "src/lib/queries/user";
import Title from "components/common/title/title";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import useDebounce from "hooks/useDebounce";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useLoginModalStore } from "src/stores/useLoginModalStore";
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/button";
import { RegisterRequestDto } from "src/dtos/user/auth.dto";

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

  // 중복 체크 에러 상태
  const [emailCheckError, setEmailCheckError] = useState<string>("");
  const [nicknameCheckError, setNicknameCheckError] = useState<string>("");

  // 디바운스된 값들
  const debouncedNickname = useDebounce(formData.nickname || "", 400);
  const debouncedEmail = useDebounce(formData.email || "", 400);

  // API 호출
  const { data: nicknameData, error: nicknameError } = useNickname(
    debouncedNickname,
    validateNickname(debouncedNickname) && debouncedNickname?.trim() !== ""
  );
  const { data: emailData, error: emailError } = useEmail(
    debouncedEmail,
    debouncedEmail?.trim() !== "" && validateEmail(debouncedEmail)
  );

  const register = useRegister(() => {
    Swal.fire({
      title: "회원가입 완료!",
      text: "회원가입이 완료되었습니다.",
      icon: "success",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  });

  // 이메일 중복 체크 결과 처리
  useEffect(() => {
    setEmailCheckError("");
  }, [formData.email]);

  useEffect(() => {
    if (emailData?.result) {
      setEmailCheckError("");
      setIsEmailValid(true);
    }
    if (emailError) {
      const errorMessage =
        (emailError as any)?.response?.message ||
        "이메일 중복 체크 중 오류가 발생했습니다.";
      setEmailCheckError(errorMessage);
      setIsEmailValid(false);
    }
  }, [emailData, emailError]);

  // 닉네임 중복 체크 결과 처리
  useEffect(() => {
    setNicknameCheckError("");
  }, [formData.nickname]);

  useEffect(() => {
    if (nicknameData?.result) {
      setNicknameCheckError("");
      setIsNicknameValid(true);
    }
    if (nicknameError) {
      const errorMessage =
        (nicknameError as any)?.response?.message ||
        "닉네임 중복 체크 중 오류가 발생했습니다.";
      setNicknameCheckError(errorMessage);
      setIsNicknameValid(false);
    }
  }, [nicknameData, nicknameError]);

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);

    const registerData: RegisterRequestDto = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      marketingConsent: agreements.marketing ?? false,
      newsletterConsent: agreements.newsletter ?? false,
    };

    register.mutate(registerData, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
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
          <div className="space-y-4">
            {/* 닉네임 */}
            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                required
                placeholder="닉네임을 입력하세요"
                value={formData.nickname || ""}
                onChange={handleChange}
                aria-invalid={!!(error?.nickname || nicknameCheckError)}
              />
              {error?.nickname && (
                <div className="text-caution text-xs">{error.nickname}</div>
              )}
              {nicknameCheckError && (
                <div className="text-caution text-xs">{nicknameCheckError}</div>
              )}
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@cashform.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!(error?.email || emailCheckError)}
              />
              {error?.email && (
                <div className="text-caution text-xs">{error.email}</div>
              )}
              {emailCheckError && (
                <div className="text-caution text-xs">{emailCheckError}</div>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!error?.password}
              />
              {error?.password && (
                <div className="text-caution text-xs">{error.password}</div>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.passwordConfirm || ""}
                onChange={handleChange}
                aria-invalid={!!error?.passwordConfirm}
              />
              {error?.passwordConfirm && (
                <div className="text-caution text-xs">
                  {error.passwordConfirm}
                </div>
              )}
            </div>
          </div>

          <AgreementCheckboxGroup
            agreements={agreements}
            onCheckbox={handleAgreementCheckbox}
          />

          <div className="flex gap-2 flex-col">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading || !isNicknameValid}
            >
              회원가입
            </Button>
            <div className="flex gap-2 justify-center items-center">
              <div className="mr-1">이미 계정이 있으신가요?</div>
              <Button
                onClick={openLoginModal}
                variant="link"
                className="text-primary"
                size="sm"
              >
                로그인하러 가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
