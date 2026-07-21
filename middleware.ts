import createMiddleware from "next-intl/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routing } from "~/lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
  "/:locale",
  "/:locale/trips(.*)",
  "/:locale/terms(.*)",
  "/:locale/privacy(.*)",
  "/api/trips(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin/dashboard(.*)",
  "/admin/trips(.*)",
  "/admin/users(.*)",
  "/admin/bookings(.*)",
  "/admin/create-trip(.*)",
  "/api/admin/trips(.*)",
  "/api/admin/users(.*)",
  "/api/admin/bookings(.*)",
]);

const isAdminLoginRoute = createRouteMatcher([
  "/admin/login",
  "/api/admin/auth/login",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminLoginRoute(req)) {
    return intlMiddleware(req) || NextResponse.next();
  }

  if (isAdminRoute(req)) {
    const { getAdminSession } = await import("~/lib/auth");
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return Response.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|api|admin|assets|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
