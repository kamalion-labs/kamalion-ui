import { useEffect, type DependencyList } from "react";
import { usePageContext, type PageMeta } from "./context";

/**
 * Sets page header metadata (title/subtitle) and auxiliary sidebar from
 * within a route view. No-op when used outside a <Page>.
 */
export function usePage(meta: PageMeta, deps?: DependencyList) {
  const ctx = usePageContext();
  const setMeta = ctx?.setMeta;
  const { title, subtitle, sidebar } = meta;

  // Depend on the stable `setMeta` setter (not the whole context value, whose
  // identity changes every render) to avoid an update loop.
  // When `deps` is provided, synchronize with `deps`.
  // Otherwise, synchronize with `title`, `subtitle`, and `sidebar`.
  useEffect(() => {
    setMeta?.({ title, subtitle, sidebar });
    return () => {
      setMeta?.({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ? [setMeta, ...deps] : [setMeta, title, subtitle, sidebar]);
}
