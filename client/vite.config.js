import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    envDir: '../',
    base: isDev ? '/dev' : '/',
    server: {
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3001',
      //     changeOrigin: true,
      //     secure: false,
      //     ws: true,
      //   },
      // },
      hmr: {
        clientPort: 443,
      },
    },
  }
});
