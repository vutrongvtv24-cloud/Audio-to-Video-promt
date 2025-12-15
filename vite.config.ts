import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  // Prioritize API_KEY, fallback to VITE_API_KEY if user named it that way
  const apiKey = env.API_KEY || env.VITE_API_KEY || process.env.API_KEY || process.env.VITE_API_KEY;

  return {
    plugins: [react()],
    define: {
      // Vital: This makes process.env.API_KEY available to the client-side code
      // We JSON.stringify it to ensure it's inserted as a valid string literal
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});