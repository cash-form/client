import { useState } from "react";
import { LoginFormData } from "src/types/auth";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  return password.length >= 8;
}

export default function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    if (!validateEmail(formData.email)) {
      setError("올바른 이메일 형식을 입력하세요.");
      return false;
    }
    if (!validatePassword(formData.password)) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return false;
    }
    setError(null);
    return true;
  };

  return {
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    handleChange,
    error,
    setError,
    validate,
  };
}
