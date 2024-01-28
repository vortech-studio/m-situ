/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#239068",
        primaryDark: "#106647",
        gray: "#737373",
        darkGray: "#333333",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
