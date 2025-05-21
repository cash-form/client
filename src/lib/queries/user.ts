import { useMutation, useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import TokenDto from "src/dtos/user/token.dto";
import UserDto from "src/dtos/user/user.dto";
import { fetchWithAuth } from "../api/commonFetch.utility";
import { getAccessToken, saveTokens } from "../api/common.utilitiy";

// 회원가입
export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TokenDto> => {
  const data = await fetchWithAuth("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return plainToInstance(TokenDto, data);
};

export const useRegister = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      saveTokens(data);
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
  const data = await fetchWithAuth("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return plainToInstance(TokenDto, data);
};

export const useLogin = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveTokens(data);
      onSuccess();
    },
  });
};

// 내 정보 불러오기
export const fetchMe = async (): Promise<UserDto> => {
  const data = await fetchWithAuth("/users/me", { method: "GET" }, true);
  return plainToInstance(UserDto, data);
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!getAccessToken,
  });
};
