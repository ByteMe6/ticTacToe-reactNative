import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
base: '/ticTacToe-reactNative/',
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});