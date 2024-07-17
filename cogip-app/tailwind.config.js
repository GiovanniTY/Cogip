/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cogip-color": "#F9DE4E",
      },
      fontFamily: {
        'Inter': ["Inter", "sans-serif"],
        'Assisant': ["Assistant", "sans-serif"],
        'Roboto': ["Roboto", "Sans-serif"],
      },
    },
  },
  plugins: [],
};
