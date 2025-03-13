import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://server.couplegungjeon.store',
        changeOrigin: true,
        secure: false, // 인증서 문제가 있다면 false로 설정
      },
    },
  },
});