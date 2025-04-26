import { FirebaseBaseService } from "./FirebaseBaseService";

interface Info {
    id: string;
    [key: string]: any;
}

interface CreateInfo {}

interface UpdateInfo {}

export class InfoService extends FirebaseBaseService<
    Info,
    CreateInfo,
    UpdateInfo
> {
    constructor() {
        super("Info");
    }
}
