/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', 
  theme: {
    extend: {
       keyframes: {
    pixelate: {
      "0%": { filter: "blur(4px) contrast(200%)" },
      "50%": { filter: "blur(2px) contrast(150%)" },
      "100%": { filter: "blur(0) contrast(100%)" },
    },
  },
  animation: {
    pixelate: "pixelate 1s steps(5, end) forwards",
  },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}