// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37', // Dourado clássico (ouro metálico)
          light: '#e6c35c',
          dark: '#b8860b',
        }
      }
    },
  },
  plugins: [],
}