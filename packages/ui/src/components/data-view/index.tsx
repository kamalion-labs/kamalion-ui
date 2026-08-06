import { Plus, Search } from "lucide-react";
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
  className?: string;
}

function DataViewRoot<T>({
  data,
  children,
  buscaPlaceholder = "Search…",
  novoLabel,
  onNovoClick,
  emptyMessage = "No results found.",
  className,
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
        "data-view flex flex-col overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel)",
        className,
      )}
    >
      {/* Filter bar */}
      <div className="data-view-filter flex items-center gap-3 border-b border-(--color-border) p-3">
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
      <div className="data-view-content relative min-h-32 divide-y divide-(--color-border)">
        {isLoading ? (
          <div className="flex items-center justify-center p-10">
            <Loading.Local label="Loading…" />
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-sm text-(--color-foreground-muted)">
            {emptyMessage}
          </div>
        ) : (
          items.map((item) => children(item))
        )}
      </div>

      {/* Pagination */}
      {total > 0 ? (
        <div className="border-t border-(--color-border) px-3">
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
