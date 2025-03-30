import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/navbar";
import BackToTop from "@/components/backToTop";
import logo from "../../../public/assets/images/logo.png";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: "base on.",
    description: "Fizyoterapi ve egzersiz danışmanınız",
    icons: {
        icon: logo.src,
    },
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={montserrat.className}>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    {children}
                    <BackToTop />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
