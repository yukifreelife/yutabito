import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 通常は特に設定不要だが、公開時 base を調整する場合ここに書く
  base: './',
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
