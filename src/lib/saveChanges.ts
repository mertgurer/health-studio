import { Service } from "@/services/ServiceService";
import { Social } from "@/services/SocialService";
import { FormEvent } from "react";

async function savaChanges(
    event: FormEvent<HTMLFormElement>,
    services: Service[],
    socials: Social[]
): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // About data
    const aboutTr = formData.get("aboutTr") as string;
    const aboutEn = formData.get("aboutEn") as string;

    const newAbout = {
        tr: aboutTr,
        en: aboutEn,
    };

    // Members data
    const gulceTitleTr = formData.get("gulceTitleTr") as string;
    const gulceTitleEn = formData.get("gulceTitleEn") as string;
    const gulceInfoTr = formData.get("gulceInfoTr") as string;
    const gulceInfoEn = formData.get("gulceInfoEn") as string;
    const tugceTitleTr = formData.get("tugceTitleTr") as string;
    const tugceTitleEn = formData.get("tugceTitleEn") as string;
    const tugceInfoTr = formData.get("tugceInfoTr") as string;
    const tugceInfoEn = formData.get("tugceInfoEn") as string;

    const newMembers = {
        en: {
            gulce: {
                title: gulceTitleEn,
                info: gulceInfoEn,
            },
            tugce: {
                title: tugceTitleEn,
                info: tugceInfoEn,
            },
        },
        tr: {
            gulce: {
                title: gulceTitleTr,
                info: gulceInfoTr,
            },
            tugce: {
                title: tugceTitleTr,
                info: tugceInfoTr,
            },
        },
    };

    // Services data
    const newServices = services.map((service) => {
        const titleTr = formData.get(`${service.id}-titleTr`) as string;
        const titleEn = formData.get(`${service.id}-titleEn`) as string;
        const infoTr = formData.get(`${service.id}-infoTr`) as string;
        const infoEn = formData.get(`${service.id}-infoEn`) as string;
        const descriptionTr = formData.get(
            `${service.id}-descriptionTr`
        ) as string;
        const descriptionEn = formData.get(
            `${service.id}-descriptionEn`
        ) as string;
        const index = formData.get(`${service.id}-index`) as string;
        const isActive = formData.get(`${service.id}-active`) as string;

        return {
            id: service.id,
            index: +index,
            isActive: isActive === "on",
            en: {
                title: titleEn,
                info: infoEn,
                description: descriptionEn,
            },
            tr: {
                title: titleTr,
                info: infoTr,
                description: descriptionTr,
            },
        };
    });

    // Social data
    const newSocials = socials.map((social) => {
        const index = formData.get(`${social.name}-index`) as string;
        const url = formData.get(`${social.name}-url`) as string;
        const isActive = formData.get(`${social.name}-active`) as string;

        return {
            name: social.name,
            index: +index,
            isActive: isActive === "on",
            url: url,
        };
    });

    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    console.log("About", newSocials);
}

export default savaChanges;
