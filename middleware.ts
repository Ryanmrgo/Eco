import { clerkMiddleware } from "@clerk/nextjs/server";

// Run Clerk middleware only on protected sections to avoid redirect loops on public pages
export default clerkMiddleware();

export const config = {
  matcher: [
    "/seller/:path*",
    "/admin/:path*",
    "/api/cart/:path*",
    "/api/order/:path*",
    "/api/user/:path*",
    "/api/product/:path*",
    "/api/dev/:path*",
  ],
};