import { useEffect } from "react";
import { usePageContext, type PageMeta } from "./context";

/**
 * Sets page header metadata (title/subtitle) from within a route view. No-op
 * when used outside a <Page>.
 */
export function usePage(meta: PageMeta) {
  const ctx = usePageContext();
  const setMeta = ctx?.setMeta;
  const { title, subtitle } = meta;

  // Depend on the stable `setMeta` setter (not the whole context value, whose
  // identity changes every render) to avoid an update loop. `title`/`subtitle`
  // are expected to be stable (typically strings).
  useEffect(() => {
    setMeta?.({ title, subtitle });
  }, [setMeta, title, subtitle]);
}
