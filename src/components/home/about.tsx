"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Logo from "../../../public/assets/images/logo_text.png";
import { useScreenSize } from "@/hooks/useScreenSize";
import { ExpertNames, Experts } from "@/constants/constants";
import { StorageService } from "@/services/StorageService";

interface Props {
    about: string;
    members: {
        gulce: {
            title: string;
            info: string;
        };
        tugce: {
            title: string;
            info: string;
        };
    };
}

function About({ about, members }: Props) {
    const t = useTranslations("About");
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                /*                 if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                } */

                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.3,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            className="flex flex-col items-center justify-center bg-secondary py-[10vh] gap-[12vh] max-md:gap-[2vh] max-md:py-[3vh]"
        >
            <div className="relative flex items-center justify-center gap-10 px-[5%] max-2xl:px-0">
                <div className="flex flex-col rounded-sm py-10 px-12 gap-3 z-10 w-1/2 text-justify max-2xl:w-2/3 max-md:w-[90%] max-md:px-2 max-md:py-4">
                    <h2 className="font-semibold italic ml-2 text-4xl max-2xl:text-3xl">
                        {t("title")}
                    </h2>
                    <div className="flex flex-col gap-2">
                        {about.split("\n").map((x, index, arr) => (
                            <p
                                key={index}
                                className={
                                    index === arr.length - 1 ? "mt-3" : ""
                                }
                            >
                                {x}
                            </p>
                        ))}
                    </div>
                </div>
                {!isMobile && (
                    <div className="relative flex w-1/5 h-[65vh] bg-primary rounded-sm overflow-hidden">
                        <div
                            ref={containerRef}
                            className="relative w-full h-full overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-secondary z-10"
                                initial={{ top: "60%" }}
                                animate={
                                    isInView ? { top: "100%" } : { top: "60%" }
                                }
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-secondary z-10"
                                initial={{ bottom: "60%" }}
                                animate={
                                    isInView
                                        ? { bottom: "100%" }
                                        : { bottom: "60%" }
                                }
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                            />
                            <Image
                                src={Logo}
                                alt={"Logo"}
                                fill
                                sizes="100%"
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="h-[2px] bg-background w-1/4 max-2xl:w-1/3 max-md:w-1/2" />
            <div className="flex flex-col items-center justify-center w-full gap-10 max-md:mt-10 max-md:gap-0">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="max-2xl:text-sm">- {t("subtitle")} -</h1>
                    <h2 className="font-semibold italic text-4xl max-2xl:text-3xl">
                        {t("ourExperts")}
                    </h2>
                </div>
                <div className="flex items-center justify-center overflow-hidden w-full max-2xl:items-start max-md:flex-col max-md:items-center">
                    <motion.div
                        initial={{
                            y: "-5%",
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.2,
                            ease: "easeOut",
                            scale: {
                                duration: 1,
                                delay: 0,
                            },
                        }}
                        style={{ x: isMobile ? 0 : "20%" }}
                        className="relative w-1/5 aspect-[3/4] rounded-sm overflow-hidden max-2xl:w-1/4 max-2xl:mt-10 max-md:w-[80%] max-md:aspect-square"
                    >
                        <Image
                            src={StorageService.getImage("gulce")}
                            alt={"gulce"}
                            fill
                            sizes="100%"
                            className="object-cover scale-125 max-md:scale-100"
                        />
                    </motion.div>
                    <div className="flex flex-col items-center justify-center gap-4 w-[45%] z-10 max-2xl:w-2/4 max-md:w-[96%] max-md:-mt-16 max-md:gap-8">
                        <motion.div
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--primary), transparent 20%)",
                                backdropFilter: "blur(5px)",
                            }}
                            initial={{ y: "4%", x: "2%", opacity: 0 }}
                            whileInView={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="rounded-sm w-full h-1/5 p-10 max-md:py-6 max-md:px-7"
                        >
                            <h2 className="text-2xl font-semibold italic ml-2">
                                {ExpertNames[Experts.GULCE]}
                            </h2>
                            <p className="font-medium opacity-50 ml-2">
                                {members.gulce.title}
                            </p>
                            <p className="text-sm text-justify mt-2">
                                {members.gulce.info}
                            </p>
                        </motion.div>
                        {isMobile && (
                            <motion.div
                                initial={{ y: "5%", opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    duration: 1.5,
                                    delay: 0.2,
                                    ease: "easeOut",
                                    scale: {
                                        duration: 1,
                                        delay: 0,
                                    },
                                }}
                                style={{ x: isMobile ? 0 : "-20%" }}
                                className="relative rounded-sm overflow-hidden max-md:w-[90%] max-md:self-center max-md:aspect-square"
                            >
                                <Image
                                    src={StorageService.getImage("tugce")}
                                    alt={"tugce"}
                                    fill
                                    sizes="100%"
                                    className="object-cover scale-125 max-md:scale-100"
                                />
                            </motion.div>
                        )}
                        <motion.div
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--primary), transparent 16%)",
                                backdropFilter: "blur(12px)",
                            }}
                            initial={{ y: "-4%", x: "-2%", opacity: 0 }}
                            whileInView={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="rounded-sm w-full h-1/5 p-10 text-end max-md:py-6 max-md:px-7 max-md:-mt-24"
                        >
                            <h2 className="text-2xl font-semibold italic mr-2">
                                {ExpertNames[Experts.TUGCE]}
                            </h2>
                            <p className="font-medium opacity-50 mr-2">
                                {members.tugce.title}
                            </p>
                            <p className="text-sm text-justify mt-2">
                                {members.tugce.info}
                            </p>
                        </motion.div>
                    </div>

                    {!isMobile && (
                        <motion.div
                            initial={{ y: "5%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                duration: 1.5,
                                delay: 0.2,
                                ease: "easeOut",
                                scale: {
                                    duration: 1,
                                    delay: 0,
                                },
                            }}
                            style={{ x: isMobile ? 0 : "-20%" }}
                            className="relative w-1/5 aspect-[3/4] rounded-sm overflow-hidden max-2xl:self-end max-2xl:w-1/4 max-2xl:mb-10"
                        >
                            <Image
                                src={StorageService.getImage("tugce")}
                                alt={"tugce"}
                                fill
                                sizes="100%"
                                className="object-cover scale-125"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default About;
