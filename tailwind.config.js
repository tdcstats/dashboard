module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontSize: { tiny: ".6rem" } },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
