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
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animationDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
      },
    },
    plugins: [],
  }