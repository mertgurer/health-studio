import { useLayoutEffect, useState } from "react";

enum Themes {
    LIGHT = "light",
    DARK = "dark",
}

export function useTheme() {
    const [theme, setTheme] = useState<Themes>(Themes.LIGHT);

    // toggle the theme
    const toggleTheme = () => {
        const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle(
            "dark",
            newTheme === Themes.DARK
        );
    };

    // set the theme based on system preference or stored user preference
    useLayoutEffect(() => {
        // check localStorage for a saved theme
        const savedTheme = localStorage.getItem("theme") as Themes | null;

        // get system preference
        const systemPrefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const initialTheme =
            savedTheme || (systemPrefersDark ? Themes.DARK : Themes.LIGHT);

        setTheme(initialTheme);
        document.documentElement.classList.toggle(
            "dark",
            initialTheme === Themes.DARK
        );
    }, []);

    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // only react to system changes if the user hasn't set a theme manually
        const handleChange = (e: MediaQueryListEvent) => {
            localStorage.removeItem("theme");

            const newTheme = e.matches ? Themes.DARK : Themes.LIGHT;
            setTheme(newTheme);
            document.documentElement.classList.toggle("dark", e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return { theme, toggleTheme };
}
