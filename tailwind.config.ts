import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          200: '#c3efd2',
          300: '#94e2b5',
          400: '#5acc92',
          500: '#2ECC71', // Secondary color (Bright Green) acts as 500 in some contexts or we use secondary
          600: '#0F5132', // Primary color (Dark Green) - User specified
          700: '#0b462a',
          800: '#083922',
          900: '#062d1b',
          950: '#021a0f',
        },
        secondary: {
          DEFAULT: '#2ECC71',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#2ECC71', // User specified Secondary
          600: '#27ae60', // Darker shade for hover
          700: '#15803d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-poppins)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
