import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3001, // Pastikan sesuai dengan docker-compose
    host: '0.0.0.0', // Agar dapat diakses dari luar container
    strictPort: true, // Pastikan menggunakan port yang sama, tidak berubah-ubah
    watch: {
      usePolling: true, // Gunakan polling untuk mendeteksi perubahan dalam Docker
    },
  },
});
