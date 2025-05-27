import { getAccessToken } from "./common.utilitiy";
import { useAuthStore } from "src/store/authStore";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  requireAuth: boolean = false
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (requireAuth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error("No access token found");
    }
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(`HTTP error! status: ${response.status}`);
    (error as any).response = errorData;
    throw error;
  }

  return response.json();
};

export async function refreshTokenRequest() {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${API_URL}/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh token invalid");
  const data = await res.json();
  useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export async function fetchWithAuthRetry(
  url: string,
  options: RequestInit = {}
) {
  const accessToken = useAuthStore.getState().accessToken;

  // 처음
  let res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // accessToken 만료시 refresh 시도
  if (res.status === 401) {
    try {
      const newAccessToken = await refreshTokenRequest();
      res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } catch (e) {
      useAuthStore.getState().clearTokens();
      throw new Error("로그인이 만료되었습니다. 다시 로그인 해주세요.");
    }
  }

  return res;
}
