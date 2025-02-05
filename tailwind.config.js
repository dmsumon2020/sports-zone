/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        titleImage : "url('/src/assets/banner.jpg')",
    },
    colors: {
      primaryColor: '#EB5942',
      bodyFontColor: '#666666',
    }
  },
  },
  plugins: [require('daisyui'),],
}