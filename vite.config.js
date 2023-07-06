import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        dir: 'dist',
      },
    },
    assetsInlineLimit: 0,
    assetsDir: 'assets',
    assetsInclude: ['**/*.gltf'],
  },
});
