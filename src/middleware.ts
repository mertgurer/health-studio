import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "./lib/authenticateUser";

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const handleI18nRouting = createMiddleware(routing);
    let response = handleI18nRouting(request);

    // If not found
    if (
        !(
            pathname === "/" ||
            pathname === "/admin-dashboard" ||
            pathname === "/admin-dashboard/login"
        )
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If admin dashboard
    if (pathname === "/admin-dashboard") {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.redirect(
                new URL("/admin-dashboard/login", request.url)
            );
        }

        const isValid = await authenticateUser(request);

        if (!isValid) {
            return NextResponse.redirect(
                new URL("/admin-dashboard/login", request.url)
            );
        }
    }

    // If login
    if (pathname === "/admin-dashboard/login") {
        const token = request.cookies.get("token")?.value;

        if (token) {
            const isValid = await authenticateUser(request);

            if (isValid) {
                return NextResponse.redirect(
                    new URL("/admin-dashboard", request.url)
                );
            }
        }
    }

    response.headers.set("x-url", pathname);
    return response;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
