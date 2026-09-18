// @ts-check
/**
 * Kamalion UI Vite plugin.
 *
 * Authored as plain ESM JavaScript (NOT TypeScript) on purpose: Vite loads
 * `vite.config.*` in Node at config time, and Node cannot execute a raw `.ts`
 * file. Keeping this file as `.mjs` preserves the library's "no build step"
 * property while still being importable from a consumer's `vite.config.ts`.
 *
 * What it does:
 *  1. Wires up `@tailwindcss/vite` so the consumer app gets the Tailwind v4
 *     engine without installing/configuring it separately.
 *  2. Aliases the `@kamalion/web-ui` bare specifier to the package `src` entry
 *     so the raw source resolves and is transpiled by the consumer's bundler.
 *     The path is resolved from `import.meta.url`, so it works whether the
 *     package lives in a workspace symlink or a real `node_modules` install.
 *  3. (opt-in) `injectStyles: true` auto-injects `@kamalion/web-ui/styles` via a
 *     virtual module. Default is `false` — consumers import the styles entry
 *     explicitly so CSS ordering stays predictable.
 *
 * Tailwind class scanning of the library source is handled by the CSS entry
 * (`src/styles/index.css` declares `@source "../components"`, which resolves
 * relative to that file wherever the package physically lives) — not here.
 */

import tailwindcss from "@tailwindcss/vite";
import { stripColorMixFallbacks } from "./strip-color-mix-fallbacks.js";

const VIRTUAL_ID = "virtual:kamalion.css";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;

/**
 * @param {{ injectStyles?: boolean }} [options]
 * @returns {import("vite").PluginOption[]}
 */
export function kamalion(options = {}) {
  const { injectStyles = false } = options;

  /**
   * O alias que existia aqui apontava o specifier `@kamalion/web-ui` para
   * `<pkg>/src/index.ts`, porque a lib era publicada como codigo-fonte. Agora
   * ela e publicada compilada e o `exports` do package.json resolve sozinho —
   * manter o alias quebraria, porque este arquivo passou a morar em
   * `dist/vite/` e o caminho relativo cairia em `dist/index.ts`, que nao existe.
   *
   * O que sobra e garantir instancia unica das bibliotecas com contexto: duas
   * copias de react-hook-form fazem o FormProvider nao alcancar os campos, e
   * duas de zod quebram `instanceof` entre schemas.
   */
  const glue = {
    name: "kamalion",
    enforce: "pre",
    config() {
      return {
        optimizeDeps: { include: ["@kamalion/web-ui"] },
        resolve: {
          dedupe: [
            "react",
            "react-dom",
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
            "lucide-react",
            "react-day-picker",
          ],
        },
      };
    },
  };

  /**
   * Remove os fallbacks progressivos de `color-mix()` que o Tailwind v4 emite.
   *
   * Para cada utilitario de cor ele gera o par "valor simples" + o valor real
   * dentro de `@supports (color: color-mix(in lab, red, red))`. Todo browser
   * alvo suporta `color-mix` nativamente, entao o par vira so a declaracao
   * real. Medido no kitchensink: 57 blocos.
   *
   * Sao dois hooks porque o Tailwind trabalha em fases diferentes: em dev o
   * CSS ja esta pronto no `transform`, mas no build ele so e emitido como
   * asset no fim — sem o `generateBundle` a otimizacao valeria so em dev.
   */
  /** @type {import("vite").Plugin} */
  const semColorMix = {
    name: "kamalion:strip-color-mix",
    transform(code, id) {
      if (!/\.css(\?|$)/.test(id)) return null;
      const { css, unwrapped } = stripColorMixFallbacks(code);
      return unwrapped === 0 ? null : { code: css, map: null };
    },
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "asset" || !file.fileName.endsWith(".css")) continue;
        const original =
          typeof file.source === "string"
            ? file.source
            : Buffer.from(file.source).toString("utf8");
        const { css, unwrapped } = stripColorMixFallbacks(original);
        if (unwrapped > 0) file.source = css;
      }
    },
  };

  /** @type {import("vite").Plugin[]} */
  const plugins = [tailwindcss(), glue, semColorMix];

  if (injectStyles) {
    /** @type {import("vite").Plugin} */
    const styleInjector = {
      name: "kamalion:inject-styles",
      resolveId(id) {
        if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
        return null;
      },
      load(id) {
        if (id === RESOLVED_VIRTUAL_ID) {
          return `import "@kamalion/web-ui/styles";`;
        }
        return null;
      },
      transform(code, id) {
        // Inject the import once, into the app entry only.
        if (/[\\/]src[\\/]main\.(t|j)sx?$/.test(id)) {
          return { code: `import "${VIRTUAL_ID}";\n${code}`, map: null };
        }
        return null;
      },
    };
    plugins.push(styleInjector);
  }

  return plugins;
}

export default kamalion;
