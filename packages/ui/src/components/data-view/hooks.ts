import { useEffect, useMemo, useState } from "react";

export interface UseDataViewOptions {
  pageSize?: number;
  /** Debounce for the text search in ms. */
  debounceMs?: number;
  initialPage?: number;
}

export interface DataViewQueryParams {
  page: number;
  pageSize: number;
  search: string;
}

export interface UseDataViewReturn {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  searchInput: string;
  setSearchInput: (value: string) => void;
  /** Debounced search term. */
  search: string;
  /** Synchronized params for a fetch layer (client- or server-side). */
  queryParams: DataViewQueryParams;
}

/**
 * State for DataView: debounced text search, automatic page reset on search,
 * and a synchronized `queryParams` object for the data layer.
 */
export function useDataView(options: UseDataViewOptions = {}): UseDataViewReturn {
  const { pageSize = 10, debounceMs = 350, initialPage = 1 } = options;

  const [page, setPage] = useState(initialPage);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, debounceMs);
    return () => window.clearTimeout(timer);
  }, [searchInput, debounceMs]);

  const queryParams = useMemo<DataViewQueryParams>(
    () => ({ page, pageSize, search }),
    [page, pageSize, search],
  );

  return {
    page,
    setPage,
    pageSize,
    searchInput,
    setSearchInput,
    search,
    queryParams,
  };
}
