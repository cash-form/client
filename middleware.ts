import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/images")) return NextResponse.next();

  // 즉시 렌더링 처리 URI - 요구사항에 맞게 수정
  const allowedPaths = ["/", "/signup", "/surveys"];
  if (allowedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 쿠키에서 토큰 보유 여부 확인
  const hasAccess = request.cookies.get("accessToken")?.value !== undefined;
  const hasRefresh = request.cookies.get("refreshToken")?.value !== undefined;

  if (!hasRefresh) {
    // 토큰 없으면 /signup으로 리디렉션
    const redirectUrl = new URL("/signup", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!hasAccess && hasRefresh) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const response = NextResponse.next();
    const result = await getAccessToken(refreshToken as string, response);

    if (!result) {
      const redirectUrl = new URL("/signup", request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  // 토큰 있으면 렌더링 처리
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logos|images|icons|assets).*)",
  ],
};

async function getAccessToken(refreshToken: string, response: NextResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if (!res.ok) return false;

    const data: { accessToken: string; refreshToken?: string } =
      await res.json();

    // middleware에서는 이렇게 쿠키 설정 - 새로운 응답 형식에 맞게 수정
    response.cookies.set("accessToken", data.accessToken, {
      maxAge: 86400,
      path: "/",
      sameSite: "strict",
    });

    // 새로운 refreshToken도 업데이트
    if (data.refreshToken) {
      response.cookies.set("refreshToken", data.refreshToken, {
        maxAge: 86400 * 7, // 7일
        path: "/",
        sameSite: "strict",
      });
    }

    return true;
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
}
