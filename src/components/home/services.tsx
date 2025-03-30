"use client";

import React, { useState, useEffect } from "react";
import ServiceFrames from "../serviceFrames";
import { ServiceData, services } from "@/data/serviceData";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Cancel01Icon,
} from "@hugeicons/core-free-icons";

function Services() {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxScrollWidth, setMaxScrollWidth] = useState(0);
    const [selectedService, setSelectedService] = useState<ServiceData | null>(
        null
    );
    const controls = useDragControls();

    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth * 0.76 * 1.005;
            setMaxScrollWidth(width);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    return (
        <section
            id="services"
            className="flex flex-col items-center justify-center gap-16 py-[6%]"
        >
            <div className="flex flex-col justify-center items-center">
                <h1>- {t("Services.subtitle")} -</h1>
                <h2 className="text-4xl font-semibold italic">
                    {t("Services.title")}
                </h2>
            </div>
            <div className="flex items-center justify-center w-full">
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
                <div className="flex items-center justify-center w-[76%] overflow-hidden">
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
                            x: `-${currentIndex * 25.325}%`,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                        className="flex w-full gap-[1.3%]"
                    >
                        {services.map((service, index) => (
                            <ServiceFrames
                                key={service.title}
                                data={service}
                                index={index}
                                inverse={index % 2 === 1}
                                setSelectedService={setSelectedService}
                            />
                        ))}
                    </motion.div>
                </div>
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
            </div>
            <AnimatePresence>
                {selectedService && (
                    <motion.button
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
                            className="relative flex items-center justify-center w-1/2 bg-primary rounded-sm shadow-lg p-14"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex text-3xl font-semibold italic gap-3 ml-2">
                                    {selectedService.icon}
                                    {t(selectedService.title)}
                                </div>
                                <p className="text-start text-balance">
                                    {t(selectedService.description)}
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
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Services;
