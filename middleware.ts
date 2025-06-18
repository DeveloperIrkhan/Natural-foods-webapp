import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// interface ClerkMiddlewareAuthObject {
//   userId: string | null;
//   sessionId: string | null;
//   orgId: string | null;
// }
// Your protected routes
const protectedRoutes = [
  "/dashboard",
  "/settings",
  "/setup-2fa",
  "/products",
  "/add-product",
  "/add-category"
];
const clientProtecedRoutes = ["/shopping-cart"];
// Merge your logic into Clerk middleware
const mergedMiddleware = clerkMiddleware(
  (auth, request) => {
    const path = request.nextUrl.pathname;
    if (protectedRoutes.includes(path)) {
      const accessToken = request.cookies.get("accessToken");
      const loggedInUser = request.cookies.get("loggedInUser");

      if (!accessToken || !loggedInUser) {
        return NextResponse.redirect(new URL("/auth", request.url));
      }
    }
    if (clientProtecedRoutes.includes(path)) {
      // const { userId } = auth;
      // if (!userId) {
      //   // Clerk's sign-in page
      //   return NextResponse.redirect(new URL("/sign-in", request.url));
      // }
    }

    return NextResponse.next();
  }
);

export default mergedMiddleware;

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Matches all dynamic routes
    "/(api|trpc)(.*)"
  ]
};
