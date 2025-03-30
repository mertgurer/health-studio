"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Logo from "../../../public/assets/images/logo_text.png";
import gulce from "../../../public/assets/images/GÜLCE ŞEVVAL BAĞCIBAŞI.jpg";
import tugce from "../../../public/assets/images/TUĞÇE YURDAKUL.jpg";

function About() {
    const t = useTranslations("About");
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

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
            className="flex flex-col items-center justify-center bg-secondary py-[10vh] gap-[12vh]"
        >
            <div className="relative flex items-center justify-center px-[5%] gap-10">
                <div className="flex flex-col rounded-sm py-10 px-12 w-1/2 gap-3 z-10">
                    <h2 className="text-4xl font-semibold italic ml-2">
                        {t("title")}
                    </h2>
                    <p>{t("p1")}</p>
                    <p>{t("p2")}</p>
                    <div className="flex flex-col mt-3">
                        <p>{t("p3")}</p>
                        <p>{t("p4")}</p>
                    </div>
                </div>
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
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-secondary z-10"
                            initial={{ bottom: "60%" }}
                            animate={
                                isInView
                                    ? { bottom: "100%" }
                                    : { bottom: "60%" }
                            }
                            transition={{ duration: 1.5, ease: "easeInOut" }}
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
            </div>
            <div className="h-[2px] w-1/4 bg-background" />
            <div className="flex flex-col items-center justify-center w-full gap-10">
                <div className="flex flex-col justify-center items-center">
                    <h1>- {t("subtitle")} -</h1>
                    <h2 className="text-4xl font-semibold italic">
                        {t("ourExperts")}
                    </h2>
                </div>
                <div className="flex items-center justify-center w-full">
                    <motion.div
                        initial={{ y: "-5%", opacity: 0, x: "20%" }}
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
                        className="relative w-1/5 aspect-[3/4] rounded-sm overflow-hidden"
                    >
                        <Image
                            src={gulce}
                            alt={"gulce"}
                            fill
                            sizes="100%"
                            className="object-cover scale-125"
                        />
                    </motion.div>
                    <div className="flex flex-col items-center justify-center gap-4 w-[45%] z-10">
                        <motion.div
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--primary), transparent 20%)",
                                backdropFilter: "blur(5px)",
                            }}
                            initial={{ y: "4%", x: "2%", opacity: 0 }}
                            whileInView={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="rounded-sm w-full h-1/5 p-10"
                        >
                            <h2 className="text-2xl font-semibold italic ml-2">
                                Gülce Şevval Bağcıbaşı
                            </h2>
                            <p className="font-medium opacity-50 ml-2">
                                {t("gulceTitle")}
                            </p>
                            <p className="text-sm text-balance mt-2">
                                {t("gulceInfo")}
                            </p>
                        </motion.div>
                        <motion.div
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--primary), transparent 20%)",
                                backdropFilter: "blur(5px)",
                            }}
                            initial={{ y: "-4%", x: "-2%", opacity: 0 }}
                            whileInView={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="rounded-sm w-full h-1/5 p-10 text-end"
                        >
                            <h2 className="text-2xl font-semibold italic mr-2">
                                Tuğçe Yurdakul
                            </h2>
                            <p className="font-medium opacity-50 mr-2">
                                {t("tugceTitle")}
                            </p>
                            <p className="text-sm text-start text-balance mt-2">
                                {t("tugceInfo")}
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: "5%", opacity: 0, x: "-20%" }}
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
                        className="relative w-1/5 aspect-[3/4] rounded-sm overflow-hidden"
                    >
                        <Image
                            src={tugce}
                            alt={"tugce"}
                            fill
                            sizes="100%"
                            className="object-cover scale-125"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;
