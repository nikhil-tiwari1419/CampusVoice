/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080C14',
          text: '#F1F5F9',
        },
        light: {
          bg: '#FFFFFF',
          text: '#1F2937',
        },
      },
    },
  },
  plugins: [],
}
