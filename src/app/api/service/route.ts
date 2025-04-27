import { ServiceService } from "@/services/ServiceService";
import { NextResponse } from "next/server";

export async function GET() {
    const serviceService = new ServiceService();

    try {
        const services = await serviceService.getAll();
        return NextResponse.json(services);
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to fetch services", { status: 500 });
    }
}
