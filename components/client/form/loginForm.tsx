"use client";

import Link from "next/link";
import useLoginForm from "hooks/useLoginForm";
import { useLogin } from "src/lib/queries/user";
import { LoginRequestDto } from "src/dtos/user/auth.dto";
import Title from "components/common/title/title";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import Swal from "sweetalert2";
import { Button } from "src/components/ui/button";

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
      const loginData: LoginRequestDto = {
        email: formData.email,
        password: formData.password,
      };

      login.mutate(loginData);
    } catch (error) {
      console.error("로그인 실패:", error);
      Swal.fire({
        title: "로그인 실패",
        text: "로그인 실패",
        icon: "error",
      });
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
          <div className="space-y-4">
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
              />
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
              />
            </div>
          </div>

          <div>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-m font-bold rounded-md  text-white bg-secondary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              로그인
            </Button>
          </div>
          {error && (
            <div className="text-warning text-sm text-center">{error}</div>
          )}
          <div className="text-center mb-0">
            <span className="text-sm text-foreground/50">
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
