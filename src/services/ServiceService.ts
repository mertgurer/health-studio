import { IconSvgElement } from "@hugeicons/react";
import { FirebaseBaseService } from "./FirebaseBaseService";

export interface Service {
    id: string;
    serviceId: string;
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

export interface ServiceInfo {
    title: string;
    info: string;
    description: string;
    icon: IconSvgElement;
}

export class ServiceService extends FirebaseBaseService<Service> {
    constructor() {
        super("Service");
    }
}
