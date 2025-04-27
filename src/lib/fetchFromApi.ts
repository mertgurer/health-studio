import { headers } from "next/headers";

export async function fetchFromApi<T = any>(endpoint: string): Promise<T> {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api${endpoint}`;

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}
