"use client";

import React, { HTMLInputTypeAttribute } from "react";
import { useTranslations } from "next-intl";

interface Props {
    name: string;
    label: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
}

function FormTextInput({
    label,
    type = "text",
    name,
    required = false,
}: Props) {
    const t = useTranslations();

    return (
        <div className="flex flex-col items-start w-full">
            <label className="text-sm font-medium ml-1">
                {t(label)} {required && "*"}
            </label>
            <div className="flex items-center relative w-full">
                {type === "tel" && (
                    <p className="flex items-center h-full px-2 bg-tertiary">
                        +90
                    </p>
                )}
                <input
                    name={name}
                    type={type}
                    className={`py-2 w-full rounded-sm bg-tertiary ${
                        type === "tel" ? "pr-4" : "px-4"
                    }`}
                    maxLength={type === "tel" ? 13 : 40}
                />
            </div>
        </div>
    );
}

export default FormTextInput;
