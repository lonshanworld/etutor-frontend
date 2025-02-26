import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        secondaryBackground : "var(--secondaryBackground)",
        backgroundOpposite : "var(--bgOpposite)",
        secondaryBackgroundOpposite : "var(--bgSecondaryOpposite)",
        theme : "#099797",
        font: "var(--font-color)",
        popup: "var(--popup)",
        cusGray : "#818181"
      },
      boxShadow: {
        left: "-7px 0 10px rgba(0, 0, 0, 0.5)", // Left shadow only
      },
    },
  },
  plugins: [],
} satisfies Config;
