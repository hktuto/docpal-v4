import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    lib: {
      entry: 'src/backend/index.ts',
      name: 'PdfFormManager',
      fileName: 'pdf-form-manager'
    },
    rollupOptions: {
      external: ['vue', 'pdf-lib', 'pdfjs-dist'],
      output: {
        globals: {
          vue: 'Vue',
          'pdf-lib': 'PDFLib',
          'pdfjs-dist': 'pdfjsLib'
        }
      }
    }
  }
}); 
