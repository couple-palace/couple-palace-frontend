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
      maxWidth: {
        custom: '580px', // 반응형 최대 너비
      },
      width: {
        custom: '100%', // 항상 화면 꽉 채우기
      },
    },
  },
  plugins: [],
};
