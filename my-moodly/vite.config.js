import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vite.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        WelcomePage: resolve(root, 'WelcomePage', 'index.html'),
        SignUpPage: resolve(root, 'SignUpPage', 'index.html'),
        LogInPage: resolve(root, 'LogInPage', 'index.html'),
        NavigationPage: resolve(root, 'NavigationPage', 'index.html'),
        JournalPage: resolve(root, 'JournalPage', 'index.html'),
        InfoPage: resolve(root, 'InfoPage', 'index.html'),
        TasksPage: resolve(root, 'TasksPage', 'index.html'),
        ProfilePage: resolve(root, 'ProfilePage', 'index.html'),
        HomePage: resolve(root, 'HomePage', 'index.html')
      }
    }
  }
});
