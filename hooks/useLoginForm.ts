import { useState } from "react";
import { LoginFormData } from "src/types/auth";
import { ValidationUtils, ValidationMessages } from "src/utils/validation";

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
    if (!ValidationUtils.email(formData.email)) {
      setError(ValidationMessages.email);
      return false;
    }
    if (!ValidationUtils.password(formData.password)) {
      setError(ValidationMessages.password);
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
