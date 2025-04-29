import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { auth as authAdmin } from "firebase-admin";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const idToken = await userCredential.user.getIdToken();

        return new NextResponse(
            JSON.stringify({ message: "Login successful", token: idToken }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `token=${idToken}; path=/; HttpOnly; Secure; SameSite=Strict;`,
                },
            }
        );
    } catch (error: any) {
        console.error("Login error:", error.code);
        return new NextResponse("Failed to login", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const token = cookies().get("token")?.value || "";

    if (!token) {
        return NextResponse.json(false, { status: 401 });
    }

    try {
        const result = await authAdmin().verifyIdToken(token);

        if (result) {
            return NextResponse.json(true, { status: 200 });
        }
    } catch (error) {
        console.error("Token verification error:", error);
    }

    return NextResponse.json(false, { status: 401 });
}
