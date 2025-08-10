import { NextRequest, NextResponse } from "next/server";
import { AccessPaths } from "./src/config/page.config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일은 패스
  if (pathname.startsWith("/images")) return NextResponse.next();

  //  게스트 접근 가능 페이지면 패스 (하위 경로 포함)
  if (isGuestAccessible(pathname)) return NextResponse.next();

  //  토큰 확인
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  //  토큰 둘 다 없으면 로그인
  if (!accessToken && !refreshToken) {
    return redirectTo("/login", request.url);
  }

  //  액세스토큰이 있으면 유효성 검증
  if (accessToken) {
    const validation = await validateAccessToken(accessToken, pathname);
    if (validation.isValid) return NextResponse.next();
    // 액세스토큰 유효하지만 권한 없으면 메인으로
    if (validation.redirectTo)
      return redirectTo(validation.redirectTo, request.url);
  }

  //리프레시 토큰이 있으면 재발급 시도
  if (refreshToken) {
    const refreshed = await refreshAccessToken(refreshToken);
    if (refreshed) {
      const targetUrl = pathname === "/login" ? "/" : request.url;
      return setAuthCookiesAndRedirect(refreshed, targetUrl);
    }
  }

  // 모든 경우 실패 시 로그인 페이지로
  return redirectTo("/login", request.url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logos|images|icons|assets).*)",
  ],
};

// ==========================
// 유틸 함수
// ==========================
function isGuestAccessible(pathname: string) {
  // /surveys/[id] 패턴 (설문조사 상세)은 게스트 접근 불가
  if (pathname.match(/^\/surveys\/\d+/)) {
    return false;
  }
  
  return AccessPaths.guest.some((path) => pathname.startsWith(path));
}

function redirectTo(path: string, requestUrl: string) {
  return NextResponse.redirect(new URL(path, requestUrl));
}

function setAuthCookiesAndRedirect(
  tokens: { accessToken: string; refreshToken?: string },
  url: string
) {
  const response = NextResponse.redirect(url);

  if (tokens.accessToken) {
    response.cookies.set("accessToken", tokens.accessToken, {
      maxAge: 86400,
      path: "/",
      sameSite: "strict",
    });
  }

  if (tokens.refreshToken) {
    response.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: 86400 * 7,
      path: "/",
      sameSite: "strict",
    });
  }

  return response;
}

// ==========================
// API 호출
// ==========================
async function validateAccessToken(accessToken: string, pathname: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/v1/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) return { isValid: false };

    const userData = await res.json();
    const userType = userData.userType || userData.type;
    const allowedPaths =
      userType === "guest" ? AccessPaths.guest : AccessPaths.user;

    if (allowedPaths.some((path) => pathname.startsWith(path))) {
      return { isValid: true };
    } else {
      return { isValid: true, redirectTo: "/" };
    }
  } catch (err) {
    console.error("validateAccessToken error:", err);
    return { isValid: false };
  }
}

async function refreshAccessToken(refreshToken: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch (err) {
    console.error("refreshAccessToken error:", err);
    return null;
  }
}
