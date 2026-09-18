/**
 * Publica a arvore de CSS e o plugin do Vite em dist/.
 *
 * Duas transformacoes, ambas obrigatorias para o pacote compilado funcionar:
 *
 * 1. Os `@source` do Tailwind. Em `src/styles/index.css` eles apontam para
 *    `../components` e `../index.ts` — o codigo-fonte. No pacote publicado nao
 *    existe .tsx: existe o JS compilado, e e nele que as strings de classe
 *    vivem. Sem reapontar, o Tailwind varreria zero arquivos e nenhuma utility
 *    da biblioteca seria gerada. A falha e SILENCIOSA: `@source` apontando para
 *    um diretorio inexistente nao emite erro.
 *
 * 2. Os `@import` dos tokens por componente (`../components/<x>/tokens.css`).
 *    O build de JS nao emite CSS, entao esses arquivos precisam ser copiados a
 *    mao para `dist/components/`, senao os @import apontam para o vazio.
 *
 * O resto e copia byte a byte: nada de minificar nem reordenar. Este CSS entra
 * no root do Tailwind do consumidor, que reescreve tudo de qualquer forma.
 */
import {
  readdirSync,
  mkdirSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
  statSync,
  existsSync,
  rmSync,
} from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, "../src/styles");
const OUT = resolve(here, "../dist/styles");
const COMPONENTES_SRC = resolve(here, "../src/components");
const COMPONENTES_OUT = resolve(here, "../dist/components");

/** Reaponta os @source do codigo-fonte para o JS compilado. */
const reapontarSource = (css) =>
  css
    .replace(/@source\s+"\.\.\/components";?/g, '@source "../components/**/*.js";')
    .replace(/@source\s+"\.\.\/index\.ts";?/g, '@source "../index.js";');

let copiados = 0;
let reescritos = 0;

function percorrer(src, out) {
  mkdirSync(out, { recursive: true });
  for (const entrada of readdirSync(src)) {
    const s = join(src, entrada);
    const o = join(out, entrada);
    if (statSync(s).isDirectory()) {
      percorrer(s, o);
      continue;
    }
    if (entrada.endsWith(".md")) continue; // documentacao interna
    if (entrada.endsWith(".css")) {
      const antes = readFileSync(s, "utf8");
      const depois = reapontarSource(antes);
      if (depois !== antes) reescritos++;
      writeFileSync(o, depois);
    } else {
      copyFileSync(s, o);
    }
    copiados++;
  }
}

rmSync(OUT, { recursive: true, force: true });
percorrer(SRC, OUT);

// tokens.css que moram junto de cada componente
let tokens = 0;
if (existsSync(COMPONENTES_SRC)) {
  for (const dir of readdirSync(COMPONENTES_SRC)) {
    const s = join(COMPONENTES_SRC, dir, "tokens.css");
    if (!existsSync(s)) continue;
    const o = join(COMPONENTES_OUT, dir, "tokens.css");
    mkdirSync(dirname(o), { recursive: true });
    writeFileSync(o, reapontarSource(readFileSync(s, "utf8")));
    tokens++;
  }
}

// o plugin do Vite e ESM puro carregado pelo Node no vite.config do consumidor:
// nao entra no grafo de modulos, entao o Vite nao o emite.
const PLUGIN = resolve(here, "../src/vite");
const PLUGIN_OUT = resolve(here, "../dist/vite");
let plugin = 0;
if (existsSync(PLUGIN)) {
  mkdirSync(PLUGIN_OUT, { recursive: true });
  for (const f of readdirSync(PLUGIN)) {
    copyFileSync(join(PLUGIN, f), join(PLUGIN_OUT, f));
    plugin++;
  }
}

console.log(`[build-css] ${copiados} arquivo(s) -> dist/styles/`);
console.log(`[build-css] ${reescritos} com @source reapontado, ${tokens} tokens.css de componente`);
console.log(`[build-css] ${plugin} arquivo(s) do plugin Vite -> dist/vite/`);

// Portao: todo @import de dist/styles/index.css tem de resolver de verdade.
const entrada = readFileSync(join(OUT, "index.css"), "utf8");
const quebrados = [...entrada.matchAll(/@import\s+"(\.[^"]+)"/g)]
  .map((m) => m[1].replace(/\s+layer\(.*\)$/, ""))
  .filter((rel) => !existsSync(resolve(OUT, rel)));
if (quebrados.length) {
  console.error(`[build-css] ERRO: ${quebrados.length} @import sem destino:`, quebrados);
  process.exit(1);
}

const fontes = [...entrada.matchAll(/@source\s+"([^"]+)"/g)].map((m) => m[1]);
console.log(`[build-css] @source final: ${JSON.stringify(fontes)}`);
