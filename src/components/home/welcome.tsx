"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown04Icon, Yoga03Icon } from "@hugeicons/core-free-icons";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useScreenSize } from "@/hooks/useScreenSize";

import Logo from "../../../public/assets/images/logo_text.png";
import { StorageService } from "@/services/StorageService";

function Welcome() {
    const t = useTranslations("Welcome");
    const { isMobile } = useScreenSize();
    const lenis = useLenis();
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    const scaleValue = useMotionValue(1);
    const scale = useSpring(scaleValue, {
        damping: 20,
        stiffness: 120,
    });
    const translateY = useTransform(scale, (scale) => -(1 - scale) * 700);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const startScroll = vh * 0;
            const endScroll = vh * 0.6;
            const scrollRange = endScroll - startScroll;

            const clamped = Math.min(
                Math.max(scrollY - startScroll, 0),
                scrollRange
            );
            const newScale = 1 - (clamped / scrollRange) * 0.25;

            scaleValue.set(newScale);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scaleValue]);

    return (
        <section
            id="welcome"
            className="relative flex items-center justify-center bg-secondary h-screen min-h-screen overflow-hidden max-md:items-start max-md:flex-col max-md:pb-[35%]"
        >
            <motion.div
                className="overflow-hidden w-full h-full max-md:hidden"
                style={{
                    scale,
                    transition: "transform 0.1s ease-out",
                }}
                ref={emblaRef}
            >
                <div className="flex h-full">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] min-w-0 relative"
                        >
                            <Image
                                src={StorageService.getImage(
                                    `welcome_${index + 1}`
                                )}
                                alt={"welcome image"}
                                fill
                                sizes="100%"
                                className="object-cover max-md:object-fill"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
            {isMobile && (
                <div className="relative w-full aspect-video">
                    <Image
                        src={Logo}
                        alt={"logo"}
                        fill
                        priority
                        sizes="100%"
                        className="object-contain scale-[60%]"
                    />
                </div>
            )}
            <motion.div
                initial={{
                    translateY: 30,
                    opacity: 0,
                }}
                animate={{
                    translateY: 0,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.25,
                    duration: 1.2,
                    ease: "easeOut",
                }}
                className="absolute w-[38%] bottom-[5%] left-[5%] max-md:w-[94%] max-md:mx-auto max-md:bottom-0 max-md:left-0 max-md:relative"
            >
                <motion.div
                    style={{
                        translateY,
                        transition: "transform 0.1s ease-out",
                    }}
                    className="flex bg-secondary shadow-xl rounded-sm max-md:flex-col"
                >
                    <div className="flex flex-col items-start py-[4%] px-[5%] bottom-[5%] left-[5%] bg-primary border-secondary border-l-[16px] max-md:border-l-0 max-md:pt-[8%] max-md:text-center max-md:items-center">
                        {!isMobile && (
                            <h1 className="text-5xl w-full font-semibold mb-4 max-2xl:text-3xl max-md:text-2xl">
                                {t("title")}
                            </h1>
                        )}
                        {isMobile && (
                            <motion.div className="mb-4" style={{ scale }}>
                                <HugeiconsIcon
                                    icon={Yoga03Icon}
                                    size={44}
                                    strokeWidth={1.5}
                                />
                            </motion.div>
                        )}
                        <p className="text-lg font-medium text-balance max-2xl:text-base max-md:font-semibold">
                            {t("description")}
                        </p>
                        <p className="text-lg italic mt-[4%] max-2xl:text-base max-md:font-light">
                            {!isMobile && "-"} {t("motto")} {!isMobile && "-"}
                        </p>
                    </div>
                    <button
                        className="group flex items-center justify-center gap-2 rounded-sm font-medium px-2 py-2 bg-secondary text-lg border-secondary max-2xl:text-base max-md:bg-primary max-md:border-t-2 md:hover:translate-y-4 md:hover:shadow-md duration-1000"
                        onClick={() =>
                            lenis?.scrollTo("#about", {
                                offset: -80,
                                duration: !isMobile ? 1.75 : 1.5,
                                easing: (x) => 1 - Math.pow(1 - x, 3),
                            })
                        }
                    >
                        <HugeiconsIcon
                            icon={ArrowDown04Icon}
                            size={!isMobile ? 52 : 40}
                            strokeWidth={1.5}
                            className="md:group-hover:translate-y-8 duration-1000"
                        />
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Welcome;
