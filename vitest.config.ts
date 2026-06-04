import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
   globals: true,
    environment: 'node', // ou 'jsdom' se estiver testando componentes do React
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'], // O 'html' gera a página bonitona pro print!
      include: ['shared/**/*.ts'], // Garante que ele vai olhar a pasta que criamos
  },
 },
});
