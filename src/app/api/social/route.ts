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

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const infoService = new SocialService();
    const id = searchParams.get("id");

    const updatedData: any = await request.json();

    if (!id || !updatedData) {
        return new NextResponse("Missing id or data", { status: 400 });
    }

    try {
        await infoService.update(id, updatedData);

        return new NextResponse("Document updated successfully", {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Failed to update document", { status: 500 });
    }
}
