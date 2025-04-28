import { Nunito } from "next/font/google";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/navbar";
import BackToTop from "@/components/backToTop";
import logo from "../../../public/assets/images/logo.png";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ReactLenis from "lenis/react";
import { fetchFromApi } from "@/lib/fetchFromApi";
import { Social } from "@/services/SocialService";
import { headers } from "next/headers";

const montserrat = Nunito({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: "base on.",
    description: "Fizyoterapi ve Egzersiz Danışmanınız",
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
    const headersList = headers();

    const header_url = headersList.get("x-url") || "";
    const isAdminPanel = header_url.startsWith("/admin-dashboard");

    const socials = await fetchFromApi<Social[]>("/social");

    return (
        <html lang={locale}>
            <body className={montserrat.className}>
                <NextIntlClientProvider messages={messages}>
                    <ReactLenis root>
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                style: {
                                    background: !isAdminPanel
                                        ? "var(--primary)"
                                        : "var(--secondary)",
                                    color: "var(--text)",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    paddingTop: "12px",
                                    paddingBlock: "12px",
                                    gap: "8px",
                                },
                            }}
                        />
                        {!isAdminPanel && (
                            <Navbar
                                socials={socials.filter((x) => x.isActive)}
                            />
                        )}
                        {children}
                        <BackToTop />
                        {!isAdminPanel && <Footer />}
                    </ReactLenis>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
