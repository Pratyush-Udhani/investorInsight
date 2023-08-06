import { type Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blue: "#766CF9",
                violet: "#552EF2", 
                backdrop: '#1E1E2D', 

            },
        },
    },
    plugins: [
    ],
} satisfies Config;
