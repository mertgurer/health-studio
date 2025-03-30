"use client";

import { ServiceData } from "@/data/serviceData";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type Props = {
    data: ServiceData;
    index: number;
    inverse?: boolean;
    setSelectedService: (service: ServiceData) => void;
};

function ServiceFrames({ data, index, inverse, setSelectedService }: Props) {
    const t = useTranslations();

    const colors = [
        "bg-[#C6A980]",
        "bg-[#d9c6ab]",
        "bg-[#D3BC9C]",
        "bg-[#CCB38E]",
    ];

    return (
        <div
            className={`flex w-[24.025%] flex-shrink-0 gap-[0.9vw] ${
                inverse ? "flex-col-reverse" : "flex-col"
            }`}
        >
            <div className="relative flex w-full aspect-square rounded-sm overflow-hidden">
                <Image
                    src={data.image}
                    alt={"Logo"}
                    fill
                    sizes="100%"
                    draggable={false}
                    className="object-cover scale-105 hover:scale-100 transition-all duration-700"
                />
            </div>
            <button
                className={`group flex flex-col items-start w-full aspect-square p-8 ${
                    colors[index % 4]
                } rounded-sm`}
                onClick={() => setSelectedService(data)}
            >
                <div className="ml-3 mb-3 group-hover:scale-110 group-hover:mb-4 duration-300">
                    {data.icon}
                </div>
                <h2 className="text-2xl text-start text-balance font-semibold italic">
                    {t(data.title)}
                </h2>
                <p className="mt-4 text-start">{t(data.info)}</p>
                <div className="flex flex-col items-start mt-auto gap-1">
                    <div className="flex items-center gap-2 font-light">
                        <p>{t("Common.learnMore")}</p>
                        <div className="flex items-center justify-center group-hover:ml-2 transition-all duration-100 ease-in-out">
                            <HugeiconsIcon
                                icon={ArrowRight02Icon}
                                size={24}
                                strokeWidth={1}
                            />
                        </div>
                    </div>
                    <div className="h-[1px] w-0 bg-text group-hover:w-full transition-all duration-300 ease-in-out"></div>
                </div>
            </button>
        </div>
    );
}

export default ServiceFrames;
