import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import TokenDto from "src/dtos/user/token.dto";
import CheckDuplicateDto from "src/dtos/user/duplicate.dto";
import {
  LoginRequestDto,
  RegisterRequestDto,
  LoginResponseDto,
  RegisterResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
} from "src/dtos/user/auth.dto";
import { ApiError } from "src/types/auth";
import { fetchWithAuth } from "../api/commonFetch.utility";
import { getAccessToken, saveTokens } from "../api/common.utilitiy";
import Swal from "sweetalert2";
import { UserDto } from "src/dtos/user";

// 회원가입 - 인증 불필요
export const registerUser = async (
  requestData: RegisterRequestDto
): Promise<RegisterResponseDto> => {
  const data = await fetchWithAuth(
    "/v1/auth/register",
    {
      method: "POST",
      body: JSON.stringify(requestData),
    },
    false
  );
  return data as RegisterResponseDto;
};

export const useRegister = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const tokenDto = plainToInstance(TokenDto, data);
      saveTokens(tokenDto);
      onSuccess();
    },
    onError: (error: ApiError) => {
      Swal.fire({
        title: "회원가입 실패",
        text: "회원가입 실패: " + (error?.message || "알 수 없는 오류"),
        icon: "error",
      });
    },
  });
};

// 로그인 - 인증 불필요
export const loginUser = async (
  requestData: LoginRequestDto
): Promise<LoginResponseDto> => {
  const data = await fetchWithAuth(
    "/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify(requestData),
    },
    false
  );
  return data as LoginResponseDto;
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
    onError: (error: ApiError) => {
      console.log(error);
      Swal.fire({
        title: "로그인 실패",
        text: "로그인 실패: " + (error?.message || "알 수 없는 오류"),
        icon: "error",
      });
    },
  });
};

// 내 정보 불러오기 - 인증 필요 (이미 설정됨)
export const fetchMe = async (): Promise<UserDto> => {
  const data = await fetchWithAuth("/v1/users/me", { method: "GET" }, true);
  return plainToInstance(UserDto, data);
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!getAccessToken(),
  });
};

// 닉네임 중복 체크 - 공개 API (인증 불필요)
export const checkNicknameDuplicate = async (
  nickname: string
): Promise<CheckDuplicateDto> => {
  try {
    const data = await fetchWithAuth(
      `/v1/users/duplicate/name?nickname=${nickname}`,
      {
        method: "GET",
      },
      false
    );
    return plainToInstance(CheckDuplicateDto, data);
  } catch (error) {
    throw error;
  }
};

export const useNickname = (nickname?: string, enabled = true) => {
  return useQuery<CheckDuplicateDto, ApiError>({
    queryKey: ["nickname", nickname],
    queryFn: () => checkNicknameDuplicate(nickname!),
    enabled: enabled && !!nickname && nickname.trim() !== "",
    retry: false,
  });
};

// 이메일 중복 체크 - 공개 API (인증 불필요)
export const checkEmailDuplicate = async (
  email: string
): Promise<CheckDuplicateDto> => {
  try {
    const data = await fetchWithAuth(
      `/v1/users/duplicate/account?email=${email}`,
      {
        method: "GET",
      },
      false
    );
    return plainToInstance(CheckDuplicateDto, data);
  } catch (error) {
    throw error;
  }
};

export const useEmail = (email?: string, enabled = true) => {
  return useQuery<CheckDuplicateDto, ApiError>({
    queryKey: ["email", email],
    queryFn: () => checkEmailDuplicate(email!),
    enabled: enabled && !!email && email.trim() !== "",
    retry: false,
  });
};

// 토큰 갱신 - 인증 불필요 (refreshToken을 사용)
export const refreshToken = async (
  requestData: RefreshTokenRequestDto
): Promise<RefreshTokenResponseDto> => {
  const data = await fetchWithAuth(
    "/v1/auth/refresh",
    {
      method: "POST",
      body: JSON.stringify(requestData),
    },
    false
  );
  return data as RefreshTokenResponseDto;
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      saveTokens(data);
    },
    onError: (error: ApiError) => {
      console.error("토큰 갱신 실패:", error);
    },
  });
};
