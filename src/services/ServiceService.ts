import { IconSvgElement } from "@hugeicons/react";
import { FirebaseBaseService } from "./FirebaseBaseService";

interface Service {
    id: string;
    index: number;
    isActive: boolean;
    en: {
        title: string;
        info: string;
        description: string;
    };
    tr: {
        title: string;
        info: string;
        description: string;
    };
}

interface CreateService {}

interface UpdateService {}

export interface ServiceInfo {
    title: string;
    info: string;
    description: string;
    icon: IconSvgElement;
}

export class ServiceService extends FirebaseBaseService<
    Service,
    CreateService,
    UpdateService
> {
    constructor() {
        super("Service");
    }
}
