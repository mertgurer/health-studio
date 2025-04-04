"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

import WelcomeImage from "../../../public/assets/images/welcome.jpg";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDownLeft02Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

function Welcome() {
    const t = useTranslations("Welcome");

    return (
        <section
            id="welcome"
            className="flex items-center justify-center min-h-screen pt-10"
        >
            <motion.div
                initial={{
                    transform: "translateX(-8%)",
                }}
                whileInView={{
                    transform: "translateX(0%)",
                }}
                transition={{
                    transform: { duration: 1.8, ease: "easeOut" },
                }}
                viewport={{ once: true }}
                className="absolute -left-[15%] w-2/3 h-[85vh] mt-[5vh] -z-10 rounded-r-full overflow-hidden bg-background"
            >
                <Image
                    src={WelcomeImage}
                    alt={"welcome image"}
                    fill
                    priority
                    sizes="100%"
                    className="object-cover"
                />
            </motion.div>
            <motion.div
                initial={{
                    transform: "translateX(3%)",
                }}
                whileInView={{
                    transform: "translateX(0%)",
                }}
                transition={{
                    transform: { duration: 1.5, delay: 0.1, ease: "easeOut" },
                }}
                style={{
                    backgroundColor:
                        "color-mix(in srgb, var(--secondary), transparent 5%)",
                }}
                viewport={{ once: true }}
                className="flex flex-col py-[3%] px-[4%] w-[48%] ml-[20%] mb-[10vh] rounded-sm rounded-l-full shadow-[inset_0_0_32px_-12px_rgba(0,0,0,0.3)] gap-5 
                            max-md:w-[92%] max-md:m-0 max-md:rounded-xl max-md:right-0"
            >
                <motion.h1
                    initial={{
                        transform: "translateY(20%)",
                        opacity: 0,
                        filter: "blur(4px)",
                    }}
                    whileInView={{
                        transform: "translateY(0%)",
                        opacity: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-semibold self-end mb-2 max-2xl:text-4xl"
                >
                    {t("title")}
                </motion.h1>
                <motion.p
                    initial={{
                        transform: "translateX(7%)",
                        opacity: 0,
                        filter: "blur(4px)",
                    }}
                    whileInView={{
                        transform: "translateX(0%)",
                        opacity: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-lg font-medium self-end text-end ml-[15%] max-2xl:text-base"
                >
                    {t("description")}
                </motion.p>
                <motion.p
                    initial={{
                        transform: "translateX(7%)",
                        opacity: 0,
                        filter: "blur(4px)",
                    }}
                    whileInView={{
                        transform: "translateX(0%)",
                        opacity: 0.8,
                        filter: "blur(0px)",
                    }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg italic self-end text-end ml-[15%] mt-[3%] max-2xl:text-base"
                >
                    - {t("motto")} -
                </motion.p>
                <button
                    className="flex items-center gap-2 rounded-sm self-end mt-auto font-medium px-5 py-2 bg-primary text-lg max-2xl:text-base"
                    onClick={() => {
                        document.getElementById("about")?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                >
                    {t("getStarted")}
                    <HugeiconsIcon
                        icon={ArrowDownLeft02Icon}
                        size={24}
                        strokeWidth={1.5}
                    />
                </button>
            </motion.div>
        </section>
    );
}

export default Welcome;
