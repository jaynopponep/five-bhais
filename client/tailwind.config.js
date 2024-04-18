/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'customLight': '#FFFBDB',
        'customOrange': '#F75C03',
        'customBrown': '#792C00',
        'customBlack': '#0C0F0A',
      },
    },
  },
  plugins: [],
};
