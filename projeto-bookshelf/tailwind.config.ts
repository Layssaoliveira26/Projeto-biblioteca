import type { Config } from "tailwindcss";
import twAnimate from "tw-animate-css";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [twAnimate],
};

export default config;
