/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ['ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"']
        }
    },
    daisyui: {
        logs: false,
        themes: [{
            entando: {
                "primary": "#22c55e",
                "secondary": "#201A23",
                "accent": "#76b1d3",
                "neutral": "#201A23",
                "base-100": "#FFFFFF",
                "info": "#319FE3",
                "success": "#55E7B4",
                "warning": "#FBC851",
                "error": "#EF6E62",
                ".btn-primary": {
                    'color': '#FFFFFF',
                },
                "div.dropdown > label > label > button": {
                    'background-color': '#888888',
                    'border-color': '#777777'
                },
                "div.dropdown > label > label > button:hover": {
                    'background-color': '#22c55e',
                    'border-color': '#22c55e'
                },
            },
        }, "light", "dark"],
    },
    plugins: [require("daisyui")]
}
