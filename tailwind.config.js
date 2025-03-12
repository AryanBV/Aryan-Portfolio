/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // darkMode setting removed as we're standardizing on dark theme
    theme: {
      extend: {
        colors: {
          primary: "#0284c7",
          secondary: "#7c3aed",
          dark: "#111827",
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'soft': '0 5px 15px rgba(0,0,0,0.05)',
          'medium': '0 8px 30px rgba(0,0,0,0.12)',
        },
        animation: {
          'bounce-slow': 'bounce 3s infinite',
        }
      },
    },
    plugins: [],
  }