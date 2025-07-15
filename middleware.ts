import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// interface ClerkMiddlewareAuthObject {
//   userId: string | null;
//   sessionId: string | null;
//   orgId: string | null;
// }
// Your protected routes
const adminprotectedRoutes = [
  "/dashboard",
  "/settings",
  "/setup-2fa",
  "/products",
  "/add-product",
  "/add-category"
];
const clientProtecedRoutes = ["/shopping-cart"];
// Merge your logic into Clerk middleware
const mergedMiddleware = clerkMiddleware((auth, request) => {
  const path = request.nextUrl.pathname;
  if (adminprotectedRoutes.includes(path)) {
    const accessToken = request.cookies.get("accessToken");
    const loggedInUser = request.cookies.get("loggedInUser");

    if (!accessToken || !loggedInUser) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  return (async () => {
    if (clientProtecedRoutes.includes(path)) {
      const { userId } = await auth();
      if (!userId) {
        const redirectUrl = new URL("/sign-in", request.url);
        redirectUrl.searchParams.set("redirect_url", request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return NextResponse.next();
  })();
});

export default mergedMiddleware;

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Matches all dynamic routes
    "/(api|trpc)(.*)"
  ]
};
