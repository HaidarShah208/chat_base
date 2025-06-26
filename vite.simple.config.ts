import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/embed/simple-widget.js',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget-simple',
      formats: ['iife']
    },
    outDir: 'dist/embed',
    emptyOutDir: false,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}) 