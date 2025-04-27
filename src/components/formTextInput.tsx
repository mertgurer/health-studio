"use client";

import React, { HTMLInputTypeAttribute, useState } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

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
    const [hidden, setHidden] = useState(type === "password");

    return (
        <div className="flex flex-col items-start w-full">
            <label className="text-sm font-medium ml-1">
                {t(label)} {required && "*"}
            </label>
            <div
                className={`flex items-center relative w-full bg-tertiary ${
                    type === "password" ? "pr-10" : ""
                }`}
            >
                {type === "tel" && (
                    <p className="flex items-center h-full px-2 bg-tertiary">
                        +90
                    </p>
                )}
                <input
                    name={name}
                    type={type === "password" ? (hidden ? type : "text") : type}
                    className={`py-2 w-full rounded-sm ${
                        type === "tel" ? "pr-4" : "px-4"
                    }`}
                    maxLength={type === "tel" ? 13 : 40}
                />
                {type === "password" && (
                    <button
                        className="absolute right-2 flex items-center justify-center w-8 h-8"
                        type="button"
                        onClick={() => setHidden(!hidden)}
                    >
                        <HugeiconsIcon
                            icon={hidden ? ViewIcon : ViewOffIcon}
                            size={20}
                            strokeWidth={1.5}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default FormTextInput;
