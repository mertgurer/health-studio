import { InfoService } from "@/services/InfoService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const infoService = new InfoService();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return new NextResponse("Missing id parameter", { status: 400 });
    }

    try {
        const doc = await infoService.getById(id);

        if (!doc) {
            return new NextResponse("Locale data not found", { status: 404 });
        }

        return NextResponse.json(doc);
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to fetch info", { status: 500 });
    }
}
