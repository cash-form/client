"use client";

import Link from "next/link";
import CommonButton from "components/common/button/CommonButton";
import useLoginForm from "hooks/useLoginForm";
import { useLogin } from "src/lib/queries/user";
import Title from "components/common/title/title";
import AuthInputFields from "components/common/authInputFields/authInputFields";

export default function LoginForm({ onClose }: { onClose?: () => void }) {
  const { formData, isLoading, setIsLoading, handleChange, error, validate } =
    useLoginForm();
  const login = useLogin(() => {
    if (onClose) onClose();
  });

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);

    try {
      login.mutate({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 pt-6">
        <div>
          <Title>로그인</Title>
        </div>
        <div className="mt-8 space-y-6">
          <AuthInputFields
            type="login"
            formData={formData}
            handleChange={handleChange}
            error={error}
          />

          <div>
            <CommonButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-m font-bold rounded-md  text-white bg-secondary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              로그인
            </CommonButton>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="text-center mb-0">
            <span className="text-sm text-gray-600">
              계정이 없으신가요?
              <Link
                href="/signup"
                className="ml-1 font-medium text-primary cursor-pointer"
                onClick={onClose}
              >
                회원가입
              </Link>
            </span>
          </div>

          <div className="flex justify-center space-x-4">
            <button type="button" className="flex items-center">
              카카오톡
            </button>
            <button type="button" className="flex items-center ">
              네이버
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
