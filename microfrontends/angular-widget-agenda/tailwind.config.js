const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    // colors: {
    //   accentColor: colors.green
    // },
    fontFamily: {
      sans: ['ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"']
    }
  },
  daisyui: {
    logs: false,
    theme: ["light", "dark"]
  },
  plugins: [require("daisyui")],
}
