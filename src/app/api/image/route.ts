import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/firebase";
import { ref, uploadBytes } from "firebase/storage";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file = formData.get("file") as Blob;
    const fileName = formData.get("fileName") as string;

    if (!file || !fileName) {
        return new NextResponse("File or fileName is missing", { status: 400 });
    }

    try {
        const storageRef = ref(storage, `${fileName}.jpg`);

        await uploadBytes(storageRef, file);
    } catch (error) {
        console.log("Error uploading image:", error);
        return new NextResponse("Failed to upload image", { status: 500 });
    }

    return new NextResponse("Image uploaded successfully", { status: 200 });
}
