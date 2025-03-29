"use client";

import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import React, { ChangeEvent } from "react";
import { MdArrowDropDown } from "react-icons/md";

export default function LocaleButton() {
    const router = useRouter();
    const pathname = usePathname();

    const locale = useLocale();
    const t = useTranslations("Locale");

    return (
        <div className="flex relative items-center rounded bg-primary">
            <select
                className="p-2 pr-8 appearance-none bg-primary"
                defaultValue={locale}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const nextLocale = event.target
                        .value as (typeof routing.locales)[number];

                    if (nextLocale !== locale) {
                        router.replace(pathname, { locale: nextLocale });
                    }
                }}
            >
                {routing.locales.map((x) => (
                    <option key={x} value={x} className="text-text font-light">
                        {t(x)}
                    </option>
                ))}
            </select>
            <MdArrowDropDown
                size={30}
                className="absolute right-1 pointer-events-none"
            />
        </div>
    );
}
