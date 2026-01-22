import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function generateUserId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const userId = request.cookies.get("userId")?.value;

  if (!userId) {
    const newUserId = generateUserId();
    response.cookies.set("userId", newUserId, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
