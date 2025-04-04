"use client";

import React, { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Socials } from "@/data/socials";
import { Link } from "@/i18n/routing";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail02Icon, TelephoneIcon } from "@hugeicons/core-free-icons";
import ContactTextInput from "../contactTextInput";
import { emailRegex } from "@/constants/constants";

function Contact() {
    const t = useTranslations();

    function sendMessage(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const customerName = formData.get("customerName") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!customerName && !phone && !email && !message) {
            return;
        }

        if (!customerName || !phone || !message) {
            return;
        }

        if (email && !emailRegex.test(email)) {
            alert(t("Common.invalidEmail"));
            return;
        }

        console.log(customerName, phone, email, message);
    }

    return (
        <section
            id="contact"
            className="flex  w-full py-[7%] px-[14%] gap-[8%]"
        >
            <div className="flex flex-col w-1/2 items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="max-2xl:text-sm">
                        - {t("Contact.subtitle")} -
                    </h1>
                    <h2 className="text-4xl font-semibold italic max-2xl:text-3xl">
                        {t("Contact.title")}
                    </h2>
                </div>
                <div className="flex items-center justify-center gap-2 my-6 max-2xl:mt-4">
                    {Socials.sort((a, b) => a.index - b.index).map(
                        (social, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 border border-text bg-background rounded-full shadow-md duration-500 relative group/tooltip hover:border-secondary max-2xl:p-0.5"
                                >
                                    <div className="group-hover/tooltip:text-secondary hover:scale-95 duration-200 max-2xl:scale-90">
                                        {social.icon}
                                    </div>
                                    <span
                                        className="absolute z-10 -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-tertiary rounded text-sm opacity-0 
                                        group-hover/tooltip:opacity-100 transition-opacity duration-150 delay-0 group-hover/tooltip:delay-500 whitespace-nowrap"
                                    >
                                        {social.name}
                                    </span>
                                </Link>
                            );
                        }
                    )}
                </div>

                <p className="text-center text-balance mt-2 mb-10 opacity-80 max-2xl:text-sm">
                    {t("Contact.contactText")}
                </p>
                <div className="flex items-center gap-2 mt-7 my-1 max-2xl:text-sm">
                    <HugeiconsIcon
                        icon={TelephoneIcon}
                        size={24}
                        strokeWidth={1.5}
                        className="max-2xl:size-5"
                    />
                    <span>+90 555 555 5555</span>
                </div>
                <div className="flex items-center gap-2 my-1 max-2xl:text-sm">
                    <HugeiconsIcon
                        icon={Mail02Icon}
                        size={24}
                        strokeWidth={1.5}
                        className="max-2xl:size-5"
                    />
                    <span>support@baseon.com</span>
                </div>

                <div className="flex flex-col items-center mt-4 my-1 max-2xl:text-sm">
                    <p>Mehmet Akif Mahallesi, Güzel Sk. No: 12, Daire: 5</p>
                    <p>Kadıköy, İstanbul, 34730</p>
                </div>
            </div>
            <div className="flex flex-col items-end pl-[4%] w-1/2">
                <h2 className="text-2xl font-light italic mb-8 max-2xl:text-xl">
                    {t("Contact.contactInfo")}
                </h2>
                <form
                    className="flex flex-col gap-10 w-full max-2xl:gap-7"
                    onSubmit={sendMessage}
                >
                    <ContactTextInput
                        label="Common.name"
                        name="customerName"
                        placeholder
                    />
                    <ContactTextInput
                        label="Common.phone"
                        name="phone"
                        type="tel"
                        placeholder
                    />
                    <ContactTextInput
                        label="Common.email"
                        name="email"
                        type="email"
                        placeholder
                    />
                    <div className="flex mt-12 max-2xl:mt-8">
                        <ContactTextInput
                            label="Common.message"
                            name="message"
                            placeholder
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-secondary text-white px-4 py-2 rounded-md max-2xl:text-sm"
                    >
                        {t("Common.send")}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
