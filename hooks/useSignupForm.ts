import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import {
  checkNicknameDuplicate,
  checkEmailDuplicate,
} from "src/lib/queries/user";

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
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
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
  const [nicknameCheckResult, setNicknameCheckResult] = useState<
    "ok" | "duplicate" | "bad_request" | "error" | null
  >(null);
  const [emailCheckResult, setEmailCheckResult] = useState<
    "ok" | "duplicate" | "bad_request" | "error" | null
  >(null);

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
    agreements.privacy &&
    nicknameCheckResult === "ok" &&
    emailCheckResult === "ok";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      setError((prevError) => ({
        ...prevError,
        [name]:
          name === "nickname"
            ? validateNickname(value)
              ? ""
              : "닉네임은 2자 이상이어야 합니다."
            : name === "email"
            ? validateEmail(value)
              ? ""
              : "올바른 이메일 형식을 입력하세요."
            : name === "password"
            ? validatePassword(value)
              ? ""
              : "영문, 숫자, 특수문자 포함 8자 이상 입력하세요."
            : name === "passwordConfirm"
            ? validatePasswordConfirm(newFormData.password, value)
              ? ""
              : "비밀번호가 일치하지 않습니다."
            : "",
      }));
      return newFormData;
    });
  };

  // 닉네임 중복 체크 (debounce)
  const debouncedNickname = useDebounce(formData.nickname, 200);
  useEffect(() => {
    if (!debouncedNickname) {
      setError((prev) => ({ ...prev, nickname: "" }));
      setNicknameCheckResult(null);
      return;
    }
    if (!validateNickname(debouncedNickname)) {
      setError((prev) => ({
        ...prev,
        nickname: "닉네임은 2자 이상이어야 합니다.",
      }));
      setNicknameCheckResult(null);
      return;
    }
    setIsCheckingNickname(true);
    checkNicknameDuplicate(debouncedNickname)
      .then((result) => {
        setNicknameCheckResult(result);
        if (result === "ok") {
          setError((prev) => ({ ...prev, nickname: "" }));
        } else if (result === "duplicate") {
          setError((prev) => ({
            ...prev,
            nickname: "이미 존재하는 닉네임입니다.",
          }));
        } else if (result === "bad_request") {
          setError((prev) => ({ ...prev, nickname: "닉네임을 입력해주세요." }));
        } else {
          setError((prev) => ({
            ...prev,
            nickname: "닉네임 중복 확인 중 오류가 발생했습니다.",
          }));
        }
      })
      .finally(() => setIsCheckingNickname(false));
  }, [debouncedNickname]);

  // 이메일 중복 체크 (debounce)
  const debouncedEmail = useDebounce(formData.email, 200);
  useEffect(() => {
    if (!debouncedEmail) {
      setError((prev) => ({ ...prev, email: "" }));
      setEmailCheckResult(null);
      return;
    }
    if (!validateEmail(debouncedEmail)) {
      setError((prev) => ({
        ...prev,
        email: "올바른 이메일 형식을 입력하세요.",
      }));
      setEmailCheckResult(null);
      return;
    }
    setIsCheckingEmail(true);
    (async () => {
      try {
        const result = await checkEmailDuplicate(debouncedEmail);
        setEmailCheckResult(result);
        if (result === "ok") {
          setError((prev) => ({ ...prev, email: "" }));
        } else if (result === "duplicate") {
          setError((prev) => ({
            ...prev,
            email: "이미 존재하는 이메일입니다.",
          }));
        } else if (result === "bad_request") {
          setError((prev) => ({ ...prev, email: "이메일을 입력해주세요." }));
        }
      } catch (error) {
        setError((prev) => ({
          ...prev,
          email: "이메일 중복 확인 중 오류가 발생했습니다.",
        }));
      } finally {
        setIsCheckingEmail(false);
      }
    })();
  }, [debouncedEmail]);

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
        newAgreements.all =
          newAgreements.terms &&
          newAgreements.privacy &&
          newAgreements.marketing &&
          newAgreements.newsletter;
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
    setFormData,
    agreements,
    setAgreements,
    isLoading,
    setIsLoading,
    handleChange,
    handleAgreementCheckbox,
    error,
    setError,
    validate,
    isFormValid,
    isCheckingNickname,
    isCheckingEmail,
    nicknameCheckResult,
    emailCheckResult,
  };
}
