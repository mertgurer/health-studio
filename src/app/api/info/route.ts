import { InfoService } from "@/services/InfoService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const infoService = new InfoService();
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

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const infoService = new InfoService();
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
