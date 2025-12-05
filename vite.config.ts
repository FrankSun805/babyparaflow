import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // GitHub Pages 部署时需要设置 base 路径（仓库名）
      // 如果部署到 https://<用户名>.github.io/<仓库名>/，需要设置为 '/<仓库名>/'
      // 如果部署到自定义域名或 https://<用户名>.github.io/，设置为 '/'
      base: process.env.GITHUB_ACTIONS ? '/babyparaflow/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
