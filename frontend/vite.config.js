import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3001, // Port yang akan digunakan oleh Vite
    host: '0.0.0.0', // Agar dapat diakses dari dalam container
  },
});
