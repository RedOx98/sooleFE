import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        inlinePage: "25px"
      },
      screens: {
        landscape: { raw: "(orientation: landscape)" },
        "trans-range": { min: "600px", max: "1024px" },
        "max-sm": { max: "600px" },
        "max-lg": { max: "1000px" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bus: "url('/public/bus.svg')",
      },
      colors: {
        ecobankBlue: "rgb(2, 130, 173)",
        ecobankGreen: "rgb(177, 220, 48)",
        ecobankTeal: "rgb(2, 52, 72)",
        ecobankLightTeal: "rgb(0, 91, 130)",
        ecobankLightBlue: "rgba(192, 230, 247, 1)",
        endRed: "rgba(179, 38, 30, 1)",
        error: "#B3261E",
        darkBlue: "#005A86"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "Inter-Thin": ["Inter-Thin"],
        "Inter-Extralight": ["Inter-Extralight"],
        "Inter-Light": ["Inter-Light"],
        "Inter-Regular": ["Inter-Regular"],
        "Inter-Medium": ["Inter-Medium"],
        "Inter-Bold": ["Inter-Bold"],
        "Inter-Extrabold": ["Inter-Extrabold"],
        "Inter-Black": ["Inter-Black"],
        "Aladin-Regular": ["Aladin-Regular"],
        "Gilroy-Thin": ["Gilroy-Thin"],
        "Gilroy-UltraLight": ["Gilroy-UltraLight"],
        "Gilroy-Light": ["Gilroy-Light"],
        "Gilroy-Regular": ["Gilroy-Regular"],
        "Gilroy-Medium": ["Gilroy-Medium"],
        "Gilroy-SemiBold": ["Gilroy-SemiBold"],
        "Gilroy-Bold": ["Gilroy-Bold"],
        "Gilroy-ExtraBold": ["Gilroy-ExtraBold"],
        "Gilroy-Black": ["Gilroy-Black"],
      },
    },
  },
  plugins: [],
};
export default config;
