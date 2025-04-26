"use client";

import React, { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail02Icon, TelephoneIcon } from "@hugeicons/core-free-icons";
import ContactTextInput from "../contactTextInput";
import { emailRegex } from "@/constants/constants";
import toast from "react-hot-toast";
import { Social } from "@/services/SocialService";
import { SocialIcons } from "@/data/socialData";
import emailjs from "@emailjs/browser";

interface Props {
    email: string;
    phone: string;
    address: string;
    socials: Social[];
}

function Contact({ email, phone, address, socials }: Props) {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);

    async function sendMessage(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
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
            toast.error(t("Common.invalidEmail"));
            return;
        }

        setLoading(true);

        try {
            await toast.promise(
                async () => {
                    await emailjs.sendForm(
                        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || "",
                        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID || "",
                        event.currentTarget,
                        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY || ""
                    );

                    const formElement = document.getElementById(
                        "contact-form"
                    ) as HTMLFormElement;
                    if (formElement) {
                        formElement.reset();
                    }
                },
                {
                    loading: t("Contact.loading"),
                    success: t("Contact.Success.sent"),
                    error: (err) => t("Contact.Error.failed") + err,
                }
            );
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <section
            id="contact"
            className="flex w-full py-[7%] px-[14%] gap-[8%] max-md:flex-col max-md:text-center max-md:px-[10%] max-md:py-[10%]"
        >
            <div className="flex flex-col w-1/2 items-center max-md:w-full">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="max-2xl:text-sm">
                        - {t("Contact.subtitle")} -
                    </h1>
                    <h2 className="text-4xl font-semibold italic max-2xl:text-3xl">
                        {t("Contact.title")}
                    </h2>
                </div>
                <div className="flex items-center justify-center gap-2 my-6 max-2xl:mt-4">
                    {socials
                        .sort((a, b) => a.index - b.index)
                        .map((social, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 border border-text bg-background rounded-full shadow-md duration-500 relative group/tooltip hover:border-secondary max-2xl:p-0.5"
                                >
                                    <div className="group-hover/tooltip:text-secondary hover:scale-95 duration-200 max-2xl:scale-90">
                                        {SocialIcons[social.name]}
                                    </div>
                                    <span
                                        className="absolute z-10 -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-tertiary rounded text-sm opacity-0 
                                        group-hover/tooltip:opacity-100 transition-opacity duration-150 delay-0 group-hover/tooltip:delay-500 whitespace-nowrap"
                                    >
                                        {social.name}
                                    </span>
                                </Link>
                            );
                        })}
                </div>

                <p className="text-center text-balance mt-2 mb-10 opacity-80 max-2xl:text-sm">
                    {t("Contact.contactText")}
                </p>
                <div className="flex items-center gap-2 mt-7 my-1 max-2xl:text-sm max-md:mt-0">
                    <HugeiconsIcon
                        icon={TelephoneIcon}
                        size={24}
                        strokeWidth={1.5}
                        className="max-2xl:size-5"
                    />
                    <span className="font-medium">{phone}</span>
                </div>
                <div className="flex items-center gap-2 my-1 max-2xl:text-sm">
                    <HugeiconsIcon
                        icon={Mail02Icon}
                        size={24}
                        strokeWidth={1.5}
                        className="max-2xl:size-5"
                    />
                    <span className="font-medium">{email}</span>
                </div>

                <div className="flex flex-col items-center mt-4 my-1 font-medium max-2xl:text-sm">
                    <p className="text-center text-balance">{address}</p>
                </div>
            </div>
            <div className="flex flex-col items-end pl-[4%] w-1/2 max-md:w-full max-md:mt-16 max-md:pl-0">
                <h2 className="text-2xl font-light italic mb-8 max-2xl:text-xl max-md:self-center">
                    {t("Contact.contactInfo")}
                </h2>
                <form
                    className="flex flex-col gap-10 w-full max-2xl:gap-7"
                    id="contact-form"
                    onSubmit={sendMessage}
                >
                    <ContactTextInput
                        label="Common.name"
                        name="customerName"
                        placeholder
                        required
                    />
                    <ContactTextInput
                        label="Common.phone"
                        name="phone"
                        type="tel"
                        placeholder
                        required
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
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-secondary text-white px-4 py-2 font-medium rounded-md max-2xl:text-sm disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {t("Common.send")}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
