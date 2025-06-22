import { getAccessToken } from "./common.utilitiy";

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

export const uploadImageWithAuth = async (
  url: string,
  formData: FormData,
  requireAuth: boolean = true
) => {
  const headers: Record<string, string> = {};

  if (requireAuth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error("No access token found");
    }
  }

  const response = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(`HTTP error! status: ${response.status}`);
    (error as any).response = errorData;
    throw error;
  }

  return response.json();
};
