"use client";

import { useTheme } from "@/hooks/useTheme";
import { useTranslations } from "next-intl";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();
    const t = useTranslations("Theme");

    return (
        <button className="p-2 rounded bg-primary" onClick={toggleTheme}>
            <div className="flex items-center gap-2">
                {theme === "light" ? (
                    <>
                        {t("darkMode")} <MdDarkMode size={20} />
                    </>
                ) : (
                    <>
                        {t("lightMode")} <MdLightMode size={20} />
                    </>
                )}
            </div>
        </button>
    );
}
