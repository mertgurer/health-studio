"use client";

import React, { HTMLInputTypeAttribute } from "react";
import { useTranslations } from "next-intl";

interface Props {
    name: string;
    label: string;
    type?: HTMLInputTypeAttribute;
}

function FormTextInput({ label, type = "text", name }: Props) {
    const t = useTranslations();

    return (
        <div className="flex flex-col items-start w-full">
            <label className="text-sm font-medium ml-1">{t(label)}</label>
            <input
                name={name}
                type={type}
                className="px-4 py-2 w-full rounded-sm"
            />
        </div>
    );
}

export default FormTextInput;
