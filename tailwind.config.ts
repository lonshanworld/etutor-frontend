import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        secondaryBackground: "var(--secondaryBackground)",
        backgroundOpposite: "var(--bgOpposite)",
        secondaryBackgroundOpposite: "var(--bgSecondaryOpposite)",
        theme: "#099797",
        themeHover: "#146c6d",
        font: "var(--font-color)",
        popup: "var(--popup)",
        cusGray: "#818181",
        errorMessage: "var(--error-message)",
        cusGray2: "#777777",
        login: "#363333",
        inputBackground: "var(--input-background)",
        inputBorder: "var(--input-border)",
        foreground: "hsl(var(--foreground))",
        tableRowBorder: "#919191",
        optionFontColor: "var(--option-font-color)",
        optionBackground: "var(--option-bg)",
        optionBgHover: "var(--option-bg-hover)",
        paginationBorder: "var(--pagination-border)",
        formBackground: "var(--form-background)",
        label: "#909090",
        headingColor: "var(--heading-color)",
        textColor: "var(--text-color)",
        toastBg: "var(--toast-bg)",
        toastFont: "var(--toast-font)",
        messageBg: "var(--message-bg)",
        profileHeading: "var(--profile-heading)",
        profileText: "#A0A0A0",
        detailBg: "var(--detail-background)",
        boardText: "var(--board-text)",
        boardReaction: "var(--board-reaction)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        left: "-7px 0 10px rgba(0, 0, 0, 0.5)",
      },
      fontSize: {
        xss: "0.65rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, Edge
          },
        },
      });
    },
  ],
} satisfies Config;
