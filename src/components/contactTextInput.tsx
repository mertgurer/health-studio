"use client";

import React, { HTMLInputTypeAttribute } from "react";
import { useTranslations } from "next-intl";

interface Props {
    name: string;
    label: string;
    required?: boolean;
    placeholder?: boolean;
    type?: HTMLInputTypeAttribute;
}

function ContactTextInput({
    label,
    placeholder,
    type = "text",
    name,
    required = false,
}: Props) {
    const t = useTranslations();

    return (
        <div className="flex flex-col items-start w-full">
            {!placeholder && (
                <label className="text-sm font-medium ml-1">
                    {t(label)} {required && "*"}
                </label>
            )}
            <input
                name={name}
                type={type}
                placeholder={
                    placeholder ? t(label) + (required ? " *" : "") : undefined
                }
                className="px-4 py-1 w-full rounded-sm bg-transparent border-b-2 border-secondary text-lg 
                 placeholder:text-black/70 placeholder:font-light focus:px-7 duration-500 max-2xl:text-sm max-2xl:focus:px-6"
            />
        </div>
    );
}

export default ContactTextInput;
