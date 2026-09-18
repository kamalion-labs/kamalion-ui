import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const pkg = createRequire(import.meta.url)("./package.json");

/**
 * Tudo que o consumidor ja resolve fica FORA do bundle. A lista e derivada de
 * `dependencies` + `peerDependencies` para nao envelhecer: uma lista escrita a
 * mao inevitavelmente perde o proximo pacote que alguem adicionar.
 */
const externos = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  "react",
  "react-dom",
]);

/** Externo se for um desses pacotes ou um subcaminho dele. */
const ehExterno = (id: string) => {
  if (externos.has(id)) return true;
  for (let i = id.lastIndexOf("/"); i > 0; i = id.lastIndexOf("/", i - 1)) {
    if (externos.has(id.slice(0, i))) return true;
  }
  return false;
};

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    /**
     * Sem minificacao de proposito: o `@source` do Tailwind varre estes
     * arquivos atras das strings de classe, e o consumidor minifica de novo no
     * proprio build. Minificar aqui so arriscaria o scan sem ganho no produto.
     */
    minify: false,
    lib: {
      entry: resolve(here, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ehExterno,
      output: {
        // Um arquivo por modulo, espelhando src/: preserva tree-shaking e deixa
        // o optimizeDeps do consumidor pre-bundlar tudo num chunk so.
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
