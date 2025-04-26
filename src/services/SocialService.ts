import { FirebaseBaseService } from "./FirebaseBaseService";

export interface Social {
    id: string;
    index: number;
    name: string;
    url: string;
    isActive: boolean;
}

interface CreateSocial {}

interface UpdateSocial {}

export class SocialService extends FirebaseBaseService<
    Social,
    CreateSocial,
    UpdateSocial
> {
    constructor() {
        super("Social");
    }
}
