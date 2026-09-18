/**
 * Remove os fallbacks progressivos de `color-mix()` que o Tailwind v4 emite.
 *
 * Para cada utilitario de cor, o Tailwind emite o par:
 *
 *     border-color: var(--color-border);                 // fallback
 *     @supports (color: color-mix(in lab, red, red)) {
 *       border-color: color-mix(in oklab, ... );         // valor real
 *     }
 *
 * Todo browser alvo do produto suporta `color-mix()` nativamente (Chrome 111+,
 * Safari 16.2+, Firefox 113+), entao o par inteiro pode virar so a declaracao
 * real. Medido no intechdesk: 1.042 blocos, 51 KB so de wrapper, mais os
 * fallbacks adjacentes.
 *
 * A transformacao e deterministica porque a condicao e UMA string exata. As
 * outras condicoes `@supports` do bundle (detecçao de -apple-pay-button,
 * backdrop-filter e -webkit-hyphens) sao deteccao de feature legitima e ficam
 * intactas: o casamento e literal, nao por prefixo.
 */

/**
 * A condicao exata que o Tailwind emite. O casamento tolera espacamento porque
 * no build o CSS ja passou pelo minificador antes de chegar aqui — ali a
 * condicao aparece como `@supports (color:color-mix(in lab, red, red))`, sem o
 * espaco depois de `color:`. Continua sendo um casamento LITERAL da condicao:
 * as outras condicoes `@supports` do bundle nao casam.
 */
const COND_RE = /@supports\s*\(\s*color\s*:\s*color-mix\(\s*in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)\s*\{/g;

/** Nome da propriedade da primeira declaracao de um bloco. */
function firstProperty(block) {
  const m = block.match(/^\s*([-\w]+)\s*:/);
  return m ? m[1] : null;
}

/**
 * @param {string} css
 * @returns {{ css: string, unwrapped: number, fallbacksRemoved: number }}
 */
export function stripColorMixFallbacks(css) {
  COND_RE.lastIndex = 0;
  if (!COND_RE.test(css)) {
    return { css, unwrapped: 0, fallbacksRemoved: 0 };
  }

  let out = '';
  let cursor = 0;
  let unwrapped = 0;
  let fallbacksRemoved = 0;

  COND_RE.lastIndex = 0;
  for (;;) {
    COND_RE.lastIndex = cursor;
    const match = COND_RE.exec(css);
    if (!match) break;

    const at = match.index;
    const open = match.index + match[0].length - 1; // a '{' faz parte do casamento

    // Casa a chave de fechamento do bloco.
    let i = open + 1;
    let depth = 1;
    while (i < css.length && depth > 0) {
      const c = css[i];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      i++;
    }
    if (depth !== 0) break; // CSS truncado: nao mexe

    const inner = css.slice(open + 1, i - 1);
    let head = out + css.slice(cursor, at);

    // Se a declaracao imediatamente anterior for da MESMA propriedade, ela e o
    // fallback que acabou de ficar redundante — remove. Exige adjacencia real
    // (so espaco em branco entre as duas) para nunca comer uma declaracao que
    // pertenca a outro contexto.
    const prop = firstProperty(inner);
    if (prop) {
      const trimmed = head.replace(/\s+$/, '');
      if (trimmed.endsWith(';')) {
        // Inicio da declaracao anterior: o separador mais proximo a esquerda.
        let k = trimmed.length - 2;
        while (k >= 0 && trimmed[k] !== ';' && trimmed[k] !== '{' && trimmed[k] !== '}') k--;
        const decl = trimmed.slice(k + 1, trimmed.length - 1);
        const declProp = firstProperty(decl);
        if (declProp === prop) {
          head = trimmed.slice(0, k + 1);
          fallbacksRemoved++;
        }
      }
    }

    out = head + inner.trim();
    // Preserva o ';' terminador que o bloco `@supports` nao precisava ter.
    if (!out.endsWith(';') && !out.endsWith('}')) out += ';';

    cursor = i;
    unwrapped++;
  }

  out += css.slice(cursor);
  return { css: out, unwrapped, fallbacksRemoved };
}

export default stripColorMixFallbacks;
