import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/dashboard/:path*",
    "/settings/:path*",
    "/setup-2fa"
  ]
};

const protectedRoutes = [
  "/dashboard",
  "/settings",
  "/setup-2fa",
  "/products",
  "/add-product",
  "/add-category"
];
export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken");
  const loggedInUser = request.cookies.get("loggedInUser");
  const path = request.nextUrl.pathname;

  if (protectedRoutes.includes(path)) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    if (!loggedInUser) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  return NextResponse.next();
};
