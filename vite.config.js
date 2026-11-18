// Viewer for the toolbox: `npm run dev` -> browse every ready app and every building block live.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: { entries: ['index.html'] },
});
