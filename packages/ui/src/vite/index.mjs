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

import { fileURLToPath } from "node:url";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

const here = path.dirname(fileURLToPath(import.meta.url));
// here === <pkg>/src/vite  →  pkgSrc === <pkg>/src
const pkgSrc = path.resolve(here, "..");

const VIRTUAL_ID = "virtual:kamalion.css";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;

/**
 * @param {{ injectStyles?: boolean }} [options]
 * @returns {import("vite").PluginOption[]}
 */
export function kamalion(options = {}) {
  const { injectStyles = false } = options;

  /** @type {import("vite").Plugin} */
  const glue = {
    name: "kamalion",
    enforce: "pre",
    config() {
      return {
        resolve: {
          alias: [
            // Exact-match only: the bare specifier resolves to the source
            // entry, while subpaths like `@kamalion/web-ui/styles` are left
            // for the package `exports` map to resolve.
            {
              find: /^@kamalion\/web-ui$/,
              replacement: path.join(pkgSrc, "index.ts"),
            },
          ],
        },
      };
    },
  };

  /** @type {import("vite").Plugin[]} */
  const plugins = [tailwindcss(), glue];

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
