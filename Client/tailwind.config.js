/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Caveat: ['Caveat', 'sans-serif'],
        Ballo_Bhai: ['Baloo Bhai 2', 'sans-serif'], 
      },
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}