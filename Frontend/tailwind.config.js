/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        contentheight: 'calc(100vh - 80px)',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      }
    },
    
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}

