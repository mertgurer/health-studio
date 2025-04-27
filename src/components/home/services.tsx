"use client";

import React, { useState, useEffect } from "react";
import ServiceFrames from "../serviceFrames";
import { ServiceIcon } from "@/data/serviceData";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { ScreenSize, useScreenSize } from "@/hooks/useScreenSize";
import { ServiceInfo } from "@/services/ServiceService";

interface Props {
    services: {
        id: string;
        index: number;
        isActive: boolean;
        title: string;
        info: string;
        description: string;
    }[];
}

function Services({ services }: Props) {
    const t = useTranslations();
    const { isMobile } = useScreenSize();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxScrollWidth, setMaxScrollWidth] = useState(0);
    const [selectedService, setSelectedService] = useState<ServiceInfo | null>(
        null
    );
    const [windowWidth, setWindowWidth] = useState(0);
    const controls = useDragControls();

    useEffect(() => {
        const updateWidth = () => {
            var width = 0;
            const serviceCountRatio = services.length / 8;

            if (isMobile) {
                width = window.innerWidth * 0.9 * (0.7 * 6.5) * 1.031;
            } else if (window.innerWidth > ScreenSize.XXL) {
                width = window.innerWidth * 0.76 * 1.005;
            } else if (window.innerWidth <= ScreenSize.XXL) {
                width = window.innerWidth * 0.76 * (5 / 3) * 1.012;
            }

            width *= serviceCountRatio;

            setMaxScrollWidth(width);
            setWindowWidth(window.innerWidth);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, [isMobile, services.length]);

    return (
        <section
            id="services"
            className="flex flex-col items-center justify-center gap-16 mt-[3%] pt-[3%] pb-16 max-2xl:pb-0 max-md:gap-8 max-md:pt-[4vh] max-md:mt-[4vh] max-md:pb-[4vh]"
        >
            <div className="flex flex-col justify-center items-center">
                <h1 className="max-2xl:text-sm">
                    - {t("Services.subtitle")} -
                </h1>
                <h2 className="text-4xl font-semibold italic max-2xl:text-3xl">
                    {t("Services.title")}
                </h2>
            </div>
            <div className="flex items-center justify-center w-full">
                {!isMobile && (
                    <button
                        onClick={() =>
                            setCurrentIndex(Math.max(0, currentIndex - 1))
                        }
                        className={`p-4 duration-300 ${
                            currentIndex === 0 ? "opacity-30" : ""
                        }`}
                        disabled={currentIndex === 0}
                    >
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            size={36}
                            strokeWidth={1.5}
                        />
                    </button>
                )}
                <div className="flex items-center justify-center w-[76%] overflow-hidden max-md:w-[90%]">
                    <motion.div
                        drag="x"
                        dragControls={controls}
                        dragConstraints={{
                            right: 0,
                            left: -maxScrollWidth,
                        }}
                        initial={{
                            x: 0,
                        }}
                        animate={{
                            x: `-${
                                currentIndex *
                                (isMobile
                                    ? 101.3
                                    : windowWidth > ScreenSize.XXL
                                    ? 25.325
                                    : 33.76)
                            }%`,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                        className="flex w-full gap-[1.3%]"
                    >
                        {services
                            .sort((a, b) => a.index - b.index)
                            .map((service, index) => (
                                <ServiceFrames
                                    key={service.title}
                                    id={service.id}
                                    data={{
                                        title: service.title,
                                        info: service.info,
                                        description: service.description,
                                        icon: ServiceIcon[service.id],
                                    }}
                                    index={index}
                                    inverse={index % 2 === 1}
                                    setSelectedService={setSelectedService}
                                />
                            ))}
                    </motion.div>
                </div>
                {!isMobile && (
                    <button
                        onClick={() =>
                            setCurrentIndex(Math.min(4, currentIndex + 1))
                        }
                        className={`p-4 duration-300 ${
                            currentIndex === 4 ? "opacity-30" : ""
                        }`}
                        disabled={currentIndex === 4}
                    >
                        <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={36}
                            strokeWidth={1.5}
                        />
                    </button>
                )}
            </div>
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--text), transparent 40%)",
                        }}
                        className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center"
                        onClick={() => setSelectedService(null)}
                    >
                        <div
                            className="relative flex items-center justify-center w-1/2 bg-primary rounded-sm shadow-lg p-14 cursor-default max-2xl:w-2/3 max-md:w-[90%] max-md:px-9 max-md:py-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex text-3xl font-semibold italic gap-3 ml-2 max-md:text-2xl max-md:items-center">
                                    <HugeiconsIcon
                                        icon={selectedService.icon}
                                        size={36}
                                        strokeWidth={1.5}
                                        className="max-2xl:size-8 max-md:size-7"
                                    />
                                    <span>{selectedService.title}</span>
                                </div>
                                <p className="text-justify">
                                    {selectedService.description}
                                </p>
                            </div>
                            <button
                                className="absolute top-3 right-3 p-2"
                                onClick={() => setSelectedService(null)}
                            >
                                <HugeiconsIcon
                                    icon={Cancel01Icon}
                                    size={24}
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Services;
