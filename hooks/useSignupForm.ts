import { useState } from "react";
import { RegisterFormData } from "src/types/auth";

function validateEmail(email: string) {
  // 간단한 이메일 정규식
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  // 8자 이상, 영문, 숫자, 특수문자 포함
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
    password
  );
}

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

  // 닉네임 유효성(2자 이상)
  function validateNickname(nickname: string) {
    return /^.{2,}$/.test(nickname);
  }

  // 비밀번호 확인 유효성
  function validatePasswordConfirm(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
  }

  // 전체 폼 유효성
  const isFormValid =
    !!formData.nickname &&
    !!formData.email &&
    !!formData.password &&
    !!formData.passwordConfirm &&
    validateNickname(formData.nickname) &&
    validateEmail(formData.email) &&
    validatePassword(formData.password) &&
    validatePasswordConfirm(formData.password, formData.passwordConfirm) &&
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
    if (!validateNickname(nickname)) {
      newError.nickname = "닉네임은 2자 이상이어야 합니다.";
      valid = false;
    }
    if (!validateEmail(email)) {
      newError.email = "올바른 이메일 형식을 입력하세요.";
      valid = false;
    }
    if (!validatePassword(password)) {
      newError.password = "영문, 숫자, 특수문자 포함 8자 이상 입력하세요.";
      valid = false;
    }
    if (!validatePasswordConfirm(password, passwordConfirm)) {
      newError.passwordConfirm = "비밀번호가 일치하지 않습니다.";
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
          return validateNickname(fieldValue)
            ? ""
            : "닉네임은 2자 이상이어야 합니다.";
        case "email":
          return validateEmail(fieldValue)
            ? ""
            : "올바른 이메일 형식을 입력하세요.";
        case "password":
          return validatePassword(fieldValue)
            ? ""
            : "영문, 숫자, 특수문자 포함 8자 이상 입력하세요.";
        case "passwordConfirm":
          return validatePasswordConfirm(formData.password, fieldValue)
            ? ""
            : "비밀번호가 일치하지 않습니다.";
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
    validateNickname,
    validateEmail,
  };
}
