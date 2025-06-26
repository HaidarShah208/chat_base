/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors: {
        primary: "#131315",
        secondary: "#3E3E41",
        accent: "#F4A261",
        // gray: "#4B5563",
        // grayBG: "#F3F4F6",
        // borderGray: "#D1D5DB",
      },
      keyframes: {
        'spin-once': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-once': 'spin-once 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
