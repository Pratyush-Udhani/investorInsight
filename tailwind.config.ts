import { type Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#766CF9",
                violet: "#552EF2", 
                backdrop: '#1E1E2D', 
                border: '#BCBCC0', 
                button_bg: '#2D2D33', 
                yellow: '#E9AF3F', 
                red: '#D34747', 
                text_white: '#DADADA', 
                text_gray: '#878787'

            },
            fontSize: {
                base: "1rem",
                sub_head: "1.25rem",
                heading: "2.25rem"
            },
            borderRadius: {
                sm: '5px',
                lg: '10px'
            }
        },
    },
    plugins: [
    ],
} satisfies Config;
