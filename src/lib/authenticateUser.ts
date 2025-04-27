import { NextRequest } from "next/server";

export async function authenticateUser(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return false;
    }

    const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
        headers: {
            Cookie: `token=${token}`,
        },
    });

    if (responseAPI.ok) {
        return true;
    }

    return false;
}
