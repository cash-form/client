import * as React from "react";
import { useEffect, useState } from "react";
import CommonInput from "components/common/input/CommonInput";
import { useEmail, useNickname } from "src/lib/queries/user";
import useDebounce from "hooks/useDebounce";

interface AuthInputFieldsProps {
  type: "login" | "signup";
  formData: {
    email: string;
    password: string;
    nickname?: string;
    passwordConfirm?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNicknameValidChange?: (valid: boolean) => void;
  onEmailValidChange?: (valid: boolean) => void;
  error?: any;
  validateNickname?: (nickname: string) => boolean;
  validateEmail?: (email: string) => boolean;
}

export default function AuthInputFields({
  type,
  formData,
  handleChange,
  error,
  onNicknameValidChange,
  onEmailValidChange,
  validateNickname,
  validateEmail,
}: AuthInputFieldsProps) {
  const isLogin = type === "login";

  // 이메일 중복 체크 관련 상태
  const [emailCheckError, setEmailCheckError] = useState<string>("");
  // 닉네임 중복 체크 관련 상태
  const [nicknameCheckError, setNicknameCheckError] = useState<string>("");

  const debouncedNickname = useDebounce(
    type === "signup" ? formData.nickname || "" : "",
    400
  );

  const debouncedEmail = useDebounce(
    type === "signup" ? formData.email || "" : "",
    400
  );

  const { data: nicknameData, error: nicknameError } = useNickname(
    debouncedNickname,
    type === "signup" &&
      validateNickname?.(debouncedNickname) &&
      debouncedNickname?.trim() !== ""
  );
  const { data: emailData, error: emailError } = useEmail(
    debouncedEmail,
    type === "signup" &&
      debouncedEmail?.trim() !== "" &&
      validateEmail?.(debouncedEmail)
  );

  // 이메일 입력값 디바운스 처리
  useEffect(() => {
    if (!isLogin) {
      setEmailCheckError("");
    }
  }, [formData.email, isLogin]);

  // 디바운스된 이메일로 중복 체크
  useEffect(() => {
    if (emailData?.result) {
      setEmailCheckError("");
      if (!isLogin) {
        onEmailValidChange?.(true);
      }
    }
    if (emailError) {
      // FIXME: 타입 정의 후 변경
      const errorMessage =
        (emailError as any)?.response?.message ||
        "이메일 중복 체크 중 오류가 발생했습니다.";
      setEmailCheckError(errorMessage);
      if (!isLogin) {
        onEmailValidChange?.(false);
      }
    }
  }, [emailData, emailError, onEmailValidChange, isLogin]);

  // 닉네임 입력값 디바운스 처리
  useEffect(() => {
    if (!isLogin) {
      setNicknameCheckError("");
    }
  }, [formData.nickname, isLogin]);

  // 닉네임 중복 체크 결과 처리
  useEffect(() => {
    if (nicknameData?.result) {
      setNicknameCheckError("");
      if (!isLogin) {
        onNicknameValidChange?.(true);
      }
    }
    if (nicknameError) {
      // FIXME: 타입 정의 후 변경
      const errorMessage =
        (nicknameError as any)?.response?.message ||
        "닉네임 중복 체크 중 오류가 발생했습니다.";
      setNicknameCheckError(errorMessage);
      if (!isLogin) {
        onNicknameValidChange?.(false);
      }
    }
  }, [nicknameData, nicknameError, onNicknameValidChange, isLogin]);

  return (
    <div className="space-y-4">
      {!isLogin && (
        <>
          <CommonInput
            label="닉네임"
            id="nickname"
            name="nickname"
            type="text"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="닉네임을 입력하세요"
            value={formData.nickname || ""}
            onChange={handleChange}
          />
          {/* 닉네임 유효성 검사 에러 메시지*/}
          {error?.nickname && (
            <div className="text-caution text-xs mb-2">{error.nickname}</div>
          )}
          {/* 닉네임 중복 체크 에러 메시지 */}
          {nicknameCheckError && (
            <div className="text-caution text-xs mb-2">
              {nicknameCheckError}
            </div>
          )}
        </>
      )}

      {/* 이메일 - 공통 */}
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
      {/* 이메일 유효성 검사 에러 메시지  */}
      {!isLogin && error?.email && (
        <div className="text-caution text-xs mt-1">{error.email}</div>
      )}
      {/* 이메일 중복 체크 에러 메시지 */}
      {!isLogin && emailCheckError && (
        <div className="text-caution text-xs mt-1">{emailCheckError}</div>
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
      {!isLogin && error?.password && (
        <div className="text-caution text-xs mt-1">{error.password}</div>
      )}

      {!isLogin && (
        <>
          <CommonInput
            label="비밀번호 확인"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.passwordConfirm || ""}
            onChange={handleChange}
          />
          {error?.passwordConfirm && (
            <div className="text-caution text-xs mt-1">
              {error.passwordConfirm}
            </div>
          )}
        </>
      )}
    </div>
  );
}
