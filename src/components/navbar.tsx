"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import Logo from "../../public/assets/images/logo_text.png";
import { Navigation } from "@/constants/navigation";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Social } from "@/services/SocialService";
import { SocialIcons } from "@/data/socialData";
import { useLenis } from "lenis/react";
const scrollThreshold = 40;

interface Props {
  socials: Social[];
}

function Navbar({ socials }: Props) {
  const t = useTranslations();
  const { isMobile } = useScreenSize();
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isScrolled) {
      setIsMenuOpen(false);
    }
  }, [isScrolled]);

  return (
    <>
      <motion.div
        initial={{
          backgroundColor:
            "color-mix(in srgb, var(--background), transparent 100%)",
          backdropFilter: "blur(0px)",
          boxShadow: "none",
        }}
        animate={{
          backgroundColor: !isMobile
            ? isScrolled
              ? "color-mix(in srgb, var(--background), transparent 20%)"
              : "color-mix(in srgb, var(--background), transparent 100%)"
            : "color-mix(in srgb, var(--background), transparent 0%)",
          backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
          height: !isMobile ? (isScrolled ? 80 : 96) : 80,
          opacity: !isMobile ? 1 : isScrolled ? 1 : 0,
        }}
        transition={{
          backgroundColor: { duration: 0.7 },
          backdropFilter: { duration: 0.7 },
          boxShadow: { duration: 0.25 },
          opacity: { duration: 0.8 },
        }}
        className="fixed pl-[10%] pr-[5%] w-full h-20 z-20 max-md:h-[72px] max-md:px-[5%]"
      >
        <motion.div
          initial={{
            transform: "translateY(12px)",
          }}
          animate={{
            transform: "translateY(4px)",
          }}
          transition={{
            transform: { duration: 0.5 },
          }}
          className="flex items-center justify-between relative w-full h-full"
        >
          <Link
            href="/"
            className="relative h-20 aspect-video -z-10 overflow-hidden max-md:h-[72px]"
          >
            <Image
              src={Logo}
              alt={"logo"}
              fill
              priority
              sizes="100%"
              className="object-cover"
            />
          </Link>
          <div className="flex items-center gap-4 max-md:gap-2">
            {!isMobile && (
              <div
                className={`group flex items-center gap-1`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {socials
                  .sort((a, b) => a.index - b.index)
                  .map((social, index) => {
                    const shiftAmount = (socials.length - index - 1) * 18;

                    return (
                      <Link
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1 border border-text rounded-full shadow-md duration-500 relative group/tooltip hover:border-secondary max-2xl:p-0.5 ${
                          isScrolled ? "bg-background" : "bg-transparent"
                        }`}
                        style={{
                          zIndex: socials.length - index,
                          transform: `translateX(${
                            isScrolled && !isHovered ? shiftAmount : 0
                          }px)`,
                        }}
                      >
                        <div className="group-hover/tooltip:text-secondary hover:scale-95 duration-200 max-2xl:scale-90">
                          {SocialIcons[social.name]}
                        </div>
                        <span
                          className="absolute z-10 -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-tertiary rounded text-sm opacity-0 
                                        group-hover/tooltip:opacity-100 transition-opacity duration-150 delay-0 group-hover/tooltip:delay-500 whitespace-nowrap"
                        >
                          {social.name}
                        </span>
                      </Link>
                    );
                  })}
              </div>
            )}
            <button
              onClick={() =>
                lenis?.scrollTo("#appointment", {
                  offset: -80,
                  duration: 2.5,
                  easing: (x) => 1 - Math.pow(1 - x, 3),
                })
              }
              className="border-text border-2 rounded-sm relative px-4 py-2 overflow-hidden font-medium hover:border-secondary hover:scale-95 duration-500 whitespace-nowrap
                        before:absolute before:inset-0 before:w-0 before:bg-secondary before:-z-10 before:transition-all before:duration-500 before:ease-in-out hover:before:w-full max-2xl:text-sm max-md:px-3"
            >
              {t("Navbar.bookAppointment")}
            </button>

            {!isMobile && (
              <div className="flex relative ml-10">
                <button
                  className={`flex flex-col p-4 gap-1 ${
                    isScrolled
                      ? "opacity-100 pointer-events-auto translate-y-0"
                      : "opacity-0 pointer-events-none -translate-y-1/2"
                  } transition duration-500`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div
                    className={`h-[3px] w-6 bg-text duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                    }`}
                  />
                  <div
                    className={`h-[3px] w-6 bg-text duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                    }`}
                  />
                </button>
                <motion.div
                  className={`absolute left-1/2 -translate-x-1/2 h-[2px] w-[200%] bg-text `}
                  initial={{
                    top: "50%",
                  }}
                  animate={{
                    top: !isScrolled ? "50%" : "3.5rem",
                    opacity: !isScrolled || isMenuOpen ? 1 : 0,
                  }}
                  transition={{
                    top: {
                      duration: 0.3,
                    },
                    opacity: {
                      duration: 0.7,
                    },
                  }}
                />
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -z-10 overflow-hidden ${
                    !isScrolled ? "top-1/2" : "top-14"
                  } duration-300`}
                >
                  <div
                    className={`flex flex-col gap-3 pt-5 duration-700 ease ${
                      !isScrolled || isMenuOpen ? "" : "-translate-y-full"
                    }`}
                  >
                    {Navigation.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const section = document.getElementById(
                            item.toLowerCase()
                          );

                          if (section) {
                            lenis?.scrollTo(section, {
                              offset: -80,
                              duration: 1.8,
                              easing: (x) => 1 - Math.pow(1 - x, 3),
                            });
                          }
                        }}
                        className={`p-2 rounded-lg whitespace-nowrap hover:text-secondary transition-colors duration-200 group max-2xl:bg-background max-2xl:text-sm ${
                          isScrolled ? "hover:bg-background" : ""
                        }`}
                      >
                        <p className="font-medium relative">
                          <span className="relative ">
                            {t(`Common.${item}`)}
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-secondary group-hover:w-full transition-all duration-300 -translate-x-1/2" />
                          </span>
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {isMobile && (
              <button
                className={`flex flex-col p-4 gap-1 opacity-100 pointer-events-auto translate-y-0 z-40`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className={`h-[3px] w-6 bg-text duration-300`} />
                <div className={`h-[3px] w-6 bg-text duration-300`} />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
      {isMobile && (
        <motion.div
          initial={{
            transform: "translateY(-100%)",
          }}
          animate={{
            transform: isMenuOpen ? "translateY(0%)" : "translateY(-100%)",
          }}
          transition={{
            transform: { duration: 0.3, ease: "easeInOut" },
          }}
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--background), transparent 20%)",
            backdropFilter: "blur(8px)",
          }}
          className="fixed inset-0 flex flex-col items-center gap-8 pb-[12%] pt-[20%] w-full h-dvh z-20"
        >
          <button
            className={`absolute top-4 right-4 flex flex-col p-4 gap-1 opacity-100 pointer-events-auto translate-y-0 z-40`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`h-[3px] w-6 bg-text duration-300 rotate-45 translate-y-[4px]`}
            />
            <div
              className={`h-[3px] w-6 bg-text duration-300 -rotate-45 -translate-y-[3px]`}
            />
          </button>
          <div className="flex flex-col gap-8 w-full items-end px-[7%]">
            {Navigation.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  const section = document.getElementById(item.toLowerCase());

                  if (section) {
                    lenis?.scrollTo(section, {
                      offset: -80,
                      duration: 2.2,
                      easing: (x) => 1 - Math.pow(1 - x, 3),
                    });

                    setIsMenuOpen(false);
                  }
                }}
              >
                <p className="font-medium relative text-2xl whitespace-nowrap">
                  {t(`Common.${item}`)} -
                </p>
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-auto">
            {socials
              .sort((a, b) => a.index - b.index)
              .map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-text bg-background rounded-full shadow-md"
                >
                  {SocialIcons[social.name]}
                </Link>
              ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Navbar;
