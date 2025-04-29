import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file = formData.get("file") as Blob;
    const fileName = formData.get("fileName") as string;

    if (!file || !fileName) {
        return new NextResponse("File or fileName is missing", { status: 400 });
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const bucket = adminStorage.bucket();
        const fileRef = bucket.file(`${fileName}.jpg`);

        await fileRef.save(buffer, {
            metadata: {
                contentType: "image/jpeg",
            },
        });
    } catch (error) {
        console.log("Error uploading image:", error);
        return new NextResponse("Failed to upload image", { status: 500 });
    }

    return new NextResponse("Image uploaded successfully", { status: 200 });
}
