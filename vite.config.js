import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        personal_training: resolve(__dirname, 'Personal-Training/index.html'),
        exercise_physiology: resolve(__dirname, 'Exercise-Physiology/index.html'),
      },
    },
  },
});