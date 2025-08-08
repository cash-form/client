import { useState } from "react";
import { RegisterFormData } from "src/types/auth";
import { ValidationUtils, ValidationMessages } from "src/utils/validation";

export default function useSignupForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    marketingConsent: false,
    newsletterConsent: false,
  });
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
    agreements: string;
  }>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    agreements: "",
  });


  // 전체 폼 유효성
  const isFormValid =
    !!formData.nickname &&
    !!formData.email &&
    !!formData.password &&
    !!formData.passwordConfirm &&
    ValidationUtils.nickname(formData.nickname) &&
    ValidationUtils.email(formData.email) &&
    ValidationUtils.password(formData.password) &&
    ValidationUtils.passwordConfirm(formData.password, formData.passwordConfirm) &&
    agreements.terms &&
    agreements.privacy;

  // validate 함수 추가 (SignupForm에서 사용)
  const validate = (
    nickname = formData.nickname,
    email = formData.email,
    password = formData.password,
    passwordConfirm = formData.passwordConfirm,
    agreementsObj = agreements
  ) => {
    const newError = {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      agreements: "",
    };
    let valid = true;
    if (!ValidationUtils.nickname(nickname)) {
      newError.nickname = ValidationMessages.nickname;
      valid = false;
    }
    if (!ValidationUtils.email(email)) {
      newError.email = ValidationMessages.email;
      valid = false;
    }
    if (!ValidationUtils.password(password)) {
      newError.password = ValidationMessages.password;
      valid = false;
    }
    if (!ValidationUtils.passwordConfirm(password, passwordConfirm)) {
      newError.passwordConfirm = ValidationMessages.passwordConfirm;
      valid = false;
    }
    if (!agreementsObj.terms || !agreementsObj.privacy) {
      newError.agreements = "필수 약관에 동의해주세요.";
      valid = false;
    }
    setError(newError);
    return valid;
  };

  // 수정된 handleChange - 상태 업데이트를 분리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 1. formData 업데이트
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 2. 실시간 검증 (별도로 처리)
    const getErrorMessage = (fieldName: string, fieldValue: string) => {
      switch (fieldName) {
        case "nickname":
          return ValidationUtils.nickname(fieldValue)
            ? ""
            : ValidationMessages.nickname;
        case "email":
          return ValidationUtils.email(fieldValue)
            ? ""
            : ValidationMessages.email;
        case "password":
          return ValidationUtils.password(fieldValue)
            ? ""
            : ValidationMessages.password;
        case "passwordConfirm":
          return ValidationUtils.passwordConfirm(formData.password, fieldValue)
            ? ""
            : ValidationMessages.passwordConfirm;
        default:
          return "";
      }
    };

    setError((prevError) => ({
      ...prevError,
      [name]: getErrorMessage(name, value),
    }));
  };

  // 약관 동의
  const handleAgreementCheckbox = (name: keyof typeof agreements) => {
    setAgreements((prev) => {
      let newAgreements = { ...prev };
      if (name === "all") {
        const newValue = !prev.all;
        newAgreements = {
          all: newValue,
          terms: newValue,
          privacy: newValue,
          marketing: newValue,
          newsletter: newValue,
        };
      } else {
        newAgreements[name] = !prev[name];
        // 필수 항목(terms, privacy)이 모두 체크되면 "모두 동의"도 체크
        newAgreements.all = newAgreements.terms && newAgreements.privacy;
      }
      setError((prevError) => ({
        ...prevError,
        agreements:
          newAgreements.terms && newAgreements.privacy
            ? ""
            : "필수 약관에 동의해주세요.",
      }));
      return newAgreements;
    });
  };

  return {
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
  };
}
