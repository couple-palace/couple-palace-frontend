/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'maru': ['MaruBuri', 'system-ui', 'sans-serif'],
        'maru-semibold': ['MaruBuriSemiBold', 'system-ui', 'sans-serif'],
        'maru-bold': ['MaruBuriBold', 'system-ui', 'sans-serif'],
        'maru-light': ['MaruBuriLight', 'system-ui', 'sans-serif'],
        'maru-extralight': ['MaruBuriExtraLight', 'system-ui', 'sans-serif'],
        'bombaram': ['HSBombaram', 'MaruBuriSemiBold', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
