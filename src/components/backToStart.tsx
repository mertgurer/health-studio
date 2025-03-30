"use client";

import { ArrowUp05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

function BackToStart() {
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
            className={`fixed bottom-8 right-12 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-2 py-4 rounded-3xl bg-tertiary shadow-lg hover:bg-secondary transition-colors duration-200"
            >
                <HugeiconsIcon
                    icon={ArrowUp05Icon}
                    size={24}
                    strokeWidth={1.5}
                />
            </button>
        </div>
    );
}

export default BackToStart;
