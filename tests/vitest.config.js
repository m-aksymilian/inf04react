// Tests for the toolbox itself (NOT needed at the exam). Run: npm test (repo root).
// react/react-dom are NOT installed here: they resolve from ../node_modules, so apps and tests share one React.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { fs: { allow: ['..'] } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./setup.js'],
    css: false,
  },
});
