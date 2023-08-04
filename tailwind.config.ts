import { type Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.js",
    ],
    theme: {
        colors: {
            blue: "#766CF9"
        },
        extend: {

        },
    },
    plugins: [
        require("flowbite/plugin")
    ],
} satisfies Config;
