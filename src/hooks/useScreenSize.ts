import { useState, useEffect } from "react";

export enum ScreenSize {
    SM = 640,
    MD = 768,
    LG = 1024,
    XL = 1280,
    XXL = 1536,
}

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>(ScreenSize.XXL);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < ScreenSize.MD) {
                setScreenSize(ScreenSize.SM);
            } else if (width >= ScreenSize.MD && width < ScreenSize.LG) {
                setScreenSize(ScreenSize.MD);
            } else if (width >= ScreenSize.LG && width < ScreenSize.XL) {
                setScreenSize(ScreenSize.LG);
            } else if (width >= ScreenSize.XL && width < ScreenSize.XXL) {
                setScreenSize(ScreenSize.XL);
            } else {
                setScreenSize(ScreenSize.XXL);
            }

            setIsMobile(width < ScreenSize.MD);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { screenSize, isMobile };
};
