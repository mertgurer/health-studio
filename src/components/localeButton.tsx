"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import { useScreenSize } from "@/hooks/useScreenSize";

interface Props {
    language: "en" | "tr";
    img: StaticImageData;
}

export default function LocaleButton({ language, img }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { isMobile } = useScreenSize();

    return (
        <button
            className="flex relative items-center rounded bg-primary"
            onClick={() => router.replace(pathname, { locale: language })}
        >
            <div>
                <Image
                    src={img}
                    alt="Locale"
                    width={isMobile ? 32 : 40}
                    height={isMobile ? 20 : 25}
                />
            </div>
        </button>
    );
}
