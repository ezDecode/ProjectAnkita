import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ppneue: ['var(--font-ppneue)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'ui-serif', 'serif']
      },
    },
  },
  plugins: [],
};
export default config;