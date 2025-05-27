import { useMutation, useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import TokenDto from "src/dtos/user/token.dto";
import UserDto from "src/dtos/user/user.dto";
import { fetchWithAuth } from "../api/commonFetch.utility";
import { getAccessToken, saveTokens } from "../api/common.utilitiy";
import { useAuthStore } from "src/store/authStore";

// 회원가입
export const registerUser = async ({
  email,
  password,
  nickname,
  marketingConsent,
  newsletterConsent,
}: {
  email: string;
  password: string;
  nickname: string;
  marketingConsent: boolean;
  newsletterConsent: boolean;
}): Promise<TokenDto> => {
  const data = await fetchWithAuth("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      nickname,
      marketingConsent,
      newsletterConsent,
    }),
  });
  return plainToInstance(TokenDto, data);
};

export const useRegister = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
      onSuccess();
    },
  });
};

// 로그인
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TokenDto> => {
  const data = await fetchWithAuth("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return plainToInstance(TokenDto, data);
};

export const useLogin = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("[로그인 응답 accessToken]", data.accessToken);
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
      console.log(
        "[zustand 저장 후 accessToken]",
        useAuthStore.getState().accessToken
      );
      onSuccess();
    },
  });
};

// 내 정보 불러오기
export const fetchMe = async (): Promise<UserDto> => {
  const data = await fetchWithAuth("/v1/users/me", { method: "GET" }, true);
  return plainToInstance(UserDto, data);
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!getAccessToken,
  });
};

// 닉네임 중복 체크
export const checkNicknameDuplicate = async (
  nickname: string
): Promise<"ok" | "duplicate" | "bad_request" | "error"> => {
  try {
    await fetchWithAuth(
      `/v1/users/duplicate/name?nickname=${encodeURIComponent(nickname)}`,
      { method: "GET" }
    );
    return "ok";
  } catch (err: any) {
    const status = err?.response?.statusCode || err?.response?.status;
    if (status === 409) return "duplicate";
    if (status === 400) return "bad_request";
    return "error";
  }
};

// 이메일 중복 체크
export const checkEmailDuplicate = async (
  email: string
): Promise<"ok" | "duplicate" | "bad_request" | "error"> => {
  try {
    await fetchWithAuth(
      `/v1/users/duplicate/account?email=${encodeURIComponent(email)}`,
      { method: "GET" }
    );
    return "ok";
  } catch (err: any) {
    const status = err?.response?.statusCode || err?.response?.status;
    if (status === 409) return "duplicate";
    if (status === 400) return "bad_request";
    return "error";
  }
};
