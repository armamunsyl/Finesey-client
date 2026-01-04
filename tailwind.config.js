/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#16A34A",
          "primary-focus": "#128838",
          "primary-content": "#ffffff",
        },

        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#16A34A",
          "primary-focus": "#128838",
          "primary-content": "#ffffff",
          "base-100": "#1E1E1E",
          "base-200": "#161616",
          "base-300": "#0E0E0E",
          "base-content": "#e5e7eb",
        },
      },
    ],

    // ⛔ THIS IS IMPORTANT
    darkTheme: "dark",
  },

  plugins: [require("daisyui")],
};
