import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/images")) return NextResponse.next();

  // 즉시 렌더링 처리 URI
  const allowedPaths = ["/", "/signin", "/signup"];
  if (allowedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 쿠키에서 토큰 보유 여부 확인
  const hasAccess = request.cookies.get("accessToken")?.value !== undefined;
  const hasRefresh = request.cookies.get("refreshToken")?.value !== undefined;
  console.log("hasAccess", hasAccess);
  console.log("hasRefresh", hasRefresh);
  if (!hasRefresh) {
    // 토큰 없으면 /sign/in으로 리디렉션
    const redirectUrl = new URL("/?login=1", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!hasAccess && hasRefresh) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const response = NextResponse.next();
    const result = await getAccessToken(refreshToken as string, response);

    console.log("result : ", result);
    if (!result) {
      const redirectUrl = new URL("/signin", request.url);
      NextResponse.redirect(redirectUrl);
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
    const res = await fetch(`${apiUrl}/AC/US003`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    //  middleware에서는 이렇게 쿠키 설정
    response.cookies.set("accessToken", data.access, {
      maxAge: 86400,
      path: "/",
      sameSite: "strict",
    });

    return true;
  } catch (error) {
    return false;
  }
}
