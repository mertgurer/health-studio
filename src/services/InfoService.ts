import { FirebaseBaseService } from "./FirebaseBaseService";

interface Info {
    id: string;
    [key: string]: any;
}

export class InfoService extends FirebaseBaseService<Info> {
    constructor() {
        super("Info");
    }
}
