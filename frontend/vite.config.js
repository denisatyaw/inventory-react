import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3001,
    host: '0.0.0.0',
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('http://168.138.173.100:5000'),
  },
});
