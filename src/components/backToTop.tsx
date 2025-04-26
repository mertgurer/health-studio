"use client";

import { ArrowUp05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLenis } from "lenis/react";
import React from "react";

function BackToTop() {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-12 transition-opacity duration-300 z-30 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } max-md:right-4 max-md:bottom-4`}
    >
      <button
        onClick={() =>
          lenis?.scrollTo(0, {
            offset: -80,
            duration: 2.5,
            easing: (x) => 1 - Math.pow(1 - x, 3),
          })
        }
        className="px-2 py-4 rounded-3xl bg-tertiary shadow-lg hover:bg-secondary transition-colors duration-200"
      >
        <HugeiconsIcon icon={ArrowUp05Icon} size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default BackToTop;
