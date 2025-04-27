import { FirebaseBaseService } from "./FirebaseBaseService";

export interface Social {
    id: string;
    index: number;
    name: string;
    url: string;
    isActive: boolean;
}

export class SocialService extends FirebaseBaseService<Social> {
    constructor() {
        super("Social");
    }
}
