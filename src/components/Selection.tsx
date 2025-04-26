"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Option = {
    id: number;
    name: string;
};

interface Props {
    options: Option[];
    label: string;
    required?: boolean;
}

function Selection({ options, label, required }: Props) {
    const t = useTranslations();

    return (
        <div className="flex flex-col items-start w-full">
            <label className="text-sm font-medium ml-1">
                {t(label)} {required && "*"}
            </label>
            <div className="flex items-center justify-center px-1 w-full rounded-sm bg-tertiary min-h-10">
                <select
                    name="selectedExpert"
                    className="px-4 py-2 w-full rounded-sm bg-tertiary"
                >
                    <option value="" className="">
                        --- {t("Common.choose")} ---
                    </option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Selection;
