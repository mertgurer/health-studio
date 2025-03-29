import BurgerMenu from "@/components/burgerMenu";
import LocaleButton from "@/components/localeButton";
import ThemeButton from "@/components/themeButton";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
    const t = useTranslations("Common");

    return (
        <main className="flex flex-col min-h-screen items-center justify-center gap-3">
            <div className="flex flex-col items-end gap-2 absolute right-[5%] top-[10%] font-[300]">
                <ThemeButton />
                <LocaleButton />
            </div>
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/icons/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
            />
            <p className="font-medium mb-4">{t("welcome")}</p>
            <BurgerMenu />
        </main>
    );
}
