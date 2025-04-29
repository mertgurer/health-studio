export async function putToApi(endpoint: string, body: any) {
    const url = `/api${endpoint}`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res}`);
    }
}
