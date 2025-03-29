"use client";

import React, { useState } from "react";

export default function BurgerMenu() {
    const [burgerMenu, setBurgerMenu] = useState(false);

    return (
        <button
            onClick={() => setBurgerMenu(!burgerMenu)}
            className="flex flex-col gap-1 p-2 z-40"
        >
            <div
                className={`w-6 h-1 duration-500 ease-in-out bg-text ${
                    burgerMenu
                        ? "rotate-[45deg] -translate-x-[18%] translate-y-[100%] scale-x-50"
                        : ""
                }`}
            ></div>
            <div
                className={`w-6 h-1 duration-500 ease-in-out bg-text ${
                    burgerMenu ? "-rotate-45" : ""
                }`}
            ></div>
            <div
                className={`w-6 h-1 duration-500 ease-in-out bg-text ${
                    burgerMenu
                        ? "rotate-45 translate-x-[18%] -translate-y-[90%] scale-x-50"
                        : ""
                }`}
            ></div>
        </button>
    );
}
