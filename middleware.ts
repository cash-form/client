import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// import { cookies } from "next/headers";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/images")) return NextResponse.next();

//   // 즉시 렌더링 처리 URI
//   const allowedPaths = ["/", "/sign/in", "/sign/up"];
//   if (allowedPaths.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // 쿠키에서 토큰 보유 여부 확인
//   const hasAccess = request.cookies.get("accessToken")?.value !== undefined;
//   const hasRefresh = request.cookies.get("refreshToken")?.value !== undefined;
//   console.log("hasAccess", hasAccess);
//   console.log("hasRefresh", hasRefresh);
//   if (!hasRefresh) {
//     // 토큰 없으면 /sign/in으로 리디렉션
//     const redirectUrl = new URL("/sign/in", request.url);
//     return NextResponse.redirect(redirectUrl);
//   }

//   if (!hasAccess && hasRefresh) {
//     const refreshToken = request.cookies.get("refreshToken")?.value;
//     const result = getAccessToken(refreshToken as string);

//     console.log("result : ", result);
//     if (!result) {
//       const redirectUrl = new URL("/sign/in", request.url);
//       NextResponse.redirect(redirectUrl);
//     }
//   }

//   // 토큰 있으면 렌더링 처리
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// async function getAccessToken(refreshToken: string) {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const response = await fetch(`${apiUrl}/AC/US003`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refresh: refreshToken }),
//     });

//     if (response.ok) {
//       const data: { access: string } = await response.json();

//       const cookieStore = await cookies();

//       cookieStore.set("access", data.access, {
//         maxAge: 86400,
//         path: "/",
//         sameSite: "strict",
//       });

//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// }
