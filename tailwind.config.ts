import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "selector",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            minHeight: {
                "screen-80": "calc(100vh - 80px)",
            },
            backgroundColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
            },
            textColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
            },
            borderColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
            },
            boxShadowColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
            },
        },
    },
    plugins: [],
};
export default config;
