/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          header: "#1e1f22",
          body: "#232428",
          inputBgC: "#383a40",
        },
      },
    },
  },
  plugins: [],
};
