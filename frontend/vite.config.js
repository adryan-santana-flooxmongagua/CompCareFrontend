import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import path from 'path'; // necessário para resolver caminhos

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
  },
  define: {
    'process.env': {},
  },
  esbuild: {
    jsx: 'transform',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Adiciona suporte para importações com "@"
    },
  },
});
