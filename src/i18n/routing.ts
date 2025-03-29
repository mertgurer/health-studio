import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    // all locales that are supported
    locales: ["en", "tr", "es"],
    defaultLocale: "en",
    localePrefix: "never",
});

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation(routing);
