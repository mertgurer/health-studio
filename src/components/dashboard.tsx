"use client";

import { ExpertNames } from "@/constants/constants";
import saveChanges from "@/lib/saveChanges";
import { Service } from "@/services/ServiceService";
import { Social } from "@/services/SocialService";
import { useTranslations } from "next-intl";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

interface Props {
    about: { en: string; tr: string };
    members: {
        en: {
            gulce: { title: string; info: string };
            tugce: { title: string; info: string };
        };
        tr: {
            gulce: { title: string; info: string };
            tugce: { title: string; info: string };
        };
    };
    contact: {
        email: string;
        phone: string;
        address: { en: string; tr: string };
    };
    socials: Social[];
    services: Service[];
}

function Dashboard({ about, members, contact, socials, services }: Props) {
    const t = useTranslations();

    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                saveChanges(e, services, socials);
                toast.success(t("Common.changesSaved"));
            }}
            className="flex flex-col gap-20"
        >
            <button
                type="submit"
                className="fixed bottom-10 z-10 bg-text text-tertiary w-max px-8 py-3 self-center rounded-md font-medium text-lg"
            >
                {t("Common.saveChanges")}
            </button>

            <div className="flex flex-col gap-4 mb-8">
                <h2 className="font-semibold italic ml-2 text-4xl max-2xl:text-3xl">
                    {t("Common.welcome")}
                </h2>
                <div className="flex gap-20 w-full">
                    <div className="flex flex-col w-full">
                        <label
                            className="mb-2 ml-2 text-sm font-medium"
                            htmlFor="image1"
                        >
                            {t("Common.image")} 1
                        </label>
                        <input
                            id="image1"
                            type="file"
                            name="welcomeImage1"
                            accept=".jpg"
                            className="w-full bg-tertiary p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            className="mb-2 ml-2 text-sm font-medium"
                            htmlFor="image2"
                        >
                            {t("Common.image")} 2
                        </label>
                        <input
                            id="image2"
                            type="file"
                            name="welcomeImage2"
                            accept=".jpg"
                            className="w-full bg-tertiary p-2 rounded-md"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            className="mb-2 ml-2 text-sm font-medium"
                            htmlFor="image3"
                        >
                            {t("Common.image")} 3
                        </label>
                        <input
                            id="image3"
                            type="file"
                            name="welcomeImage3"
                            accept=".jpg"
                            className="w-full bg-tertiary p-2 rounded-md"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <h2 className="font-semibold italic ml-2 text-4xl max-2xl:text-3xl">
                    {t("Common.about")}
                </h2>
                <div className="flex gap-20">
                    <div className="flex flex-col gap-2 w-full">
                        <p className="ml-2">{t("Locale.tr")}</p>
                        <textarea
                            className="w-full h-60 py-5 px-7"
                            name="aboutTr"
                            defaultValue={about.tr}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p className="ml-2">{t("Locale.en")}</p>
                        <textarea
                            className="w-full h-60 py-5 px-7"
                            name="aboutEn"
                            defaultValue={about.en}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <h2 className="font-semibold italic ml-2 text-4xl max-2xl:text-3xl">
                    {t("About.ourExperts")}
                </h2>
                <div className="flex flex-col gap-4 mb-10">
                    <p className="mx-auto text-xl font-medium">
                        {ExpertNames[0]}
                    </p>
                    <input
                        id="gulce"
                        type="file"
                        name="gulceImage"
                        accept=".jpg"
                        className="w-max self-center bg-tertiary p-2 rounded-md"
                    />
                    <div className="flex gap-20 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <p className="ml-2">{t("Locale.tr")}</p>
                            <input
                                className="w-full py-3 px-7"
                                name="gulceTitleTr"
                                defaultValue={members.tr.gulce.title}
                            />
                            <textarea
                                className="w-full h-60 py-5 px-7"
                                name="gulceInfoTr"
                                defaultValue={members.tr.gulce.info}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="ml-2">{t("Locale.en")}</p>
                            <input
                                className="w-full py-3 px-7"
                                name="gulceTitleEn"
                                defaultValue={members.en.gulce.title}
                            />
                            <textarea
                                className="w-full h-60 py-5 px-7"
                                name="gulceInfoEn"
                                defaultValue={members.en.gulce.info}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="mx-auto text-xl font-medium">
                        {ExpertNames[1]}
                    </p>
                    <input
                        id="tugce"
                        type="file"
                        name="tugceImage"
                        accept=".jpg"
                        className="w-max self-center bg-tertiary p-2 rounded-md"
                    />
                    <div className="flex gap-20 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <p className="ml-2">{t("Locale.tr")}</p>
                            <input
                                className="w-full py-3 px-7"
                                name="tugceTitleTr"
                                defaultValue={members.tr.tugce.title}
                            />
                            <textarea
                                className="w-full h-60 py-5 px-7"
                                name="tugceInfoTr"
                                defaultValue={members.tr.tugce.info}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="ml-2">{t("Locale.en")}</p>
                            <input
                                className="w-full py-3 px-7"
                                name="tugceTitleEn"
                                defaultValue={members.en.tugce.title}
                            />
                            <textarea
                                className="w-full h-60 py-5 px-7"
                                name="tugceInfoEn"
                                defaultValue={members.en.tugce.info}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <h2 className="font-semibold italic ml-2 text-4xl max-2xl:text-3xl">
                    {t("Common.services")}
                </h2>
                <div className="flex flex-col gap-12 ">
                    {services
                        .sort((a, b) => a.index - b.index)
                        .map((service, index) => {
                            return (
                                <div
                                    key={index}
                                    className="relative flex flex-col gap-2 w-full"
                                >
                                    <p className="absolute -left-10 top-10">
                                        {index + 1} ){" "}
                                    </p>
                                    <div className="flex gap-2">
                                        <div className="flex gap-2 w-1/4">
                                            <div className="flex flex-col gap-2 w-full">
                                                <p className="ml-2">
                                                    {t("Locale.tr")}
                                                </p>
                                                <input
                                                    className="w-full py-3 px-7"
                                                    name={`${service.id}-titleTr`}
                                                    defaultValue={
                                                        service.tr.title
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <p className="ml-2">
                                                    {t("Locale.en")}
                                                </p>
                                                <input
                                                    className="w-full py-3 px-7"
                                                    name={`${service.id}-titleEn`}
                                                    defaultValue={
                                                        service.en.title
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-3/4">
                                            <div className="flex flex-col gap-2 w-full">
                                                <p className="ml-2">
                                                    {t("Locale.tr")}
                                                </p>
                                                <input
                                                    className="w-full py-3 px-7"
                                                    name={`${service.id}-infoTr`}
                                                    defaultValue={
                                                        service.tr.info
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <p className="ml-2">
                                                    {t("Locale.en")}
                                                </p>
                                                <input
                                                    className="w-full py-3 px-7"
                                                    name={`${service.id}-infoEn`}
                                                    defaultValue={
                                                        service.en.info
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        <textarea
                                            className="w-full h-40 py-5 px-7"
                                            name={`${service.id}-descriptionTr`}
                                            defaultValue={
                                                service.tr.description
                                            }
                                        />
                                        <textarea
                                            className="w-full h-40 py-5 px-7"
                                            name={`${service.id}-descriptionEn`}
                                            defaultValue={
                                                service.en.description
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex gap-2 items-center">
                                            <p className="ml-2">
                                                {t("Common.index")}
                                            </p>
                                            :
                                            <input
                                                className="w-full py-3 px-7"
                                                name={`${service.id}-index`}
                                                type="number"
                                                defaultValue={service.index}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p className="ml-2">
                                                {t("Common.image")}
                                            </p>
                                            :
                                            <input
                                                id={service.id}
                                                type="file"
                                                name={`${service.id}-image`}
                                                accept=".jpg"
                                                className="w-max bg-tertiary p-2 rounded-md"
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p className="ml-2">
                                                {t("Common.active")}
                                            </p>
                                            :
                                            <input
                                                id={service.id}
                                                type="checkbox"
                                                name={`${service.id}-active`}
                                                defaultChecked={
                                                    service.isActive
                                                }
                                                className="bg-tertiary p-2 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <h2 className="font-semibold italic ml-2 text-4xl max-2xl:text-3xl">
                    {t("Common.contact")}
                </h2>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-20">
                        <div className="flex flex-col gap-2 w-full">
                            <p className="ml-2">{t("Locale.tr")}</p>
                            <input
                                className="w-full py-3 px-7"
                                name="addressTr"
                                defaultValue={contact.address.tr}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="ml-2">{t("Locale.en")}</p>
                            <input
                                className="w-full py-3 px-7"
                                name="addressEn"
                                defaultValue={contact.address.en}
                            />
                        </div>
                    </div>
                    <div className="flex gap-20">
                        <div className="flex gap-2 items-center">
                            <p className="ml-2">{t("Common.phone")}</p>
                            :
                            <input
                                className="py-3 px-7"
                                name="phone"
                                defaultValue={contact.phone}
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="ml-2">{t("Common.email")}</p>
                            :
                            <input
                                className="py-3 px-7"
                                name="email"
                                defaultValue={contact.email}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {socials
                            .sort((a, b) => a.index - b.index)
                            .map((social, index) => (
                                <div
                                    key={index}
                                    className="relative flex gap-10 w-full"
                                >
                                    <p className="absolute -left-10 top-[25%]">
                                        {index + 1} ){" "}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                        <p className="ml-2">
                                            {t("Common.index")}
                                        </p>
                                        :
                                        <input
                                            className="w-full py-3 px-7"
                                            name={`${social.name}-index`}
                                            type="number"
                                            defaultValue={social.index}
                                        />
                                    </div>
                                    {/* <div className="flex gap-2 items-center">
                                        <p className="ml-2">
                                            {t("Common.title")}
                                        </p>
                                        :
                                        <input
                                            className="w-full py-3 px-7"
                                            name={`${social.name}-name`}
                                            defaultValue={social.name}
                                        />
                                    </div> */}
                                    <div className="flex gap-2 items-center">
                                        <p className="ml-2">
                                            {t("Common.url")}
                                        </p>
                                        :
                                        <input
                                            className="w-full py-3 px-7"
                                            name={`${social.name}-url`}
                                            defaultValue={social.url}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p className="ml-2">
                                            {t("Common.active")}
                                        </p>
                                        :
                                        <input
                                            id={social.name}
                                            type="checkbox"
                                            name={`${social.name}-active`}
                                            defaultChecked={social.isActive}
                                            className="bg-tertiary p-2 rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Dashboard;
