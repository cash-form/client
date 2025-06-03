import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import TokenDto from "src/dtos/user/token.dto";
import UserDto from "src/dtos/user/user.dto";
import { fetchWithAuth } from "../api/commonFetch.utility";
import { getAccessToken, saveTokens } from "../api/common.utilitiy";
import Swal from "sweetalert2";
import CheckDuplicateDto from "src/dtos/user/duplicate.dto";

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
      saveTokens(data);
      onSuccess();
    },
    onError: (error: any) => {
      Swal.fire({
        title: "회원가입 실패",
        text:
          "회원가입 실패: " + (error?.response?.message || "알 수 없는 오류"),
        icon: "error",
      });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveTokens(data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      onSuccess();
    },
    onError: (error: any) => {
      console.log(error.response);
      Swal.fire({
        title: "로그인 실패",
        text: "로그인 실패: " + (error?.response?.message || "알 수 없는 오류"),
        icon: "error",
      });
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
): Promise<CheckDuplicateDto> => {
  try {
    const data = await fetchWithAuth(
      `/v1/users/duplicate/name?nickname=${nickname}`,
      {
        method: "GET",
      }
    );
    return plainToInstance(CheckDuplicateDto, data);
  } catch (error) {
    throw error;
  }
};

export const useNickname = (nickname?: string, enabled = true) => {
  return useQuery({
    queryKey: ["nickname", nickname],
    queryFn: () => checkNicknameDuplicate(nickname!),
    enabled: enabled,
    retry: false,
  });
};

// 이메일 중복 체크
export const checkEmailDuplicate = async (
  email: string
): Promise<CheckDuplicateDto> => {
  try {
    const data = await fetchWithAuth(
      `/v1/users/duplicate/account?email=${email}`,
      {
        method: "GET",
      }
    );
    return plainToInstance(CheckDuplicateDto, data);
  } catch (error) {
    throw error;
  }
};
export const useEmail = (email?: string, enabled = true) => {
  return useQuery({
    // mutationFn: checkEmailDuplicate,
    // onSuccess: (data) => {
    //   onSuccess();
    // },
    // onError: (error: any) => {},

    queryKey: ["email", email],
    queryFn: () => checkEmailDuplicate(email!),
    enabled: enabled,
    retry: false,
  });
};
