/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 0px 6px rgba(128, 128, 128, 1)', // Updated custom shadow
      },
      colors: {
        primary: '#1a2224', // Custom primary color
      },
    },
  },
  plugins: [],
};
