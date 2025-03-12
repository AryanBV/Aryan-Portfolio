/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#0284c7",
          secondary: "#7c3aed",
          dark: "#111827",
        },
      },
    },
    plugins: [],
  }