/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    boxShadow: {
      "custom-blue": "0 4px 6px -1px #649cf4, 0 2px 4px -2px #649cf4",
    },
  },
  plugins: [],
};
