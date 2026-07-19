import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { PRODUCTS, PROMOTIONS, CATEGORIES, COMBO_OF_THE_MONTH } from './src/constants';

export default defineConfig((configEnv) => {
  const { mode } = configEnv;
  const isSsr = !!(
    configEnv.ssrBuild || 
    (configEnv as any).isSsrBuild || 
    process.env.VITE_SSR === 'true' || 
    process.argv.includes('--ssr') ||
    process.argv.some(arg => arg.includes('main-server'))
  );
  console.log(`[Vite Config] Build Mode: ${mode}, isSsr: ${isSsr}, ssrBuild: ${configEnv.ssrBuild}, argv: ${process.argv.join(' ')}`);
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      includedRoutes() {
        const productRoutes = PRODUCTS.map(p => `/producto/${p.id}`);
        const comboRoutes = PROMOTIONS.map(c => `/combo/${c.id}`);
        const categoryRoutes = CATEGORIES.map(cat => `/categoria/${cat.id}`);
        
        return [
          '/',
          '/quienes-somos',
          '/politica-privacidad',
          '/condiciones-entrega',
          '/devoluciones-garantia',
          '/checkout',
          `/combo/${COMBO_OF_THE_MONTH.id}`,
          ...productRoutes,
          ...comboRoutes,
          ...categoryRoutes
        ];
      },
    },
    ssr: {
      noExternal: ['react-helmet-async', 'react-router-dom', 'react-router'],
    },
    build: {
      rollupOptions: {
        output: isSsr ? {
          entryFileNames: 'main-server.js',
          assetFileNames: '[name].[ext]',
          chunkFileNames: '[name].js',
        } : {
          manualChunks: mode === 'production' ? {
            'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            'vendor-ui': ['lucide-react', 'motion/react', 'clsx', 'tailwind-merge'],
          } : undefined,
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
