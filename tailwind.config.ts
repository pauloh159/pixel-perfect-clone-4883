import type { Config } from "tailwindcss";

export default {

  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'header-background': '#EFCFA6',
        'footer-background': '#EFCFA6',
        border: "hsl(22 43% 46%)",
        input: "hsl(22 43% 46%)",
        ring: "hsl(26 60% 15%)",
        background: "hsl(26 49% 90%)",
        foreground: "hsl(26 60% 15%)",
        primary: {
          DEFAULT: "hsl(26 60% 15%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(22 43% 46%)",
          foreground: "hsl(0 0% 100%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(34 69% 79%)",
          foreground: "hsl(26 60% 15%)",
        },
        accent: {
          DEFAULT: "hsl(34 69% 79%)",
          foreground: "hsl(26 60% 15%)",
        },
        popover: {
          DEFAULT: "hsl(26 49% 90%)",
          foreground: "hsl(26 60% 15%)",
        },
        card: {
          DEFAULT: "hsl(26 49% 90%)",
          foreground: "hsl(26 60% 15%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        h1: ['4.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // Exemplo: 72px
        h2: ['3rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],  // Exemplo: 48px
        h3: ['2.25rem', { lineHeight: '1.4' }], // Exemplo: 36px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
