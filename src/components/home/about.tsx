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
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
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
            className="flex flex-col items-center justify-center bg-secondary pt-[10vh] gap-[25vh]"
        >
            <div className="relative flex items-center justify-center px-[5%] gap-10">
                <div className="flex flex-col rounded-sm py-10 px-12 w-1/2 gap-3 z-10">
                    <h2 className="text-4xl font-bold italic ml-2">
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
                            initial={{ top: "50%" }}
                            animate={
                                isInView ? { top: "100%" } : { top: "50%" }
                            }
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-secondary z-10"
                            initial={{ bottom: "50%" }}
                            animate={
                                isInView
                                    ? { bottom: "100%" }
                                    : { bottom: "50%" }
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
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mb-12">
                    <h2 className="text-4xl font-bold italic">
                        {t("ourExperts")}
                    </h2>
                </div>
                <div></div>
            </div>
        </section>
    );
}

export default About;
