import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import ThemeLoader from "@/components/themeLoader";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Template Next.js",
    description: "Starting template for Next.js app",
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
            <body className={poppins.className}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <ThemeLoader />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
