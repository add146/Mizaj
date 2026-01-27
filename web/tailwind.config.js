/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2a842e",
                "primary-dark": "#1e6021",
                "primary-light": "#e2f0e3",
                "background-light": "#f6f8f6",
                "background-dark": "#141e14",
                "surface-light": "#ffffff",
                "surface-dark": "#1c2b1c",
                "text-main-light": "#101911",
                "text-main-dark": "#f0fdf4",
                "text-secondary-light": "#5b8b5d",
                "text-secondary-dark": "#a3cca5",
                "border-light": "#e9f1ea",
                "border-dark": "#2f422f",
                // Mizaj type colors
                "mizaj-panas-lembab": "#FF7043",
                "mizaj-dingin-lembab": "#42A5F5",
                "mizaj-panas-kering": "#EF5350",
                "mizaj-dingin-kering": "#78909C",
            },
            fontFamily: {
                "display": ["Lexend", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                full: "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
