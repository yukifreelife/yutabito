import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/yutabito/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        list: resolve(__dirname, 'list.html'),
        favorites: resolve(__dirname, 'favorites.html'),
        onsen: resolve(__dirname, 'onsen.html'),
      }
    }
  }
});
