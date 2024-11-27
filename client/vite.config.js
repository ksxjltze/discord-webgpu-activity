import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = loadEnv(mode, process.cwd());

  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const isLocalServer = false;
  const serverURL = process.env.VITE_SERVER_URL;

  return {
    envDir: '../',
    base: isDev ? '/dev' : '/',
    server: {
      proxy: {
        '/api': {
          target: isLocalServer ? 'http://localhost:3001' : serverURL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      hmr: {
        clientPort: 443,
      },
    },
  }
});
