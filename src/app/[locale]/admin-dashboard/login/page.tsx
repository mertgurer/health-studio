"use client";

import FormTextInput from "@/components/formTextInput";
import { Login02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/logo.png";

function Login() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);

    async function loginAction(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email && !password) {
            return;
        }

        if (!email || !password) {
            toast.error(t("Appointment.Error.fillAllFields"));
            return;
        }

        try {
            await toast.promise(
                async () => {
                    setLoading(true);

                    const res = await fetch("/api/auth", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!res.ok) {
                        const error = await res.json();
                        throw new Error(error.error);
                    }

                    window.location.href = "/admin-dashboard";
                },
                {
                    loading: t("Login.loading"),
                    success: t("Login.Success.loggedIn"),
                    error: (err) => t("Login.Error.invalidCredentials"),
                }
            );
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-16 min-h-screen bg-primary pb-32">
            <Link
                href="/"
                className="relative h-32 aspect-video overflow-hidden max-md:h-28"
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
            <form
                className="flex flex-col items-center gap-8 w-1/5 max-2xl:w-1/4 max-md:w-[90%]"
                onSubmit={loginAction}
            >
                <FormTextInput
                    name={"email"}
                    type="email"
                    label={"Common.email"}
                />
                <FormTextInput
                    name={"password"}
                    type="password"
                    label={"Common.password"}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 bg-secondary px-4 py-2 rounded-sm w-full font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {t("Login.login")}
                    <HugeiconsIcon
                        icon={Login02Icon}
                        size={20}
                        strokeWidth={1.5}
                        className="rotate-180"
                    />
                </button>
            </form>
        </div>
    );
}

export default Login;
