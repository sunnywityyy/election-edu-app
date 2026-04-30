/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0A0F2C',
        'electric-blue': '#3B82F6',
      }
    },
  },
  plugins: [],
}
