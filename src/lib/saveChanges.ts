import { Service } from "@/services/ServiceService";
import { Social } from "@/services/SocialService";
import { FormEvent } from "react";
import { putToApi } from "./putToApi";
import { uploadImage } from "./uploadImage";

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
            serviceId: service.serviceId,
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
            id: social.id,
            name: social.name,
            index: +index,
            isActive: isActive === "on",
            url: url,
        };
    });

    // Contact data
    const addressTr = formData.get("addressTr") as string;
    const addressEn = formData.get("addressEn") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    const newContact = {
        email: email,
        phone: phone,
        address: {
            tr: addressTr,
            en: addressEn,
        },
    };

    putToApi("/info?id=about", newAbout);
    putToApi("/info?id=contact", newContact);
    putToApi("/info?id=members", newMembers);

    newSocials.forEach((social) => {
        const { id, ...socialWithoutId } = social;
        putToApi(`/social?id=${social.id}`, socialWithoutId);
    });

    newServices.forEach((service) => {
        const { id, ...serviceWithoutId } = service;
        putToApi(`/service?id=${service.id}`, serviceWithoutId);
    });

    const welcomeImage1 = formData.get("welcomeImage1") as File;
    const welcomeImage2 = formData.get("welcomeImage2") as File;
    const welcomeImage3 = formData.get("welcomeImage3") as File;
    const gulceImage = formData.get("gulceImage") as File;
    const tugceImage = formData.get("tugceImage") as File;

    if (welcomeImage1.size > 0) uploadImage(welcomeImage1, "welcome_1");
    if (welcomeImage2.size > 0) uploadImage(welcomeImage1, "welcome_2");
    if (welcomeImage3.size > 0) uploadImage(welcomeImage1, "welcome_3");
    if (gulceImage.size > 0) uploadImage(welcomeImage1, "gulce");
    if (tugceImage.size > 0) uploadImage(welcomeImage1, "tugce");

    services.map((service) => {
        const serviceImage = formData.get(`${service.id}-image`) as File;
        if (serviceImage.size > 0) uploadImage(serviceImage, service.serviceId);
    });
}

export default savaChanges;
