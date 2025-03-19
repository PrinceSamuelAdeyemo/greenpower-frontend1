/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
 */


import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Opens the report in the browser after build
      filename: 'stats.html', // File to save the report
      gzipSize: true, // Show gzip size
      brotliSize: true, // Show Brotli compressed size
    }),
    react()
  ],

    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.split('node_modules/')[1].split('/')[0]; // Split vendor files
            }
          },
        },
      },
    },
  
});