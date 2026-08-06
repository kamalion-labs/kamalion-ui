import type { PluginOption } from "vite";

export interface KamalionOptions {
  /**
   * Auto-inject `@kamalion/web-ui/styles` into the app entry via a virtual
   * module. Defaults to `false` — import the styles entry explicitly.
   */
  injectStyles?: boolean;
}

/**
 * Kamalion UI Vite plugin: wires Tailwind v4, aliases the package to source,
 * and (optionally) injects the styles entry.
 */
export declare function kamalion(options?: KamalionOptions): PluginOption[];

export default kamalion;
