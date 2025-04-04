"use client";

import Image from "next/image";
import React from "react";
import logo from "../../public/assets/images/logo_text.png";
import LocaleButton from "./localeButton";
import TurkishFlag from "../../public/assets/images/turkey.png";
import EnglishFlag from "../../public/assets/images/english.png";

function Footer() {
    return (
        <div className="w-full h-24 flex items-center justify-between px-[10%] bg-secondary max-md:h-32 max-md:flex-col max-md:pb-4 max-md:pt-1">
            <div className="relative flex h-16 aspect-video rounded-sm overflow-hidden max-2xl:h-16 max-md:h-16">
                <Image
                    src={logo}
                    alt={"Logo"}
                    fill
                    sizes="100%"
                    draggable={false}
                    className="object-contain"
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-1 max-md:items-center">
                    <div className="flex gap-2 items-center">
                        <LocaleButton language={"tr"} img={TurkishFlag} />
                        <LocaleButton language={"en"} img={EnglishFlag} />
                    </div>
                    <p className="text-end text-balance text-sm max-2xl:text-xs">
                        Copyright © 2025{" "}
                        <span className="font-semibold whitespace-nowrap">
                            base on.
                        </span>{" "}
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
