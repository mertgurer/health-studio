import { SocialService } from "@/services/SocialService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const socialService = new SocialService();

    try {
        const socials = await socialService.getAll();
        return NextResponse.json(socials);
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to fetch social info", { status: 500 });
    }
}
