"use client";

import Link from "next/link";
import CommonInput from "components/common/input/CommonInput";
import CommonButton from "components/common/button/CommonButton";
import useLoginForm from "hooks/useLoginForm";
import { useRouter } from "next/navigation";
import { useLogin } from "src/lib/queries/user";

export default function LoginForm({ onClose }: { onClose?: () => void }) {
  const {
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    handleChange,
    error,
    setError,
    validate,
  } = useLoginForm();
  const router = useRouter();
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
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
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
          </div>

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

          {/* 에러 메시지 */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
