import Image from "next/image";
import React from "react";
import logo from "../../public/assets/images/logo_text.png";

function Footer() {
    return (
        <div className="w-full h-24 flex items-center justify-between px-[10%] bg-secondary max-2xl:h-20">
            <div className="relative flex h-16 aspect-video rounded-sm overflow-hidden max-2xl:h-12">
                <Image
                    src={logo}
                    alt={"Logo"}
                    fill
                    sizes="100%"
                    draggable={false}
                    className="object-contain"
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <p className="text-center text-sm max-2xl:text-xs">
                        Copyright © 2025{" "}
                        <span className="font-semibold">base on.</span> All
                        rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
