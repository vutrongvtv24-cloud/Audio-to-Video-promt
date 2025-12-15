import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cast process to any to resolve TS error when @types/node is missing or incomplete
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Vital: This makes process.env.API_KEY available to the client-side code
      // WARNING: This exposes the key in the built client code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});