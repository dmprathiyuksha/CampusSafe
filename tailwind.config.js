/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        campus: {
          red: '#dc2626',
          darkred: '#991b1b',
          crimson: '#e11d48',
          sos: '#ef4444',
          pastelRed: '#fee2e2',
          pastelBlue: '#e0f2fe',
          pastelGreen: '#dcfce7',
          pastelPurple: '#f3e8ff',
          pastelYellow: '#fef3c7',
          pastelOrange: '#ffedd5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
