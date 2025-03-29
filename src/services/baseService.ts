import { API_BASE_URL } from "@/constants/apiConstants";

interface Object {
    id: string;
    [key: string]: any;
}

interface CreateObject {
    [key: string]: any;
}

interface UpdateObject {
    [key: string]: any;
}

interface BaseError {
    message: string;
    [key: string]: any;
}

export class BaseService<
    O extends Object,
    cO extends CreateObject,
    uO extends UpdateObject
> {
    protected serviceUrl: string;

    constructor(path: string) {
        this.serviceUrl = `${API_BASE_URL}/${path}`;
    }

    // GET
    async getAll(): Promise<O[]> {
        const response = await fetch(this.serviceUrl);
        if (!response.ok) {
            const error = (await response.json()) as BaseError;
            throw new Error(error.message);
        }
        return await response.json();
    }

    // GET by id
    async getById(id: string): Promise<O> {
        const response = await fetch(`${this.serviceUrl}/${id}`);
        if (!response.ok) {
            const error = (await response.json()) as BaseError;
            throw new Error(error.message);
        }
        return await response.json();
    }

    // POST
    async create(params: cO): Promise<O> {
        const response = await fetch(this.serviceUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        });
        if (!response.ok) {
            const error = (await response.json()) as BaseError;
            throw new Error(error.message);
        }
        return await response.json();
    }

    // PUT
    async update(id: string, params: uO): Promise<O> {
        const response = await fetch(`${this.serviceUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        });
        if (!response.ok) {
            const error = (await response.json()) as BaseError;
            throw new Error(error.message);
        }
        return await response.json();
    }

    // DELETE
    async delete(id: string): Promise<void> {
        const response = await fetch(`${this.serviceUrl}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const error = (await response.json()) as BaseError;
            throw new Error(error.message);
        }
    }
}
