import { Inbox, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../util";
import { Button } from "../button";
import { Input } from "../input";
import { Loading } from "../loading";
import { Table } from "../table";
import { useDataView, type UseDataViewReturn } from "./hooks";

export interface DataViewData<T> {
  items: T[];
  total: number;
  isLoading?: boolean;
}

export interface DataViewProps<T> extends UseDataViewReturn {
  data: DataViewData<T>;
  children: (item: T) => ReactNode;
  buscaPlaceholder?: string;
  novoLabel?: string;
  onNovoClick?: () => void;
  emptyMessage?: string;
  /** Secondary line under the empty-state title. */
  emptyDescription?: string;
  className?: string;
  classNameFilter?: string;
  classNameContent?: string;
}

function DataViewRoot<T>({
  data,
  children,
  buscaPlaceholder = "Search…",
  novoLabel,
  onNovoClick,
  emptyMessage = "No results found",
  emptyDescription,
  className,
  classNameFilter,
  classNameContent,
  page,
  setPage,
  pageSize,
  searchInput,
  setSearchInput,
}: DataViewProps<T>) {
  const { items, total, isLoading } = data;

  return (
    <div
      className={cn(
        "data-view flex flex-col overflow-hidden rounded-(--radius-card) border border-(--color-surface-panel-border) bg-(--color-surface-panel)",
        className,
      )}
    >
      {/* Sticky glass filter bar — the theme's pinned-header gesture, so rows
          blur under the controls instead of scrolling past them. */}
      <div
        className={cn(
          "data-view-filter sticky top-0 z-10 flex items-center gap-3 p-3",
          "border-b border-(--color-panel-header-border) bg-(--color-panel-header-glass) backdrop-blur-(--backdrop-blur-header)",
          classNameFilter,
        )}
      >
        <Input className="flex-1">
          <Input.Group>
            <Input.Icon>
              <Search />
            </Input.Icon>
            <Input.Text
              value={searchInput}
              onValueChange={setSearchInput}
              placeholder={buscaPlaceholder}
            />
          </Input.Group>
        </Input>
        {novoLabel ? (
          <Button onClick={onNovoClick}>
            <Button.Icon>
              <Plus />
            </Button.Icon>
            <Button.Content>{novoLabel}</Button.Content>
          </Button>
        ) : null}
      </div>

      {/* Content */}
      <div
        className={cn(
          "data-view-content relative min-h-32 divide-y divide-(--color-border)",
          classNameContent,
        )}
      >
        {isLoading ? (
          // Skeleton rows rather than a centred spinner: the layout is already
          // the right height, so nothing jumps when the data resolves.
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Loading.Skeleton variant="circle" className="size-8" />
                <Loading.Skeleton variant="text" className="h-3.5 flex-1" />
              </div>
            ))}
            <span className="sr-only">Loading</span>
          </div>
        ) : items.length === 0 ? (
          <div className="data-view-empty flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-(--radius-pill) bg-(--color-surface-panel-muted) text-(--color-foreground-subtle)"
            >
              <Inbox className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-(--color-foreground)">
                {emptyMessage}
              </p>
              {emptyDescription ? (
                <p className="max-w-sm text-sm text-pretty text-(--color-foreground-muted)">
                  {emptyDescription}
                </p>
              ) : null}
            </div>
            {novoLabel && onNovoClick ? (
              <Button variant="outline" size="sm" onClick={onNovoClick}>
                <Button.Icon>
                  <Plus />
                </Button.Icon>
                <Button.Content>{novoLabel}</Button.Content>
              </Button>
            ) : null}
          </div>
        ) : (
          items.map((item) => children(item))
        )}
      </div>

      {/* Pagination */}
      {total > 0 ? (
        <div className="data-view-pagination border-t border-(--color-border) px-3">
          <Table.Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
}

export const DataView = Object.assign(DataViewRoot, {
  Root: DataViewRoot,
});

export { useDataView };
export type * from "./hooks";
